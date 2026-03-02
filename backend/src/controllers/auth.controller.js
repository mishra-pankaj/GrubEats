const userModel = require("../models/user.models.js")
const foodPartnerModel = require("../models/foodPartner.models.js")
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

async function loginUser(req,res){
    const{email,password}= req.body

    const user = await userModel.findOne({
        email
    })
    if(!user){
        res.status(400).json({
            message: "Invalid Email or password!!"
        })

    const ispasswordValid = await bcrypt.compare(password, user.password);

    if(!ispasswordValid){
        return res.status(400).json({
            message:"Invalid Email or password!"
        })
    }
    }
    const token = jwt.sign({
        id: user._id,
    },process.env.jwt_secret)
    res.cookie("token",token)

    res.status(200).json({
        message: "User LogedIn sucessfully!",
        user: {
            _id : user._id,
            email:user.email,
            fullname: user.fullname
        }
    })
}

async function logout(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message: "User loggedOut!!"
    })
}


//foodPartner=>

async function registerFoodPartner(req,res) {
    const{name,email,password} = req.body

    const isUserAlreadyExist = await foodPartnerModell.findOne({
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

async function loginFoodPartner(req,res){
    const{email,password} = req.body

    const user = foodPartnerModel.findOne({
        email
    })
    if(!user){
        response.status(400).json({
            message:"Email or password is not valid! "
        })
    }
    const isvalidPassword = await bcrypt.compare(password,foodPartner.password)

    if(!isvalidPassword){
        response.status(400).json({
            message:"Invalid Email or Password!!"
        })
    }
    const token = jwt.sign({
        id: foodPartner._id,
    },process.env.jwt_secret)
    res.cookie("token",token)

    res.status(200).json({
        message: "User LogedIn sucessfully!",
        user: {
            _id : foodPartner._id,
            email:foodPartner.email,
            fullname: foodPartner.fullname
        }
    })

}
module.exports ={registerUser,loginUser,logout,registerFoodPartner,loginFoodPartner,logout}