import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  MenuBar : false,
};

const NavbarSlice = createSlice({
  name: 'Navbar',
  initialState,
  reducers: {
    HandleMenubar :  (state) => {
      state.MenuBar = !state.MenuBar
    }
  },
});

// Export actions
export const {HandleMenubar} = NavbarSlice.actions;

// Export reducer
export default NavbarSlice.reducer;