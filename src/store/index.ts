import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import apiReducer from './slices/apiSlice'
import cartReducer from './slices/cartSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        api: apiReducer,
        cart: cartReducer,
        ui: uiReducer,
    },
    devTools: import.meta.env.VITE_NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
