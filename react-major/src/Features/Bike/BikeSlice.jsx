import { createSlice } from '@reduxjs/toolkit';
import Bike1 from '../../assets/Bikes/bike1.png'
import Bike2 from '../../assets/Bikes/bike2.png'
import Bike3 from '../../assets/Bikes/bike3.png'
import Bike4 from '../../assets/Bikes/bike4.png'
import { Brand } from '../../Utils/BikeBrands';


const initialState = {
    Brand :  Brand,
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
            Fueltype: "cng & hybrid",
            checked: false,
        },
        {
            Fueltype: "lpg",
            checked: false,
        },
    ],
    priceRange: {"default": [0,Infinity],"Below 40k" : [0,40000],"40 to 60k":[40001,60000],"60 to 99k":[60001,99000],"Above 1 Lac":[100000,Infinity]},
    Bikes: [],
    RealBikes : [],
    AllFuels : [],
    FuelFilter : [],
    AllBrands : [],
    BrandFilter: [],
    FilteredArray : [],
    FuelFilteredArray: [],
    Generateid: 5,
};

const BikeSlice = createSlice({
  name: 'Bike',
  initialState,
  reducers: {
    addBikeItems: (state,action) => {
      state.Bikes.length = 0
      // console.log(action.payload);
      const mainData = action.payload.payload
      console.log(mainData);
      mainData.map((ele) => state.Bikes.push(ele))
      mainData.map((ele) => state.RealBikes.push(ele))
      console.log(JSON.parse(JSON.stringify(state.Bikes)));
    },
    HandleHigh : (state,action) => {
      state.Bikes.sort((a,b) => b.Price - a.Price)
    },
    HandleLow : (state,action) => {
      state.Bikes.sort((a,b) => a.Price - b.Price)
    },
    HandleBrandCheck : (state,action) => {
      const {name,checked, idx, Fueltype} = action.payload
        const newData = state.Brand.map((ele,id) => (id === idx ? {...ele, [name] : checked} : ele)) 
        state.Brand = newData
    },
    HandleFuelCheck : (state, action) => {
      const {name,checked, idx, Fueltype} = action.payload
        const newData = state.Fuel.map((ele,id) => (id === idx ? {...ele, [name] : checked} : ele)) 
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
      // console.log(JSON.parse(JSON.stringify(state.AllBrands)));
      state.Bikes = state.RealBikes.filter((ele) => {
        const brandMatch = state.AllBrands.includes(
            ele.brand.toLocaleLowerCase()
        );
        console.log(brandMatch);
        const fuelMatch = state.AllFuels.includes(ele.fuelType.toLocaleLowerCase())
        const priceMatch =
            ele.sellingPrice > range[0] && ele.sellingPrice < range[1];
        return brandMatch && priceMatch && fuelMatch;
    });
      // state.Brand.map((ele) => {
      //   if (ele.checked == true){
      //     state.AllBrands.push(ele.brandName)
      //   }
      // })
      // state.Fuel.map((ele) => {
      //   if (ele.checked == true){
      //     state.AllFuels.push(ele.Fueltype)
      //   }
      // })
      // if (action.payload){
      //   if (state.AllBrands.length !== 0 && state.AllFuels.length !== 0){
      //     state.Bikes = state.RealBikes.filter((ele) => {
      //       const fuelMatch = state.Fuel.some((fuel) =>
      //         fuel.checked && ele.fuelType.toLowerCase() === fuel.Fueltype.toLowerCase()
      //       );
      //       const brandMatch = state.Brand.some((Brand) =>
      //         Brand.checked && ele.brand.toLowerCase() === Brand.brandName.toLowerCase()
      //       );
        
      //       const priceMatch = ele.sellingPrice > range[0] && ele.sellingPrice < range[1];
        
      //       return brandMatch && fuelMatch && priceMatch;
      //     });
      //   }
      //   else if (state.AllBrands.length === 0 && state.AllFuels.length !== 0) {
        
      //     state.Bikes = state.RealBikes.filter((ele) => {
      //       const fuelMatch = state.Fuel.some((fuel) =>
      //         fuel.checked && ele.fuelType.toLowerCase() === fuel.Fueltype.toLowerCase()
      //       );
        
      //       const priceMatch = ele.sellingPrice > range[0] && ele.sellingPrice < range[1];
        
      //       return fuelMatch && priceMatch;
      //     });
      //   }
      //   else if (state.AllFuels.length == 0 && state.AllBrands.length !=0){
        
      //     state.Bikes = state.RealBikes.filter((ele) => {
      //       const brandMatch = state.Brand.some((Brand) =>
      //         Brand.checked && ele.brand.toLowerCase() === Brand.brandName.toLowerCase()
      //       );
        
      //       const priceMatch = ele.sellingPrice > range[0] && ele.sellingPrice < range[1];
        
      //       return brandMatch && priceMatch;
      //     });
      //   }
      //   else{
      //     state.Bikes = state.RealBikes.filter((ele) => {
      //       const priceMatch = ele.sellingPrice > range[0] && ele.sellingPrice < range[1];
        
      //       return  priceMatch;
      //     });
      //   }
      // }
      // else{
      //   if (state.AllBrands.length !== 0 && state.AllFuels.length !== 0){
      //     state.Bikes = state.RealBikes.filter((ele) => {
      //       const fuelMatch = state.Fuel.some((fuel) =>
      //         fuel.checked && ele.fuelType.toLowerCase() === fuel.Fueltype.toLowerCase()
      //       );
      //       const brandMatch = state.Brand.some((Brand) =>
      //         Brand.checked && ele.brand.toLowerCase() === Brand.brandName.toLowerCase()
      //       );
        
      //       return brandMatch && fuelMatch ;
      //     });
      //   }
      //   else if (state.AllBrands.length === 0 && state.AllFuels.length !== 0) {
        
      //     state.Bikes = state.RealBikes.filter((ele) => {
      //       const fuelMatch = state.Fuel.some((fuel) =>
      //         fuel.checked && ele.fuelType.toLowerCase() === fuel.Fueltype.toLowerCase()
      //       );
        
      //       return fuelMatch;
      //     });
      //   }
      //   else if (state.AllFuels.length == 0 && state.AllBrands.length !=0){
        
      //     state.Bikes = state.RealBikes.filter((ele) => {
      //       const brandMatch = state.Brand.some((Brand) =>
      //         Brand.checked && ele.brand.toLowerCase() === Brand.brandName.toLowerCase()
      //       );
        
      //       return brandMatch ;
      //     });
      //   }
      // }
      const uniqueMap = new Map();
      state.Bikes.forEach(car => {
        if (!uniqueMap.has(car._id)) {
          uniqueMap.set(car._id, car);
        }
      });
      
      // Update state in a single mutation
      state.Bikes = Array.from(uniqueMap.values());
      state.TestBikes = Array.from(uniqueMap.values());
    }

  },
});

// Export actions
export const {HandleHigh ,HandleLow, HandlePrice, HandleFuelCheck, HandleBrandCheck ,addBikeItems,HandleAllFilters} = BikeSlice.actions;

// Export reducer
export default BikeSlice.reducer;