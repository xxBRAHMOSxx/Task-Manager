// toastSlice.js
import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        message: '',
        visible: false,
    },
    reducers: {
        showToast: (state, action) => {
            state.message = action.payload;
            state.visible = true;
        },
        hideToast: (state) => {
            state.visible = false;
           
        }
    }
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
