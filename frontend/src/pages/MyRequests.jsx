import { useState } from "react";
import axios from "axios";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://medical-app-backend-7lq4.onrender.com/requests", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch requests.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>My Requests</h2>
      
      <button
        onClick={fetchRequests}
        style={{
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(90deg, #646cff, #535bf2)",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "Loading..." : "Load My Requests"}
      </button>

      {requests.length === 0 && !loading && (
        <p style={{ textAlign: "center", color: "#ccc" }}>No requests found.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {requests.map(r => (
          <div
            key={r.id}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#19a0a3ff",
            }}
          >
            <div style={{ flex: "1 1 60%", minWidth: "200px" }}>
              <b>{r.serviceType}</b> - {r.details}
            </div>
            <div style={{ flex: "1 1 30%", textAlign: "right", minWidth: "100px" }}>
              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  background:
                    r.status === "Pending"
                      ? "#ff9800"
                      : r.status === "Accepted"
                      ? "#4caf50"
                      : "#2196f3",
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
