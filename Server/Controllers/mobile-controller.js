const express = require('express')
const Mobile = require('../models/mobile-model')
const User =  require('../models/user-model')
const getDataUri = require('../Utils/datauri.js')
const cloudinary = require('../Utils/cloudinary.js')

const addMobile = async (req, res) => {
  try {
    const {
       title, description, sellingPrice,
      modelYear,latitude,
      longitude, brand, phoneNumber,condition, location,modelName
    } = req.body;
    const file = req.file; 
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const userId = req.user.userID || req.user._id; // Adjust as per your auth middleware

    // 1. Create new Mobile product
    const newProduct = await Mobile.create({
      title,
      imgUrl : cloudResponse.secure_url,
      description,
      sellingPrice,
      modelYear,
      brand,
      condition,
      latitude,
      longitude,
      phoneNumber,
      location,
			modelName,
      category: 'Mobile',
      createdBy: userId
    });

    // 2. Add product to user's adsPosted array
    await User.findByIdAndUpdate(userId, {
      $push: {
        adsPosted: {
          productId: newProduct._id,
          category: 'Mobile'
        }
      }
    });

    // 3. Respond once
    res.status(201).json({
      message: 'Mobile posted and added to adsPosted',
      Mobile: newProduct,
      prodId: newProduct._id.toString()
    });

  } catch (error) {
    console.error("Add Mobile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateMobiles = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      soldOut,
      description,
      sellingPrice,
      modelYear,
      modelName,
      condition,
      brand,
      phoneNumber,
      location,
    } = req.body;

    const updatedData = await Mobile.findByIdAndUpdate(
      id,
      {
        soldOut,
        title,
        description,
        modelYear,
        modelName,
        brand,
        condition,
        sellingPrice,
        location,
        phoneNumber
      },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Mobile item not found' });
    }

    return res.status(200).json({
      message: 'Mobile item updated successfully',
      updatedData
    });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllMobiles = async (req,res) => {
  try { 
      const Mobiles = await Mobile.find()
      if (!Mobiles){
        res.status(201).json({msg: "no Mobile yet Posted!"})
      }
      // console.log(Mobile);.
      return res.status(200).json({msg: Mobiles, res: "all Mobile fetched successfully"})
  } catch (error) {
    console.error("error ", error)
  }
}

const getMobileById = async (req,res) => {
  const id = req.params.id
  const user = req.user
  // console.log(id);
  const data = await Mobile.findById(id).populate(
    "createdBy"
   )
  if (data){
    res.status(201).json({msg : data, res: "data of this id has been sent successfully", userData: user})
  }
}

const deleteMobileById = async (req,res) => {
  const id = req.params.id
  const data = await Mobile.findByIdAndDelete(id)
  if (data){
    res.status(201).json({msg:" deleted successfully", data : id})
  }
}

module.exports = {addMobile,getMobileById , getAllMobiles, deleteMobileById, updateMobiles}


