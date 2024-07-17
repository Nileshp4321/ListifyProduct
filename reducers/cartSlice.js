import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload); 
      console.log("item is added");
      console.log(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
