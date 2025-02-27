import express from 'express'
import userAuth from "../middleware/userAuth.js";
import { followAndUnfollowuser, getUserData, getUserProfile, updateUser } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.get('/data',userAuth,getUserData)
userRouter.post('/follow/:id',userAuth,followAndUnfollowuser)
userRouter.post('/update/:id',userAuth,updateUser)
userRouter.get('/getuserprofile/:name',getUserProfile)

export default userRouter