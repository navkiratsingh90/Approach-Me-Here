import React, { useEffect } from 'react'
import s from './Sell.module.css'
import Resale from '../../assets/Resale.jpg'
import Features from './Features'
import Categories from '../../Components/Categories'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Sell = () => {
	const isLoggedin  = useSelector((state) => state.Auth.isLoggedin)
	const user  = useSelector((state) => state.Auth.user)
	const navigate = useNavigate()
	// console.log(user);
	useEffect(() => {
		console.log(typeof(isLoggedin));
			if (isLoggedin == 'false'){
				toast.error("login first please!")
				navigate('/')
			}
	},[])
	return (
		<>
				<Features/>
				<Categories action={'sell'}/>
		</>
	)
}

export default Sell