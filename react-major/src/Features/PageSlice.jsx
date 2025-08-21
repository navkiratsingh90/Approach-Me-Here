import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  start: 0,
  end: 5, // items per page
  isPrevDisabled: true,
  isNextDisabled: false,
};

const PageSlice = createSlice({
  name: 'Page',
  initialState,
  reducers: {
    HandleSlideLeft: (state, action) => {
      const total = action.payload; // total items
      if (state.start > 0) {
        state.start -= 5;
        state.end -= 5;
      }
      state.isPrevDisabled = state.start <= 0;
      state.isNextDisabled = state.end >= total;
    },
    HandleSlideRight: (state, action) => {
      const total = action.payload; // total items
      if (state.end < total) {
        state.start += 5;
        state.end += 5;
      }
      state.isPrevDisabled = state.start <= 0;
      state.isNextDisabled = state.end >= total;
    },
    ResetPagination: (state) => {
      state.start = 0;
      state.end = 5;
      state.isPrevDisabled = true;
      state.isNextDisabled = false;
    }
  },
});

export const { HandleSlideLeft, HandleSlideRight, ResetPagination } = PageSlice.actions;
export default PageSlice.reducer;
