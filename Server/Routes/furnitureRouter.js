const express = require('express')
// const { model } = require('mongoose')
const furnitureController = require('../Controllers/furniture-controller')
const Router = express.Router()

const  authMiddleware  = require('../Middlewares/auth-middleware')
const { singleUpload } = require('../Middlewares/multer-middleware')

Router.post('/add', authMiddleware.authMiddleware ,singleUpload, furnitureController.addFurniture )

Router.put('/update/:id', authMiddleware.authMiddleware ,furnitureController.updateFurnitures )

Router.get('/get/:id', authMiddleware.authMiddleware , furnitureController.getFurnitureById)
Router.delete('/delete/:id', authMiddleware.authMiddleware,furnitureController.deleteFurnitureById)
Router.get('/get',authMiddleware.authMiddleware , furnitureController.getAllFurnitures)

module.exports = Router