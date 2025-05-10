import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000 // use port no 4000 if others are used

connectDB() //export database
connectCloudinary() 

//mmiddleware
app.use(express.json()) //whatever request is received will be passed througn json
app.use(cors()) //enable cors

//api endpoint
//import user router and product router
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

//api endpoints
app.get('/',(req,res)=>{
    res.send("API Working")
})

//start the express server
app.listen(port,()=> console.log('Server started on port : ' +port))