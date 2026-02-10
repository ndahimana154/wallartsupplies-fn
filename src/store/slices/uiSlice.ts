import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
    open: boolean
    payload?: any
}

interface UIState {
    modals: Record<string, ModalState>
    filters: Record<string, any>
}

const initialState: UIState = {
    modals: {},
    filters: {},
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<{ name: string; payload?: any }>) {
            const { name, payload } = action.payload
            state.modals[name] = { open: true, payload }
        },
        closeModal(state, action: PayloadAction<{ name: string }>) {
            const { name } = action.payload
            state.modals[name] = { open: false, payload: undefined }
        },
        setFilter(state, action: PayloadAction<{ name: string; value: any }>) {
            state.filters[action.payload.name] = action.payload.value
        },
        clearFilter(state, action: PayloadAction<{ name: string }>) {
            delete state.filters[action.payload.name]
        },
    },
})

export const { openModal, closeModal, setFilter, clearFilter } = uiSlice.actions
export default uiSlice.reducer
