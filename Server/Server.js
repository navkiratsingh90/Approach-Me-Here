
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const connectDb = require('./Utils/db.js');

// Initialize Express app
const app = express();
dotenv.config();

// // Resolve __dirname for ES modules compatibility
// const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true 
}));

// API Routes
const authRouter = require('./Routes/authRouter');
const carRouter = require('./Routes/carRouter');
const bikeRouter = require('./Routes/bikeRouter');
const mobileRouter = require('./Routes/mobileRouter');
const otherRouter = require('./Routes/otherRouter');
const adminRouter = require('./Routes/adminRouter');
const contactRouter = require('./Routes/contactRouter');
const furnitureRouter = require('./Routes/furnitureRouter');
const electronicRouter = require('./Routes/electronicRouter');

app.use('/api/auth', authRouter);
app.use('/api/car', carRouter);
app.use('/api/electronic', electronicRouter);
app.use('/api/furniture', furnitureRouter);
app.use('/api/bike', bikeRouter);
app.use('/api/mobile', mobileRouter);
app.use('/api/other', otherRouter);
app.use('/api/admin', adminRouter);
app.use('/api/contact', contactRouter);

// Serve React frontend (production)

app.use(express.static(path.join(__dirname, "/react-major/dist")));
app.get('/*splat', (_, res) => {
  res.sendFile(path.resolve(__dirname, "react-major", "dist", "index.html"));
});

// Start server after DB connection
connectDb()
  .then(() => {
    const PORT = process.env.PORT ;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('MongoDB connected');
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });
