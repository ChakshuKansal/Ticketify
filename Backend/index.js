const express=require("express");
const app=express();
const cors=require('cors');
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const connectDb = require("./config/connectDb");
const UserSchema = require("./models/Users");
const { configDotenv } = require("dotenv");
const { SignUp, Login } = require("./controllers/AuthController");

configDotenv();
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({"message":"Hello"});
});


app.post("/SignUp", SignUp);

app.post("/Login",Login);

app.listen(process.env.PORT,()=>{
    console.log("running on http://localhost:5000");
});