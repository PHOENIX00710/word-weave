import express from 'express';
import { userModel } from '../models/userModel.js';

export const signup = async (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email, password);

    if (!password || !username || !email || email === '' || password === '' || username === '') {
        res.status(401).json({
            message: "Issue in the entered data"
        })
    }

    const newUser = new userModel({
        username,
        email,
        password
    })

    try {
        await newUser.save()
        res.json({
            message:"User added successfully"
        })
    }
    catch (error) {
        res.send({
            error: `${error}`
        })
    }

}