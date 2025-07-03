import React, { useState, useEffect } from "react";
import AlertList from "../components/AlertList";
import AlertDetail from "../components/AlertDetail";
import { getAlerts, markAlertAsRead, updateAlertDetails } from "../api";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data);
      setLoading(false);
    };

    fetchAlerts();
  }, []);

  const handleSelectAlert = async (alert) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alert.id ? { ...a, read: true } : a))
    );

    markAlertAsRead(alert.id);
    setSelectedAlert(alert);
  };

  const handleUpdateAlert = async (updatedFields) => {
    if (!selectedAlert) return;

    const updatedAlert = {
      ...selectedAlert,
      ...updatedFields,
    };

    await updateAlertDetails(selectedAlert.id, updatedFields);
    setAlerts((prev) =>
      prev.map((a) => (a.id === selectedAlert.id ? updatedAlert : a))
    );
    setSelectedAlert(updatedAlert);
  };

  if (loading) return <div className="p-4">Loading alerts...</div>;

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <AlertList
        alerts={alerts}
        selectedAlert={selectedAlert}
        onSelectAlert={handleSelectAlert}
      />
      <AlertDetail alert={selectedAlert} onUpdateAlert={handleUpdateAlert} />
    </div>
  );
}
