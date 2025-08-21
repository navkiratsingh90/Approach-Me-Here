import React, { useEffect, useState } from 'react'
import s from './Main.module.css'
import Card from '../../../Components/Card'
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5'; // for close icon
import { useDispatch, useSelector } from 'react-redux'
import { HandleHigh , HandleLow, addCarItems, HandleAllFilters} from '../../../Features/Car/CarSlice'
// import { HandleSlideLeft,HandleSlideRight } from '../../../Features/PageSlice';
import Sort from '../../../Components/Sort'
import PriceFilter from '../../../Components/PriceFilter';
import Loader from '../../../Components/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BrandFilter from '../../../Components/BrandFilter';
import FuelFilter from '../../../Components/FuelFilter';
import DisplayProducts from '../../../Components/DisplayProducts';
import Pagination from '../../../Components/Pagination';

const Cars = () => {
    // const token = useSelector((state) => state.Auth.token)
	const dispatch = useDispatch()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [wishlist, setWishlist] = useState(null);
    const Cars = useSelector((state) => state.Car.Cars)
    const carFuel = useSelector((state) => state.Car.Fuel)
	const carBrands = useSelector((state) => state.Car.Brand)
   const budget = ["default","Below 1 Lac","1 to 3 Lac","3 to 5 Lac","Above 5 Lac"]
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
            const res =  await fetch("http://localhost:7000/api/car/get", {
                method: "GET",
                credentials:'include'
        })
            const data = await res.json();
            if (res.ok) {
                console.log("fetch successful");
                //  console.log(data);
                 dispatch(addCarItems({payload: data.msg}))
                // setnewData(data.msg);
                // setUserData(data.userData)
            } else {
                toast.error(data.message || "Login failed!");
                console.error("Login failed", data.msg);
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
                console.log("fetch successful", data.msg);
                setWishlist(data.msg)
                // wish.map((ele) => setWishlist(...wishlist, ele.product._id))

                //  dispatch(handleCredentials({payload : data.msg}))
            } else {
                toast.error("Login first please!");
                console.error("Login failed", data.msg);
            }
        } catch (error) {
            console.error("error ", error);
        }
    }

    const isLoggedin  = useSelector((state) => state.Auth.isLoggedin)
	const user  = useSelector((state) => state.Auth.user)
	const navigate = useNavigate()
	useEffect(() => {
			if (isLoggedin === 'false'){
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
                            <div className={s.h1}>Cars for Sale</div>
                            <div className={s.p}>
                                {Cars.length} Used Cars in India - Buy & Sell Second Hand
                                Cars
                            </div>
                        </div>
                        <div className={s.ham}>
                            <button
                                className={s.hamburgerBtn}
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <GiHamburgerMenu /> Filters & Sort
                            </button>
                        </div>
                    </div>

                    <div className={s.ads}>
                        <div className={s.sortFilterDesktop}>
                            <div className={s.sortFilter}>
                                <div className={s.sort}>
                                    <Sort
                                        name={"Sort"}
                                        FuncLow={FuncLow}
                                        FuncHigh={FuncHigh}
                                    />
                                </div>
                                <div className={s.filter}>
                                    <div className={s.name}>Filter</div>
                                    <div className={s.filterCategories}>
                                        <div className={s.main}>
                                            <BrandFilter
                                                category={"Car"}
                                                Brands={carBrands}
                                            />
                                            <button
                                                onClick={() =>
                                                    dispatch(HandleAllFilters())
                                                }
                                                className={s.btn}
                                            >
                                                submit
                                            </button>
                                        </div>
                                        <div className={s.budget}>
                                            <PriceFilter
                                                category={"Car"}
                                                budget={budget}
                                            />
                                        </div>
                                        <div className={s.main}>
                                            <div className={s.fuel}>
                                                <FuelFilter
                                                    Fuels={carFuel}
                                                    category={"Car"}
                                                />
                                            </div>
                                            <button
                                                onClick={() =>
                                                    dispatch(HandleAllFilters())
                                                }
                                                className={s.btn}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${s.sidebarOverlay} ${
                                isSidebarOpen ? s.active : ""
                            }`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <div
                                className={s.sidebar}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className={s.closeBtn}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    &times;
                                </button>
                                <div className={s.sort}>
                                    <Sort
                                        name={"Sort"}
                                        FuncLow={FuncLow}
                                        FuncHigh={FuncHigh}
                                    />
                                </div>
                                <div className={s.filter}>
                                    <div className={s.name}>Filter</div>
                                    <div className={s.filterCategories}>
                                        <div className={s.main}>
                                            <BrandFilter
                                                category={"Car"}
                                                Brands={carBrands}
                                            />
                                            <button
                                                onClick={() => {
                                                    dispatch(
                                                        HandleAllFilters()
                                                    );
                                                    setIsSidebarOpen(false);
                                                }}
                                                className={s.btn}
                                            >
                                                submit
                                            </button>
                                        </div>
                                        <div className={s.budget}>
                                            <PriceFilter
                                                category={"Car"}
                                                budget={budget}
                                            />
                                        </div>
                                        <div className={s.main}>
                                            <div className={s.fuel}>
                                                <FuelFilter
                                                    Fuels={carFuel}
                                                    category={"Car"}
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    dispatch(
                                                        HandleAllFilters()
                                                    );
                                                    setIsSidebarOpen(false);
                                                }}
                                                className={s.btn}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.left}>
                            <DisplayProducts
                                Category={Cars}
                                wishlist={wishlist}
                            />
                            <Pagination Category={Cars} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cars