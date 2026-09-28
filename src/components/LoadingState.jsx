const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="p-8 text-center">
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#0B9BD7]"></div>

      <p className="mt-3 text-slate-500">{message}</p>
    </div>
  );
};

export default LoadingState;
