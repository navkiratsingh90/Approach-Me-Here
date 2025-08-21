import React, { useState } from 'react';
import s from './Logout.module.css';
import { FaRegEye, FaRegEyeSlash, FaSuitcase, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HandlePassShown, HandleLogoutInputs } from '../../Features/Auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';

const Logout = () => {
    const dispatch = useDispatch();
    const passShown = useSelector((state) => state.Auth.passShown);
    const Fields = useSelector((state) => state.Auth.LogoutFields)
	console.log(Fields);
    
		

    const HandleSubmit = (e) => {
        e.preventDefault(); // Fixed the incorrect method name
        console.log(Fields);
    };

    return (
        <>
            <div className={s.wrapper}>
                <div className={s.parent}>
                    <form onSubmit={HandleSubmit} className={s.box}>
                        <div className={s.heading}>Log out</div>
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
                                    onChange={(e) => dispatch(HandleLogoutInputs(e))}
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
                                    onChange={(e) => dispatch(HandleLogoutInputs(e))}
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
                            <button className={s.btn}>Logout</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Logout;
