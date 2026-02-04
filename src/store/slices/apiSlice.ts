import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ApiState {
    status: 'idle' | 'loading' | 'success' | 'error'
    message?: string | null
}

const initialState: ApiState = {
    status: 'idle',
    message: null,
}

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        apiIdle(state) {
            state.status = 'idle'
            state.message = null
        },
        apiLoading(state) {
            state.status = 'loading'
            state.message = null
        },
        apiSuccess(state, action: PayloadAction<string | undefined>) {
            state.status = 'success'
            state.message = action.payload ?? null
        },
        apiError(state, action: PayloadAction<string | undefined>) {
            state.status = 'error'
            state.message = action.payload ?? 'An error occurred'
        },
    },
})

export const { apiIdle, apiLoading, apiSuccess, apiError } = apiSlice.actions
export default apiSlice.reducer
