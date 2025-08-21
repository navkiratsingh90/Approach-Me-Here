import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	Others: [],
	RealOthers: [],
};

const Otherlice = createSlice({
  name: 'Other',
  initialState,
  reducers: {
    addOtherItems: (state,action) => {
      state.Others.length = 0
      // console.log(action.payload);
      const mainData = action.payload.payload
      console.log(mainData);
      mainData.map((ele) => state.Others.push(ele))
      mainData.map((ele) => state.RealOthers.push(ele))
      // console.log(JSON.parse(JSON.stringify(state.Cars)));
    },
		HandleHigh : (state,action) => {
      console.log("in high");
      state.Others.sort((a,b) => b.sellingPrice - a.sellingPrice)
    },
    HandleLow : (state,action) => {
      console.log("in low");
      state.Others.sort((a,b) => a.sellingPrice - b.sellingPrice)
    },
		
  },
});

// Export actions
export const {addOtherItems, HandleHigh,HandleLow, HandlePrice, HandleData} = Otherlice.actions;

// Export reducer
export default Otherlice.reducer;