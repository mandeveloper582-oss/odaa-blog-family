export default function PostSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-56 bg-gray-300 dark:bg-gray-700 skeleton"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 skeleton"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 skeleton"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full skeleton"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 skeleton"></div>
        </div>
        <div className="flex justify-between pt-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20 skeleton"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 skeleton"></div>
        </div>
      </div>
    </div>
  );
}