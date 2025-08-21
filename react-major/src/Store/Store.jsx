import { configureStore } from '@reduxjs/toolkit';
import NavbarReducer from '../Features/NavbarSlice'
import PageReducer from '../Features/PageSlice'
import AuthReducer from '../Features/Auth/AuthSlice'
import CarReducer from '../Features/Car/CarSlice'
import MobileReducer from '../Features/Mobile/MobileSlice'
import FurnitureReducer from '../Features/Furniture/FurnitureSlice'
import ElectronicReducer from '../Features/Electronic/ElectronicSlice'
import BikeReducer from '../Features/Bike/BikeSlice'
import MobileDataReducer from '../Features/DataHandling/MobileDataSlice';
import WishlistSlice from '../Features/WishlistSlice';
import AdminSlice from '../Features/AdminSlice';
import OtherSlice from '../Features/Others/OtherSlice';

export const store = configureStore({
  reducer: {
    Navbar : NavbarReducer, 
    Pagination : PageReducer,
    Auth : AuthReducer,
    Car : CarReducer,
    Bike : BikeReducer,
    Mobile : MobileReducer,
    Electronic : ElectronicReducer,
    Furniture : FurnitureReducer,
    MobileData : MobileDataReducer,
    Wishlist: WishlistSlice,
    Admin: AdminSlice,
    Other : OtherSlice
  },
});