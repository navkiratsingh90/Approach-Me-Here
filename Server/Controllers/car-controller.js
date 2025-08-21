const express = require('express')
const Car = require('../models/car-model')
const User =  require('../models/user-model')
const getDataUri = require('../Utils/datauri.js')
const cloudinary = require('../Utils/cloudinary.js')
const Sale = require('../models/sales-model.js')

const addCar = async (req, res) => {
  try {
    
    let {
      modelName, title, description, condition, fuelType, sellingPrice,
      modelYear, brand, latitude, longitude,
      phoneNumber, location, kilometersDriven
    } = req.body;
    
    console.log(latitude, longitude);
    
    // If they're missing or null, set defaults
    if (latitude == null || longitude == null) {
      latitude = "20.5937";  // India latitude
      longitude = "78.9629"; // India longitude
    }
    
    if (!modelName){
      res.status(400).json({msg: "modelName not defined"})
    }
    // console.log(title, description, modelName);
    const file = req.file; 
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const userId = req.user.userID || req.user._id; // Adjust as per your auth middleware
    

    // 1. Create new Car product
    const newProduct = await Car.create({
      title,
      imgUrl : cloudResponse.secure_url,
      description,
      modelName,
      fuelType,
      sellingPrice,
      condition,
      modelYear,
      latitude,
      longitude,
      brand,
      phoneNumber,
      location,
      kilometersDriven,
      category: 'Car',
      createdBy: userId
    });
    const sale = await Sale.findOne();

    if (sale) {
      sale.totalAds++;
      sale.totalCarsPosted++;
      await sale.save(); // cleaner and better for single document updates
    }
    // 2. Add product to user's adsPosted array
    await User.findByIdAndUpdate(userId, {
      $push: {
        adsPosted: {
          productId: newProduct._id,
          category: 'Car'
        }
      }
    });

    // 3. Respond once
    res.status(201).json({
      message: 'Car posted and added to adsPosted',
      car: newProduct,
      prodId: newProduct._id.toString()
    });

  } catch (error) {
    console.error("Add Car Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getAllCars = async (req,res) => {
  try { 
      const Cars = await Car.find()
      if (!Cars){
        res.status(201).json({msg: "no Cars yet Posted!"})
      }
      return res.status(200).json({msg: Cars, res: "all cars fetched successfully"})
  } catch (error) {
    console.error("error ", error)
  }
}

const getCarById = async (req,res) => {
  const id = req.params.id
  const user = req.user
  // console.log(id);
  const data = await Car.findById(id).populate(
   "createdBy"
  )
  if (data){
    res.status(201).json({msg : data, res: "data of this id has been sent successfully", userData: user})
  }
}
const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      soldOut,
      title,
      description,
      sellingPrice,
      modelYear,
      condition,
      brand,
      phoneNumber,
      location,
      modelName,
      kilometersDriven,
      fuelType
    } = req.body;

    const updatedData = await Car.findByIdAndUpdate(
      id,
      {
        soldOut,
        title,
      description,
      sellingPrice,
      modelYear,
      brand,
      phoneNumber,
      condition,
      location,
      modelName,
      kilometersDriven,
      fuelType
      },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Car item not found' });
    }

    return res.status(200).json({
      message: 'Car item updated successfully',
      updatedData
    });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteCarById = async (req,res) => {
  const id = req.params.id
  console.log("here");
  const data = await Car.findByIdAndDelete(id)
  if (data){
    res.status(201).json({msg:" deleted successfully", data : id})
  }
}

module.exports = {addCar,getCarById , getAllCars, deleteCarById,updateCar}