import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userDetails: {},
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.userDetails = action.payload;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },
        signOutStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signOutSuccess :(state,action)=>{
            state.loading=false
            state.userDetails=action.payload
            state.error = false
        },
        signOutFailure :(state,action)=> {
            state.loading = false
            state.error = action.payload;
        },
        updateFailure: (state,action)=>{
            state.loading= false,
            state.error= action.payload
        },
        upadateRequested : (state) =>{
            state.loading=true;
            state.error=null;
        },
        updateSuccess :(state,action)=>{
            state.loading=false;
            state.error=null;
            state.userDetails=action.payload;
        },
        deleteFailed :(state,action)=>{
            state.error=action.payload;
        },
        deleteSuccess :(state)=>{
            state.userDetails=null;
            state.error=null
        }
    }
});

export const {signInFailure,signInStart,signInSuccess,signOutFailure,signOutStart,signOutSuccess, upadateRequested,updateFailure,updateSuccess,deleteFailed,deleteSuccess} = userSlice.actions;
export default userSlice.reducer;