export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-[#f20c2d] animate-spin" />
        <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
