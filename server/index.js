const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');

dotenv.config();

const PORT = 3000;
const app = express();

app.listen( PORT , ()=>{
    connectDB(),
    console.log("Server start on port : ",PORT )
})