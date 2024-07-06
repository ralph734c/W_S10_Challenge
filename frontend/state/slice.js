import { createSlice } from '@reduxjs/toolkit';

const initialFormState = {
  fullName: '',
  size: '',
  toppings: [],
};

const formSlice = createSlice({
  name: 'pizza',
  initialState: {
    filterState: {
      size: 'All',
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
    },
  },
});

export const { changeSize, updateForm, resetForm } = formSlice.actions;

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    textContent: null,
    type: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.textContent = action.payload.textContent;
      state.type = action.payload.type;
    },
    clearMessage: (state) => {
      state.textContent = null;
      state.type = null;
    },
  },
});
export const { setMessage, clearMessage } = messageSlice.actions;

export default {
  form: formSlice.reducer,
  message: messageSlice.reducer,
};
