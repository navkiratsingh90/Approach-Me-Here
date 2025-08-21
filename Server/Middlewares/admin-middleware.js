const User = require('../models/user-model')
const jwt = require('jsonwebtoken')

const adminMiddleware = async (req,res,next) => {
	const token = req.cookies.token
	if (!token){
		return res.status(400).json({msg: "token not recieved"})
	}
	// const jwtToken = token.slice(7,token.length)
	try {
		const Verified = jwt.verify(token,process.env.JWT_TOKEN)
		// console.log(Verified)
		const user = await User.findById(Verified.userID).select('-password');
		if (!user) return res.status(404).json({ message: "User not found" });
		
		req.user = user
		req.isAdmin = user.isAdmin
		// console.log(req.isAdmin);

	} catch (error) {
		console.error("error ", error);
	}
	// console.log(jwtToken);
	next()
}

module.exports = {adminMiddleware}