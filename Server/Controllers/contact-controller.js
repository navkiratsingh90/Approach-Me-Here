const express = require('express')
const Contact = require('../models/contact-model')
const User = require('../models/user-model')
const transporter = require('../Utils/nodemailer')

const sendMessage = async (req,res) => {
	try {
			const {username, email, message} = req.body
			if (!username || !email || !message){
				return res.status(400).json({msg : "something is missing"})
			}
			const user = await User.findOne({email})
			if (!user){
				return res.status(400).json({msg : "you are not registered with us"})
			}
			if (!user.isVerified){
				return res.status(400).json({msg: "verify yourself first"})
			}
			const mailOptions = {
        from : process.env.SENDERS_EMAIL,
        to : process.env.SENDERS_EMAIL,
        subject : "User Query",
				 html : `
				<div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1.5rem',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  border: '1px solid #ccc',
  width: 'fit-content'
}}>
  <h3 style={{ margin: 0 }}>👤 Username: ${username}</h3>
  <h3 style={{ margin: 0 }}>📧 Email: ${email}</h3>
  <h3 style={{ margin: 0 }}>💬 Message: ${message}</h3>
</div>

			`
			

      }
      await transporter.sendMail(mailOptions)
      return res.status(200).json({msg : "message sended successfully!"})
	} catch (error) {
			console.error("error", error);
	}
}

module.exports = {sendMessage}