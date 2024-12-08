const { configDotenv } = require("dotenv");
const Subs=require("../models/Subs");
configDotenv();

const SUB=async (req,res)=>{
    try {
        const {letter}=req.body;
        if(!letter){
            return res.status(400).json({ "message": "Email Not Found" });
        }
        const resp = await Subs.findOne({ email: letter });
        if(resp){
            return res.status(400).json({ "message": "Email Already In Use!" });
        }
        const newletter=new Subs({
            email:letter
        });
        await newletter.save();
        return res.status(200).json({ "message": "Email Registered Successfully!" });
    } catch (error) {
        console.error("ERROR:", error.message);
        return res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
}
module.exports=SUB;