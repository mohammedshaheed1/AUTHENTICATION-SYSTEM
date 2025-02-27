import mongoose from "mongoose";


const userShema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic:{type:String,default:''},
    followers:{type:[mongoose.Schema.Types.ObjectId],ref:'User',default:[]},
    following:{type:[mongoose.Schema.Types.ObjectId],ref:'User',default:[]},
    bio:{type:String,default:''},
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 },
},{
    timestamps:true
})

const userModel = mongoose.models.user || mongoose.model('user', userShema)

export default userModel


