const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const signUp = async(req,res)=>{
    try {
        const {name , userName , email , password }= req.body;
        if(!name || !userName || !email ||!password){
            return res.status(404).json({
                success:false,
                message:"Somthing missing..."
            })
        } 

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"You have already account..."
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        await User.create({
            name,
            userName,
            email,
            password:hashPassword
        })

        return res.status(201).json({
            success:true,
            message:"Account created succesfully..."
        })
        
    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
        
    }
}

const signIn = async(req,res)=>{
    try {
        
        
    } catch (error) {
        console.log(error)
        return  res.status(404).json({
            message:error
        })
    }
} 





module.exports = {
    signUp
}