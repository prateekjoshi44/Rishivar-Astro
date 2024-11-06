import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authToken: null,
    fcmToken: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.authToken = action.payload
        },
        setFcmData: (state, action) => {
            state.fcmToken = action.payload
        },
    },
});

export const {
    setAuthData, setFcmData
} = authSlice.actions;

export const selectApp = (state) => state.app;

export default authSlice.reducer;
