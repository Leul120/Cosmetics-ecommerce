import React, { useContext, useEffect, useState } from 'react';
import { Table, Tag, Avatar, Tooltip, Select, message, notification } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, StopOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import { AppContext } from '../../App';

const { Option } = Select;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const { socket,token } = useContext(AppContext);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/order/get-all-orders`,{headers:{
        Authorization:`Bearer ${token}`
      }});
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      notification.error({ message:error.response.data.message });
      message.error('Failed to fetch orders');
    }
  };

  useEffect(() => {
    getOrders();
    socket.on('get-order', getOrders);
    return () => {
      socket.off('get-order', getOrders);
    };
  }, []);

  const updateShippingStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/order/update-order/${orderId}`, {
        shippingStatus: newStatus
      },{headers:{
        Authorization:`Bearer ${token}`
      }});
      message.success('Shipping status updated successfully');
      // getOrders();
    } catch (error) {
      console.log(error);
      notification.error({ message:error.response.data.message });
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "userId",
      key: "user",
      render: (user) => (
        <div>
          <p><strong>{user?.name}</strong></p>
          <p>{user?.email}</p>
        </div>
      )
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <div>
          {items?.map(item => (
            <div key={item.name} style={{ marginBottom: '8px' }}>
              <Avatar src={item.image} shape="square" size="large" style={{ marginRight: '10px' }} />
              <Tooltip title={item.brand}>
                <strong>{item.name}</strong> - {item.quantity} pcs
              </Tooltip>
              <div style={{ fontSize: '12px', color: '#888' }}>
                {item.size ? `Size: ${item.size}` : ''}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => <strong>${amount?.toFixed(2)}</strong>,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (
        <Tag color={status === 'Completed' ? 'green' : status === 'Pending' ? 'orange' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Shipping Status",
      dataIndex: "shippingStatus",
      key: "shippingStatus",
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => updateShippingStatus(record._id, value)}
        >
          <Option value="Processing">
            <ClockCircleOutlined style={{ color: 'orange' }} /> Processing
          </Option>
          <Option value="Shipped">
            <SyncOutlined spin style={{ color: 'blue' }} /> Shipped
          </Option>
          <Option value="Delivered">
            <CheckCircleOutlined style={{ color: 'green' }} /> Delivered
          </Option>
          <Option value="Cancelled">
            <StopOutlined style={{ color: 'red' }} /> Cancelled
          </Option>
        </Select>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => moment(date).format('DD MMM YYYY'),
    },
  ];

  const expandedRowRender = (order) => {
    return (
      <div>
        <h4>Shipping Address:</h4>
        <p>{order.shippingAddress || "No shipping address provided"}</p>
        <p className='text-stone-800 font-bold'>Phone: {order.phoneNumber}</p>
        <h4>Product Details:</h4>
        {order.items.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <p><strong>{item.name}</strong> ({item.productModel})</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Discount: {item.discount}%</p>
            <p>Note: {item.note}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 ">
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        expandable={{ expandedRowRender }}
        pagination={{ pageSize: 5 }}
        className='overflow-auto [&::-webkit-scrollbar]:hidden min-w-[700px]'
      />
    </div>
  );
};

export default OrderManagement;