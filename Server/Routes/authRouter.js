const express = require('express')
// const { model } = require('mongoose')
const Router = express.Router()
const User = require('../models/user-model')
const {Login, Register, getUserData, getUserId, handleItemsToWishlist, getAllWishlistItems, getAllUsers, deleteUser, checkAdmin, Logout,forgotPassword,verifyOtp,resetpassword, verifyUser, sendMailInterested} = require('../Controllers/auth-controller')
const {  authMiddleware } = require('../Middlewares/auth-middleware')
const { adminMiddleware } = require('../Middlewares/admin-middleware')

// Router.route('/').get((req,res) => {
// 	res.status(200).send("working on get home route")
// })

Router.post('/login' ,  Login)

Router.post('/register', Register)
Router.post('/logout', Logout)
Router.post('/forgot-password', forgotPassword)
Router.post('/otp-verify',  verifyOtp)
Router.post('/reset-password', resetpassword)
Router.post('/verify', verifyUser)
Router.post('/send-interest-email',authMiddleware,sendMailInterested)
Router.post('/wishlist/add', authMiddleware, handleItemsToWishlist)

Router.get('/users/get' , getAllUsers)
Router.get('/status' , adminMiddleware,checkAdmin)
Router.delete('/users/delete/:id' , deleteUser)
Router.get('/getId', authMiddleware,getUserId)

Router.get('/get', authMiddleware, getUserData)
Router.get('/wishlist/get', authMiddleware, getAllWishlistItems)



module.exports = Router