import React from "react";
import s from "../Pages/BuyCategories/Cars/Main.module.css";
import { HandleFuelCheck as CarFilters } from '../Features/Car/CarSlice';
import { HandleFuelCheck  as BikeFIlters} from '../Features/Bike/BikeSlice';
import { useDispatch } from "react-redux";

const FuelFilter = ({Fuels, category}) => {
    const dispatch = useDispatch()
	const handleFuels = ({name,checked,idx,Fuel}) => {
		if (category == 'Car'){
			dispatch(CarFilters({name,checked,idx,Fuel}))
		}
        else {
					dispatch(BikeFIlters({name,checked,idx,Fuel}))
        }
	}
    return (
        <>
            <div className={s.subname}>Fuel Type</div>
            <div className={s.brandinputs}>
                {Fuels.map((ele, idx) => (
                    <div key={idx} className={s.check}>
                        <input
                            type="checkbox"
                            checked={ele.checked}
                            onChange={(e) => handleFuels({name : e.target.name, checked: e.target.checked,
															idx, 
															Fuel: ele.Fueltype})}
                            className={s.checkbox}
                            name={"checked"}
                        />
                        <p className={s.para}>{ele.Fueltype}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FuelFilter;
