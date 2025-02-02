import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from '@react-oauth/google';
import { AppContext } from '../../App';
import VerifyPage from './verify';

// Reusable Input component
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

// Reusable Button component
const Button = ({ children, onClick, className, disabled }) => (
  <button
    className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const SignupPage = () => {
  const { setShowVerify, showVerify,setShowSignup ,setShowLogin} = useContext(AppContext);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [data, setData] = useState({});
  const password = watch('password');

  // Handle form submission
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      formData.verificationCode = verificationCode;
      console.log(formData);
      const response = await axios.post(`${process.env.REACT_APP_URL}/user/signup`, formData);
      console.log(response.data);

      setData({
        id: response.data.id,
        email: formData.email,
        verificationCode: verificationCode,
        token: response.data.token,
      });
      setShowVerify(true);
      reset();
    } catch (error) {
      toast.error(error.response?.data.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setVerificationCode(Math.floor(100000 + Math.random() * 900000));
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    console.log(credential)
    try {
      const response = await axios.post(`http://localhost:8000/user/google-signup`, {
        credential: credential,
      });
      console.log(response.data)
      toast.success('Signed Up  successfully');
      window.localStorage.setItem('token', response.data);
      
      setShowSignup(false);
    } catch (error) {
      console.error('Google signup failed:', error);
      toast.error('Google signup failed');
    }
  };


  const handleGoogleError = (error) => {
    toast.error('Google Signup Failed');
    console.error('Google Signup Failed:', error);
  };

  return (
    <>
      <ToastContainer />
      {!showVerify ? (
        <div className="flex items-center justify-center bg-gray-100">
          <div className="px-10 py-8 bg-white rounded-lg shadow-md w-full max-w-md">
            <h2 className="mb-6 text-2xl font-bold text-center">Create an Account</h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name Input */}
              <Input
                icon={<FaUser className="text-gray-400" />}
                type="text"
                placeholder="Full Name"
                register={register}
                name="name"
                validation={{ required: "Full Name is required" }}
                errors={errors}
              />

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

              {/* Confirm Password Input */}
              <Input
                icon={<FaLock className="text-gray-400" />}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                register={register}
                name="confirmPassword"
                validation={{
                  validate: value => value === password || "Passwords don't match"
                }}
                rightIcon={showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                errors={errors}
              />

              {/* Signup Button */}
              <Button className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            {/* Or Divider */}
            <div className="mt-3 flex items-center justify-center">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className="text-xs text-center text-gray-500 uppercase px-2">or</span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            {/* Google Signup Button */}
            <div className="mt-3 w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
              />
            </div>

            {/* Already have an account */}
            <div className="mt-8 text-center flex justify-center">
              <span className="text-sm text-gray-600 flex gap-1">
                Already have an account?{' '}
                <button onClick={()=>{
                  setShowSignup(false)
                  setShowLogin(true)
            }} className="text-blue-500 hover:underline">Login</button>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <VerifyPage data={data} />
      )}
    </>
  );
};

export default SignupPage;
