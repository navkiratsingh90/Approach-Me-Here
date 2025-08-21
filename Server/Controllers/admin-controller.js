const express = require('express')
const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const Car = require('../models/car-model')
const Bike = require('../models/bike-model');
const Mobile = require('../models/mobile-model');
const Furniture = require('../models/furniture-model');
const Electronics = require('../models/electronic-model');
const Others = require('../models/other-model');

const getAllUsers = async (req,res) => {
  try {
			// if (!req.isAdmin){
			// 	return res.status(401).json({msg : "you are not admin"})
			// }
      const users = await User.find()
      if (users){
        return res.status(200).json({msg: users, isAdmin : req.isAdmin})
      }
  } catch (error) {
      console.error(error);
  }
}
const getInfo = async (req,res) => {
	try {
			const users = await User.countDocuments()
			// const cars = await Car.countDocuments()
			// const bikes = await Bike.countDocuments()
			// const electronics = await Electronics.countDocuments()
			// const furnitures = await Furniture.countDocuments()
			// const mobiles = await Mobile.countDocuments()
			// const others = await Others.countDocuments()
			const categories = [
				{ name: 'cars', model: Car },
				{ name: 'bikes', model: Bike },
				{ name: 'electronics', model: Electronics },
				{ name: 'furnitures', model: Furniture },
				{ name: 'mobiles', model: Mobile },
				{ name: 'others', model: Others }
			];
			
			const stats = {};
			
			await Promise.all(
				categories.map(async ({ name, model }) => {
					const [total, sold] = await Promise.all([
						model.countDocuments(),
						model.countDocuments({ soldOut: true }) // Assuming 'sold' boolean field exists
					]);
					stats[name] = { total, sold };
				})
			);
			
			// Result:
			// stats = {
			//   cars: { total: 25, sold: 10 },
			//   bikes: { total: 18, sold: 5 },
			//   ...
			// }
			// const totalProducts = cars + bikes + electronics + furnitures + mobiles + others
			res.status(200).json({users,stats})
	}
			catch (error){
				console.error("error", error);
	}
}
const getAllProducts = async (req,res) => {
	try {
		// if (!req.isAdmin){
		// 	return res.status(401).json({msg : "you are not admin"})
		// }
			const cars = await Car.find().populate({
				path: 'createdBy'
			})
			const bikes = await Bike.find().populate({
				path: 'createdBy'
			})
			const electronics = await Electronics.find().populate({
				path: 'createdBy'
			})
			const furnitures = await Furniture.find().populate({
				path: 'createdBy'
			})
			const mobiles = await Mobile.find().populate({
				path: 'createdBy'
			})
			const others = await Others.find().populate({
				path: 'createdBy'
			})
			if (!cars || !bikes || !electronics || !furnitures || !mobiles || !others){
				return res.status(400).json({msg: "data unavailable for car/bike/electronics/furniture/mobile/other"})
			}
			const models = [cars,bikes,electronics,furnitures,mobiles,others]
			const allAds = []
			// const {title,description,category,_id,sellingPrice,createdAt,createdBy} = cars
			for (let i=0;i<models.length;i++){
				allAds.push(models[i])
			}

			const flatArray = allAds.flat()
			return res.status(200).json({msg:flatArray, cars,mobiles,electronics,furnitures,others,bikes})
	} catch (error) {
			console.error(error);
	}
}
const getAllQuantities = async (req,res) => {
	try {
		// if (!req.isAdmin){
		// 	return res.status(401).json({msg : "you are not admin"})
		// }
			const cars = await Car.find().select({ soldOut: 1, createdAt: 1 })
			const bikes = await Bike.find().select({ soldOut: 1, createdAt: 1 })
			const electronics = await Electronics.find().select({ soldOut: 1, createdAt: 1 })
			const furnitures = await Furniture.find().select({ soldOut: 1, createdAt: 1 })
			const mobiles = await Mobile.find().select({ soldOut: 1, createdAt: 1 })
			const others = await Others.find().select({ soldOut: 1, createdAt: 1 })
			const quant = await User.countDocuments({isVerified : true})
			if (!cars || !bikes || !electronics || !furnitures || !mobiles || !others){
				return res.status(400).json({msg: "data unavailable for car/bike/electronics/furniture/others/mobiles"})
			}
			const models = [cars,bikes,electronics,furnitures, mobiles, others]
			const allAds = []
			// const {title,description,category,_id,sellingPrice,createdAt,createdBy} = cars
			for (let i=0;i<models.length;i++){
				allAds.push(models[i])
			}
			const flatArray = allAds.flat()
			// const sorted = flatArray.sort({createdAt: -1})
			return res.status(200).json({msg: flatArray, cars,mobiles,electronics,furnitures,others,bikes, quant})
	} catch (error) {
			console.error(error);
	}
}

const deleteUser = async (req,res) => {
  try {
		// if (!req.isAdmin){
		// 	return res.status(401).json({msg : "you are not admin"})
		// }
      const id = req.params.id
      const users = await User.findByIdAndDelete(id)
      if (users){
        return res.status(200).json({msg:" user deleted successfully" })
      }
  } catch (error) {
      console.error(error);
  }
}



module.exports = { getInfo,getAllUsers, deleteUser, getAllProducts, getAllQuantities}