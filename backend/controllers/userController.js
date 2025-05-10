import validator from "validator";   
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

//token creat function by passing user id as parameter
//user id will automatically generate in database 
const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req,res) =>{

    try
    {
        //take user input
        const {email,password}=req.body;
        //checking the user already exits or not in database by email
        const user=await userModel.findOne({email});
        if(!user)
        {
            return res.json({success:false,message:"User does not exists"})
        }

        //checking the password is correct or not by comparing the password with hashed password
        const isMatch = await bcrypt.compare(password,user.password);

        //if password is correct then generate token
        if(isMatch){
            //we will generate token for each id.
            //id generate default in database
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else
        {
            res.json({success:false, message:'Invaild Password'})
        }

    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


//Route for user register
const registerUser = async(req,res) =>{
    try{

        //take user input
        const {name,email,password}=req.body;

        //checking the user already exits or not
        const exists = await userModel.findOne({email});
        if(exists)
        {
            return res.json({success:false,message:"User already exists"})
        }

        //validating email and password format
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8)
        {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hasing user password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedpassword
        })

        const user = await newUser.save()
        //we will generate token for each id.
        //id generate default in database
        const token = createToken(user._id)

        res.json({success:true,token})

    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:error.message})
    }

    // res.json({msg:"Register User"})

}


//Route for admin login
const adminLogin = async(req,res)=>{
    try
    {
        const {email,password} = req.body
    
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        //generate a token using JWT_SECRET
        const token = jwt.sign(email+password,process.env.JWT_SECRET);
        res.json({success:true,token})
    }
    else
    {
        res.json({success:false,message:"Invaild credentials"})
    }
    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {loginUser , registerUser , adminLogin}
