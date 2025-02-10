import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import transporter from "../config/nodemailer.js"

export const register = async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'missing details' })
    }

    try {

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.json({ success: false, message: 'Already existing user' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({ name, email, password: hashedPassword })
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV = 'production',
            sameSite: process.env.NODE_ENV = 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        //sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'welcome to developer community ',
            text: `welcome to mern website your account has been created with email id ${email}`
        }

        await transporter.sendMail(mailOptions)

        return res.json({ success: true })

    } catch (error) {

        res.json({ success: false, message: error.message })
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ success: false, message: 'email and password required' })
    }

    try {

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid email" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "invalid password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV = 'production',
            sameSite: process.env.NODE_ENV = 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true })


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV = 'production',
            sameSite: process.env.NODE_ENV = 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, message: 'Logged out' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {

        const { userId } = req.body;
        const user = await userModel.findById(userId)

        if (user.isAccountVerified) {
            return res.json({ success: false, message: 'account already verified' })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() * 24 * 60 * 60 * 1000;
        await user.save()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Acount verification otp',
            text: `your OTP is ${otp} Verify your account using this OTP`
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "verification otp sent on email" })


    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const verifyemail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: 'missing details' })
    }

    try {

        const user = await userModel.findById(userId)

        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "invalid otp" })
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "expired otp" })
        }
        user.isAccountVerified = true
        user.verifyOtp = ''
        user.verifyOtpExpireAt = 0

        await user.save()
        return res.json({ success: true, message: 'Account verified' })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//check if user is authenticated
export const isAuthenticated = async (req, res) => {

    try {

        return res.json({ success: true })



    } catch (error) {
        res.json({ success: false, message: error.message })
    }


}

//send password reset otp
export const sendResetOtp = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.json({ success: false, message: "email is required" })
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'user not found' })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'password reset otp',
            text: `your OTP is ${otp} Verify your account using this OTP`
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "verification otp sent on email" })


    } catch (error) {
        res.json({ success: false, message: error.message })
    }


}

//reset password
export const resetPassword = async (req, res) => {
    const { otp, email, newPassword } = req.body

    if (!email || !email || !newPassword) {
        return res.json({ success: false, message: "email and password and otp are required" })
    }

    try {

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: "invalid otp" })
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "otp expired" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.resetOtp = ''
        user.resetOtpExpireAt = 0
        await user.save()
        return res.json({ success: true, message: "password has been reset successfully" })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
