import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userDetails: null,
    loading: false,
    error: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        reload: (state) => {
            state.userDetails = null,
            state.loading = false,
            state.error = null
        },
        signInStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.userDetails = action.payload;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },
        signOutStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        signOutSuccess: (state, action) => {
            state.loading = false
            state.userDetails = action.payload
            state.error = null
        },
        signOutFailure: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },
        updateFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        upadateRequested: (state) => {
            state.loading = true;
            state.error = false;
        },
        updateSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.userDetails = action.payload;
        },
        deleteFailed: (state, action) => {
            state.error = action.payload;
        },
        deleteSuccess: (state) => {
            state.userDetails = null;
            state.error = null
        }
    }
});

export const { reload,signInFailure, signInStart, signInSuccess, signOutFailure, signOutStart, signOutSuccess, upadateRequested, updateFailure, updateSuccess, deleteFailed, deleteSuccess } = userSlice.actions;
export default userSlice.reducer;