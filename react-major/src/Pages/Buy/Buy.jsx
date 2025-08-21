import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PostCard from './PostCard'
import Categories from '../../Components/Categories'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Buy = () => {
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
			<Categories action={'buy'}/>
			<PostCard/>
		</>
	)
}

export default Buy
// src/components/CategorySection.jsx

// src/components/CategorySection.jsx

// import React from 'react';
// import { FaCar, FaMotorcycle, FaMobileAlt, FaTv, FaCouch, FaBriefcase } from 'react-icons/fa';
// import s from './Buy.module.css'; // Notice the .module.css!

// const categories = [
//   { icon: <FaCar />, label: 'Car', link: '/buy/Cars' },
//   { icon: <FaMotorcycle />, label: 'Bike', link: '/buy/Bikes' },
//   { icon: <FaMobileAlt />, label: 'Mobile', link: '/buy/Mobiles' },
//   { icon: <FaTv />, label: 'Electronic', link: '/buy/Electronics' },
//   { icon: <FaCouch />, label: 'Furniture', link: '/buy/Furniture' },
//   { icon: <FaBriefcase />, label: 'Others', link: '/buy/Others' },
// ];

// const Buy = () => {
//   return (
//     <section className={s.categorySection}>
//       <h2 className={s.categoryTitle}>Select your Category</h2>
//       <div className={s.categoryGrid}>
//         {categories.map((cat, index) => (
//           <a key={index} href={cat.link} className={s.categoryCard}>
//             <div className={s.categoryIcon}>{cat.icon}</div>
//             <div className={s.categoryLabel}>{cat.label}</div>
//           </a>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Buy;


