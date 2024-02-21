import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userDetails: {},
    loading: false,
    error: null
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
        }
    }
});

export const {signInFailure,signInStart,signInSuccess,signOutFailure,signOutStart,signOutSuccess} = userSlice.actions;
export default userSlice.reducer;