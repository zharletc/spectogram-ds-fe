import React, { useState } from "react";
import AlertCard from "./AlertCard";

export default function AlertList({ alerts, onSelectAlert, selectedAlert }) {
  const [filter, setFilter] = useState("All");

  const equipmentList = ["All", ...new Set(alerts.map((a) => a.machine))];

  const filteredAlerts =
    filter === "All" ? alerts : alerts.filter((a) => a.machine === filter);

  const unreadCount = alerts.filter((a) => !a.read).length;
  return (
    <div className="w-1/3 bg-white border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border text-sm px-2 py-1 rounded"
          >
            {equipmentList.map((eq) => (
              <option key={eq} value={eq}>
                {eq}
              </option>
            ))}
          </select>
          <button
            onClick={() => setFilter("All")}
            className="text-blue-500 text-sm underline"
          >
            Back
          </button>
        </div>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span>{filteredAlerts.length} Alerts</span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
            {unreadCount} New
          </span>
        </div>
      </div>
      <div className="overflow-y-auto p-4 flex-1">
        {filteredAlerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onClick={onSelectAlert}
            selected={selectedAlert?.id === alert.id}
          />
        ))}
      </div>
    </div>
  );
}
