import React, { useEffect, useState } from 'react';
import s from './Login.module.css';
import { FaRegEye, FaRegEyeSlash, FaSuitcase, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HandlePassShown, HandleCheck, HandleLoginInputs, handleCredentials } from '../../Features/Auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const passShown = useSelector((state) => state.Auth.passShown);
		const checked = useSelector((state) => state.Auth.checked);
		const user = useSelector((state) => state.Auth.user);
    const Fields = useSelector((state) => state.Auth.LoginFields)
	// console.log(Fields);
    
		

    const HandleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
      console.log("here");
        try {
          const res = await fetch("http://localhost:7000/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(Fields) // ✅ send directly, not wrapped in {LoginFields}
          });
      
          const data = await res.json();
          
          if (res.ok) {
             toast.success('Login successful!');
            // console.log("Login successful", data.user)
            dispatch(handleCredentials(data.user))
            // setTimeout(() => {
                navigate('/')
            // }, 3000);
           
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
        if (user){
            navigate('/')
        }
      })
    return (
        <>
            <ToastContainer/>
            <div className={s.wrapper}>

                <div className={s.parent}>
                    <form onSubmit={HandleSubmit} className={s.box}>
                        <div className={s.heading}>Log In</div>
                        <div className={s.fields}>
                            <div className={s.user}>
                                <div className={s.icon}>
                                    <FaUser />
                                </div>
                                <input
                                    value={Fields.username}
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => dispatch(HandleLoginInputs({ name: e.target.name, value: e.target.value }))}
                                    required
                                    className={s.inputfield}
                                />
                            </div>
                            <div className={s.pass}>
                                <div className={s.icon}>
                                    <FaSuitcase />
                                </div>
                                <input
                                    value={Fields.password}
                                    type={passShown ? "text" : "password"} // Toggle type based on state
                                    name="password"
                                    onChange={(e) => dispatch(HandleLoginInputs({ name: e.target.name, value: e.target.value }))}
                                    placeholder="Password"
                                    required
                                    className={s.inputfield}
                                />
                                <div className={s.eye}>
                                    <button
                                        type="button" // Prevents form submission
                                        className={s.eyebtn}
                                        onClick={() => {
                                             // Prevents default button behavior
                                            dispatch(HandlePassShown());
                                        }}
                                    >
                                        {passShown ? <FaRegEye/> :<FaRegEyeSlash /> }
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.actions}>
                            
                            <div className={s.forgot}>
                                <Link to={'/forgot-password'} className={s.forgot}>Forgot Password?</Link>
                            </div>
                        </div>
                        <div className={s.btns}>
                            <button className={s.btn}>Log in</button>
                        </div>
                        <div className={s.register}>
                            Don't have an account? <Link to={'/register'} className={s.reg}>Register Now</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
