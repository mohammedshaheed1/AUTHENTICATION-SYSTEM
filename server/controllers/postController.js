import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js"


export const createPost = async (req, res) => {
  try {
    const { postedBy, text, image } = req.body;

    if (!postedBy || !text) {
      return res.status(400).json({ success: false, message: 'postedBy and text fields are required' });
    }

    const user = await userModel.findById(postedBy);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Ensure the user making the request is the same as the postedBy user
    if (user._id.toString() !== req.body.userId.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Validate text length
    const maxLength = 500;
    if (text.length > maxLength) {
      return res.status(401).json({ success: false, message: `Text must be less than ${maxLength} characters` });
    }

    // Create and save the new post
    const newPost = new postModel({ postedBy, text, image });
    await newPost.save();

    res.status(200).json({ success: true, message: 'Successfully created post', newPost });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getPost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id)

    if (!post) {
      return res.status(500).json({ success: false, message: 'user not found at post' })
    }

    res.status(200).json({ success: true, message: "user founded ", post })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const DeletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id)

    if (!post) {
      return res.status(500).json({ success: false, message: 'user not found at post' })
    }


    if (post.postedBy.toString() !== req.user._id.toString()) {
      res.status(401).json({ success: true, message: "unauthorized user " })
    }

    await postModel.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, message: "Deleted successfully " })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


export const likeandUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userID = req.user._id;

    // Find the post
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(400).json({ success: false, message: "Post Not found" });
    }

    // Check if the user has already liked the post
    const userLikedPost = post.likes.includes(userID);

    if (userLikedPost) {
      // Unlike the post
      await postModel.updateOne({ _id: postId }, { $pull: { likes: userID } });
      return res.status(200).json({ success: true, message: "Post unliked successfully" });
    } else {
      // Like the post
      post.likes.push(userID);
      await post.save();
      return res.status(200).json({ success: true, message: "Post liked successfully" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const replyPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.name;


    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }


    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(400).json({ success: false, message: 'Post not found' });
    }

    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();
    return res.status(200).json({ success: true, message: 'Reply added successfully', username });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeedPost = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("hello dear");

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const following = user.following || [];

    if (following.length === 0) {
      return res.status(200).json({ success: true, feedPost: [] });
    }

    const feedPost = await postModel
      .find({ postedBy: { $in: following } })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, feedPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
