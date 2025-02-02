import React, { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { AppContext } from '../../App';
import axios from 'axios';
import { notification } from 'antd';

const Analytics = () => {
  const {socket,token}=useContext(AppContext)
  const [orders,setOrders]=useState([])
  const getOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/order/get-all-orders`,{headers:{
        Authorization:`Bearer ${token}`
      }});
      setOrders(response.data);
      console.log(response.data)
    } catch (error) {
      notification.error({ message:error.response.data.message });
      console.log(error);
    }
  };

  const [users, setUsers] = useState([]);

  const getAllUsers=async ()=>{
    try{
      const response=await axios.get(`${process.env.REACT_APP_URL}/user/get-all-users`,{headers:{
        Authorization:`Bearer ${token}`
      }})
      setUsers(response.data)
    }catch(error){
      notification.error({ message:error.response.data.message });
      console.log(error)
    }
  }
 


  useEffect(() => {
    getOrders();
   getAllUsers()
  
    socket.on('get-order', getOrders);

    return () => {
      socket.off('get-order', getOrders); // Clean up the socket listener on component unmount
    };
  }, []);
  // Sample data - replace with real data in a production environment
  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
  ];

  const categoryData = [
    { name: 'Skincare', value: 400 },
    { name: 'Makeup', value: 300 },
    { name: 'Haircare', value: 200 },
    { name: 'Fragrance', value: 100 },
  ];

  const customerData = [
    { month: 'Jan', new: 400, returning: 240 },
    { month: 'Feb', new: 300, returning: 139 },
    { month: 'Mar', new: 500, returning: 380 },
    { month: 'Apr', new: 450, returning: 300 },
    { month: 'May', new: 600, returning: 470 },
    { month: 'Jun', new: 550, returning: 420 },
  ];
  let total=0
  orders.map((order)=>{
    total+=order.totalAmount
  })

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const Card = ({ title, value, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Icon className="text-2xl text-gray-500" />
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Revenue" value={total} icon={FiDollarSign} />
        <Card title="Total Orders" value={orders.length} icon={FiShoppingBag} />
        <Card title="Total Customers" value={users.length} icon={FiUsers} />
        <Card title="Conversion Rate" value="3.2%" icon={FiTrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Acquisition</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="new" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="returning" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;