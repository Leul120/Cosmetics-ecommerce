import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Input component
import { GoogleLogin } from '@react-oauth/google';
import { AppContext } from '../../App';
const Input = ({ icon, type, placeholder, register, name, validation, rightIcon, onRightIconClick, errors }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      {icon}
    </span>
    <input
      type={type}
      {...register(name, validation)}
      className={`w-full py-2 pl-10 pr-10 text-gray-700 bg-white border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
      placeholder={placeholder}
    />
    {rightIcon && (
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        onClick={onRightIconClick}
      >
        {rightIcon}
      </button>
    )}
    {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
  </div>
);

// Button component
const Button = ({ children, onClick, className, disabled }) => (
  <button
    className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const LoginPage = () => {
  const {setShowLogin,setShowSignup}=useContext(AppContext)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(data)
      const response = await axios.post(`${process.env.REACT_APP_URL}/user/login`, data);
      
      console.log(response.data);
      window.localStorage.setItem('token',response.data)
      setShowLogin(false)
      reset(); 
       // Reset form after successful login
    } catch (error) {
      toast.error(error.response?.data.message)
      console.error('Login error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  const test=async ()=>{
    try{
    const response=await axios.get("http://localhost:8080/api/v1/admin/get-movie/1",{headers:{
      Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MzQ5NTMyODUsImV4cCI6MTczNTAzOTY4NX0.MPMNKMJSINXEAYdi-ytDwDdwO4aToo-SFC1exLF5q0Y'
    }})
    console.log(response.data)
  }catch(error){
    console.log(error)
  }
  }
  useEffect(()=>{
    test();
  },[])

  // Handle Google login
  const handleGoogleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const response = await axios.post(`http://localhost:8000/user/google-login`, {credential:credential});
      console.log(response.data)
      toast.success('logged in  successfully');
      window.localStorage.setItem('token', response.data);
      
      setShowLogin(false);
    } catch (error) {
      console.error('Google login failed:', error);
      toast.error('Google login failed');
    }
  };
  const handleGoogleError = (error) => {
  console.error('Google Login Failed:', error);
  toast.error('Google Login Failed');
};

  return (
    <div className="flex items-center justify-center mt-32">
    <ToastContainer/>
      <div className="px-10 py-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <Input
            icon={<FaEnvelope className="text-gray-400" />}
            type="email"
            placeholder="Email"
            register={register}
            name="email"
            validation={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address"
              }
            }}
            errors={errors}
          />

          {/* Password Input */}
          <Input
            icon={<FaLock className="text-gray-400" />}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            register={register}
            name="password"
            validation={{ required: "Password is required" }}
            rightIcon={showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
            onRightIconClick={() => setShowPassword(!showPassword)}
            errors={errors}
          />

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <Button className="bg-blue-500 hover:bg-blue-600 focus:ring-blue-400" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        {/* Google Login Button */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">Or continue with</span>
        </div>
        <div className="mt-4 flex justify-center">
          
            <GoogleLogin

                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            style={{ marginTop: '20px' }}
                            
                        />
          
        </div>

        {/* Sign up Link */}
        <div className="mt-6 text-center flex justify-center">
          <span className="text-sm text-gray-600 flex gap-1">
            Don't have an account?{' '}
            <button onClick={()=>{setShowLogin(false)
            setShowSignup(true)}} className="text-blue-500 hover:underline">Sign up</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
