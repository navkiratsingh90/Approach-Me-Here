import { createSlice } from '@reduxjs/toolkit';
import { Brand } from '../../Utils/CarBrands';


const initialState = {
  selectedPriceRange: null,
    Brand : Brand ,
    Fuel: [
        {
            Fueltype: "petrol",
            checked: false,
        },
        {
            Fueltype: "diesel",
            checked: false,
        },
        {
            Fueltype: "electric",
            checked: false,
        },
        {
            Fueltype: "cng",
            checked: false,
        },
        {
            Fueltype: "lpg",
            checked: false,
        },
    ],
    priceRange: {"default": [0,Infinity],"Below 1 Lac" : [0,100000],"1 to 3 Lac":[100001,300000],"3 to 5 Lac":[300001,500000],"Above 5 Lac":[500000,Infinity]},
    Cars: [],
    RealCars : [],
    TestCars: [],
    AllFuels : [],
    AllBrands : [],
};

const CarSlice = createSlice({
  name: 'Car',
  initialState,
  reducers: {
    addCarItems: (state,action) => {
      state.Cars.length = 0
      // console.log(action.payload);
      const mainData = action.payload.payload
      console.log(mainData);
      mainData.map((ele) => state.Cars.push(ele))
      mainData.map((ele) => state.RealCars.push(ele))
      mainData.map((ele) => state.TestCars.push(ele))
      console.log(JSON.parse(JSON.stringify(state.Cars)));
    },
    HandleHigh : (state,action) => {
      state.Cars.sort((a,b) => b.sellingPrice - a.sellingPrice)
    },
    HandleLow : (state,action) => {
      state.Cars.sort((a,b) => a.sellingPrice - b.sellingPrice)
    },
    HandleBrandCheck : (state,action) => {
      const {name,checked, idx, Fueltype} = action.payload
        const newData = state.Brand.map((ele,id) => (id === idx ? {...ele, [name] : checked} : ele)) 
        state.Brand = newData
    },
    HandleFuelCheck : (state, action) => {
      const {name,checked, idx, Fuel} = action.payload
      console.log("clicked");
        const newData = state.Fuel.map((ele,id) => (id == idx ? {...ele, [name] : checked} : ele)) 
        state.Fuel = newData
    },
    HandleAllFilters: (state,action) => {
      const data = action.payload
      const range = state.priceRange[data] || state.priceRange["default"];
      state.AllBrands.length = 0
      state.AllFuels.length = 0
      state.Brand.map((ele) => ele.checked? state.AllBrands.push(ele.brandName.toLocaleLowerCase()): '')
      state.Fuel.map((ele) => ele.checked? state.AllFuels.push(ele.Fueltype.toLocaleLowerCase()): '')
      if (state.AllBrands.length == 0){
        state.Brand.map((ele) => state.AllBrands.push(ele.brandName.toLocaleLowerCase()))
      }
      if (state.AllFuels.length == 0){
        state.Fuel.map((ele) => state.AllFuels.push(ele.Fueltype.toLocaleLowerCase()))
      }
      console.log(JSON.parse(JSON.stringify(state.Cars)));
      console.log(JSON.parse(JSON.stringify(state.AllBrands)));
      console.log(JSON.parse(JSON.stringify(state.AllFuels)));
      state.Cars = state.RealCars.filter((ele) => {
        const brandMatch = state.AllBrands.includes(
            ele.brand.toLocaleLowerCase()
        );
        console.log(ele.brand.toLocaleLowerCase());
        const fuelMatch = state.AllFuels.includes(ele.fuelType.toLocaleLowerCase())
        const priceMatch =
            ele.sellingPrice > range[0] && ele.sellingPrice < range[1];
        console.log(`for ${ele.brand} , ${brandMatch} ${fuelMatch} ${priceMatch}`);
        return brandMatch && priceMatch && fuelMatch;
    });
      const uniqueMap = new Map();
      state.Cars.forEach(car => {
        if (!uniqueMap.has(car._id)) {
          uniqueMap.set(car._id, car);
        }
      });
      
      // Update state in a single mutation
      state.Cars = Array.from(uniqueMap.values());
      state.TestCars = Array.from(uniqueMap.values());
    }
    ,
    
  },
});

// Export actions
export const {HandleHigh ,HandleLow, HandleFuelCheck, HandleBrandCheck,HandleAllFilters,addCarItems} = CarSlice.actions;

// Export reducer
export default CarSlice.reducer;