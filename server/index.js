const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const userRoute = require('./routes/user.routes')

dotenv.config();

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/user' , userRoute )

app.listen( PORT , ()=>{
    connectDB(),
    console.log("Server start on port : ",PORT )
})