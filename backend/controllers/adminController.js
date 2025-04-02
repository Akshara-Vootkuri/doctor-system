// import validator from 'validator';
// import bcrypt from 'bcrypt'
// import {v2 as cloudinary} from 'cloudinary';
// import doctorModel from '../models/doctorModel';
// const addDoctor = async (req, res) => { // ✅ Use export
//     try {
//         const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
//         const imageFile = req.file;
//        if(!name||!email||!password||!speciality||!degree||!experience||!about||!fees||!address){
//         return res.json({success:false,message:"Missing details"})
//        }
//     //    validating email format
//     if(!validator.isEmail(email)){
//         return res.json({success:false,message:"please enter valid email"})
//     }
//     //validating strong password
//     if(password.length<8){
//         return res.json({success:false,message:"please enter a strong password"})
//     }
//     if (!imageFile) {
//         return res.json({ success: false, message: "Image file is required" });
//     }
    
//     // hashing doctor password
//     const salt= await bcrypt.genSalt(10)
//     const hashedPassword= await bcrypt.hash(password,salt)
//     // upload image to cloudinary
//     const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
//     const imageUrl=imageUpload.secure_url

//     const doctorData={
//         name,
//         email,
//         image:imageUrl,
//         password:hashedPassword,
//         speciality,
//         degree,
//         experience,
//         about,
//         fees,
//         address:JSON.parse(address),
//         date:Date.now()

//     }
//     const newDoctor=new doctorModel(doctorData)
//     await newDoctor.save()

//     res.json({success:true,message:"Doctor Added"})
//     } catch (error) {
//         console.error(error);
//         res.json({succes:false,message:error.message})
//     }
// };

// export {addDoctor}

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken';

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // 🛑 Check for missing fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing details" });
        }

        // 🛑 Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // 🛑 Validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // 🛑 Ensure file is uploaded
        if (!imageFile) {
            return res.json({ success: false, message: "Image file is required" });
        }

        // 🛑 Validate and parse address
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (error) {
            return res.json({ success: false, message: "Invalid address format" });
        }

        // 🔒 Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ☁️ Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // 📌 Create doctor object
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            date: Date.now(),
        };

        // 📝 Save to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        return res.json({ success: true, message: "Doctor added successfully!" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};
// Api for admin login
const loginAdmin= async(req,res)=>{
    try{
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//Api to get all doctors list
const allDoctors= async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export { addDoctor,loginAdmin,allDoctors };
