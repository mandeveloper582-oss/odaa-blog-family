export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="text-6xl mb-4">😔</div>
      <div className="text-red-500 text-lg mb-4 font-medium">{message}</div>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again 🔄
        </button>
      )}
    </div>
  );
}