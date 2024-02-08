import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import postRoutes from "./routes/posts";
import userRoutes from "./routes/users";

// basic configurations
const app = express();
dotenv.config();


// express configurations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// route connections
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);


// mongoose connection
const connectionString = process.env.MONGODB_CONNECTION_STRING as string;

mongoose.connect(connectionString);
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.listen(5000,() => { console.log("Server is running on port 5000")})