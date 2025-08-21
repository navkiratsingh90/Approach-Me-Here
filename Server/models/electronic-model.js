const mongoose = require('mongoose');


const electronicSchema = new mongoose.Schema({
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
	sellingPrice: {
		type: Number,
		required: true
	},
	modelYear: {
		type:  String,
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
	soldOut: {
		type: Boolean,
		default: false
	},
	category: {
		type: String
	},
	prodCategory: {
		type: String,
		required:true
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
},{timestamps: true})

const electronic = mongoose.model("electronic", electronicSchema)


module.exports = electronic