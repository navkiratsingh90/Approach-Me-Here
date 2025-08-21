import React, { useEffect, useState } from 'react'
import s from './Wishlist.module.css'
import Card from '../../Components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { handleCredentials, handleWishlist } from '../../Features/Auth/AuthSlice'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
    const dispatch = useDispatch()
    // const token = useSelector((state) => state.Auth.token)
    const wishlist = useSelector((state) => state.Auth.wishlist)
    const user = useSelector((state) => state.Auth.user)
	const [products, setproducts] = useState()
    const FetchWishlist = async () => {
        try{ 
          const res = await fetch("http://localhost:7000/api/auth/wishlist/get", {
          method: "GET",
          credentials:'include'
      })
          const data = await res.json();
        
        if (res.ok) {
          console.log("fetch successful");
          console.log(data);
         dispatch(handleWishlist(data.msg))
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
	// console.log(user);
	useEffect(() => {
		console.log(typeof(isLoggedin));
			if (isLoggedin == 'false'){
        toast.error("login first please!")
				navigate('/')
			}
      else{
        FetchWishlist()
      }
	},[])
	return (
        <>
            <div className={s.wrapper}>
                <div className={s.parent}>
                    <div className={s.heading}>
                        Your <span className={s.head}>Wishlist</span>
                    </div>
                    <div className={s.products}>
                        {
                            wishlist.length == 0 ? 
                            <div>Your Wishlist is Empty</div>
                             : 
                            wishlist.map((ele,idx) => <Card 
                            key={idx}
                            id={ele.product._id} 
                            Category={ele.product.category}
                            Title={ele.product.title} 
                            Price={ele.product.sellingPrice} 
                            city={ele.product.location} 
                            Img={ele.product.imgUrl} 
                            createdAt={ele.product.createdAt}
                            createdBy={ele.product.createdBy._id}
                            Wishlist={wishlist}
                          />)
                        }
                        {/* <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wishlist