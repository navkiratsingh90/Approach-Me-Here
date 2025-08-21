const express = require('express')
// const { model } = require('mongoose')
const otherController = require('../Controllers/other-controller')
const Router = express.Router()

const  authMiddleware  = require('../Middlewares/auth-middleware')
const  {singleUpload}  = require('../Middlewares/multer-middleware')

Router.post('/add', authMiddleware.authMiddleware ,singleUpload,  otherController.addOther )

Router.put('/update/:id', authMiddleware.authMiddleware ,otherController.updateOthers )

Router.get('/get/:id', authMiddleware.authMiddleware , otherController.getOtherById)

Router.get('/get',authMiddleware.authMiddleware , otherController.getAllOthers)

module.exports = Router