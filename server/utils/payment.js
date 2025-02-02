/* 
    CHAPA API PAYMENT INTEGRATION TEST
    Required: Chapa secret key || GET THE KEY BY REGISTERING @ https://dashboard.chapa.co/register
*/


const orderModel = require('../models/order.model');
const userModel=require('../models/user.model')
const axios=require('axios')

const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize"



exports.pay= async (req, res) => {
        
       
       
    const newOrder = new orderModel(req.body);
    const savedOrder = await newOrder.save();
    const orderID=savedOrder._id.toString()
    const userID=req.body.userId
        console.log(orderID)
        
       
        const CALLBACK_URL = `${process.env.MAIN_URL}/order/verify-payment/${orderID}/`
        const RETURN_URL = `${process.env.RETURN_URL}`
console.log(CALLBACK_URL)
    
        const TEXT_REF = "tx-myecommerce12345-" + Date.now()
        const {totalAmount,email,first_name,last_name}=req.body
        // form data
        const data = {
            amount:totalAmount, 
            currency: "ETB",
            email: email,
            first_name: first_name,
            last_name: last_name,
            tx_ref: TEXT_REF,
            callback_url: CALLBACK_URL + TEXT_REF,
            return_url: RETURN_URL,
           
        }

        try{
        const response=await axios.post("https://api.chapa.co/v1/transaction/initialize", data, {
    headers: {
        Authorization: `Bearer ${process.env.CHAPA_AUTH}`
    },
    timeout: 10000 // increase timeout to 10 seconds
})
        const responsed=response.data
        res.status(200).json(responsed)
        }catch(err) {
        if (err.response && err.response.data) {
            const { message, status, data } = err.response.data;
            console.error('Chapa API Error:', message, status, data);
            // Provide a user-friendly error message or handle the error accordingly
        } else {
            console.error('Network Error:', err.message);
        }
    };
}

// verification endpoint
exports.verifyPayment= async (req, res) => {
        const orderID=req.params.orderID
        const userID=req.user._id.toString()
        //verify the transaction 
        await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id,{
            headers: {
                Authorization:`Bearer ${process.env.CHAPA_AUTH}`
            }
        } )
            .then(async (response) => {
                const responsed=response.data
                
                const order=await orderModel.findOneAndUpdate({_id:orderID},{paymentStatus:'Completed'})
                const user=await userModel.findOne({_id:userID})
                user.spent+=order.totalAmount
                await user.save()
                
                res.status(200).json({
                    status:"success",
                    responsed
                })
            }) 
            .catch((err) => console.log("Payment can't be verified"))
}
exports.success=(req,res)=>{
    res.status(200).json({
        status:"Success"
    })
}
// app.get("/api/payment-success", async (req, res) => {
//     res.render("success")
// })


