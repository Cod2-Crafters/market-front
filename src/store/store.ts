import drawerSlice from '@/features/drawer/drawerSlice';
import { configureStore } from '@reduxjs/toolkit';


// const rootReducer = combineReducers({
//     modal: modalReducer,
// })
// export const store 


export const store : any = configureStore({
    reducer : {
        drawer : drawerSlice
    },
    devTools : process.env.NODE_ENV !== 'production',
});
// export const store = () => {
//     return configureStore({
//         reducer: {},
//         devTools: process.env.NODE_ENV !== 'production'
//     })
// }



export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];