import mongoose from "mongoose";


const userShema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 },
})

const userModel = mongoose.models.user || mongoose.model('user', userShema)

export default userModel


// import mongoose from "mongoose";

// const userShema = new mongoose.Schema({
//      name: { type: String, required: true },
//      email: { type: String, required: true, unique: true },
//      password: { type: String, required: true },
//      verifyOtp: { type: String, default: '' },
//      verifyOtpExpireAt: { type: Number, default: 0 },
//      isAccountVerified: { type: Boolean, default: false },
//      resetOtp: { type: String, default: '' },
//      resetOtpExpireAt: { type: Number, default: 0 },
// });

// // Explicitly define the collection name 'users'
// const userModel = mongoose.models.User || mongoose.model('User', userShema, 'users');

// export default userModel;
