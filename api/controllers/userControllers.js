import { userModel } from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { errorHandler } from '../utils/error.utils.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body

    if (!password || !username || !email || email === '' || password === '' || username === '') {
        // Make sure that we return from here else bcrypt will throw an error for a lack of data/salt to encrypt confusing the final error.
        return (
            next(errorHandler(401, 'Error in entered data'))
        )
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
    })

    try {
        await newUser.save()
        res.json({
            message: "User added successfully"
        })
    }
    catch (error) {
        next(error) // To automatically call the middleware we have made in the main 
        //    index.js file
    }

}

export const signinHelper = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password || email === "" || password === "") {
        return (
            next(errorHandler(422, "Email and Password are required"))
        )
    }
    const currUser = await userModel.findOne({ email })
    if (!currUser) {
        return (
            next(errorHandler(401, "Invalid Email or Password"))
        )
    }
    const validPass = await bcrypt.compare(password, currUser.password)
    if (!validPass) {
        return (
            next(errorHandler(401, "Invalid Email or Password"))
        )
    }
    const token=  jwt.sign(currUser._id.toString(),process.env.JWT_KEY)
    const sendInfo={...currUser._doc}
    delete sendInfo.password; // To delete password from the sending info
    sendInfo.token=token;
    res
        .status(201)
        .cookie("user_token", token, {
            httpOnly: true,
            
        })
        .json({
            message:"Signed In Successfully",
            sendInfo,
        })

}