import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ProductData } from '../../types/product'

interface CartItem {
    productId: number | string
    quantity: number
    product?: ProductData
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{ productId: number | string; quantity?: number; product?: ProductData }>) {
            const { productId, quantity = 1, product } = action.payload
            const existing = state.items.find((i) => i.productId === productId)
            if (existing) {
                existing.quantity += quantity
            } else {
                state.items.push({ productId, quantity, product })
            }
        },
        removeFromCart(state, action: PayloadAction<{ productId: number | string }>) {
            state.items = state.items.filter((i) => i.productId !== action.payload.productId)
        },
        setQuantity(state, action: PayloadAction<{ productId: number | string; quantity: number }>) {
            const it = state.items.find((i) => i.productId === action.payload.productId)
            if (it) it.quantity = action.payload.quantity
        },
        clearCart(state) {
            state.items = []
        },
    },
})

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
