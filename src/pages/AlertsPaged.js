import React, { useState, useEffect, useRef } from "react";
import AlertDetail from "../components/AlertDetail";
import AlertListPaged from "../components/AlertListPaged";
import {
  getAlertsPaginated,
  markAlertAsRead,
  updateAlertDetails,
} from "../api";
import { ToastContainer, toast } from "react-toastify";

export default function AlertsPaged() {
  const [alerts, setAlerts] = useState([]);
  const [params, setParams] = useState({ page: 1, machine: null });
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [updatting, setUpdatting] = useState(false);
  const fetchLock = useRef(false);
  const fetchData = async () => {
    const { page, machine } = params;
    if (fetchLock.current || !hasMore) return;

    fetchLock.current = true;
    setIsFetching(true);
    if (page === 1) setLoading(true);

    try {
      const { data, meta } = await getAlertsPaginated(page, 5, machine);
      setAlerts((prev) => (page === 1 ? data : [...prev, ...data]));
      setMeta(meta);
      if (categories.length === 0) setCategories(meta.categories);
      if (meta.page >= meta.totalPages) setHasMore(false);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setIsFetching(false);
      fetchLock.current = false;
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const loadMore = () => {
    if (fetchLock.current || !hasMore) return;
    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const applyFilter = (machine) => {
    setAlerts([]);
    setHasMore(true);
    setParams({ page: 1, machine });
  };

  const handleSelectAlert = async (alert) => {
    if (!alert.read) {
      setMeta((prev) => ({ ...prev, totalNew: prev.totalNew - 1 }));
      setAlerts((prev) =>
        prev.map((a) => (a.id === alert.id ? { ...a, read: true } : a))
      );
      markAlertAsRead(alert.id);
    }
    setSelectedAlert(alert);
  };

  const handleUpdateAlert = async (updatedFields) => {
    if (!selectedAlert) return;
    setUpdatting(true);
    const updatedAlert = { ...selectedAlert, ...updatedFields, read: true };
    const res = await updateAlertDetails(selectedAlert.id, updatedFields);
    setUpdatting(false);
    if (res.success) {
      toast.success("Update successful");
      setAlerts((prev) =>
        prev.map((a) => (a.id === selectedAlert.id ? updatedAlert : a))
      );
      setSelectedAlert(updatedAlert);
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <ToastContainer />
      <AlertListPaged
        alerts={alerts}
        loading={loading}
        selectedAlert={selectedAlert}
        onSelectAlert={handleSelectAlert}
        hasMore={hasMore}
        isFetching={isFetching}
        loadMore={loadMore}
        meta={meta}
        categories={categories}
        applyFilter={applyFilter}
        currentFilter={params.machine}
      />
      <AlertDetail alert={selectedAlert} onUpdateAlert={handleUpdateAlert} updatting={updatting} />
    </div>
  );
}
