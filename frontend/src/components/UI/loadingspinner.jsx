export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-pulse">🌳</span>
        </div>
      </div>
    </div>
  );
}