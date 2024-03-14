'use client'
import Drawer from '@/components/custom/Drawer'
import { AppStore, makeStore } from '@/store/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'
// import { makeStore } from '../lib/store'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }
    return <Provider store={storeRef.current}>
        {/* <Drawer /> */}
        {children}
    </Provider>
}
