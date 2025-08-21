import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	Store: [],
  prodDetails : {
    id : '',
    category: ''
  }
};

const WishlistSlice = createSlice({
  name: 'Wishlist',
  initialState,
  reducers: {
    addItems: async (state,action) => {
      const data = action.payload
      // console.log(data);
      state.prodDetails.category = data.Category
      state.prodDetails.id = data.id
    },
    HandleItems: (state, action) => {
      console.log(action.payload);
      const isFound = state.Store.some(obj => obj._id == action.payload._id);
      console.log(isFound);
    
      if (action.payload.From === 'wish') {
        // Remove item from Store
        state.Store = state.Store.filter(ele => ele._id != action.payload._id);
      } 
      else if (!isFound && action.payload.From === 'nonwish') {
        // Add item if not already found
        state.Store.push(action.payload);
      }
    }
    
    
  },
});

// Export action
export const {HandleItems,addItems} = WishlistSlice.actions;

// Export reducer
export default WishlistSlice.reducer;