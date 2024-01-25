import jwt from 'jsonwebtoken';
import bcrypt  from 'bcryptjs';
import express, {Request, Response} from "express"
import {check, validationResult} from "express-validator";
import User, { UserType } from "../models/User";


// basic configuration
const router = express.Router();


// sign in link for the user
router.post("/sign-in", [
    check("userName", "User name must be provided").isString(),
    check("password", "password must be provided").isString()
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({message: errors.array()})
    }
    
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({userName});

        if(!user){
            return res.status(404).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d",
        })
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 8640000,
        })

        res.status(200).json({message: "Login successful"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
})