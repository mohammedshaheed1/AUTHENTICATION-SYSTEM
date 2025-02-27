import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, login again' });
  }

  try {
    // Verify the JWT token
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecoded.id) {
      // Attach decoded user data to req.user
      req.user = { 
        _id: tokenDecoded.id, 
        name: tokenDecoded.name,  
        profilePic: tokenDecoded.profilePic 
      };
      req.body.userId = tokenDecoded.id;
    } else {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default userAuth;
