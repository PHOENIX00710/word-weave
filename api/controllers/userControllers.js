import express from 'express';
import { userModel } from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { errorHandler } from '../utils/error.utils.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    console.log(username, email, password);

    if (!password || !username || !email || email === '' || password === '' || username === '') {
        // Make sure that we return from here else bcrypt will throw an error for a lack of data/salt to encrypt confusing the final error.
        return (
            next(errorHandler(401,'Error in entered data'))
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