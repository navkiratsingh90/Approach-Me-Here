import { createSlice } from '@reduxjs/toolkit';
import { Brand } from '../../Utils/MobileBrands';



const initialState = {
	Brand :   Brand,
	Mobiles: [],
	RealMobiles : [],
  TestMobiles: [],
	AllBrands : [],
  priceRange: {"default": [0,Infinity],"Below 20k" : [0,20000],"20 to 40k":[20001,40000],"40 to 80k":[40001,80000],"Above 80k":[80001,Infinity]},
};

const MobileSlice = createSlice({
  name: 'Mobile',
  initialState,
  reducers: {
    addMobilesItems: (state,action) => {
      state.Mobiles.length = 0
      // console.log(action.payload);
      const mainData = action.payload.payload
      console.log(mainData);
      mainData.map((ele) => state.Mobiles.push(ele))
      mainData.map((ele) => state.RealMobiles.push(ele))
      mainData.map((ele) => state.TestMobiles.push(ele))
      // console.log(JSON.parse(JSON.stringify(state.Cars)));
    },
		HandleHigh : (state,action) => {
      state.Mobiles.sort((a,b) => b.sellingPrice - a.sellingPrice)
    },
    HandleLow : (state,action) => {
      state.Mobiles.sort((a,b) => a.sellingPrice - b.sellingPrice)
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
      state.Brand.map((ele) => ele.checked ? state.AllBrands.push(ele.brandName.toLocaleLowerCase()) : '')
      if (state.AllBrands.length == 0){
        state.Brand.map((ele) => state.AllBrands.push(ele.brandName.toLocaleLowerCase()))
      }
      if (state.AllBrands.length != 0) {
          state.Mobiles = state.RealMobiles.filter((ele) => {
              const brandMatch = state.AllBrands.includes(
                  ele.brand.toLocaleLowerCase()
              );
              const priceMatch =
                  ele.sellingPrice > range[0] && ele.sellingPrice < range[1];
              return brandMatch && priceMatch;
          });
      }
      const uniqueMap = new Map();
      state.Mobiles.forEach(car => {
        if (!uniqueMap.has(car._id)) {
          uniqueMap.set(car._id, car);
        }
      });
      
      // Update state in a single mutation
      state.Mobiles = Array.from(uniqueMap.values());
      state.TestMobiles = Array.from(uniqueMap.values());
    },
  },
});

// Export actions
export const {HandleData, HandleHigh,HandleLow, HandleAllBrands, HandleBrandCheck, HandlePrice, addMobilesItems, HandleAllFilters} = MobileSlice.actions;

// Export reducer
export default MobileSlice.reducer;