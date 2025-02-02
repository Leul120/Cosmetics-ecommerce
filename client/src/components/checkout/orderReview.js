// OrderReview.js
import React from 'react';

const OrderReview = ({ orderSummary, shippingData, paymentData, onBack, onConfirm }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Review Order</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Shipping Information</h3>
          <p className='capitalize'>{shippingData.firstName}{" "}{shippingData.lastName}</p>
          <p>{shippingData.phoneNumber}</p>
        </div>
       
        <div>
          <h3 className="font-semibold">Order Summary</h3>
          {orderSummary.items.map(item => (
            <p key={item.id}>{item.name} x{item.quantity} - ${item.price.toFixed(2)}</p>
          ))}
          <p>Discount: {orderSummary.discount}</p>
          <p>Total: ${orderSummary.total.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-400 text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderReview;
