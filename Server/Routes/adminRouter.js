const express = require('express')
// const { model } = require('mongoose')
const Router = express.Router()
const User = require('../models/user-model')
const { getAllUsers, deleteUser, getAllProducts, getAllQuantities, getInfo} = require('../Controllers/admin-controller')
const {  adminMiddleware } = require('../Middlewares/admin-middleware')


Router.get('/users/get' , getAllUsers)
Router.get('/info/get' , getInfo)
Router.get('/ads/quantities/get' , getAllQuantities)
Router.get('/ads/get' , getAllProducts)
Router.delete('/users/delete/:id' , deleteUser)


module.exports = Router