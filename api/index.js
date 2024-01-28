import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import testRoute from './routes/test.js'

dotenv.config(); //To access environment variables 

await mongoose.connect(process.env.MongoURI)
.then((val)=>{
    console.log("Connected to MongoDb");
})
.catch((e)=>console.log("Could not connect to database"))

const app=express();

app.use("/api/v1",testRoute)
app.use(express.json()) // To recieve JSON format data from the routes

app.get("/",(req,res)=>{
    res.json({
        message:"Working!!"
    })
})

app.listen(3000,()=>{
    console.log("Server is listening at port 3000");
})

