const ErrorState = ({ message, onRetry, loading = false }) => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-semibold text-slate-800">
        Something went wrong
      </h2>

      <p className="mt-3 text-red-600">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          disabled={loading}
          className="mt-5 rounded-lg bg-[#0B9BD7] px-5 py-2 text-white"
        >
          {loading ? "Retrying..." : "Try Again"}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
