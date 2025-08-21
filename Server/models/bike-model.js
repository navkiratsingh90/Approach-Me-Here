const mongoose = require('mongoose');


const bikeSchema = new mongoose.Schema({
  title: {
    type: String,
		minlength: 3,
    required: true,
  },
	imgUrl : {
		type: String,
		required: true
	},
  description: {
    type: String,
    required: true
  },
	soldOut: {
		type: Boolean,
		default: false
	},
  brand: {
    type: String,
    required: true,
  },
	sellingPrice: {
		type: Number,
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
	condition:{
		type:String,
		required: true
	},
	kilometersDriven: {
		type: Number,
		required: true,
	},
	modelYear: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true
	},
	modelName: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true
	},
	fuelType: {
		type: String,
		required: true
	},
	category: {
		type: String,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
},{ timestamps: true });


module.exports = mongoose.model('Bike', bikeSchema);
