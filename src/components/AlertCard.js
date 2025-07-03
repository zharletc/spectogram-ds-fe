import React from "react";

export default function AlertCard({ alert, onClick, selected }) {
  const colorMap = {
    Mild: "bg-green-100 text-green-800",
    Moderate: "bg-yellow-100 text-yellow-800",
    Severe: "bg-red-100 text-red-800",
  };

  return (
    <div
      onClick={() => onClick(alert)}
      className={`cursor-pointer border p-3 mb-2 rounded shadow-sm hover:bg-gray-50 flex gap-2 ${
        selected ? "border-blue-500 bg-blue-50" : ""
      }`}
    >
      <div className="flex-shrink-0 w-1">
        <div>
          {!alert.read && (
            <div className="h-2 w-2 bg-[#3478FC] rounded-full mt-2" title="Unread" />
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold">ID #{alert.id}</span>
          <span
            className={`text-xs px-2 py-1 rounded rounded-lg ${
              colorMap[alert.anomaly] || "bg-gray-200"
            }`}
          >
            {alert.anomaly}
          </span>
        </div>
        <div className="text-sm font-medium">{alert.suspected_reason}</div>
        <div className="text-xs text-gray-500">
          Detected at {alert.timestamp}
        </div>
        <div className="text-blue-600 text-sm mt-2">{alert.machine}</div>
      </div>
    </div>
  );
}
