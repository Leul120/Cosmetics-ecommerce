const express=require('express')
const app=express()
const cors=require('cors')
const http = require('http');
const cookieParser = require('cookie-parser');
const connectDB=require('./db/connectDB')
const entryRouter=require('./routes/productEntry.route')
const productRouter=require('./routes/getProduct.route')
const userRouter=require('./routes/user.route')
const cartRouter=require('./routes/cart.route')
const editRouter=require('./routes/editProduct.route')
const reviewRouter=require('./routes/review.route')
const socketManager=require('./utils/socketManager')
const orderRouter=require('./routes/order.route')
require('dotenv').config()
app.use(cookieParser());
// const socket=require('socket.io')(9000,{
//   cors:{
//     origin:'*'
//   }
// })
// socket.on("connection",socket=>{
//     console.log(socket.id)
// })

socketManager.initialize(9000);

app.use(express.json())


app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true,  
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization','Accept'],
//   credentials: true,
}));




app.use('/entry',entryRouter)
app.use('/',productRouter)
app.use('/user',userRouter)
app.use('/cart',cartRouter)
app.use('/edit',editRouter)
app.use('/order',orderRouter)
app.use('/review',reviewRouter)
const hostname='0.0.0.0'
const port = process.env.PORT || 8000;
const start=async ()=>{
    try{ 
        await connectDB(process.env.MONGO_URI)
        app.listen(port ,hostname,
            console.log("running on port: "+port )
        )

    }catch (error){
        console.log(error)
    }
}


// ... other server setup code ...
// module.exports={socket}

// initializeSocket();

start()


