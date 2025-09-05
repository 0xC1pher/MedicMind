import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Unauthorized"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    next(errorHandler(403, "Token invalid"));
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
    const { profilePicture } = req.body;
    if (!profilePicture) return next(errorHandler(400, "Profile picture URL required"));

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};