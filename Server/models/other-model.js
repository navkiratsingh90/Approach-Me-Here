const mongoose = require('mongoose');


const otherSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	imgUrl : {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
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
	soldOut: {
		type: Boolean,
		default: false
	},
	category: {
		type: String
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
},{timestamps: true})

const other = mongoose.model("other", otherSchema)


module.exports = other