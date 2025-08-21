const express = require('express')
const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req,res,next) => {
	const token = req.cookies.token
	// console.log(token);
	if (!token){
		return res.status(400).json({msg: "token not recieved"})
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_TOKEN);
		if (!decoded){
			return res.status(404).json({ msg: "token not found" });
		}
    const user = await User.findById(decoded.userID) // exclude password
		// console.log(user);
    if (!user) return res.status(404).json({ msg: "User not found" });
		
			// console.log(Verified);
			req.user = decoded
			// req.token = token
			// req.userID = Verified.userID
	} catch (error) {
		console.error("error ", error);
	}
	// console.log(jwtToken);
	next()
}

module.exports = {authMiddleware}