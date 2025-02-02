// PaymentInfo.js
import React, { useState } from 'react';

const PaymentInfo = ({ onSubmit, onBack, initialData }) => {
  const [paymentData, setPaymentData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(paymentData);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentData.cardNumber || ''}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={paymentData.expiryDate || ''}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={paymentData.cvc || ''}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentInfo;
