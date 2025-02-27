import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'

export const getUserData = async (req, res) => {
     try {

          const { userId } = req.body;

          const user = await userModel.findById(userId)

          if (!user) {
               return res.json({ success: false, message: "user not found" })
          }

          res.json({
               success: true,
               userData: {
                    name: user.name,
                    isAccountVerified: user.isAccountVerified,

               }
          })

     } catch (error) {
          res.json({ success: true, message: error.message })
     }
}

export const followAndUnfollowuser = async (req, res) => {
     try {
          const { id } = req.params
          const userModify = await userModel.findById(id)
          const currentUser = await userModel.findById(req.body.userId)

          if (id === req.body.userId.toString()) {
               return res.status(400).json({ message: 'you cant follow and unfollow' })
          }
          if (!userModify || !currentUser) {
               return res.status(400).json({ message: 'user not found' })
          }
          const isFollowing = currentUser.following.includes(id);

          if (isFollowing) {
               await userModel.findByIdAndUpdate(req.body.userId, { $pull: { following: id } })
               await userModel.findByIdAndUpdate(id, { $pull: { followers: req.body.userId } })
               return res.status(200).json({ success: true, message: 'user unfollowed found' })
          } else {
               await userModel.findByIdAndUpdate(req.body.userId, { $push: { following: id } })
               await userModel.findByIdAndUpdate(id, { $pull: { followers: req.body.userId } })
               return res.status(200).json({ success: true, message: 'user followed' })
          }
     } catch (error) {

          res.status(500).json({ success: false, message: error.message })
     }
}

export const updateUser = async (req, res) => {

     const { name, email, password, profilePic, bio } = req.body
     const userId = req.body.userId;


     try {

          let user = await userModel.findById(userId)
          if (!user) {
               return res.status(400).json({ success: false, message: "user not found" })
          }

          if (req.params.id !== userId.toString()) {
               return res.status(400).json({ success: false, message: "use cant change another user account" })
          }

          if (password) {
               const salt = await bcrypt.genSalt(10);
               const hashedPassword = await bcrypt.hash(password, salt)
               user.password = hashedPassword
          }
          user.name = name || user.name
          user.email = email || user.email
          user.profilePic = profilePic || user.profilePic
          user.bio = bio || user.bio

          user = await user.save()
          res.status(200).json({ success: true, message: 'profile updated successfuly', user })

     } catch (error) {
          res.status(500).json({ success: false, message: error.message })
     }
}


export const getUserProfile = async (req, res) => {

     const { name } = req.params
     try {

          const user = await userModel.findOne({ name }).select("-password").select("-updatedAt");
          // const user = await userModel.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } })
          //                        .select("-password")
          //                        .select("-updatedAt");

          if (!user) {
               return res.status(400).json({ message: false, message: 'user not found ok' })
          }

          res.status(200).json(user)



     } catch (error) {
          res.status(500).json({ success: false, message: error.message })
     }

}