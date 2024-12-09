const express=require("express");
const app=express();
const cors=require('cors');
const connectDb = require("./config/connectDb");
const { configDotenv } = require("dotenv");
const { SignUp, Login } = require("./controllers/AuthController");
const Subscriber = require("./controllers/SubController");
const Eventadder = require("./controllers/EventController");
const Events = require("./models/Events");


configDotenv();
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"*"}));

app.get("/",(req,res)=>{
    res.status(200).json({"message":"Hello"});
});

app.get("/SignUp",(req,res)=>{
    res.json({"message":"HELlO"});
});
app.get("/LogIn",(req,res)=>{
    res.json({"message":"HElLO"});
});
app.post("/letter", Subscriber);

app.post("/SignUp", SignUp);

app.post("/LogIn",Login);

app.post("/Event",Eventadder);

app.get("/Events",async (req,res)=>{

    try {
        const events=await Events.find();
        if(events.length==0){
           return res.status(404).json({"message":"No Events Till Now"});
        }
        console.log(events);
        res.status(200).json(events);
        return;

    } catch (error) {
        console.log(error);
        return res.status(500).json({"message":"Internal Server Error!"});
    }
    
});

app.listen(process.env.PORT,()=>{
    console.log("running on http://localhost:5000");
});