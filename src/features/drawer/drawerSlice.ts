import { createSlice } from '@reduxjs/toolkit';


export const drawerSlice = createSlice({
    name : 'drawer',
    initialState : {
        isOpen : false,
    },
    reducers: {
        toggleDrawer: state =>{
            state.isOpen = !state.isOpen;
        },
        openDrawer: state => {
            state.isOpen = true;
        },
        closeDrawer: state => {
            state.isOpen = false;
        }
    }
});

export const { toggleDrawer, openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;