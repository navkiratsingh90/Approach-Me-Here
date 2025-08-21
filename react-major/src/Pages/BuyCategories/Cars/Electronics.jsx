import { React, useEffect, useState } from "react";
import s from "./Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { indianCities } from "../../../Utils/IndianCities";
import {
    HandleAllFilters,
    HandleHigh,
    HandleLow,
    addElectronicItems,
} from "../../../Features/Electronic/ElectronicSlice";
// import { HandleSlideLeft, HandleSlideRight } from "../../../Features/PageSlice";
import Sort from "../../../Components/Sort";
import {  useNavigate } from "react-router-dom";

// import LocationFilter from "../../../Components/Electronic/LocationFilter";
import Loader from "../../../Components/Loader";
import { toast } from 'react-toastify'
import BrandFilter from "../../../Components/BrandFilter";
import DisplayProducts from "../../../Components/DisplayProducts";
import Pagination from "../../../Components/Pagination";
import PriceFilter from "../../../Components/PriceFilter";
import { GiHamburgerMenu } from "react-icons/gi";

const Electronics = () => {
    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const Electronics = useSelector((state) => state.Electronic.Electronics);
    const electronicBrands = useSelector((state) => state.Electronic.Brand);
    const [wishlist, setWishlist] = useState(null);
    const budget = ["default","Below 20k","20 to 40k","40 to 60k","Above 60k"]
    const FuncLow = () => {
        dispatch(HandleLow());
    };
    const FuncHigh = () => {
        dispatch(HandleHigh());
    };
    const start = useSelector((state) => state.Pagination.start);
    const end = useSelector((state) => state.Pagination.end);
    const isActive = useSelector((state) => state.Pagination.isActive);
    const handleFetch = async () => {
        try {
            const res = await fetch(
                "http://localhost:7000/api/electronic/get",
                {
                    method: "GET",
                    credentials:'include'
                }
            );
            const data = await res.json();
            if (res.ok) {
                console.log("fetch successful");
                dispatch(addElectronicItems({ payload: data.msg }));
            } else {
                toast.error(data.message || "Login failed!");
                console.error("Login failed", data.message);
            }
        } catch (error) {
            console.error("error ", error);
        }
    };
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

	useEffect(() => {
			if (isLoggedin == 'false'){
                toast.error("Login first please")
				navigate('/')
			}
      else{
        handleFetch();
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
                                200 Used Electronics in India - Buy & Sell
                                Second Hand Cars
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
                                                Brands={electronicBrands}
                                                category={"Electronic"}
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
                                                category={"ELectronic"}
                                                budget={budget}
                                            />
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
                                                category={"Electronic"}
                                                Brands={electronicBrands}
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
                                                category={"Electronic"}
                                                budget={budget}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.left}>
                            <DisplayProducts
                                Category={Electronics}
                                wishlist={wishlist}
                            />
                            <Pagination Category={Electronics} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Electronics;
