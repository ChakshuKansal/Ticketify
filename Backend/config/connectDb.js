const mongoose=require('mongoose');

const connectDb= async()=>{
    try {
        const res =await mongoose.connect("mongodb+srv://admin:admin@cluster0.nmkhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        if(!res){
            return console.log("Error");
        }
        return console.log("DB Connected");
        
    } catch (error) {
        return console.log("Error Connecting DB");
    }
}

module.exports=connectDb;
