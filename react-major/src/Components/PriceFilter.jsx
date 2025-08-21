
import React, { useState } from 'react';
import s from '../Pages/BuyCategories/Cars/Main.module.css';
import { useDispatch } from 'react-redux';
import { HandleAllFilters as CarFilters } from '../Features/Car/CarSlice';
import { HandleAllFilters as BikeFIlters } from '../Features/Bike/BikeSlice';
import { HandleAllFilters as ElectronicFilters } from '../Features/Electronic/ElectronicSlice';
import { HandleAllFilters as MobileFilters } from '../Features/Mobile/MobileSlice';
import { HandleAllFilters as FurnitureFilters } from '../Features/Furniture/FurnitureSlice';

const PriceFilter = ({ budget, category }) => {
  const dispatch = useDispatch();
  const [selectedBudget, setSelectedBudget] = useState(null);
  
  const handlePrice = (priceOption) => {
    // Toggle selection if clicking the same option again
    const newSelection = selectedBudget === priceOption ? null : priceOption;
    setSelectedBudget(newSelection);
    
    // Dispatch the filter action
    if (category === 'Car') {
      dispatch(CarFilters(newSelection));
    } else if (category === 'Bike') {
      dispatch(BikeFIlters(newSelection));
    } else if (category === 'Electronic') {
      dispatch(ElectronicFilters(newSelection));
    } else if (category === 'Mobile') {
      dispatch(MobileFilters(newSelection));
    } else {
      dispatch(FurnitureFilters(newSelection));
    }
  };

  return (
    <>
      <div className={s.name}>Budget</div>
      <div className={s.btns}>
        {budget.map((ele, idx) => (
          <button
            onClick={() => handlePrice(ele)}
            key={idx}
            className={`${s.sortBtn} ${selectedBudget === ele ? s.selected : ''}`}
          >
            {ele}
          </button>
        ))}
      </div>
    </>
  );
};

export default PriceFilter;