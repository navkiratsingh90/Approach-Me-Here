import { React, useEffect, useState } from "react";
import s from "./Main.module.css";
import Card from "../../../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
    HandleHigh,
    HandleLow,
    addMobilesItems,
    HandleAllFilters,
} from "../../../Features/Mobile/MobileSlice";
// import { HandleSlideLeft,HandleSlideRight } from '../../../Features/PageSlice';
import Sort from "../../../Components/Sort";
import PriceFilter from "../../../Components/PriceFilter";
import Loader from "../../../Components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BrandFilter from "../../../Components/BrandFilter";
import Pagination from "../../../Components/Pagination";
import DisplayProducts from "../../../Components/DisplayProducts";
import { GiHamburgerMenu } from "react-icons/gi";
const Mobiles = () => {
    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const Mobiles = useSelector((state) => state.Mobile.Mobiles);
    const mobileBrands = useSelector((state) => state.Mobile.Brand);
    const [wishlist, setWishlist] = useState(null);
    const budget = [
        "default",
        "Below 20k",
        "20 to 40k",
        "40 to 80k",
        "Above 80k",
    ];
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
            console.log("fetching");
            const res = await fetch("http://localhost:7000/api/mobile/get", {
                method: "GET",
                credentials: "include",
            });
            console.log(res.status);
            const data = await res.json();
            if (res.ok) {
                console.log("fetch successful mobiles");
                console.log(data);
                dispatch(addMobilesItems({ payload: data.msg }));
                // setnewData(data.msg);
                // setUserData(data.userData)
            } else {
                toast.error(data.message || "Login failed!");
                console.error("Login failed", data.msg);
            }
        } catch (error) {
            console.error("error ", error);
        } finally {
            console.log("fetch done");
        }
    };
    const HandleWishlist = async () => {
        try {
            const res = await fetch(
                "http://localhost:7000/api/auth/wishlist/get",
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (res.ok) {
                console.log("fetch successful", data);
                setWishlist(data.msg);
                //  dispatch(handleCredentials({payload : data.msg}))
            } else {
                toast.error(data.message || "Login failed!");
                console.error("Login failed", data.message);
            }
        } catch (error) {
            console.error("error ", error);
        }
    };

    const isLoggedin = useSelector((state) => state.Auth.isLoggedin);
    const user = useSelector((state) => state.Auth.user);
    const navigate = useNavigate();
    // console.log(user);
    useEffect(() => {
        console.log(typeof isLoggedin);
        if (isLoggedin == "false") {
            toast.error("Login first please");
            navigate("/");
        } else {
            handleFetch();
            HandleWishlist();
        }
    }, []);
    // useEffect(() => {
    //     handleFetch()
    // },[])
    if (!wishlist) return <Loader />;
    return (
        <>
            <div className={s.wrapper}>
                <div className={s.parent}>
                    <div className={s.heading}>
                        <div className={s.head}>
                            <div className={s.h1}>Cars for Sale</div>
                            <div className={s.p}>
                                200 Used Mobiles in India - Buy & Sell Second
                                Hand Cars
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
                                                Brands={mobileBrands}
                                                category={"Mobile"}
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
                                                category={"Mobile"}
                                                Brands={mobileBrands}
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
                                                category={"Mobile"}
                                                budget={budget}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.left}>
                            <DisplayProducts
                                Category={Mobiles}
                                wishlist={wishlist}
                            />
                            <Pagination Category={Mobiles} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mobiles;
