import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { AppContext } from '../../App';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const VerifyPage = ({ data }) => {
    const {setShowSignup,setShowVerify}=useContext(AppContext)
  const [code, setCode] = useState(Array(6).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [verificationCode,setVerificationCode]=useState()
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const inputRefs = useRef([]);

  useEffect(()=>{
    setVerificationCode(data.verificationCode)
  },[])

  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      handleVerify();
    }
  }, [code]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value.replace(/[^0-9]/g, '').slice(0, 1); // Allow only digits
    setCode(newCode);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setError('');

    setTimeout(() => {
      const enteredCode = parseInt(code.join(''), 10);
      console.log(verificationCode)

      if (verificationCode === enteredCode) {
        try{
        axios.get(`${process.env.REACT_APP_URL}/user/verify-user/${data.id}`)
        window.localStorage.setItem('token',data.token)
        setIsVerified(true);
        setIsVerifying(false);
        setTimeout(()=>{setShowSignup(false)
            setShowVerify(false)
        },1000)
        }catch(error){
            console.log(error)
        }
      } else {
        setError('Invalid Code!');
        setIsVerified(false);
        setIsVerifying(false);
      }
    }, 3000);
  };

  const handleResendCode = async () => {
        if (resendCooldown === 0) {
            setResendCooldown(30);
            setError('');
            setIsVerified(false);
            setCode(Array(6).fill(''));
            inputRefs.current[0]?.focus();

            // Generate a new verification code
            const newCode = Math.floor(100000 + Math.random() * 900000);
            setVerificationCode(newCode);

            try {
                // API call to resend verification code
                await axios.get(`${process.env.REACT_APP_URL}/user/resend-code/${newCode}/${data.email}`);
                toast.success("Another verification code has been sent to your email address!");
            } catch (err) {
                toast.error("Failed to resend the verification code. Please try again.");
            }
        }
    };

  return (
    <div className="flex items-center justify-center bg-gray-100">
    <ToastContainer/>
      <div className="px-8 py-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <style>
          {`
            @keyframes borderColorChange {
              0% { border-color: #3B82F6; }
              33% { border-color: #39ed63; }
              66% { border-color: #a839ed; }
              100% { border-color: #3B82F6; }
            }
            .animate-border-color {
              animation: borderColorChange 2s infinite;
            }
          `}
        </style>
        <h2 className="mb-6 text-2xl font-bold text-center">Verify Your Account</h2>
        <p className="mb-4 text-sm text-center text-gray-600">
          Enter the 6-digit code sent to your email
        </p>
        <div className="flex justify-center mb-4 space-x-2">
          {code.map((digit, index) => (
            <div key={index} className="relative">
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                className={`w-12 h-12 text-center text-xl text-gray-700 bg-white border-2 rounded-md focus:outline-none transition-colors duration-200 ${
                  isVerifying
                    ? 'animate-border-color'
                    : error
                    ? 'border-red-500'
                    : 'focus:border-blue-400'
                }`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isVerifying}
              />
            </div>
          ))}
        </div>
        {error && (
          <p className="mb-4 text-sm text-center text-red-500">
            <FaTimesCircle className="inline-block mr-2" />
            {error}
          </p>
        )}
        {isVerified && (
          <div className="mb-4 text-center text-green-500">
            <FaCheckCircle className="inline-block mr-2" />
            Verification successful!
          </div>
        )}
        
        <div className="mt-4 text-center">
          <button
            onClick={handleResendCode}
            disabled={resendCooldown > 0}
            className={`text-sm ${
              resendCooldown > 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:underline'
            } ${isVerified ? 'hidden' : ''}`}
          >
            {resendCooldown > 0
              ? `Resend Code (${resendCooldown}s)`
              : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
