const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="relative h-64 w-full bg-slate-200"></div>
      <div className="p-5">
        <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export default ProductSkeleton;
