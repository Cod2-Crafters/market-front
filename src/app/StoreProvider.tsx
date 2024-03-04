'use client'
import { AppStore, store } from "@/store/store"
import { useRef } from "react"
import { Provider } from "react-redux";


// export default function StoreProvider({
//     children
// }: {
//     children: React.ReactNode
// }) {
//     const storeRef = useRef<AppStore>();
//     if (storeRef.current) {
//         storeRef.current = store();
//     }
//     return <Provider store={storeRef.current}>{children}</Provider>
// }
export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}