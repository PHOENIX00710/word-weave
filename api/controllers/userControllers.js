import { userModel, userSchema } from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { errorHandler } from '../utils/error.utils.js';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

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
    const token = jwt.sign(currUser._id.toString(), process.env.JWT_KEY)
    const sendInfo = { ...currUser._doc }
    delete sendInfo.password; // To delete password from the sending info
    sendInfo.token = token;
    res
        .status(201)
        .cookie("user_token", token, {
            httpOnly: true,

        })
        .json({
            message: "Signed In Successfully",
            sendInfo,
        })

}

export const googleSignup = async (req, res, next) => {
    const { email, name, image } = req.body;
    if (!image || !name || !email || email === '' || name === '' || image === '') {
        return (
            next(errorHandler(401, 'Error in entered data'))
        )
    }
    const username = Math.random(1).toString(36).slice(-8) + '-' + name.toString()
    const password = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(password, 12)

    const userExists = await userModel.findOne({ email });
    if (userExists) {
        const token = jwt.sign(userExists._id.toString(), process.env.JWT_KEY)
        const sendInfo = { ...userExists._doc }
        delete sendInfo.password; // To delete password from the sending info
        sendInfo.token = token;
        res
            .status(201)
            .cookie("user_token", token, {
                httpOnly: true,
            })
            .json({
                message: "Signed In Successfully",
                sendInfo,
            })
        return
    }

    try {
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            photoURL: image,
        })
        await newUser.save()
        const token = jwt.sign(newUser._id.toString(), process.env.JWT_KEY)
        const sendInfo = { ...newUser._doc }
        delete sendInfo.password; // To delete password from the sending info
        sendInfo.token = token;
        res
            .status(201)
            .cookie("user_token", token, {
                httpOnly: true,

            })
            .json({
                message: "Signed In Successfully",
                sendInfo,
            })
    }
    catch (e) {
        return next(errorHandler(402, "Error in Sign Up!!"))
    }

}

export const updateUserDetails = async (req, res, next) => {
    const token = req.cookies.user_token
    let user_id = jwt.verify(token, process.env.JWT_KEY)

    // To Convert user_ID from string to mongo id format
    let uid = new mongoose.Types.ObjectId(user_id)

    const currUser = await userModel.findById(uid)
    if (!currUser)
        return next(errorHandler(403, "Unauthorized User"))

    const { image, username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await currUser.updateOne({
        photoURL: image,
        username: username,
        password: hashedPassword
    })
    await currUser.save()
    res.json({
        success: "true",
        message: "User Details Updated"
    })
}

export const deleteUser = async (req, res, next) => {
    const token = req.cookies.user_token
    let user_id = jwt.verify(token, process.env.JWT_KEY)
    // To Convert user_ID from string to mongo id format
    let uid = new mongoose.Types.ObjectId(user_id)

    const currUser = await userModel.findById(uid)
    if (!currUser)
        return next(errorHandler(403, "Unauthorized User"))
    try {
        await currUser.deleteOne()
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: "Account Deleted Successfully!"
                }
            )
    }
    catch (err) {
        return next(errorHandler(500, "Server Error"));
    }
}

export const signOut = (req, res, next) => {
    res
        .status(200)
        .cookie('user_token', '')
        .json({
            success: true,
            message: "Signed Out Successfully"
        })
}