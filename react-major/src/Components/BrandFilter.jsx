import React from "react";
import s from "../Pages/BuyCategories/Cars/Main.module.css";
import { HandleBrandCheck as CarFilters } from "../Features/Car/CarSlice";
import { HandleBrandCheck as BikeFIlters } from "../Features/Bike/BikeSlice";
import { HandleBrandCheck as ElectronicFilters } from "../Features/Electronic/ElectronicSlice";
import { HandleBrandCheck as MobileFilters } from "../Features/Mobile/MobileSlice";
import { useDispatch } from "react-redux";

const BrandFilter = ({ Brands, category }) => {
    const dispatch = useDispatch();
    const handleBrands = ({ name, checked, idx, Brand }) => {
        if (category == "Car") {
            dispatch(CarFilters({ name, checked, idx, Brand }));
        } else if (category == "Bike") {
            dispatch(BikeFIlters({ name, checked, idx, Brand }));
        } else if (category == "Electronic") {
            dispatch(ElectronicFilters({ name, checked, idx, Brand }));
        } else {
            dispatch(MobileFilters({ name, checked, idx, Brand }));
        }
    };
    return (
        <>
            <div className={s.brand}>
                <div className={s.subname}>All Brands</div>
                <div className={s.brandinputs}>
                    {Brands.map((ele, idx) => (
                        <div key={idx} className={s.check}>
                            <input
                                type="checkbox"
                                checked={ele.checked}
                                onChange={(e) =>
                                    handleBrands({
                                        name: e.target.name,
                                        checked: e.target.checked,
                                        idx,
                                        Brand: ele.brandName,
                                    })
                                }
                                name={"checked"}
                                className={s.checkbox}
                            />
                            <p className={s.para}>{ele.brandName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BrandFilter;
