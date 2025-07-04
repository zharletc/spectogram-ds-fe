import React, { useEffect, useState } from "react";
import WaveformPlayer2 from "./WaveformPlayer2";
import BtnSpinner from "./BtnSpinner";

export default function AlertDetail({ updatting, alert, onUpdateAlert }) {
  const [form, setForm] = useState({
    comment: "",
    suspected_reason: "",
    action_required: "",
  });

  const [audioId, setAudioId] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const [audioId2, setAudioId2] = useState(null);
  const [audioUrl2, setAudioUrl2] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAlert(form);
  };

  useEffect(() => {
    if (alert) {
      const baseUrl = process.env.REACT_APP_STORAGE_BASE_URL;
      setForm({
        comment: alert.comment || "",
        suspected_reason: alert.suspected_reason || "",
        action_required: alert.action_required || "",
      });

      setAudioId(`audio-${alert.id}`);
      setAudioUrl(`${baseUrl}/${alert.sound_clip}`);

      setAudioId2(`audio2-${alert.id}`);
      setAudioUrl2(`${baseUrl}/${alert.sound_clip}`);
    }
  }, [alert]);

  if (!alert) {
    return <div className="w-2/3 p-4">Select an alert to view details.</div>;
  }

  return (
    <div className="w-2/3 p-4 space-y-4 overflow-y-auto">
      <h2 className="text-xl font-bold">
        Alert ID #{alert.id}
        <span className="text-sm text-gray-500 ml-4">
          Detected at {alert.timestamp}
        </span>
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-1">Anomaly Machine Output</h3>
          <audio id={audioId} controls src={audioUrl} className="mb-2 w-full" />
          <WaveformPlayer2 audioId={audioId} />
        </div>
        <div>
          <h3 className="text-md font-semibold mb-1">Normal Machine Output</h3>
          <audio
            id={audioId2}
            controls
            src={audioUrl2}
            className="mb-2 w-full"
          />
          <WaveformPlayer2 audioId={audioId2} />
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold">Equipment</label>
          <input
            type="text"
            value={alert.machine}
            disabled
            className="border px-3 py-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Suspected Reason</label>
          <select
            name="suspected_reason"
            value={form.suspected_reason}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="" disabled hidden>
              Select reason
            </option>
            <option value="Unknown Anomaly">Unknown Anomaly</option>
            <option value="Spindle Error">
              Spindle Error
            </option>
            <option value="Axis Problem">Axis Problem</option>
            <option value="Normal">Normal</option>
            <option value="Machine Crash">Machine Crash</option>
            <option value="Router Fault">Router Fault</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Action Required</label>
          <select
            name="action_required"
            value={form.action_required}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="" disabled hidden>
              Select action
            </option>
            <option value="Immediate">Immediate</option>
            <option value="Later">Later</option>
            <option value="No Action">No Action</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Comments</label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            rows={3}
          />
        </div>
        {}
        <button
          type="submit"
          disabled={updatting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {updatting ? <BtnSpinner /> : "Update"}
        </button>
      </form>
    </div>
  );
}
