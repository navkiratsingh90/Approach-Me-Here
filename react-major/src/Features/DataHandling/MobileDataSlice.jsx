import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	 MobilesList :  [
		{
				id : 1,
				Brand: 'Samsung',
				Title: "Samsung S25 Ultra - 2023 model",
				Price: 80000,
				city: "amritsar,Punjab",
				Date: new Date().toLocaleDateString(),
				
		},
		{
				id : 2,
				Brand: 'Oneplus',
				Title: "Oneplus 6 - 2018 Version",
				Price: 20000,
				city: "Jalandhar,Punjab",
				Date: new Date().toLocaleDateString(),
		},
		{
				id : 3,
				Brand: 'Apple',
				Title: "Apple Iphone 15 pro - 2023 Titanium Black",
				Price: 65000,
				city: "patiala,Punjab",
				Date: new Date().toLocaleDateString(),
		},
		{
				id : 4,
				Brand: 'Redmi',
				Title: "Redmi Note 15 - 2019 model",
				Price: 5000,
				city: "Ludhiana,Punjab",
				Date: new Date().toLocaleDateString(),
		},
		{
			id : 5,
			Brand: 'Realme',
			Title: "realme Note 15 - 2019 model",
			Price: 45000,
			city: "Faridkot,Punjab",
			Date: new Date().toLocaleDateString(),
	},
	{
		id : 6,
		Brand: 'Realme',
		Title: "realme Note 15 - 2019 model",
		Price: 45000,
		city: "Faridkot,Punjab",
		Date: new Date().toLocaleDateString(),
	},
	{
		id : 7,
		Brand: 'Redmi',
		Title: "Redmi Note 15 - 2019 model",
		Price: 5000,
		city: "Ludhiana,Punjab",
		Date: new Date().toLocaleDateString(),
	},
	{
		id : 8,
		Brand: 'Oneplus',
		Title: "Oneplus 6 - 2018 Version",
		Price: 20000,
		city: "Jalandhar,Punjab",
		Date: new Date().toLocaleDateString(),
	}
	]
	
};

const MobileDataSlice = createSlice({
  name: 'MobileData',
  initialState,
  reducers: {
    HandleData : (state,action) => {
			console.log(action.payload);
			state.MobilesList.push(action.payload)
		}
  },
});

// Export actions
export const {HandleData} = MobileDataSlice.actions;

// Export reducer
export default MobileDataSlice.reducer;