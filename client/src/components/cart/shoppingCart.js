import React, { useContext, useEffect, useState } from 'react';
import CartItem from './cartItem';
import axios from 'axios';
import { AppContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';

const ShoppingCartPage = ({ socket }) => {
  const { userID,setShowLogin,token } = useContext(AppContext);
  const [cart,setCart]=useState({})
  const [cartItems, setCartItems] = useState([]); // Initialize cartItems as an empty array
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate=useNavigate()
  

  const getItems = async () => {
    if(userID){
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/cart/get-from-cart`,{headers:{
        Authorization:`Bearer ${token}`
      }});
      setCartItems(response.data.cart.items || []); // Ensure items is always an array
      setCart(response.data.cart)
      // setCart(response.data.cart.items.length)
      console.log('Cart items fetched:', response.data);
    } catch (error) {
      console.log('Error fetching cart items:', error);
      setCartItems([]); // Handle error by setting an empty array if fetching fails
    }}
  };

  useEffect(() => {
    if(!userID){
      setShowLogin(true)
      navigate('/')

    }
    getItems();
    socket.on('get-cart', getItems);

    return () => {
      socket.off('get-cart', getItems); // Clean up the socket listener on component unmount
    };
  }, [socket, userID]);

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_URL}/cart/update-item/${id}`, { quantity: newQuantity },{headers:{
        Authorization:`Bearer ${token}`
      }});
      console.log('Quantity updated:', response.data);
      getItems(); // Refresh cart items after update
    } catch (error) {
      console.log('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/cart/remove-item/${id}`,{headers:{
        Authorization:`Bearer ${token}`
      }});
      console.log('Item removed from cart');
      // setCartItems(prevItems => prevItems.filter(item => item._id !== id)); // Filter out the removed item
    } catch (error) {
      console.log('Error removing item:', error);
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(discount+discount*0.1); // Example discount of 10%
    } else {
      alert('Invalid coupon code');
    }
  };

  // Ensure that cartItems is defined and not empty before calculating subtotal
  const subtotal = cartItems?.length > 0 
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0) 
    : 0;
    useEffect(()=>{
      setDiscount((1-cart.total/subtotal)*100)
    },[cart])
  
  const addNote=async(id,note)=>{
    try{
      console.log(id,userID,note)
      console.log(id,note)
      const response=await axios.post(`${process.env.REACT_APP_URL}/cart/add-note/${id}`,{
        note:note
      },{headers:{
        Authorization:`Bearer ${token}`
      }})
      console.log(response.data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="p-6 pt-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems?.map(item => (
              <CartItem
                key={item._id} // Use _id instead of id
                item={item}
                onUpdateNote={addNote}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
          <div className="mt-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Subtotal:</h2>
              <p className="text-lg">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-2">
              <h2 className="text-lg font-semibold">Discount:</h2>
              <p className="text-lg">-{discount.toFixed(2)}%</p>
            </div>
            <div className="flex justify-between mt-2 font-bold">
              <h2 className="text-lg">Total:</h2>
              <p className="text-lg">${cart.total.toFixed(2)}</p>
            </div>
          </div>
          <div className='flex justify-between items-center'>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={e => setCouponCode(e.target.value)}
              className="border  p-2"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-gray-600 text-white px-4 py-2  ml-2 mb-4"
            >
              Apply
            </button>
          </div>
          <Link to='/checkout' className="bg-yellow-600 text-white px-4 py-2  mt-4">
            Proceed to Checkout
          </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCartPage;
