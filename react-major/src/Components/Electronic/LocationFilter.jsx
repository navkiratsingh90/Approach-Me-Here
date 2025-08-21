import React from "react";
import s from './Electronic.module.css'
import { indianCities } from "../../Utils/IndianCities";
import { HandleLoc } from "../../Features/Electronic/ElectronicSlice";
import { useDispatch } from "react-redux";

const LocationFilter = () => {
	const dispatch = useDispatch()
    return (
        <>
            <select
                name="location"
                className={s.InputField}
                value={Location}
                onChange={(e) =>
                    dispatch(
                        HandleLoc({
                            value: e.target.value,
                            loc: "Electronics",
                        })
                    )
                }
                required
            >
                <option value="location">Location</option>
                {indianCities.map((ele, idx) => (
                    <option className="options" key={idx} value={ele}>
                        {ele}
                    </option>
                ))}
            </select>
        </>
    );
};

export default LocationFilter;
