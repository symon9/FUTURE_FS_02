const OrderHistorySkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="w-2/3 md:w-1/4 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-4 md:mt-0 w-full md:w-1/2">
          <div className="h-10 bg-slate-200 rounded"></div>
          <div className="h-10 bg-slate-200 rounded"></div>
          <div className="h-10 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
export default OrderHistorySkeleton;
