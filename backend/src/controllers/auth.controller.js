const userModel = require("../models/user.models.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerUser(req,res){
    const{fullname,email,password}= req.body

    const isUserAlreadyExist = await userModel.findOne({
        email
    })
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User Already Exist"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        fullname,email,password:hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    },process.env.jwt_secret )
    res.cookie("token",token)

    res.status(201).json({
        message:"User Created Succesfully!!",
        user:{
            _id: user._id,
            email: user.email,
            fullname:user.fullname

        }
    })

}

module.exports ={registerUser}