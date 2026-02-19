export default function WineCardSkeleton({ showReview = true }: { showReview?: boolean }) {
  return (
    <article className="w-full mt-2 mb-8 lg:mb-10 rounded-2xl border border-gray-300 bg-white animate-pulse">
      <div className="grid grid-cols-[80px_1fr] md:grid-cols-[60px_minmax(0,1fr)_auto] gap-x-4 md:gap-x-20 px-5 md:pl-15 md:pr-13 pt-2.5 items-start">
        <div className="relative overflow-hidden row-span-2 lg:w-15 h-57 w-18 shrink-0">
          <div className="w-full h-full bg-gray-200 rounded-md mt-5" />
        </div>
        <div className="col-start-2 row-start-1 mt-5 md:mt-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
        <div className="md:mt-4 flex flex-col items-end gap-2">
          <div className="h-4 bg-gray-200 rounded w-10" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>
      {showReview && (
        <>
          <div className="h-px bg-gray-300" />
          <div className="py-2 px-5 md:py-5 md:px-10 lg:px-15 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </>
      )}
    </article>
  );
}
