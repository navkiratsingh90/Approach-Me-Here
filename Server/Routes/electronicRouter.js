const express = require('express')
// const { model } = require('mongoose')
const electronicController = require('../Controllers/electronic-controller')
const Router = express.Router()

const  authMiddleware  = require('../Middlewares/auth-middleware')
const { singleUpload } = require('../Middlewares/multer-middleware')

Router.post('/add', authMiddleware.authMiddleware ,singleUpload,electronicController.addElectronic )

Router.put('/update/:id', authMiddleware.authMiddleware ,electronicController.updateElectronics )

Router.get('/get/:id', authMiddleware.authMiddleware , electronicController.getElectronicById)
Router.delete('/delete/:id', authMiddleware.authMiddleware,electronicController.deleteElectronicById)
Router.get('/get',authMiddleware.authMiddleware , electronicController.getAllElectronics)

module.exports = Router