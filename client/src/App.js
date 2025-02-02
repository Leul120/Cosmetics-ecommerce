
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Header from './navbar';
import Footer from './footer';
import Homepage from './components/home/homepage';
import ShopPage from './components/shop/shopPage';
import ShoppingCartPage from './components/cart/shoppingCart';
import CheckoutPage from './components/checkout/checkout';
import UserProfilePage from './components/user/userProfile';
import Wishlist from './components/user/wishlist';
import OrderHistory from './components/user/orderHistory';
import AboutPage from './components/aboutUs/AboutPage';
import ContactUsPage from './components/contactUs/contactUs';
import BlogPage from './components/blog/blogPage';
import Dashboard from './components/admin/dashboard';
import ProductDetailPage from './components/details/productDetails';
// import ProductEntry from './entry';
import BodyCareForm from './components/entry/bodycare';
import FragranceForm from './components/entry/fragrance';
import HaircareForm from './components/entry/haircare';
import NailProductForm from './components/entry/nailProductForm';
import SkincareForm from './components/entry/skinCareForm';
import MakeupForm from './components/entry/makeupEntryPage';
import ProductTypeSelection from './components/entry/productEntryPage';
import { createContext, useEffect, useState } from 'react';
import MakeupDetailPage from './components/details/makeupDetails';
import FragranceDetailPage from './components/details/fragranceDetailsPage';
import HaircareDetailPage from './components/details/haircareDetailsPage';
import SkincareDetailPage from './components/details/skincareDetailsPage';
import NailDetailPage from './components/details/nailDetailsPage';
import VerifyPage from './components/user/verify';
import LoginPage from './components/user/login';
import SignupPage from './components/user/signup';
import {jwtDecode} from 'jwt-decode'
import { GoogleOAuthProvider } from '@react-oauth/google';
import socketIO from 'socket.io-client';
import OrderTrackingPage from './components/orders/orders';
import axios from 'axios';
import PortfolioHome from './components/portfolio';
// import axios from 'axios'
// axios.defaults.withCredentials=true
const socket = socketIO.connect('http://localhost:9090');
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
socket.emit("myCustomEvent",  "Hello from client");
console.log(socket)
export const AppContext=createContext()

function App() {
  const [product,setProduct]=useState({})
  const [show,setShow]=useState(false)
  const [showVerify,setShowVerify]=useState(false)
  const [showSignup,setShowSignup]=useState(false)
  const [showLogin, setShowLogin] = useState(false);
  const [cart,setCart]=useState(0)
  const [nav,setNav]=useState("")
  const token=window.localStorage.getItem('token')
  // const [userID,setUserID]=useState()
  // useEffect(()=>{
  //   if(token){
  //    setUserID(jwtDecode(token).id)
  //    console.log(userID)
  // }
  // },[token])
  let userID
  if(token){
     userID=jwtDecode(token).id
     
  }
  
  
  return (
    <div className="App">
    <AppContext.Provider value={{product,setProduct,show,setShow,showVerify,setShowVerify,showSignup,setShowSignup,showLogin, setShowLogin,userID,cart,setCart,socket,nav,setNav,token}}>
    <GoogleOAuthProvider clientId='550684334657-8fehgspvfatgdsepib3qtdif7c1ui833.apps.googleusercontent.com'>
      <Router>
      <Header socket={socket}/>
        <Routes className='mb-56'>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/cart' element={<ShoppingCartPage socket={socket}/>}/>
          <Route path='/checkout' element={<CheckoutPage socket={socket} />}/>
          <Route path='/login' element={<LoginPage/>}/> 
          <Route path="/prt" element={<PortfolioHome/>}/>
          <Route path='/user-profile' element={<UserProfilePage/>}/>
          <Route path='/wish-list' element={<Wishlist/>}/>
          <Route path='/order-history' element={<OrderHistory socket={socket}/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/contact' element={<ContactUsPage/>}/>
          <Route path='/blog' element={<BlogPage/>}/>
          <Route path='/admin-dashboard' element={<Dashboard socket={socket}/>}/>
          <Route path='/details/bodycare/:id' element={<ProductDetailPage/>}/>
          {/* <Route path='/entry' element={<ProductEntry/>}/> */}
          <Route path='/body-care' element={<BodyCareForm/>}/>
          <Route path='/fragrance' element={<FragranceForm/>}/>
          <Route path='/haircare' element={<HaircareForm/>}/>
          <Route path='/nail' element={<NailProductForm/>}/>
          <Route path='/makeup' element={<MakeupForm/>}/>
          <Route path='/skincare' element={<SkincareForm/>}/>
          <Route path='/product-entry' element={<ProductTypeSelection/>}/>
          <Route path='/details/makeup/:id' element={<MakeupDetailPage/>}/>
          <Route path='/details/fragrance/:id' element={<FragranceDetailPage/>}/>
          <Route path='/details/haircare/:id' element={<HaircareDetailPage/>}/>
          <Route path='/details/skincare/:id' element={<SkincareDetailPage/>}/>
          <Route path='/details/nail/:id' element={<NailDetailPage/>}/>
          <Route path='/verify' element={<VerifyPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/order' element={<OrderTrackingPage/>}/>
          
        </Routes>
        <Footer/>
      </Router>
      </GoogleOAuthProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
