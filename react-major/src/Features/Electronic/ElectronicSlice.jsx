import { createSlice } from '@reduxjs/toolkit';
import ac from '../../assets/Electronics/ac.png'
import wm from '../../assets/Electronics/wm.png'
import fridge from '../../assets/Electronics/fridge.png'
import tv from '../../assets/Electronics/tv.png'
import microwave from '../../assets/Electronics/microwave.png'
import { Brand } from '../../Utils/ElectronicBrands';


const initialState = {
	Brand :  Brand,
  Location : "",
	Electronics: [],
  priceRange: {"default": [0,Infinity],"Below 20k" : [0,20000],"20 to 40k":[20001,40000],"40 to 60k":[40001,60000],"Above 60k":[60001,Infinity]},
	RealElectronics :[],
	AllBrands : [],
};

const ElectronicSlice = createSlice({
  name: 'Electronic',
  initialState,
  reducers: {
    addElectronicItems: (state,action) => {
      state.Electronics.length = 0
      // console.log(action.payload);
      const mainData = action.payload.payload
      // console.log(mainData);
      mainData.map((ele) => state.Electronics.push(ele))
      mainData.map((ele) => state.RealElectronics.push(ele))
      // console.log(JSON.parse(JSON.stringify(state.Cars)));
    },
		HandleHigh : (state,action) => {
      state.Electronics.sort((a,b) => b.sellingPrice - a.sellingPrice)
    },
    HandleLow : (state,action) => {
      state.Electronics.sort((a,b) => a.sellingPrice - b.sellingPrice)
    },
		HandleBrandCheck : (state,action) => {
      const {name,checked, idx, Fueltype} = action.payload
        const newData = state.Brand.map((ele,id) => (id === idx ? {...ele, [name] : checked} : ele)) 
        state.Brand = newData
    },
    HandleAllFilters: (state,action) => {
      const data = action.payload
      const range = state.priceRange[data] || state.priceRange["default"];
      state.AllBrands.length = 0
      // state.AllFuels.length = 0
      state.Brand.map((ele) => ele.checked ? state.AllBrands.push(ele.brandName.toLocaleLowerCase()) : '')
      if (state.AllBrands.length == 0){
        state.Brand.map((ele) => state.AllBrands.push(ele.brandName.toLocaleLowerCase()))
      }
      state.Electronics = state.RealElectronics.filter((ele) => {
          const brandMatch = state.AllBrands.includes(
              ele.brand.toLocaleLowerCase()
          );
          const priceMatch =
              ele.sellingPrice > range[0] && ele.sellingPrice < range[1];
          return brandMatch && priceMatch;
      });
      
      const uniqueMap = new Map();
      state.Electronics.forEach(car => {
        if (!uniqueMap.has(car._id)) {
          uniqueMap.set(car._id, car);
        }
      });
      
      // Update state in a single mutation
      state.Electronics = Array.from(uniqueMap.values());
      // state. = Array.from(uniqueMap.values());
    },
    HandleLoc : (state,action) => {
      const {value} = action.payload
      const {loc} = action.payload
      state.Location = value
      const newData = state.RealElectronics.filter((ele) => ele.city.toLocaleLowerCase() === value.toLocaleLowerCase())
      console.log(JSON.parse(JSON.stringify(newData)));
      state.Electronics = newData

    }
  },
});

// Export actions
export const {HandleHigh,HandleLow, HandleAllBrands, HandleBrandCheck, HandlePrice, HandleLoc, HandleAllFilters, addElectronicItems} = ElectronicSlice.actions;

// Export reducer
export default ElectronicSlice.reducer;