const express = require('express')
// const { model } = require('mongoose')
const Router = express.Router()
const bikeController = require('../Controllers/bike-controller')
const  authMiddleware  = require('../Middlewares/auth-middleware')
const { singleUpload } = require('../Middlewares/multer-middleware')

Router.post('/add', authMiddleware.authMiddleware ,singleUpload, bikeController.addBike)

Router.get('/get', authMiddleware.authMiddleware ,bikeController.getAllBikes)

Router.get('/get/:id', authMiddleware.authMiddleware ,bikeController.getBikeById)

Router.put('/update/:id', authMiddleware.authMiddleware ,bikeController.updatBikes )


Router.delete('/delete/:id', authMiddleware.authMiddleware ,bikeController.deleteBikeById)

module.exports = Router