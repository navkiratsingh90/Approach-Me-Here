const express = require('express')
// const { model } = require('mongoose')
const Router = express.Router()
const User = require('../models/user-model')
const { sendMessage} = require('../Controllers/contact-controller')
const {  adminMiddleware } = require('../Middlewares/admin-middleware')


Router.post('/send', sendMessage)


module.exports = Router