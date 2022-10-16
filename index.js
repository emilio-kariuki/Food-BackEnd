import express from 'express'

import cors from 'cors'
import morgan from 'morgan'
import pkg from 'body-parser';
import {connect} from './db.js'
import userRouter from './User/user.router.js'
const {urlencoded, json }= pkg
import { login,register } from './User/user.auth.js';

//the default express app
export const app = express();

//creating the default middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(json())
app.use(urlencoded({urlExtended: true}))

//middleware for the node js app

app.all('/', (req,res)=>{
    res.status(200).send("This is the main page")
})


//middleware for the apps routes

app.use('/user', userRouter)
app.post('/user/login', login )


export const start = async()=>{
    await connect()
    app.listen(5000, ()=>{
        console.log("Server is running in this port");
    })
}
