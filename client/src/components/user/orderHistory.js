import React from 'react';

const OrderHistory = () => {
  const orders = [
    { id: 1, date: '2024-09-21', status: 'Delivered', tracking: '#123456', total: 49.99 },
    { id: 2, date: '2024-09-18', status: 'Shipped', tracking: '#654321', total: 79.99 },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6">Order History</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-gray-100 p-4 rounded-lg">
            <p>
              <span className="font-semibold">Order ID:</span> {order.id}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {order.date}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {order.status}
            </p>
            <p>
              <span className="font-semibold">Tracking:</span>{' '}
              <a href={`#${order.tracking}`} className="text-indigo-600">
                {order.tracking}
              </a>
            </p>
            <p>
              <span className="font-semibold">Total:</span> ${order.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
