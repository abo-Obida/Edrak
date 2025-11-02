import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRouter from "./Routers/StudentRouter.js";

dotenv.config();

const app = express();

// ===== Middleware =====
const corsOptions = {
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());

// ===== Routes =====
app.use('/Students/api', studentRouter);

// ===== Error Handling =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ===== Database Connection =====
mongoose.set('strictQuery', false);

const connectDB = async () => {
  if (!process.env.MONGO_DB) {
    throw new Error('MONGO_DB environment variable is missing');
  }

  try {
    await mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// ===== Start Server =====
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB(); 
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
