import {React, useEffect, useState} from 'react'
import s from './Main.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { HandleHigh , HandleLow, HandleAllFilters,  addBikeItems} from '../../../Features/Bike/BikeSlice'
// import { HandleSlideLeft,HandleSlideRight } from '../../../Features/PageSlice';
import Sort from '../../../Components/Sort'
import PriceFilter from '../../../Components/PriceFilter'
import Loader from '../../../Components/Loader'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BrandFilter from '../../../Components/BrandFilter'
import FuelFilter from '../../../Components/FuelFilter'
import DisplayProducts from '../../../Components/DisplayProducts'
import Pagination from '../../../Components/Pagination'
import { GiHamburgerMenu } from 'react-icons/gi'

const Bikes = () => {
    // const token = useSelector((state) => state.Auth.token)
	const dispatch = useDispatch()
    const [isSidebarOpen,setIsSidebarOpen] = useState(false)
    const Bikes = useSelector((state) => state.Bike.Bikes)
    const [wishlist, setWishlist] = useState(null);
    const bikeFuel = useSelector((state) => state.Bike.Fuel)
	const bikeBrands = useSelector((state) => state.Bike.Brand)
    const budget = ["default","Below 40k","40 to 60k","60 to 99k","Above 1 Lac"]
    
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
            const res =  await fetch("http://localhost:7000/api/bike/get", {
                method: "GET",
                credentials:'include'
        })
            const data = await res.json();
            if (res.ok) {
                console.log("fetch successful");
                 dispatch(addBikeItems({payload: data.msg}))
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
			if (isLoggedin == 'false'){
                toast.error("Login first please")
				navigate('/')
			}
            else{
                handleFetch()
                HandleWishlist()
            }
	},[])
    if (!wishlist){
        return <Loader/>
    }
	return (
        <>
            {/* <div className={s.wrapper}>
                <div className={s.parent}>
                    <div className={s.heading}>
                        <div className={s.h1}>Bikes for Sale</div>
                        <div className={s.p}>
                            {Bikes.length} Used Bikes in India - Buy & Sell Second Hand Bikes
                        </div>
                    </div>
                    <div className={s.ads}>
                        <div className={s["sortFilter"]}>
                            <div className={s["sort-filter"]}>
                            <Sort name={'Sort'} FuncLow={FuncLow} FuncHigh={FuncHigh}/>
                                <div className={s.filter}>
                                    <div className={s.name}>Filter</div>
                                    <div className={s.filterCategories}>
                                        <div className={s.main}>
                                            <div className={s.brand}>
                                                <BrandFilter Brands={bikeBrands} category={'Bike'}/>
                                            </div>
                                            <button onClick={() => dispatch(HandleAllFilters())} className={s.btn}>
                                                submit
                                            </button>
                                        </div>

                                        <div className={s.budget}>
                                            <PriceFilter category={'Bike'} budget={budget}/>
                                        </div>
                                        <div className={s.main}>
                                            <div className={s.fuel}>
                                                <FuelFilter category={'Bike'} Fuels={bikeFuel}/>
                                            </div>
                                            <button onClick={() => dispatch(HandleAllFilters())} className={s.btn}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.left}>
                            <DisplayProducts Category={Bikes} wishlist={wishlist}/>
                            <Pagination Category={Bikes}/>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className={s.wrapper}>
  <div className={s.parent}>
    <div className={s.heading}>
      <div className={s.head}>
        <div className={s.h1}>Cars for Sale</div>
        <div className={s.p}>
          200 Used Cars in India - Buy & Sell Second Hand Cars
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
          <div className={s.filter}>
            <div className={s.name}>Filter</div>
            <div className={s.filterCategories}>
              <div className={s.main}>
              <BrandFilter Brands={bikeBrands} category={'Bike'}/>
                <button
                  onClick={() => dispatch(HandleAllFilters())}
                  className={s.btn}
                >
                  submit
                </button>
              </div>
              <div className={s.budget}>
                <PriceFilter category={'Car'} budget={budget}/>
              </div>
              <div className={s.main}>
                <div className={s.fuel}>
                  <FuelFilter Fuels={bikeFuel} category={'Bike'}/>
                </div>
                <button onClick={() => dispatch(HandleAllFilters())} className={s.btn}>
                  Submit
                </button>
              </div>
            </div>
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
          <div className={s.filter}>
            <div className={s.name}>Filter</div>
            <div className={s.filterCategories}>
              <div className={s.main}>
                <BrandFilter category={'Bike'} Brands={bikeBrands}/>
                <button
                  onClick={() => {
                    dispatch(HandleAllFilters());
                    setIsSidebarOpen(false);
                  }}
                  className={s.btn}
                >
                  submit
                </button>
              </div>
              <div className={s.budget}>
              <PriceFilter category={'Bike'} budget={budget}/>
              </div>
              <div className={s.main}>
                <div className={s.fuel}>
                <FuelFilter category={'Bike'} Fuels={bikeFuel}/>
                </div>
                <button onClick={() => {
                  dispatch(HandleAllFilters());
                  setIsSidebarOpen(false);
                }} className={s.btn}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={s.left}>
      <DisplayProducts Category={Bikes} wishlist={wishlist}/>
      <Pagination Category={Bikes}/>
      </div>
    </div>
  </div>
</div>
        </>
    );
}

export default Bikes