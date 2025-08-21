import { createSlice } from '@reduxjs/toolkit';
import { FaLastfmSquare } from 'react-icons/fa';

const initialState = {
	adsPosted: [],
	wishlist: [],
	// token: localStorage.getItem("token"),
	user : undefined,
	isLoggedin : localStorage.getItem('isLoggedin'),
	email: '',
	isLoading: false,
	// userData: {
	// 	email: '',
	// 	userID: '',
	// 	username: ''
	// },
	passShown : false,
	checked : false,
	LoginFields : {
		username: '',
		password: '',
},
	RegisterFields : {
		username: '',
		password: '',
		email : '',
	},
	LogoutFields : {
		username: '',
		password: '',
	}
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
		handleLoading: (state,action) => {
			state.isLoading = action.payload
		},
		handleAds: (state,action) => {
			state.adsPosted.length = 0
			const data = action.payload
			// state.adsPosed = data.
			data.map((ele,idx) => state.adsPosted.push(ele))
			//  console.log(JSON.parse(JSON.stringify(state.adsPosed)));
		},
		handleWishlist: (state,action) => {
			state.wishlist.length = 0
			const data = action.payload
			// state.adsPosed = data.
			data.map((ele,idx) => state.wishlist.push(ele))
			//  console.log(JSON.parse(JSON.stringify(state.adsPosed)));
		},
		handleCredentials: (state, action) => {
			const data = action.payload;
			state.user = data;
		
			if (data) {
				localStorage.setItem("isLoggedin", "true");
				state.isLoggedin = true;
			} else {
				localStorage.removeItem("isLoggedin");
				state.isLoggedin = false;
			}
		}
,		
		handleEmail: (state,action) => {
			const data = action.payload
			console.log(data);
			state.email = data
			// console.log(JSON.parse(JSON.stringify(state.user)));
			// state.userData.email = data.email
			// state.userData.userID = data.userID
			// state.userData.username = data.username
			// console.log(state.userData.userID);
		},
		HandleToken: (state,action) => {
			console.log(action.payload);
			localStorage.setItem("token",action.payload )
			state.token = localStorage.getItem("token")
		},
		HandleLogoutInfo: (state,action) => {
			state.user = undefined
			state.email = undefined
			localStorage.setItem("isLoggedin" , false)
			// console.log(localStorage.getItem("isLoggedin"));
		},
    HandlePassShown : (state) => {
			// if (state.type === 'password'){
			// 	state.passShown = true
			// }
			// else{
			// 	state.passShown = false
			// }
			state.passShown = !state.passShown

		},
		HandleCheck : (state) => {
			if (state.LoginFields.remember){
				state.LoginFields.remember = false
			}
			else{
				state.LoginFields.remember = true
			}
		},
		HandleLoginInputs : (state,action) => {
				const {name, value} = action.payload
				state.LoginFields[name] = value
		},
		HandleRegisterInputs : (state,action) => {
			const {name, value} = action.payload.target
			state.RegisterFields[name] = value
		},
		HandleLogoutInputs : (state,action) => {
			const {name, value} = action.payload.target
			state.LogoutFields[name] = value
		}
  },
});

// Export actions
export const {handleAds,HandlePassShown , HandleCheck, HandleLoginInputs, HandleRegisterInputs, HandleLogoutInputs, HandleToken, HandleLogoutInfo,handleCredentials, handleWishlist, handleLoading, handleEmail} = AuthSlice.actions;

// Export reducer
export default AuthSlice.reducer;