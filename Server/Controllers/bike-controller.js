const express = require('express')
const Bike = require('../models/bike-model')
const User =  require('../models/user-model')
const getDataUri = require('../Utils/datauri.js')
const cloudinary = require('../Utils/cloudinary.js')

const addBike = async (req, res) => {
  try {
    const {
      modelName, title, description, fuelType, sellingPrice,
      modelYear, brand, phoneNumber,condition,latitude,
      longitude, location, kilometersDriven
    } = req.body;
    const file = req.file; 
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const userId = req.user.userID || req.user._id; // Adjust as per your auth middleware

    // 1. Create new Bike product
    const newProduct = await Bike.create({
      modelName,
      title,
      imgUrl : cloudResponse.secure_url,
      description,
      fuelType,
      condition,
      latitude,
      longitude,
      sellingPrice,
      modelYear,
      brand,
      phoneNumber,
      location,
      kilometersDriven,
      category: 'Bike',
      createdBy: userId
    });

    // 2. Add product to user's adsPosted array
    await User.findByIdAndUpdate(userId, {
      $push: {
        adsPosted: {
          productId: newProduct._id,
          category: 'Bike'
        }
      }
    });

    // 3. Respond once
    res.status(201).json({
      message: 'Bike posted and added to adsPosted',
      bike: newProduct,
      prodId: newProduct._id.toString()
    });

  } catch (error) {
    console.error("Add Bike Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatBikes = async (req,res) => {
	try {
    const { id } = req.params;
    const {
      title,
      soldOut,
      description,
      sellingPrice,
      modelYear,
      condition,
      brand,
      phoneNumber,
      location,
			fuelType,
			kilometersDriven,
			modelName,
    } = req.body;

    const updatedData = await Bike.findByIdAndUpdate(
      id,
      {
        soldOut,
        title,
      description,
      sellingPrice,
      modelYear,
      brand,
      condition,
      phoneNumber,
      location,
			fuelType,
			kilometersDriven,
			modelName,
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

const getAllBikes = async (req,res) => {
  try { 
      const Bikes = await Bike.find()
      if (!Bikes){
        res.status(201).json({msg: "no Bikes yet Posted!"})
      }
      return res.status(200).json({msg: Bikes, res: "all cars fetched successfully"})
  } catch (error) {
    console.error("error ", error)
  }
}

const getBikeById = async (req,res) => {
  const id = req.params.id
  const user = req.user
  // console.log(id);
  const data = await Bike.findById(id).populate(
    "createdBy"
   )
  if (data){
    res.status(201).json({msg : data, res: "data of this id has been sent successfully", userData: user})
  }
}

const deleteBikeById = async (req,res) => {
  const id = req.params.id
  const data = await Bike.findByIdAndDelete(id)
  if (data){
    res.status(201).json({msg:" deleted successfully", data : id})
  }
}

module.exports = {addBike,getBikeById , getAllBikes, deleteBikeById, updatBikes}