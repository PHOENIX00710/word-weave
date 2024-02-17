import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import testRoute from './routes/test.js'
import userRoute from './routes/users.js'
import cors from 'cors'

dotenv.config(); //To access environment variables 

// Cors set-up
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

await mongoose.connect(process.env.MongoURI)
    .then((val) => {
        console.log("Connected to MongoDb");
    })
    .catch((e) => console.log("Could not connect to database"))

const app = express();
app.use(express.json()) // To recieve JSON format data from the routes
app.use(cors(corsOptions))

// Routes
app.use("/api/v1", testRoute)
app.use("/api/v1", userRoute)

// Middleware to handle errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errMessage = err.message || 'Interal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message: errMessage
    })
})

app.get("/", (req, res) => {
    res.json({
        message: "Working!!"
    })
})

app.listen(3000, () => {
    console.log("Server is listening at port 3000");
})

