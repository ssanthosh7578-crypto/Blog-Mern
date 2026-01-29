import bcrypt from 'bcryptjs';
import express from 'express';
import {Usermodel}  from './Schemamodel.js';
import dotenv from 'dotenv'
import { Transporter } from './Nodemailer.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';
import { Postmodel } from './Postmodel.js';
import { verification } from './Cookieverify.js';
const uploamiddleware=multer({ dest:'Uploads/'});
dotenv.config();
const router=express.Router();

router.post('/signup',async(req,res)=>{
    try {
        const {password,email,name}=req.body
    if (!password || !email || !name){
        return res.json({message:"fill the details",success:false})
    }
    const hash=await bcrypt.hash(password,10)
    const ok=new Usermodel({name,password:hash,email})
    await ok.save()
    await Transporter.sendMail({
        from:process.env.EMAIL_SENDER,
        to:email,
        subject:"Signup Successfull",
        html:`<h1>Welcome to our Blog Platform</h1>
        <p>Hi ${name}, your signup is successfull. Enjoy blogging!</p>`
    })
    res.json({message:'saved success',success:true})
    } catch (error) {
        res.json({error})
    }
})

router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await Usermodel.findOne({email})
        if(!user){
            return res.json({message:'no email found invalid email',success:false})
        }
        const compare=await bcrypt.compare(password,user.password)
        if(!compare){
            return res.json({message:"invalid password",success:false})
        }
        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.cookie('token',token,{
         httpOnly: true,
         sameSite: "lax"
    });
        res.json({message:"successfully logged",success:true})

    } catch (error) {
        res.json(error)
    }
})
router.post('/logout',async(req,res)=>{
        res.clearCookie('token');
        res.json({success:true,message:"logged out successfully"})
    
})
router.post("/post", uploamiddleware.single("file"), async (req, res) => {
  try {
     console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Fill all fields" });
    }

    let imagePath = null;
if (req.file) {
  const { originalname, path } = req.file;
  const ext = originalname.split(".").pop();
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  imagePath = newPath.replace(/\\/g, "/"); // 🔥 IMPORTANT
}


    const post = await Postmodel.create({
      title,
      content,
      image: imagePath,
    });

    return res.json({ success: true, post }); // 👈 IMPORTANT

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Postmodel.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});
router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Postmodel.findById(id);

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});


router.get("/me", verification, async (req, res) => {
  try {
    const user = await Usermodel.findById(req.userid).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});


export default router;