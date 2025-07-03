import React, { useEffect, useRef } from "react";
import AlertCard from "./AlertCard";

export default function AlertListPaged({
  alerts,
  loading,
  selectedAlert,
  onSelectAlert,
  hasMore,
  isFetching,
  loadMore,
  meta,
  categories,
  applyFilter,
  currentFilter,
}) {
  const observerRef = useRef();

  useEffect(() => {
    if (!hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, isFetching]);

  return (
    <div className="w-1/3 bg-white border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex flex-col justify-between mb-4 gap-2">
          <button
            onClick={() => applyFilter(null)}
            className="text-blue-500 text-sm text-left max-w-max"
          >
            ← Back
          </button>
          <select
            value={currentFilter || ""}
            onChange={(e) =>
              applyFilter(e.target.value === "All" ? null : e.target.value)
            }
            className="border text-sm px-2 py-1 rounded max-w-max"
          >
            <option value="All">All</option>
            {categories.map((eq) => (
              <option key={eq} value={eq}>
                {eq}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span> {meta.total} Alerts</span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
            {meta.totalNew} New
          </span>
        </div>
      </div>
      <div className="overflow-y-auto p-4 flex-1">
        {alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onClick={onSelectAlert}
            selected={selectedAlert?.id === alert.id}
          />
        ))}
        {hasMore && (
          <div ref={observerRef} className="h-12 min-h-[40px]">
            Loading more...
          </div>
        )}
        {loading && <div className="text-center mt-4">Loading...</div>}
      </div>
    </div>
  );
}
