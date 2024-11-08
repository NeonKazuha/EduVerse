// backend/index.js
import express from 'express';
import cors from 'cors';
import rootRouter from './routes/index.js';
import path from 'path';
import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 3002;
const currentDirectory = process.cwd();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(currentDirectory, 'public')));
//console.log(path.join(currentDirectory, 'public'));
// API routes
app.use("/api/v1", rootRouter);


//dbconnection
mongoose
  .connect("mongodb+srv://shivampatil222004:aKzbaayoVkjjMSk8@cluster0.0ca0aus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Spark", {
    autoIndex: true
  })
  .then(() => {
    app.listen(PORT)
    //console.log("connected",PORT);
  })
  .catch((err) => {
    //console.log("something went wrong")
    //console.log(err)
  })

  