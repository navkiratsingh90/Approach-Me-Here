const express = require('express')
const Other = require('../models/other-model')
const User =  require('../models/user-model')
const getDataUri = require('../Utils/datauri.js')
const cloudinary = require('../Utils/cloudinary.js')

const addOther = async (req, res) => {
  try {
    const {
       title, description, sellingPrice,
      modelYear, phoneNumber,latitude,
      longitude, location,condition,category
    } = req.body;
    const file = req.file; 
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const userId = req.user.userID || req.user._id; // Adjust as per your auth middleware

    // 1. Create new Other product
    const newProduct = await Other.create({
      title,
      imgUrl : cloudResponse.secure_url,
      description,
      sellingPrice,
      modelYear,
      latitude,
      longitude,
      phoneNumber,
      location,
      condition,
      category: 'Others',
      createdBy: userId
    });

    // 2. Add product to user's adsPosted array
    await User.findByIdAndUpdate(userId, {
      $push: {
        adsPosted: {
          productId: newProduct._id,
          category: 'Other'
        }
      }
    });

    // 3. Respond once
    res.status(201).json({
      message: 'Other posted and added to adsPosted',
      Other: newProduct,
      prodId: newProduct._id.toString()
    });

  } catch (error) {
    console.error("Add Other Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
const updateOthers = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      soldOut,
      title,
      description,
      sellingPrice,
      modelYear,
      phoneNumber,
      location,
      condition,
      category
    } = req.body;

    const updatedData = await Other.findByIdAndUpdate(
      id,
      {
        soldOut,
        title,
        description,
        modelYear,
        sellingPrice,
        location,
        condition,
        phoneNumber
      },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Other item not found' });
    }

    return res.status(200).json({
      message: 'Other item updated successfully',
      updatedData
    });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllOthers = async (req,res) => {
  try { 
      const Others = await Other.find()
      if (!Others){
        res.status(201).json({msg: "no Others yet Posted!"})
      }
      return res.status(200).json({msg: Others, res: "all Others fetched successfully"})
  } catch (error) {
    console.error("error ", error)
  }
}

const getOtherById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const data = await Other.findById(id).populate(
      "createdBy"
     )

    if (!data) {
      return res.status(404).json({ message: "Other not found" });
    }

    res.status(200).json({
      msg: data,
      res: "Data for this ID has been sent successfully",
      userData: user
    });
  } catch (error) {
    console.error("Get Other Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteOtherById = async (req,res) => {
  const id = req.params.id
  const data = await Other.findByIdAndDelete(id)
  if (data){
    res.status(201).json({msg:" deleted successfully", data : id})
  }
}

module.exports = {addOther,getOtherById , getAllOthers, deleteOtherById, updateOthers}


