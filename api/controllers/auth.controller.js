import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const {
    username,
    aadharCard,
    phoneNumber,
    address,
    dateOfBirth,
    gender,
    occupation,
    farmSize,
    cropsGrown,
    buyerType,
    gstNumber,
    bankAccNumber,
    ifscNumber,
    password,
  } = req.body;

  let farmerDetails = null;
  let buyerDetails = null;

  if (occupation === "Farmer") {
    if (!farmSize || !cropsGrown) {
      return next(errorHandler(400, "Farmer details missing"));
    }

    farmerDetails = { farmSize, cropsGrown };
  } else if (occupation === "Buyer") {
    if (!buyerType || !gstNumber) {
      return next(errorHandler(400, "Buyer details missing"));
    }
    buyerDetails = { buyerType, gstNumber };
  }

  const hashedpassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    aadharCard,
    phoneNumber,
    address,
    dateOfBirth,
    gender,
    occupation,
    farmerDetails,
    buyerDetails,
    bankAccNumber,
    ifscNumber,
    password: hashedpassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "user Created successsfully" });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
 
// signup  API

export const signin = async (req, res, next) => {
  const { aadharCard, password } = req.body;
  try {
    const validUser = await User.findOne({ aadharCard });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const{password:hashedpassword, ...rest}=validUser._doc; // prevents the password from appearing 
    const expiryDate=new Date(Date.now() + 3600000); // 1hour time for expiry cookie
    res
      .cookie("access_token", token, { httpOnly: true,expires:expiryDate})
      .status(200)
      .json(validUser);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try{
    res.clearCookie("access_token");
    res.status(200).json({success:true , message:"Sign Out successfull"});
  }
  catch(error){
    next(error);
  }
}
