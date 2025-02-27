import express from 'express'
import { createPost, DeletePost, getFeedPost, getPost, likeandUnlikePost, replyPost } from '../controllers/postController.js'
import userAuth from '../middleware/userAuth.js'


const postRouter =express.Router()

// New route for getting feed posts
postRouter.get('/getFeed', userAuth, getFeedPost);
postRouter.post('/create',userAuth,createPost)
postRouter.get('/:id',getPost)
postRouter.delete('/:id',userAuth,DeletePost)
postRouter.post('/like/:id',userAuth,likeandUnlikePost)
postRouter.post('/reply/:id',userAuth,replyPost)






export default postRouter