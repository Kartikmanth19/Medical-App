import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token"); 
  const role = localStorage.getItem("role");

  const fetchRequests = async () => {
    if (role !== "admin") {
      alert("Access denied. You must be an admin to view this page.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get("https://medical-app-backend-7lq4.onrender.com/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to fetch requests");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://medical-app-backend-7lq4.onrender.com/requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests(); 
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`https://medical-app-backend-7lq4.onrender.com/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRequests(); 
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete request");
    }
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      <button
        onClick={fetchRequests}
        style={{
          marginBottom: "15px",
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          background: "linear-gradient(90deg, #646cff, #535bf2)",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        {loading ? "Loading..." : "Reload Requests"}
      </button>

      {requests.length === 0 && !loading && <p>No requests found.</p>}

      {requests.map((r) => (
        <div
          key={r.id}
          className="card"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "10px",
            background: "#2a8984ff",
          }}
        >
          <div>
            <b>{r.serviceType}</b> - {r.details} →{" "}
            <span style={{ fontWeight: "600", color: "#333" }}>{r.status}</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {r.status === "Pending" && (
              <button
                onClick={() => updateStatus(r.id, "Accepted")}
                style={{ background: "#4caf50", color: "#fff", padding: "5px 10px" }}
              >
                Accept
              </button>
            )}
            {r.status === "Accepted" && (
              <button
                onClick={() => updateStatus(r.id, "Completed")}
                style={{ background: "#2196f3", color: "#fff", padding: "5px 10px" }}
              >
                Complete
              </button>
            )}
            <button
              style={{ background: "#ff4d4f", color: "#fff", padding: "5px 10px" }}
              onClick={() => deleteRequest(r.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
