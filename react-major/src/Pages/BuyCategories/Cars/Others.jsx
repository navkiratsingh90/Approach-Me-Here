import {React, useEffect, useState} from 'react'
import s from './Main.module.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { HandleHigh, HandleLow , addOtherItems} from '../../../Features/Others/OtherSlice'
import Sort from '../../../Components/Sort'
import Loader from '../../../Components/Loader'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DisplayProducts from '../../../Components/DisplayProducts'
import Pagination from '../../../Components/Pagination'
const Others = () => {
    // const token = useSelector((state) => state.Auth.token)
    const [isSidebarOpen,setIsSidebarOpen] = useState(false)
    const [wishlist,setWishlist] = useState(null)
	const dispatch = useDispatch()
    const Others = useSelector((state) => state.Other.Others)
    const FuncLow = () => {
        dispatch(HandleLow());
    };
    const FuncHigh= () => {
        dispatch(HandleHigh());
    };
	const start = useSelector((state) => state.Pagination.start)
    const end = useSelector((state) => state.Pagination.end)
    const isActive = useSelector((state) => state.Pagination.isActive)
    const handleFetch = async () => {
        try {
            const res =  await fetch("http://localhost:7000/api/other/get", {
                method: "GET",
                credentials:'include'
        })
            const data = await res.json();
            if (res.ok) {
                console.log("fetch successful");
                 console.log(data);
                 dispatch(addOtherItems({payload: data.msg}))
                // setnewData(data.msg);
                // setUserData(data.userData)
            } else {
                toast.error(data.message || "Login failed!");
                console.error("Login failed", data.message);
            }
        } catch (error) {
            console.error("error ", error);
        }
    }
    const HandleWishlist = async () => {
        try {
            const res =  await fetch("http://localhost:7000/api/auth/wishlist/get", {
                method: "GET",
                credentials:'include'
                
        })
            const data = await res.json();
            if (res.ok) {
                console.log("fetch successful", data);
                setWishlist(data.msg)
                //  dispatch(handleCredentials({payload : data.msg}))
            } else {
                toast.error(data.message || "Login failed!");
                console.error("Login failed", data.message);
            }
        } catch (error) {
            console.error("error ", error);
        }
    }

    const isLoggedin  = useSelector((state) => state.Auth.isLoggedin)
	const user  = useSelector((state) => state.Auth.user)
	const navigate = useNavigate()
	// console.log(user);
	useEffect(() => {
		console.log(typeof(isLoggedin));
			if (isLoggedin == 'false'){
                toast.error("Login first please")
				navigate('/')
			}
            else{
                handleFetch()
                HandleWishlist()
            }
	},[])
    if (!wishlist) return <Loader/>
	return (
        <>
             <div className={s.wrapper}>
  <div className={s.parent}>
    <div className={s.heading}>
      <div className={s.head}>
        <div className={s.h1}>Others for Sale</div>
        <div className={s.p}>
          200 Used Others in India - Buy & Sell Second Hand Cars
        </div>
      </div>
      <div className={s.ham}>
        <button 
          className={s.hamburgerBtn}
          onClick={() => setIsSidebarOpen(true)}
        >
          <GiHamburgerMenu/> Filters & Sort
        </button>
      </div>
    </div>
    
    <div className={s.ads}>
      <div className={s.sortFilterDesktop}>
        <div className={s.sortFilter}>
          <div className={s.sort}>
            <Sort name={'Sort'} FuncLow={FuncLow} FuncHigh={FuncHigh}/>
          </div>
        </div>
      </div>

      <div className={`${s.sidebarOverlay} ${isSidebarOpen ? s.active : ''}`} 
           onClick={() => setIsSidebarOpen(false)}>
        <div className={s.sidebar} onClick={(e) => e.stopPropagation()}>
          <button 
            className={s.closeBtn}
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
          <div className={s.sort}>
            <Sort name={'Sort'} FuncLow={FuncLow} FuncHigh={FuncHigh}/>
          </div>
        </div>
      </div>
      
      <div className={s.left}>
      <DisplayProducts Category={Others} wishlist={wishlist}/>
      <Pagination Category={Others}/>
      </div>
    </div>
  </div>
</div>
        </>
    );
}

export default Others