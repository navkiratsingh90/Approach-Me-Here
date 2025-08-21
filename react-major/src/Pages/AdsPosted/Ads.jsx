import {React, useEffect, useState} from "react";
import s from './Ads.module.css'

import { useDispatch, useSelector } from "react-redux";
import Card from "../../Components/Card";
import { handleAds, handleCredentials } from "../../Features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";


const Ads = () => {
	const dispatch = useDispatch()
    const adsPosted = useSelector((state) => state.Auth.adsPosted);
    const wishlist = useSelector((state) => state.Auth.wishlist);
		const user  = useSelector((state) => state.Auth.user)
		const FetchDetails = async () => {
			try{ 
				const res = await fetch("http://localhost:7000/api/auth/get", {
				method: "GET",
				credentials:'include'
		})
				const data = await res.json();
			
			if (res.ok) {
			 dispatch(handleAds(data.msg))
			 dispatch(handleCredentials(data.user))
			} else {
				toast.error(data.message || 'Login failed!');
				console.error("Login failed", data.message);
			}}
			catch(error){
				console.error("error " , error)
			}
		}
		const isLoggedin  = useSelector((state) => state.Auth.isLoggedin)
	const navigate = useNavigate()
	useEffect(() => {
			if (isLoggedin == 'false'){
				toast.error("login first please!")
				navigate('/')
			}
			else{
				FetchDetails()
			}
	},[])
    return (
        <>
            <div className={s.wrapper}>
                <div className={s.parent}>
                    <div className={s.heading}>
                        Your <span className={s.head}>Ads Posted</span>
                    </div>
                    <div className={s.products}>
                        {adsPosted.length == 0 ? (
                            <div>you haven't posted any Ads yet!</div>
                        ) : (
                            adsPosted.map((ele) => (
															<Card 
															id={ele.product._id} 
															Category={ele.product.category}
															Title={ele.product.title} 
															Price={ele.product.sellingPrice} 
															city={ele.product.location} 
															// Img={ele.img} 
															createdAt={ele.product.createdAt}
															createdBy={ele.product.createdBy._id}
															Wishlist={wishlist}
														/>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ads;
