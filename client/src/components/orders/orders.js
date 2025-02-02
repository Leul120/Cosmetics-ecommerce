import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaBox, FaCalendarAlt, FaDollarSign, FaCreditCard, FaTruck, FaMapMarkerAlt, FaEdit, FaPrint, FaTimesCircle, FaExchangeAlt, FaCommentAlt, FaSearch, FaSort, FaFilter } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog } from '@headlessui/react';
import { AppContext } from '../../App';

const OrderTrackingPage = () => {
  const { userID, socket,setNav,setShowLogin,token } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editedAddress, setEditedAddress] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate=useNavigate()
  
  useEffect(()=>{
    if(!token){

     
      setShowLogin(true)
      navigate('/')
     }
     setNav("Orders")
  },[userID])
  
    
      
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/order/get-order`,{headers:{
        Authorization:`Bearer ${token}`
      }});
          setOrders(response.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setError(err.message);
          setLoading(false);
        }
      };

      useEffect(() => {
      fetchOrders();

      socket.on('get-order', fetchOrders);

      return () => {
        socket.off('get-order', fetchOrders);
      };

  }, [socket]);

  useEffect(() => {
    if (selectedOrder && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => Math.max(0, prevTime - 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, selectedOrder]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    const orderTime = new Date(order.orderDate).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = 24 * 60 * 60 * 1000 - (currentTime - orderTime);
    setTimeLeft(Math.max(0, timeDiff));
    setMapCenter({ lat: 40.7128, lng: -74.0060 }); // New York City coordinates as placeholder
  };

  const handleEditAddress = useCallback(() => {
    setIsEditingAddress(true);
    setEditedAddress(selectedOrder.shippingAddress);
    setIsMapModalOpen(true);
  }, [selectedOrder]);

  const handleSaveAddress = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/order/update-order/${selectedOrder._id}`, { shippingAddress: editedAddress },{headers:{
        Authorization:`Bearer ${token}`
      }});
      setSelectedOrder({ ...selectedOrder, shippingAddress: editedAddress });
      setIsEditingAddress(false);
      setIsMapModalOpen(false);
      toast.success('Shipping address updated successfully!');
    } catch (err) {
      toast.error('Failed to update shipping address. Please try again.');
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await axios.patch(`${process.env.REACT_APP_URL}/order/update-order/${selectedOrder._id}`, { shippingStatus: 'Cancelled' });
        // setSelectedOrder({ ...selectedOrder, shippingStatus: 'Cancelled' });
        fetchOrders()
        toast.info('Order cancelled successfully.');
      } catch (err) {
        toast.error('Failed to cancel order. Please contact support.');
      }
    }
  };
  console.log(selectedOrder)

  const handlePrintOrder = () => {
    window.print();
  };

  const handleReturnRequest = () => {
    setIsReturnModalOpen(true);
  };

  const submitReturnRequest = async () => {
    try {
      await axios.post(`/api/orders/${selectedOrder._id}/return`, { items: selectedItems, reason: returnReason },{headers:{
        Authorization:`Bearer ${token}`
      }});
      toast.success('Return request submitted successfully.');
      setIsReturnModalOpen(false);
    } catch (err) {
      toast.error('Failed to submit return request. Please try again.');
    }
  };

  const handleLiveChat = () => {
    toast.info('Connecting to live chat...');
  };

  const filteredOrders = orders
    .filter(order => 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingStatus.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(order => 
      filterStatus === 'all' || order.shippingStatus.toLowerCase() === filterStatus.toLowerCase()
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.orderDate) - new Date(a.orderDate);
      } else if (sortBy === 'status') {
        return a.shippingStatus.localeCompare(b.shippingStatus);
      } else if (sortBy === 'amount') {
        return b.totalAmount - a.totalAmount;
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={5000} />
      
      <main className="max-w-7xl mx-auto pt-16 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex justify-between flex-wrap items-center mb-4">
            <input
              type="text"
              placeholder="Search orders..."
              className="p-2 border "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border "
              >
                <option value="date">Sort by Date</option>
                <option value="status">Sort by Status</option>
                <option value="amount">Sort by Amount</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 border "
              >
                <option value="all">All Statuses</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="bg-white shadow overflow-scroll [&::-webkit-scrollbar]:hidden ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.shippingStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.shippingStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                          order.shippingStatus === 'Cancelled' ? 'bg-red-300 text-red-600' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {order.shippingStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleSelectOrder(order)} className="text-indigo-600 hover:text-indigo-900">
                        Track
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {timeLeft > 0 && (
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded">
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Time left for modifications: {formatTime(timeLeft)}
                </p>
              </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Order Details</h2>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <InfoItem icon={<FaBox />} label="Order ID" value={selectedOrder._id} />
                  <InfoItem
                    icon={<FaCalendarAlt />}
                    label="Order Date"
                    value={new Date(selectedOrder.orderDate).toLocaleDateString()}
                  />
                  <InfoItem
                    icon={<FaDollarSign />}
                    label="Total Amount"
                    value={`$${selectedOrder.totalAmount.toFixed(2)}`}
                  />
                  <InfoItem icon={<FaCreditCard />} label="Payment Status" value={selectedOrder.paymentStatus} />
                  <InfoItem icon={<FaTruck />} label="Shipping Status" value={selectedOrder.shippingStatus} />
                </dl>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Items</h2>
              </div>
              <div className="border-t border-gray-200">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center border-b p-4 hover:bg-gray-50">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4 rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">Brand: {item.brand}</p>
                      <p className="text-gray-600">Size: {item.size}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-green-600 font-semibold">
                        Price: ${(item.price - item.price * (item.discount / 100)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Shipping Address</h2>
              </div>
              <div className="border-t border-gray-200 p-4">
                <p className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" />
                  {selectedOrder.shippingAddress}
                  {timeLeft > 0 && (
                    <button
                      onClick={handleEditAddress}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <FaEdit />
                    </button>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <ActionButton
                icon={<FaTimesCircle />}
                text="Cancel Order"
                onClick={handleCancelOrder}
                disabled={timeLeft === 0 || selectedOrder.shippingStatus !== 'Processing'}
              />
              <ActionButton
                icon={<FaPrint />}
                text="Print Order"
                onClick={handlePrintOrder}
              />
              {/* <ActionButton
                icon={<FaTruck />}
                text="Track Shipment"
                onClick={() => toast.info('Redirecting to shipment tracking...')}
                // disabled={selectedOrder.shippingStatus === 'Processing' || selectedOrder.shippingStatus === 'Cancelled'}
              /> */}
              <ActionButton
                icon={<FaExchangeAlt />}
                text="Request Return"
                onClick={handleReturnRequest}
                disabled={selectedOrder.shippingStatus !== 'Delivered'}
              />
              {/* <ActionButton
                icon={<FaCommentAlt />}
                text="Live Chat"
                onClick={handleLiveChat}
              /> */}
            </div>
          </motion.div>
        )}
      </main>

      {/* Google Maps Modal */}
      <Dialog open={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          {/* <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" /> */}
          <div className="relative bg-white rounded max-w-lg w-full mx-auto p-6">
            <h3 className="text-lg font-medium mb-4">Update Shipping Address</h3>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '300px' }}
                center={mapCenter}
                zoom={10}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            </LoadScript>
            <textarea
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
              className="w-full p-2 border rounded mt-4"
              rows="3"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setIsMapModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Cancel
              </button>
              <button onClick={handleSaveAddress} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Save Address
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Return Request Modal */}
      <Dialog open={isReturnModalOpen} onClose={() => setIsReturnModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded max-w-lg w-full mx-auto p-6">
            <h3 className="text-lg font-medium mb-4">Request Return</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Items to Return</label>
              {selectedOrder && selectedOrder.items.map((item, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={`item-${index}`}
                    value={item.id}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems([...selectedItems, item.id]);
                      } else {
                        setSelectedItems(selectedItems.filter(id => id !== item.id));
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`item-${index}`}>{item.name}</label>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Reason for Return</label>
              <textarea
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                rows="3"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setIsReturnModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Cancel
              </button>
              <button onClick={submitReturnRequest} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Submit Return Request
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500 flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
);

const ActionButton = ({ icon, text, onClick, disabled }) => (
  <button
    className={`flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium  text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

export default OrderTrackingPage;