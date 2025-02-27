import mongoose from "mongoose";


const postSchema=mongoose.Schema({
    postedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user',
      required:true
    },
    text:{
        type:String,
        maxLength:500
    },
    image:{
        type:String,
    },
    likes:{
       type:[mongoose.Schema.Types.ObjectId],
       ref:"User",
       default:[]
    },
    replies:[
       {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        text:{
            type:String,
            required:true
        },
        userProfilePic:{
            type:String
        },
        username:{
            type:String
        }
      },
    ]
},{
    timestamps:true
})

const postModel = mongoose.models.post || mongoose.model('post', postSchema)

export default postModel