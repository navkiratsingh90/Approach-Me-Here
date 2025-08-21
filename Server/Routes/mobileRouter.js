const express = require('express')
// const { model } = require('mongoose')
const mobileController = require('../Controllers/mobile-controller')
const Router = express.Router()

const  authMiddleware  = require('../Middlewares/auth-middleware')
const { singleUpload } = require('../Middlewares/multer-middleware')

Router.post('/add', authMiddleware.authMiddleware ,singleUpload,mobileController.addMobile )

Router.put('/update/:id', authMiddleware.authMiddleware , mobileController.updateMobiles )

Router.get('/get/:id', authMiddleware.authMiddleware , mobileController.getMobileById)
Router.delete('/delete/:id', authMiddleware.authMiddleware,mobileController.deleteMobileById)
Router.get('/get',authMiddleware.authMiddleware , mobileController.getAllMobiles)

module.exports = Router