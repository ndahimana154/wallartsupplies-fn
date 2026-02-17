import type { RootState } from '../store';

// Memoized selectors for loading states
export const selectIsHeaderLoading = (state: RootState) =>
    state.loading.isHeaderLoading;

export const selectIsHomepageLoading = (state: RootState) =>
    state.loading.isHomepageLoading;

export const selectIsProductsLoading = (state: RootState) =>
    state.loading.isProductsLoading;

export const selectIsCategoriesLoading = (state: RootState) =>
    state.loading.isCategoriesLoading;

export const selectErrorMessage = (state: RootState) =>
    state.loading.errorMessage;

export const selectAllLoadingStates = (state: RootState) => ({
    isHeaderLoading: state.loading.isHeaderLoading,
    isHomepageLoading: state.loading.isHomepageLoading,
    isProductsLoading: state.loading.isProductsLoading,
    isCategoriesLoading: state.loading.isCategoriesLoading,
    errorMessage: state.loading.errorMessage,
});

export const selectIsAnyLoading = (state: RootState) =>
    state.loading.isHeaderLoading ||
    state.loading.isHomepageLoading ||
    state.loading.isProductsLoading ||
    state.loading.isCategoriesLoading;
