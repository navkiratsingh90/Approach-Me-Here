const express = require('express')
// const { model } = require('mongoose')
const Router = express.Router()
const carController = require('../Controllers/car-controller')
const  authMiddleware  = require('../Middlewares/auth-middleware')
const { singleUpload } = require('../Middlewares/multer-middleware')

Router.post('/add', authMiddleware.authMiddleware , singleUpload , carController.addCar)

Router.get('/get', authMiddleware.authMiddleware ,carController.getAllCars)

Router.get('/get/:id', authMiddleware.authMiddleware ,carController.getCarById)

Router.delete('/delete/:id', authMiddleware.authMiddleware ,carController.deleteCarById)

Router.put('/update/:id', authMiddleware.authMiddleware,carController.updateCar)

module.exports = Router