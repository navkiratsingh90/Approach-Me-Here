import {React, useState} from 'react';
import s from './ForgotPassword.module.css';
import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { handleCredentials, handleEmail } from '../../Features/Auth/AuthSlice';

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const dispatch = useDispatch()
  const Email = useSelector((state) => state.Auth.email)
  const user = useSelector((state) => state.Auth.user)
 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    dispatch(handleEmail(email))
    console.log(Email);
    try {
      const res = await fetch("http://localhost:7000/api/auth/forgot-password", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email}) 
      });
  
      const data = await res.json();
      
      if (res.ok) {
         toast.success('Otp sent at your email!');
            navigate('/otp-verify')
       
      } else {
        toast.error("user doesn't exists with this email" );
        console.error("Login failed", data.msg);
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Network error", error);
    }
  };
  if (user) return navigate('/')
  return (
    <div className={s.container}>
      <div className={s.card}>
        <h2 className={s.title}>Forgot Password</h2>
        <p className={s.subtitle}>Enter your email to reset your password</p>
        <form onSubmit={handleSubmit} className={s.form}>
          <input
            type="email"
            placeholder="Email Address"
            className={s.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={s.button}>
            Send OTP
          </button>
        </form>
        <div className={s.backToLogin}>
          <a href="/login">← Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
