import { createSlice } from "@reduxjs/toolkit";
import { persistor } from "../../app/store";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const authSlice  = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user,
            state.token = action.payload.token
        },
        clearSesssion: (state) => {
            state.isAuthenticated = false,
            state.user = null,
            state.token = null
        }
    },  
});

export const clearSessionAndPurge = () => async (dispatch) => {
    dispatch(clearSession()); 
    await persistor.purge(); 
};

export const {setSession, clearSesssion} = authSlice.actions;
export default authSlice.reducer;