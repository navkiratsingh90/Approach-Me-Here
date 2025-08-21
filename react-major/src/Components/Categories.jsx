import React, { useEffect, useState } from "react";
import s from "./Categories.module.css";
import { Link } from "react-router-dom";
import {
    FaCar,
    FaMotorcycle,
    FaMobileAlt,
    FaTv,
    FaCouch,
    FaBriefcase,
} from "react-icons/fa";
import { useActionState } from "react";

const Categories = ({ action }) => {
    const [SellCategory, setSellcategory] = useState([
        {
            name: "Car",
            Icon: <FaCar size={50} />,
        },
        {
            name: "Bike",
            Icon: <FaMotorcycle size={50} />,
        },
        {
            name: "Mobile",
            Icon: <FaMobileAlt size={50} />,
        },
        {
            name: "Electronic",
            Icon: <FaTv size={50} />,
        },
        {
            name: "Furniture",
            Icon: <FaCouch size={50} />,
        },
        {
            name: "Other",
            Icon: <FaBriefcase size={50} />,
        },
    ]);

    return (
        <>
            <div className={s.wrapper}>
                <div className={s.parent}>
                    <h1 className={s.h1}>Select your Category</h1>
                    <div className={s.Categories}>
                        <div className={s.categoryImg}>
                            {SellCategory.map((ele, idx) => (
                                <Link
                                    key={idx}
                                    to={`/${action}/${ele.name}${
                                        action == "sell" ? "Form" : "s"
                                    }`}
                                >
                                    <div className={s["banner-parent"]}>
                                        <div className={s.banner}>
                                            <div className={s.icon}>
                                                {ele.Icon}
                                            </div>
                                        </div>
                                        <div className={s.title}>
                                            {ele.name}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;
