import React, { useEffect, useState } from 'react'
import s from './Card.module.css'
import { FaHeart, FaRegHeart, FaRupeeSign } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleCredentials, handleLoading } from '../Features/Auth/AuthSlice'
import UserDetails from './UserDetails'
import Loader from './Loader'


const Card = ({Img,Title,Price, city, Category, id, Wishlist , createdBy, createdAt, User}) => {
    const user = useSelector((state) => state.Auth.user) || User
    const dispatch = useDispatch()
    const category = Category.toLocaleLowerCase()
    const prodDetails = useSelector((state) => state.Wishlist.prodDetails)
	const HandleDelete = async (id) => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to undo this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
        });
        if (result.isConfirmed) {
          try {
            const res = await fetch(`http://localhost:7000/api/${category}/delete/${id}`, {
              method: "DELETE",
              credentials: 'include',
              headers: {
                "Content-Type": "application/json",
              }
            });
      
            const data = await res.json();
            if (res.ok) {
              Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
              // Optionally refresh data or remove the item from the local state
            } else {
              // toast.error(data.message || "Delete failed!");
              console.error("Delete failed", data.msg);
            }
          } catch (error) {
            console.error(`error ${error}`);
          }
        }
      };
      
    const HandleWishlist = async () => {
        try {
            const res = await fetch(`http://localhost:7000/api/auth/wishlist/add`, {
              method: "POST",
              credentials:'include',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id,
                Category
              }) // ✅ send directly, not wrapped in {LoginFields}
            });
        
            const data = await res.json();
        
            if (res.ok) {
              
              toast.success('item added or deleted successfully!');
             
            } else {
            //   toast.error(data.message || ' failed!')
              console.error("register failed", data.msg);
            }
          } catch (error) {
            toast.error("Network error");
            console.error("Network error", error);
          }
    }
    
    if (!Wishlist || !user){
      return <Loader/>
    }
	return (
        <>
            <div className={s.parent}>
                <div >
                    <button onClick={() => HandleWishlist()} className={s.wish}>
                    
                    {
                      Wishlist.some((ele) => ele.product._id == id) ? <FaHeart fill='red' size={18} /> : <FaRegHeart size={18 }/>
                    }
                    </button>
                
                </div>
                <div className={s.card}>
                    <div className={s.img}>
                        <img src={Img} alt="" />
                    </div>
                    <div className={s.info}>
                        <div className={s.price}>
                            <FaRupeeSign /> {Price?.toLocaleString()}/-
                        </div>
                        <div className={s.title}>
                            {Title}
                        </div>
                    </div>
                    <div className={s.Location}>
                        <div className={s.loc}>{city}</div>
                        <div className={s.date}>{createdAt.slice(0,10)}</div>
                    </div>
                    <div className={s.btns}>
                    <button className={s.btn1} >
                    <Link to={`/buy/${Category}/${id}`}> View More...</Link>
                        </button>
                        {
                            user._id == createdBy? <button onClick={() => HandleDelete(id)} className={s.btn2}>Delete</button> : ""
                        }
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card