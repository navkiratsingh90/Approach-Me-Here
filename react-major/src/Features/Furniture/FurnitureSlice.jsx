import { createSlice } from '@reduxjs/toolkit';
import dt from '../../assets/Furniture/dt.png'
import bed from '../../assets/Furniture/bed.png'
import sofa from '../../assets/Furniture/sofa.png'
import almirah from '../../assets/Furniture/almirah.png'
import table from '../../assets/Furniture/table.png'
import { FaTableTennisPaddleBall } from 'react-icons/fa6';

const initialState = {
	Furniture: [],
	RealFurniture : [],
  TestFurniture: [],
    priceRange: {"default": [0,Infinity],"Below 10k" : [0,10000],"10 to 30k":[10001,30000],"30 to 60k":[30001,60000],"Above 60k":[60001,Infinity]},
};

const Furniturelice = createSlice({
  name: 'Furniture',
  initialState,
  reducers: {
    addFurnitureItems: (state,action) => {
      state.Furniture.length = 0
      const mainData = action.payload.payload
      console.log(mainData);
      mainData.map((ele) => {
        state.Furniture.push(ele)
        state.RealFurniture.push(ele)
        state.TestFurniture.push(ele)
      })
    },
		HandleHigh : (state,action) => {
      state.Furniture.sort((a,b) => b.sellingPrice - a.sellingPrice)
    },
    HandleLow : (state,action) => {
      state.Furniture.sort((a,b) => a.sellingPrice - b.sellingPrice)
    },
		HandleAllFilters : (state,action) => {
      const data = action.payload
      const range = state.priceRange[data] || state.priceRange["default"];
      state.Furniture = state.RealFurniture.filter((ele) => {
        const priceMatch =
                  ele.sellingPrice > range[0] && ele.sellingPrice < range[1];
            return priceMatch
      })
    }

  },
});

// Export actions
export const {addFurnitureItems, HandleHigh,HandleLow, HandleAllFilters, HandleData} = Furniturelice.actions;

// Export reducer
export default Furniturelice.reducer;