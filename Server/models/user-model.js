const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
    default: undefined,
  },  
  otpExpiryDate: {
    type : Number,
    default: undefined
  },
  adsPosted: 
  [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      category: {
        type: String,
        required: true,
        enum: ['Car', 'Bike', 'Mobile', 'Furniture', 'Electronics', 'Others']
      }
    }
  ]
  ,
  wishlist: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      category: {
        type: String,
        required: true,
        enum: ['Car', 'Bike', 'Mobile', 'Furniture', 'Electronics', 'Others']
      }
    }
  ]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashed = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

// JWT token generator method
userSchema.methods.generateToken = async function() {
  return jwt.sign(
    {
      userID: this._id.toString(),
      email: this.email,
      username: this.username
    },
    process.env.JWT_TOKEN,
    {
      expiresIn: '30d'
    }
  );
};

module.exports = mongoose.model('User', userSchema);
