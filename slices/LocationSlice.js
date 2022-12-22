import { createSlice } from '@reduxjs/toolkit';

const location = {
    lat: 23.4,
    lng: 90.3
}

export const locationSlice = createSlice({
    name: 'locator',
    initialState: {
        geo : location
    },

    reducers: {
        locate: (state, action) => {
            const loc = action.payload;
            console.log(loc);
            state.geo = loc;
        }
    }
})

export const { locate } = locationSlice.actions;
export default locationSlice.reducer;