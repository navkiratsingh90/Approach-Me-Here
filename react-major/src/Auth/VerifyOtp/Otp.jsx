import React, { useState } from 'react';
import s from './OTPVerify.module.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OTPVerifyForm = () => {
	const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
	const email = useSelector((state) => state.Auth.email)
	// const user = useSelector((state) => state.Auth.user)
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Move to next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }

      // Move to previous on backspace
      if (!value && index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

	const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
		const finalOtp = otp.join('');
    if (finalOtp.length !== 6) {
      toast.error('Otp must be of 6 digits')
      return;
    }
		console.log(email);
    try {
      const res = await fetch("http://localhost:7000/api/auth/otp-verify", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
					finalOtp,
					email
				}) // ✅ send directly, not wrapped in {LoginFields}
      });
  
      const data = await res.json();
      
      if (res.ok) {
         toast.success('Otp verified successfully!');
            navigate('/reset-password')
       
      } else {
        toast.error(data.msg || 'Login failed!');
        console.error("Login failed", data.msg);
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Network error", error);
    }
  };
  // if (user) return navigate('/')
  return (
    <div className={s.container}>
      <form className={s.card} onSubmit={handleSubmit}>
        <h2 className={s.title}>Verify OTP</h2>
        <p className={s.subtitle}>Enter the 6-digit code sent to your email</p>
        <div className={s.otpInputs}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              maxLength="1"
              className={s.otpInput}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </div>
        <button type="submit" className={s.button}>
          Verify OTP
        </button>
        <p className={s.backLink}>
          ← <a href="/forgot-password">Back</a>
        </p>
      </form>
    </div>
  );
};

export default OTPVerifyForm;
