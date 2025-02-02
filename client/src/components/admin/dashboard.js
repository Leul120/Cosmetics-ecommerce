import React, { useContext, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { FiBarChart2, FiShoppingCart, FiUsers, FiBell } from 'react-icons/fi';
import ProductManagement from './productManagement'
import OrderManagement from './orderManagement'
import UserManagement from './userManagement'
import Analytics from './analytics'
import axios from 'axios';
import { AppContext } from '../../App';

const Dashboard = ({ socket }) => {
  const {token}=useContext(AppContext)
  const [orders,setOrders]=useState([])
  const [categories] = useState({
    Product: () => <ProductManagement />,
    Order: () => <OrderManagement />,
    User: () => <UserManagement />,
    Analytics: () => <Analytics />,
  });
  const getOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/order/get-all-orders`,{headers:{
        Authorization:`Bearer ${token}`
      }});
      setOrders(response.data);
      console.log(response.data)
    } catch (error) {
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

  const data = [
    { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
  ];

  const Card = ({ title, value, subtitle, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
  let total=0
  orders.map((order)=>{
    total+=order.totalAmount
  })

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="grid gap-4 pt-16 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Total Revenue"
          value={total}
          subtitle="+20.1% from last month"
          icon={FiBarChart2}
        />
        <Card
          title="New Orders"
          value={orders.length}
          // subtitle={orders.length}
          icon={FiShoppingCart}
        />
        <Card
          title="Active Users"
          value={users.length}
          subtitle="+180 since last hour"
          icon={FiUsers}
        />
        <Card
          title="Notifications"
          value="12"
          subtitle="+3 since last hour"
          icon={FiBell}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Bar dataKey="total" fill="#8884" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-stone-200 rounded-xl mb-6">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 text-gray-500 rounded-lg
                focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                ${
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((Component, idx) => (
            <Tab.Panel
              key={idx}
              className="bg-white rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 overflow-auto [&::-webkit-scrollbar]:hidden"
            >
              <Component />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

// Placeholder components
// const ProductManagement = () => <ProductManagement/>;
// const OrderManagement = () => <OrderManagement/>;
// const UserManagement = () => <UserManagement/>;
// const Analytics = () => <Analytics/>;

export default Dashboard;