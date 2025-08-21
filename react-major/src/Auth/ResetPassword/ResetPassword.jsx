import React, { useEffect, useState } from 'react';
import s from './ResetPassword.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ResetPasswordForm = () => {
	const navigate = useNavigate()
	const email = useSelector((state) => state.Auth.email)
  const user = useSelector((state) => state.Auth.user)
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
		email
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
	const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
		if (passwords.newPassword !== passwords.confirmPassword) {
			toast.error("confirm and new password doesn't match")
      return;
    }
    try {
      const res = await fetch("http://localhost:7000/api/auth/reset-password", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(passwords) // ✅ send directly, not wrapped in {LoginFields}
      });
  
      const data = await res.json();
      
      if (res.ok) {
         toast.success('Password Reset successfully!');
            navigate('/')
       
      } else {
        toast.error(data.message || 'Login failed!');
        console.error("Login failed", data.message);
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Network error", error);
    }
  };
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  return (
    <div className={s.container}>
      <form className={s.card} onSubmit={handleSubmit}>
        <h2 className={s.title}>Reset Password</h2>
        <p className={s.subtitle}>Enter your new password below</p>

        <input
          type="password"
          placeholder="New Password"
          className={s.input}
					name='newPassword'
          value={passwords.newPassword}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className={s.input}
					name='confirmPassword'
          value={passwords.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className={s.button}>
          Reset Password
        </button>

        <p className={s.backLink}>
          ← <a href="/login">Back to Login</a>
        </p>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
