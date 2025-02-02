import React, { useContext, useEffect, useState } from 'react';
import ShippingInfo from './shippingInfo';
import PaymentInfo from './paymentInfro';
import OrderReview from './orderReview';
import { AppContext } from '../../App';
import axios from 'axios';

const CheckoutPage = ({socket}) => {
  const {userID}=useContext(AppContext)
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [orderSummary,setOrderSummary] = useState({
    
  });
  const getItems = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/cart/get-from-cart/${userID}`);
      setOrderSummary(response.data.cart)
      console.log('Cart items fetched:', response.data);
    } catch (error) {
      console.log('Error fetching cart items:', error);
       
  };
}
  useEffect(() => {
    getItems();
    socket.on('get-cart', getItems);

    return () => {
      socket.off('get-cart', getItems); 
    };
  }, [socket, userID]);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    nextStep();
  };

  const handlePaymentSubmit = (data) => {
    
    setPaymentData(data);
    nextStep();
  };
  const handleSubmit=async ()=>{
    console.log(shippingData)
    // console.log(orderSummary)
    shippingData.total=orderSummary.total
    shippingData.items=orderSummary.items

    try{
      const response=await axios.post(`${process.env.REACT_APP_URL}/order/pay`,{
        firstName:shippingData.firstName,
        lastName:shippingData.lastName,
        phoneNumber:shippingData.phoneNumber,
        email:shippingData.email,
        userId:userID,
        items:orderSummary.items,
        totalAmount:orderSummary.total,
        shippingAddress:shippingData.address
      })
      window.open(response.data.data.checkout_url, '_blank');
      console.log(response.data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto pt-16 p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="space-y-8">
        {step === 1 && (
          <ShippingInfo
            onSubmit={handleShippingSubmit}
            initialData={shippingData}
          />
        )}
        {step === 2 && (
          <OrderReview
            orderSummary={orderSummary}
            shippingData={shippingData}
            paymentData={paymentData}
            onBack={prevStep}
            onConfirm={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
