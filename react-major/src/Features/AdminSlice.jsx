import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	Users: [],
	Products: [],
	isAdmin: false,
	timeArray : [],
	months: [0,0,0,0,0,0,0,0,0,0,0,0,0]
};

const AdminSlice = createSlice({
  name: 'Admin',
  initialState,
  reducers: {
		handleDate: (state, action) => {
      const order = action.payload; // "asc" or "desc"
      state.Products.sort((a, b) =>
        order === 'asc'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );
		},
		handlePrice : (state,action) => {
			if (action.payload == 'Low'){
				state.Products.sort((a,b) => a.sellingPrice - b.sellingPrice)
			}
			else if (action.payload == 'High'){
				state.Products.sort((a,b) => b.sellingPrice - a.sellingPrice)
			}
		},
		handleisAdmin : (state,action) => {
			const data = action.payload
			console.log(data);
			state.isAdmin = data
			
		},
		handleAllProducts : (state,action) => {
			state.Products.length = 0
			const data = action.payload
			data.map((ele) => {
				const {title,description,category,_id,sellingPrice,createdAt,createdBy} = ele
				return state.Products.push({title,description,category,_id,sellingPrice,createdAt,createdBy})
			})
		},
    handleAllUsers: (state,action) => {
			state.Users.length = 0
			const data = action.payload
			data.map((ele) => state.Users.push(ele))
		},
		organizeMonths : (state,action) => {
			state.months.map((ele) => ele = 0	)
			const dates = action.payload.time;
			dates.forEach((ele) => {
				const month = parseInt(ele.slice(5, 7)); // "07" → 7
				console.log(month); // Output: 7
				state.months[month]++
			});
			console.log(JSON.parse(JSON.stringify(state.months)));
		}
  },
});

// Export actions
export const {handleAllUsers,handleAllProducts,handleisAdmin,handlePrice, handleDate, organizeMonths} = AdminSlice.actions;

// Export reducer
export default AdminSlice.reducer;