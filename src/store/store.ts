import drawerSlice from '@/features/drawer/drawerSlice';
import memberSlice from '@/features/members/memberSlice';

import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
    return configureStore({
        reducer: {
            drawer: drawerSlice,
            memeberinfo: memberSlice,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
