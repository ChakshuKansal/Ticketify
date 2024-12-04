const { configDotenv } = require("dotenv");
const Subs=require("../models/Subs");
configDotenv();

const SUB=async (req,res)=>{
    try {
        const {letter}=req.body;
        if(!letter){
            return res.status(400).json({"message":"Email Not Found"});
        }
        const resp= await Subs.findOne({letter});
        if(resp){
            return res.status(400).json({"message":"Email Already In Use!"});
        }
        const newletter=new Subs({
            email:letter
        });
        newletter.save();
        return res.status(200).json({"message":"Email Registered Success!"});
    } catch (error) {
        console.log("ERROR: ",message);
    }
    return res.status(200).json({"message":"HEllo"});
}
module.exports=SUB;