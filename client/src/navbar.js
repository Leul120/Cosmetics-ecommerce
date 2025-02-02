import { Fragment, useContext, useEffect, useState } from 'react';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { FiHome, FiShoppingCart, FiUser, FiLogIn, FiPhone, FiTag, FiX } from 'react-icons/fi';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { IoLogOut } from "react-icons/io5";
import { AppContext } from './App';
import SignupPage from './components/user/signup';
import LoginPage from './components/user/login';
import { FaKickstarter } from 'react-icons/fa6';
import axios from 'axios';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const navigation = [
  { name: 'Home', href: '/', icon: <FiHome /> },
  { name: 'Shop', href: '/shop', icon: <FiTag /> },
  { name: 'Contact', href: '/contact', icon: <FiPhone /> },
];

export default function Header({socket}) {
  const { setShowVerify,nav, showVerify,setNav,token, showSignup, setShowSignup, showLogin, setShowLogin,userID,cart ,setCart,setUserID} = useContext(AppContext);
  const navigate=useNavigate()
  const [number,setNumber]=useState(0)
  const getItems = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/cart/get-from-cart`,{headers:{
        Authorization:`Bearer ${token}`
      }});
      let abc=0
      response.data.cart.items.map((item)=>{
        console.log(item.quantity)
        abc+=item.quantity
      })
      console.log(abc)
      setCart(abc)
      console.log('Cart items fetched:', response.data);
    } catch (error) {
      console.log('Error fetching cart items:', error);
      // Handle error by setting an empty array if fetching fails
    }
  };
  const logOut=async ()=>{
    window.localStorage.removeItem('token')
    // setUserID(null)
    window.location.reload();
  }

  useEffect(() => {
    getItems();
    socket.on('get-cart', getItems);

    return () => {
      socket.off('get-cart', getItems); // Clean up the socket listener on component unmount
    };
  }, [socket, userID]);
  // console.log(!userID && nav==="Orders")
  // console.log(showLogin)
  return (
    <Popover className="fixed z-50 w-full  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3">
          
          {/* Logo */}
          <div className="flex justify-start  lg:w-0 lg:flex-1 ">
            <a href="#" className="flex items-center   p-1 rounded-3xl ">
              <span className="sr-only">Logo</span>
              <img className="h-9 w-9 sm:h-9 rounded-full border-2 border-white" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcjo30y8eRF33cjOROo9ihpsdDDlFstv9YeA&s" alt="Logo" />
              <span className="ml-1 text-xl font-bold text-gray-700">LD COSMO</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 -my-2 lg:hidden">
            <Popover.Button className="bg-gray-500 rounded-md p-2 inline-flex items-center justify-center text-gray-700 hover:text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {/* Desktop Navigation */}
          <Popover.Group as="nav" className="hidden  p-1  rounded-3xl lg:flex space-x-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex text-sm items-center rounded-lg  font-medium   transition-all cursor-pointer duration-300 ease-in-out ${nav===item.name? 'bg-gray-700 p-2 text-white/80':"text-gray-700 hover:text-gray-400"} `}
              >
                <span className="mr-1 ">{item.icon}</span> {item.name}
              </a>
            ))}
            <button
                // key={item.name}
                // href={item.href}
                className={`flex text-sm items-center rounded-lg font-medium rounded-2xl  transition-all cursor-pointer duration-300 ease-in-out ${nav==="Orders"? 'bg-gray-700 p-2 text-white/80':"text-gray-700 hover:text-gray-400"} `}
              onClick={()=>{
                if(!userID){
                  setShowLogin(true)
                }else{
                  navigate('/order')
                }
              }}>
                <span className="mr-1 "><FaKickstarter /></span> Orders
              </button>
          </Popover.Group>

          {/* Right side: Sign In, Sign Up, Cart */}
          
          <div className="hidden lg:flex items-center justify-end md:flex-1 lg:w-0 space-x-6">
          {!userID ?(<>
            <a
              href="#"
              className="text-base font-medium text-gray-700 hover:text-gray-200 flex items-center transition-all duration-300 ease-in-out"
              onClick={() => setShowLogin(true)}
            >
              <FiLogIn className="mr-1" /> Sign In
            </a>
            <a
              href="#"
              className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent  shadow-sm text-base font-medium text-gray-600 bg-white hover:bg-gray-100 transition-all duration-300 ease-in-out"
              onClick={() => setShowSignup(true)}
            >
              <FiUser className="mr-2" /> Sign Up
            </a></>):(<div onClick={logOut}><IoIosLogOut size={26}/></div>)}
            <div className="text-gray-700 hover:text-gray-200 transition-all duration-300 ease-in-out relative" onClick={()=>{
                if( !userID){
                  setShowLogin(true)
                }else{
                  navigate(`/cart`)
                }
              }}>
              <span className="sr-only">Cart</span>
              <FiShoppingCart className="h-6 w-6" aria-hidden="true" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-gray-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cart}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcjo30y8eRF33cjOROo9ihpsdDDlFstv9YeA&s" alt="Logo" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center text-base font-medium text-gray-900 hover:text-gray-600 transition-all duration-300 ease-in-out"
                    >
                      <span className="mr-3 text-gray-600">{item.icon}</span> {item.name}
                    </a>
                  ))}
                  <button
                      
                      onClick={()=>{
                if(!userID){
                  setShowLogin(true)
                }else{
                  navigate('/order')
                }
              }}
                      className="flex items-center text-base font-medium text-gray-900 hover:text-gray-600 transition-all duration-300 ease-in-out"
                    >
                      <span className="mr-3 text-gray-600"><FaKickstarter /></span> Orders
                    </button>
                </nav>
              </div>
            </div>
            
            <div className="py-6 px-5 space-y-6">{!userID ?(
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <button className="flex items-center text-base font-medium text-gray-900 hover:text-gray-600 transition-all duration-300 ease-in-out">
                  <FiLogIn className="mr-3 text-gray-600" onClick={() => setShowLogin(true)} /> Sign In
                </button>
                <button className="flex items-center text-base font-medium text-gray-900 hover:text-gray-600 transition-all duration-300 ease-in-out" onClick={() => setShowSignup(true)} >
                  <FiUser className="mr-3 text-gray-600" /> Sign Up
                </button>
              </div>):(<><IoIosLogOut size={30}/></>)}
              <div>
                <a
                  href="/cart"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-700 bg-gray-600 hover:bg-gray-700"
                >
                  <FiShoppingCart className="mr-2" /> View Cart
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>

      {/* Custom Modals using Headless UI Dialog */}
      <Transition appear show={showLogin} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center   text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel  className="relative bg-white rounded-lg shadow-xl max-w-md w-full text-left transform transition-all">
                  
                  <div className="absolute top-3 right-3">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => setShowLogin(false)}
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>
                  <LoginPage />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={showSignup} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center   text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg shadow-xl max-w-md w-full  text-left transform transition-all">
                  
                  <div className="absolute top-3 right-3">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => {setShowSignup(false)
                      setShowVerify(false)}}
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>
                  <SignupPage />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Popover>
  );
}
