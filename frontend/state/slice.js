import { createSlice } from "@reduxjs/toolkit";

const initialFormState = {
  fullName: "",
  size: "",
  toppings: []
};

const slice = createSlice({
  name: "pizza",
  initialState: {
    filterState: {
      size: "All",
    },
    formState: initialFormState,
  },
  reducers: {
    changeSize(state, action) {
      state.filterState.size = action.payload;
    },
    updateForm(state, action) {
      state.formState = { ...state.formState, ...action.payload };
    },
    resetForm(state) {
      state.formState = initialFormState;
    }
  }
});

export const { changeSize, updateForm, resetForm } = slice.actions;
export default slice.reducer;