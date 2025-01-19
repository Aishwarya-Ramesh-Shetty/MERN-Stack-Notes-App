import express from "express"
import User from "../models/User.js"
import jwt from "jsonwebtoken"


const middleware = async(req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]

        if(!token){
            return res.status(401).json({success:false,message:"Unauthorized"})
        }

        const decoded = jwt.verify(token,"secretkeyofnoteapp123@#")

        if(!decoded){
            return res.status(401).json({success:false,message:"Wrong Token"})
        }

        const user = await User.findById({_id:decoded.id})

        if(!user){
            return res.status(404).json({success:false,message:"No user found"})
        }

        const newUser = {name: user.name,id:user._id}
        req.user = newUser
        next()

    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false,message:"kindly login"})
    }
}

export default middleware