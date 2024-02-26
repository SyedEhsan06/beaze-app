import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user:{
        first_name: '',
        last_name: '',
        phone_number: '',
        address: [],
        cart: [],
        email: '',
        role: '',
        isVerified: false,
    },
    status: 'idle',
    error: null,
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload;
        },
        updateUser(state, action){
            state.user = action.payload;
        },
        clearUser(state){
            state.user = initialState.user;
        },
    },
});

export const { setUser, updateUser, clearUser } = userDataSlice.actions;
 export const selectUser = (state) => state?.userData?.user;
 export default userDataSlice.reducer;
