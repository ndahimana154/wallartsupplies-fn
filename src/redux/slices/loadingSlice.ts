import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
    isHeaderLoading: boolean;
    isHomepageLoading: boolean;
    isProductsLoading: boolean;
    isCategoriesLoading: boolean;
    errorMessage: string | null;
}

const initialState: LoadingState = {
    isHeaderLoading: false,
    isHomepageLoading: false,
    isProductsLoading: false,
    isCategoriesLoading: false,
    errorMessage: null,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setHeaderLoading: (state, action: PayloadAction<boolean>) => {
            state.isHeaderLoading = action.payload;
        },
        setHomepageLoading: (state, action: PayloadAction<boolean>) => {
            state.isHomepageLoading = action.payload;
        },
        setProductsLoading: (state, action: PayloadAction<boolean>) => {
            state.isProductsLoading = action.payload;
        },
        setCategoriesLoading: (state, action: PayloadAction<boolean>) => {
            state.isCategoriesLoading = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string | null>) => {
            state.errorMessage = action.payload;
        },
        clearAllLoading: (state) => {
            state.isHeaderLoading = false;
            state.isHomepageLoading = false;
            state.isProductsLoading = false;
            state.isCategoriesLoading = false;
            state.errorMessage = null;
        },
    },
});

export const {
    setHeaderLoading,
    setHomepageLoading,
    setProductsLoading,
    setCategoriesLoading,
    setErrorMessage,
    clearAllLoading,
} = loadingSlice.actions;

export default loadingSlice.reducer;
