import jwt from "jsonwebtoken"

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: "not authorized login again" })
    }

    try {
        const tokenDecod = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecod.id) {
            req.body.userId = tokenDecod.id
        } else {
            return res.json({ success: false, message: "not authorized" })
        }

        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export default userAuth