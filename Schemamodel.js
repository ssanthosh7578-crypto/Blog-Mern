import mongoose from "mongoose";

const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})
export const Usermodel=mongoose.model('User',Userschema);