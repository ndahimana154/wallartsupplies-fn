import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Export dispatch type
export type { AppDispatch };

// Export state type
export type { RootState };

// Custom hooks for Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
