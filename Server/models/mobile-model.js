const mongoose = require('mongoose');


const mobileSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	imgUrl : {
		type: String,
		required: true
	},
	condition:{
		type:String,
		required: true
	},
	longitude: {
		type: String,
		default: "20.5937"
	},
	latitude: {
		type:String,
		default: "78.9629",
	},
	description: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true
	},
	modelName: {
		type: String,
		required: true
	},
	soldOut: {
		type: Boolean,
		default: false
	},
	sellingPrice: {
		type: Number,
		required: true
	},
	modelYear: {
		type:  Number,
		required: true
	},
	location: {
		type: String,
		required: true
	}, 
	phoneNumber: {
		type: Number,
		required: true
	},
	category: {
		type: String
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
},{timestamps: true})

const mobile = mongoose.model("mobile", mobileSchema)


module.exports = mobile