import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filter_state",
  initialState: {
    size: "All",
  },
  reducers: {
    changeSize(state, action) {
      state.size = action.payload;
    },
  },
});

export const { changeSize } = slice.actions;
export default slice.reducer;
