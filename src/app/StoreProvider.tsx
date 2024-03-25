'use client';

import { makeStore } from '@/store/store';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={makeStore()}>
            {/* <Drawer /> */}
            {children}
        </Provider>
    );
}
