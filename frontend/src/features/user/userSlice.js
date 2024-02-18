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
        }
    }
});

export const {signInFailure,signInStart,signInSuccess} = userSlice.actions;
export default userSlice.reducer;