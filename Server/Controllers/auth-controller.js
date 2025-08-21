const express = require('express')
const User = require('../models/user-model')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const Car = require('../models/car-model')
const Bike = require('../models/bike-model');
const Mobile = require('../models/mobile-model');
const Furniture = require('../models/furniture-model');
const Electronics = require('../models/electronic-model');
const Others = require('../models/other-model');
const Sale = require('../models/sales-model')
const transporter = require('../Utils/nodemailer')

const Register = async (req,res) => {
	try {
    const { username, password, email } = req.body;

    // Validate fields...
		if (!email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const newUser = new User({ username, password, email }); // password will be hashed in model
    await newUser.save();
    const sale = await Sale.findOne();

    if (sale) {
      sale.totalUsers++
      await sale.save(); // cleaner and better for single document updates
    }


    res.status(201).json({ message: "User created", user: newUser, token: await newUser.generateToken(), userid: newUser._id.toString() });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Username not found! Please register first." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate token
    const token = await user.generateToken();

    // Create safe user object
    const sanitizedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullname: user.fullname, // only if it's stored in DB
    };
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/"
    });
    
    // Send response
    return res
      .status(200)
      .json({
        message: `Welcome back, ${sanitizedUser.username}!`,
        user: sanitizedUser,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const Logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/" // ensure this matches the login cookie
    });
    return res.status(200).json({ msg: "logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const forgotPassword = async (req,res) => {
  try {
      const {email} = req.body
      const user = await User.findOne({email})
      if (!user) {
        return res.status(400).json({msg : "user doesn't exists with this email"})
      }
      user.otp = undefined
      user.otpExpiryDate = undefined
      const otp = crypto.randomInt(100000, 1000000).toString(); // 1000000 is exclusive
      const otpExpiryDate = Number(Date.now() + 3600000); // 1 hour expiry

        user.otp = otp;
        user.otpExpiryDate = otpExpiryDate;
        await user.save();

      // console.log(otp , user.email);
      const mailOptions = {
        from : process.env.SENDERS_EMAIL,
        to : user.email,
        subject : "forgot password",
        html : `your forgot password verification otp is ${otp}`
      }
      await transporter.sendMail(mailOptions)
      return res.status(200).json({msg : "Verify otp now"})

  } catch (error) {
      console.error("error", error);
  }
}

const verifyOtp = async (req, res) => {
  try {
    const { finalOtp, email } = req.body;
    console.log(finalOtp, email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    // console.log(finalOtp , user.otp);
    if (user.otpExpiryDate < new Date()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    if (String(finalOtp).trim() !== String(user.otp).trim()) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    user.isVerified = true
    await user.save()
    return res.status(200).json({ msg: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


const resetpassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiryDate = undefined;

    await user.save(); // ✅ save the updated user to DB

    return res.status(200).json({ msg: "Password reset successfully!" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
const verifyUser = async (req,res) => {
  try {
      const {email} = req.body.user
      console.log("email = ",email);
      const user = await User.findOne({email})
      if (!user) {
        return res.status(400).json({msg : "user doesn't exists with this email"})
      }
      user.otp = undefined;
      user.otpExpiryDate = undefined;
      const otp = crypto.randomInt(100000, 1000000).toString(); // 1000000 is exclusive
      const otpExpiryDate = Number(Date.now() + 3600000); // 1 hour expiry

        user.otp = otp;
        user.otpExpiryDate = otpExpiryDate;
        await user.save();

      // console.log(otp , user.email);
      const mailOptions = {
        from : process.env.SENDERS_EMAIL,
        to : user.email,
        subject : "Verification of User",
        html : `your Verification otp is ${otp}`
      }
      await transporter.sendMail(mailOptions)
      return res.status(200).json({msg : "Verify otp now"})

  } catch (error) {
      console.error("error" , error);
  }
}
const getUserId = async (req,res) => {
  try {
    const userDetails = req.user
  if (!userDetails){
    res.status(401).json({msg : "User not register with us or token is expired, please login again"})
  }
  return res.status(201).json({msg:userDetails, res: "done"})
  } catch (error) {
    console.error(`error ${error}`);
  }
  
}

const getUserData = async (req, res) => {
  try {
    const userId = req.user.userID;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const ads = [];

    for (const ad of user.adsPosted) {
      const { productId, category } = ad;

      let product = null;

      switch (category) {
        case 'Car':
          product = await Car.findById(productId).populate('createdBy');
          break;
        case 'Bike':
          product = await Bike.findById(productId).populate('createdBy');
          break;
        case 'Mobile':
          product = await Mobile.findById(productId).populate('createdBy');
          break;
        case 'Furniture':
          product = await Furniture.findById(productId).populate('createdBy');
          break;
        case 'Electronics':
          product = await Electronics.findById(productId).populate('createdBy');
          break;
        case 'Others':
          product = await Others.findById(productId).populate('createdBy');
          break;
        default:
          break;
      }

      if (product) {
        ads.push({ category, product });
      }
    }

    return res.status(200).json({ msg: ads, res: "Ads fetched successfully" , user});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const handleItemsToWishlist = async (req, res) => {
  try {
    const userId = req.user.userID;
    const { id, Category } = req.body;

    // Map category string to model
    const modelMap = {
      Car,
      Bike,
      Mobile,
      Furniture,
      Electronics,
      Others
      // Add other categories here...
    };

    const Model = modelMap[Category];
    if (!Model) {
      return res.status(400).json({ msg: "Invalid category" });
    }

    // 1. Check if product exists
    const product = await Model.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // 2. Check if already in wishlist
    const user = await User.findById(userId);
    const alreadyExists = user.wishlist.some(
      (item) => item.productId.toString() === id && item.category === Category
    );

    if (alreadyExists) {
      await User.findByIdAndUpdate(userId, {
        $pull: {
          wishlist: {
            productId: id,
            category: Category,
          },
        },
      });
      
      return res.status(200).json({ msg: "Product removed from wishlist" });
    }

    // 3. Add to wishlist
    await User.findByIdAndUpdate(userId, {
      $push: {
        wishlist: {
          productId: id,
          category: Category,
        },
      },
    });

    res.status(200).json({ msg: "Successfully added to wishlist" });

  } catch (error) {
    console.error("Wishlist Error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllWishlistItems = async (req,res) => {
  try {
    const userId = req.user.userID;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const wishlist = [];

    for (const wish of user.wishlist) {
      const { productId, category } = wish;

      let product = null;

      switch (category) {
        case 'Car':
          product = await Car.findById(productId).populate('createdBy');
          break;
        case 'Bike':
          product = await Bike.findById(productId).populate('createdBy');
          break;
        case 'Mobile':
          product = await Mobile.findById(productId).populate('createdBy');
          break;
        case 'Furniture':
          product = await Furniture.findById(productId).populate('createdBy');
          break;
        case 'Electronics':
          product = await Electronics.findById(productId).populate('createdBy');
          break;
        case 'Others':
          product = await Others.findById(productId).populate('createdBy');
          break;
        default:
          break;
      }

      if (product) {
        wishlist.push({ category, product });
      }
    }

    return res.status(200).json({ msg: wishlist, res: "wishlist fetched successfully", user });
  } catch (error) {
      console.error(error);
  }
}

const getAllUsers = async (req,res) => {
  try {
      const users = await User.find()
      if (users){
        return res.status(200).json({msg: users})
      }
  } catch (error) {
      console.error(error);
  }
}

const sendMailInterested = async (req, res) => {
  const { productId, sellerEmail, buyerName, buyerLocation, message } = req.body;

  try {
    console.log(sellerEmail);
    // Save to DB if you want (optional)
    // await Interest.create({ productId, buyerName, buyerLocation, message });

    // Send Email to seller
    const mailOptions = {
      from: `"Marketplace" <${process.env.SENDERS_EMAIL}>`,
      to: sellerEmail,
      subject: "Someone is interested in your ad",
      html: `
        <h3>New Buyer Interest</h3>
        <p><strong>Name:</strong> ${buyerName}</p>
        <p><strong>Location:</strong> ${buyerLocation}</p>
        <p><strong>Email:</strong> ${req.user.email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>Contact the buyer to proceed.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Interest sent to seller" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send interest" });
  }
}

const deleteUser = async (req,res) => {
  try {
      const id = req.params.id
      const users = await User.findByIdAndDelete(id)
      if (users){
        return res.status(200).json({msg:" user deleted successfully"})
      }
  } catch (error) {
      console.error(error);
  }
}
const checkAdmin = async (req,res) => {
  try {
      const isAdmin = req.isAdmin
      const user = req.user
      const username = req.user.username
      res.status(200).json({isAdmin, msg : `Welcome ${username}!`, user})
  } catch (error) {
      console.error(error);
  }
}
module.exports = {Login, Register,Logout, getUserId, getUserData, handleItemsToWishlist,getAllWishlistItems , getAllUsers, deleteUser,checkAdmin,forgotPassword, resetpassword, verifyOtp,verifyUser,sendMailInterested}