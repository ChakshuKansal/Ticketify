const { configDotenv } = require("dotenv");
const bcrypt=require("bcrypt");
const UserSchema = require("../models/Users");
const Booking=require("../models/Booking")
const User=require("../models/Users")
const jwt=require("jsonwebtoken");
configDotenv();


const SignUp=async(req,res)=>{
    try {
        const{email,password,fullname}=req.body;
    if(!email || !password || !fullname){
        return res.status(403).json({"message":"All Fields Mandatory"});
    }
    const user=await UserSchema.findOne({email});
    if(user){
        return res.status(409).json({"message":"User Already Registered"});
    }
    const hashpass= await bcrypt.hash(password,10);
    const newUser=new UserSchema({
        email,password:hashpass,fullname,
    });
    await newUser.save();
    console.log("Success!");
    return res.status(201).json({"message": "User Register Success"}); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({"message":"Something went wrong"});
    }
}

const Login= async (req,res)=>{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(404).json({"message":"All fields Mandatory"});
        }
        const user=await UserSchema.findOne({email});
        if(!user){
            return res.status(404).json({"message":"Please Register First"});
        }
        const validpass=await bcrypt.compare(password,user.password);
        if(!validpass){
            return res.status(403).json({"message":"Wrong Password!"});
        }
        const Token=jwt.sign(
            {user:user.id,email:user.email},
            process.env.JWT_Secret_key,
            {expiresIn:"1hr"},
        )
        return res.status(200).json({
            "message":"User Logged In",
            token:Token,
        });
    }
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret_key);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

const UserDetails=async (req, res) => {
    try {
      const user = await User.findById(req.user.user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const bookings = await Booking.find({ userId: req.user.user});
      res.status(200).json({ user, bookings });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports={SignUp,Login,authenticateToken,UserDetails};