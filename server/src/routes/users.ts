import express, {Request, Response} from "express";
import {check, validationResult} from "express-validator";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt  from 'bcryptjs';


// basic configuration
const router = express.Router();


// register route for the user 
router.post("/sign-up",
    [
        check("userName", "User name is required. ").isString(),
        check("password", "Password id required").isString(),
        check("firstName", "First name is required").isString(),
        check("lastName","Last name is required").isString(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()})
        }
        try {
            const username = await User.findOne({userName: req.body.userName});
            if(username){
                res.status(400).json({message: "Username already exists"});
            }

            const user = new User(req.body);
            await user.save();

            // create a jwt token to use for the user
            // const token = jwt.sign({userId: user.id},
            //     process.env.JWT_SECRET_KEY as string,
            //     {
            //         expiresIn: "1d",
            //     });
            // res.cookie("auth_token", token,{
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production",
            //     maxAge: 86400000,
            // });
            res.status(200).json({message: "user has been registered"});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "something went wrong"});
        }
})

// log in link for the user
router.post("/login", [
    check("userName", "UserName is required").isString(), 
    check("password", "Password with 6 or more characters").isLength({min: 6}),],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()})
        }

        const {userName, password} = req.body;

        try {
            const user = await User.findOne({userName})
            if(!user){
                return res.status(400).json({message: "Invalid Credentials"});
            }

            const isMatch = await bcrypt.compare(password, user.password)
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

            res.status(200).json({
                userId: user._id,
                userName: userName,
                firstName: user.firstName,
                lastName: user.lastName,
                message: 'Login successful'
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Something went wrong"})
        }
    }
);


export default router;