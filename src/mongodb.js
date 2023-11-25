const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/registration")
.then(() => {
    console.log("Connection Successful");
})
.catch(()=>{
    console.log("Connection Failed");
})


const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("Credentials",LogInSchema);
module.exports=collection;
