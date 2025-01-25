const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    problem:{
        type:String,
        required:true,
    },
    solution:{
        type:String,
        required:true,
    }, 
    vision:{
        type:String,
        required:true,
    },
    targetAudience:[{
        type:String,
        required:true,
    }],
    views:{
        type:Number,
    }
    
}, {timestamps:true});

const Post = mongoose.model('Post' , postSchema);

module.exports = Post;