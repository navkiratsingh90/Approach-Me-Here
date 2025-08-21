const express = require('express')
const Electronic = require('../models/electronic-model')
const User =  require('../models/user-model')
const getDataUri = require('../Utils/datauri.js')
const cloudinary = require('../Utils/cloudinary.js')

const addElectronic = async (req, res) => {
  try {
    const {
       title, description, sellingPrice,
      modelYear, brand,latitude,
      longitude, phoneNumber,condition, location, prodCategory
    } = req.body;
    const file = req.file; 
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const userId = req.user.userID || req.user._id; // Adjust as per your auth middleware

    // 1. Create new Electronic product
    const newProduct = await Electronic.create({
      title,
      imgUrl : cloudResponse.secure_url,
      description,
      latitude,
      longitude,
      sellingPrice,
      modelYear,
      brand,
      condition,
      phoneNumber,
      location,
			prodCategory,
      category: 'Electronics',
      createdBy: userId
    });

    // 2. Add product to user's adsPosted array
    await User.findByIdAndUpdate(userId, {
      $push: {
        adsPosted: {
          productId: newProduct._id,
          category: 'Electronics'
        }
      }
    });

    // 3. Respond once
    res.status(201).json({
      message: 'Electronic posted and added to adsPosted',
      Electronic: newProduct,
      prodId: newProduct._id.toString()
    });

  } catch (error) {
    console.error("Add Electronic Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
const updateElectronics = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      soldOut,
      title,
      description,
      sellingPrice,
      modelYear,
      brand,
      condition,
      phoneNumber,
      location,
      category
    } = req.body;

    const updatedData = await Electronic.findByIdAndUpdate(
      id,
      {
        soldOut,
        title,
        description,
        modelYear,
        prodCategory: category,
        brand,
        condition,
        sellingPrice,
        location,
        phoneNumber
      },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Electronic item not found' });
    }

    return res.status(200).json({
      message: 'Electronic item updated successfully',
      updatedData
    });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllElectronics = async (req,res) => {
  try { 
      const Electronics = await Electronic.find()
      if (!Electronics){
        res.status(201).json({msg: "no Electronics yet Posted!"})
      }
      return res.status(200).json({msg: Electronics, res: "all Electronics fetched successfully"})
  } catch (error) {
    console.error("error ", error)
  }
}

const getElectronicById = async (req,res) => {
  const id = req.params.id
  const user = req.user
  // console.log(id);
  const data = await Electronic.findById(id).populate(
    "createdBy"
   )
  if (data){
    res.status(201).json({msg : data, res: "data of this id has been sent successfully", userData: user})
  }
}

const deleteElectronicById = async (req,res) => {
  const id = req.params.id
  const data = await Electronic.findByIdAndDelete(id)
  if (data){
    res.status(201).json({msg:" deleted successfully", data : id})
  }
}

module.exports = {addElectronic,getElectronicById , getAllElectronics, deleteElectronicById, updateElectronics}


