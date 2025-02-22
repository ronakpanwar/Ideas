const mongoose = require('mongoose');

const connectDB =async()=>{
  try {
    await mongoose.connect( process.env.MONGO_DB , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
    }).then(()=>{
        console.log("MongoDB is connected");
    }).catch((err)=>{
        console.log(err);
    })

  } catch (error) {
    console.log("MongoDB not connect : " , error);
  }
}


module.exports = connectDB;