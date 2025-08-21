const express = require('express')
const Furniture = require('../models/furniture-model')
const User =  require('../models/user-model')
const getDataUri = require('../Utils/datauri.js')
const cloudinary = require('../Utils/cloudinary.js')

const addFurniture = async (req, res) => {
  try {
    const {
       title, description, sellingPrice,
      modelYear, phoneNumber, latitude,
      longitude,location,condition, prodCategory
    } = req.body;
    const file = req.file; 
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const userId = req.user.userID || req.user._id; // Adjust as per your auth middleware

    // 1. Create new Furniture product
    const newProduct = await Furniture.create({
      title,
      imgUrl : cloudResponse.secure_url,
      description,
      sellingPrice,
      latitude,
      longitude,
      modelYear,
      phoneNumber,
      condition,
      location,
			prodCategory,
      category: 'Furniture',
      createdBy: userId
    });

    // 2. Add product to user's adsPosted array
    await User.findByIdAndUpdate(userId, {
      $push: {
        adsPosted: {
          productId: newProduct._id,
          category: 'Furniture'
        }
      }
    });

    // 3. Respond once
    res.status(201).json({
      message: 'Furniture posted and added to adsPosted',
      Furniture: newProduct,
      prodId: newProduct._id.toString()
    });

  } catch (error) {
    console.error("Add Furniture Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateFurnitures = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      soldOut,
      title,
      description,
      sellingPrice,
      modelYear,
      condition,
      phoneNumber,
      location,
      category
    } = req.body;

    const updatedData = await Furniture.findByIdAndUpdate(
      id,
      {
        soldOut,
        title,
        description,
        modelYear,
        prodCategory: category,
        sellingPrice,
        condition,
        location,
        phoneNumber
      },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Furniture item not found' });
    }

    return res.status(200).json({
      message: 'Furniture item updated successfully',
      updatedData
    });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllFurnitures = async (req,res) => {
  try { 
      const Furnitures = await Furniture.find()
      if (!Furnitures){
        res.status(201).json({msg: "no Furnitures yet Posted!"})
      }
      return res.status(200).json({msg: Furnitures, res: "all Furnitures fetched successfully"})
  } catch (error) {
    console.error("error ", error)
  }
}

const getFurnitureById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const data = await Furniture.findById(id).populate({
      path: 'createdBy'
    })

    if (!data) {
      return res.status(404).json({ message: "Furniture not found" });
    }

    res.status(200).json({
      msg: data,
      res: "Data for this ID has been sent successfully",
      userData: user
    });
  } catch (error) {
    console.error("Get Furniture Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteFurnitureById = async (req,res) => {
  const id = req.params.id
  const data = await Furniture.findByIdAndDelete(id)
  if (data){
    res.status(201).json({msg:" deleted successfully", data : id})
  }
}

module.exports = {addFurniture,getFurnitureById , getAllFurnitures, deleteFurnitureById, updateFurnitures}


