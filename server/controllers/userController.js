import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const registration = async (req,res) => {
    try {

        const {name, email, password} = req.body;

        const checkIfUserExists = await User.findOne({email});

        console.log(checkIfUserExists)

        if(checkIfUserExists) return res.status(409).json({result: "User already exists"});

        const data = await User.create({name,email,password});
        
        res.status(200).json({result: data});
    } catch (error) {
        res.status(500).json({error});
        console.log(`Error... : ${error}`);
    }
}

export const login = async (req,res) => {
    try {

        const {email, password} = req.body;

        const checkIfUserExists = await User.findOne({email});

        if(!checkIfUserExists)  return res.status(404).json({result: "User not exists"});

        if(checkIfUserExists.password != password) return res.status(404).json({result: "Password not matches"});

        const token = jwt.sign({email : checkIfUserExists.email, id: checkIfUserExists._id}, process.env.SECRET_KEY);

        res.status(200).json({result: checkIfUserExists, token});
    } catch (error) {
        res.status(500).json({error});
        console.log(`Error... : ${error}`);
    }
}