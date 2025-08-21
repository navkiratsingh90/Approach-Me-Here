import React, { useState } from 'react';
import s from './Register.module.css';
import { FaMailBulk, FaRegEye, FaRegEyeSlash, FaSuitcase, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HandlePassShown, HandleRegisterInputs } from '../../Features/Auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const passShown = useSelector((state) => state.Auth.passShown);
		const checked = useSelector((state) => state.Auth.checked);
		const user = useSelector((state) => state.Auth.user);
    const Fields = useSelector((state) => state.Auth.RegisterFields)
	console.log(Fields);
    
		

    const HandleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
      
        try {
          const res = await fetch("http://localhost:7000/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(Fields) // ✅ send directly, not wrapped in {LoginFields}
          });
      
          const data = await res.json();
      
          if (res.ok) {
            toast.success(data.message || 'register successful!');
            console.log("register successful", data);
            navigate('/login')
          } else {
            toast.error(data.message || 'register failed!');
            console.error("register failed", data.message);
          }
        } catch (error) {
          toast.error("Network error");
          console.error("Network error", error);
        }
      };
      if (user) return navigate('/')
    return (
        <>
            <ToastContainer/>
            <div className={s.wrapper}>
                <div className={s.parent}>
                    <form onSubmit={HandleSubmit} className={s.box}>
                        <div className={s.heading}>Register</div>
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
                                    onChange={(e) => dispatch(HandleRegisterInputs(e))}
                                    required
                                    className={s.inputfield}
                                />
                            </div>
														<div className={s.user}>
                                <div className={s.icon}>
                                    <FaMailBulk />
                                </div>
                                <input
                                    value={Fields.email}
                                    name="email"
                                    type="email"
                                    placeholder="email"
                                    onChange={(e) => dispatch(HandleRegisterInputs(e))}
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
                                    onChange={(e) => dispatch(HandleRegisterInputs(e))}
                                    placeholder="Password"
                                    required
                                    className={s.inputfield}
                                />
                                <div className={s.eye}>
                                    <button
                                        type="button" // Prevents form submission
                                        className={s.eyebtn}
                                        onClick={(e) => {
                                             // Prevents default button behavior
                                            dispatch(HandlePassShown());
                                        }}
                                    >
                                        {passShown ? <FaRegEye/> :<FaRegEyeSlash /> }
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.btns}>
                            <button className={s.btn}>Register</button>
                        </div>
                        <div className={s.register}>
                            Already have an account? <Link className={s.reg}>Log in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
