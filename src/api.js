import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getAlerts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts`);
    return response.data.data;
  } catch (err) {
    console.error("Error fetching alerts:", err);
    return [];
  }
};

export const markAlertAsRead = async (id) => {
  try {
    await axios.put(`${API_BASE_URL}/alerts/${id}/read`);
  } catch (err) {
    console.error("Failed to mark alert as read:", err);
  }
};

export const updateAlertDetails = async (id, { comment, suspected_reason, action_required }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/alerts/${id}`, {
      comment,
      suspected_reason,
      action_required,
    });
    
    return response.data;
  } catch (err) {
    console.error("Failed to update alert:", err);
  }
};

export const getAlertsPaginated = async (page = 1, limit = 5, machine = null) => {
  const res = await axios.get(`${API_BASE_URL}/alerts?page=${page}&limit=${limit}${machine ? `&machine=${machine}` : ''}`);
  return res.data;
};