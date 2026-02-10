import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AppState {
    mobileMenuOpen: boolean
    globalError: string | null
}

const initialState: AppState = {
    mobileMenuOpen: false,
    globalError: null,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        openMobileMenu(state) {
            state.mobileMenuOpen = true
        },
        closeMobileMenu(state) {
            state.mobileMenuOpen = false
        },
        toggleMobileMenu(state) {
            state.mobileMenuOpen = !state.mobileMenuOpen
        },
        setGlobalError(state, action: PayloadAction<string | null>) {
            state.globalError = action.payload
        },
        clearGlobalError(state) {
            state.globalError = null
        },
    },
})

export const { openMobileMenu, closeMobileMenu, toggleMobileMenu, setGlobalError, clearGlobalError } = appSlice.actions
export default appSlice.reducer
