const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
const UserModel=require('./model/userModel.js')


dotenv.config();
const app=express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("DB Connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running at ${PORT}`);

            // Set a timeout to close the server after 10 seconds (10000 ms)
  setTimeout(() => {
    console.log('Shutting down the server...');
    process.exit(); // This will terminate the server
  }, 3000); // 10 seconds delay before shutting down
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });
    app.post("/signup",async(req,res)=>{
        try{
            const {name,email,password}=req.body;
            console.log(name+""+email+" "+password)
            const existingUser=await userModel.findOne({email});
            console.log(existingUser);
            if(existingUser){
                return res.status(400).json({error:"Email already exist"});
            }
            const hashedPassword=await bcrypt.hash(password,10);
            const newUser=new UserModel({name,email,password:hashedPassword});
            const savedUser=await newUser.save();
            res.status(201).json(savedUser);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    });
