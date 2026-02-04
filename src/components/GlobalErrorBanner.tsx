import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearGlobalError } from '../store/slices/appSlice';

const GlobalErrorBanner = () => {
  const error = useAppSelector((s) => s.app.globalError);
  const dispatch = useAppDispatch();

  if (!error) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-50 flex items-center justify-center">
      <div className="max-w-3xl mx-4 bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-md flex items-center justify-between gap-4">
        <div>{error}</div>
        <button
          onClick={() => dispatch(clearGlobalError())}
          className="text-sm text-red-600 underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default GlobalErrorBanner;
