import { useState } from "react";
import axios from "axios";

export default function BookService() {
  const [serviceType, setServiceType] = useState("");
  const [customService, setCustomService] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    let finalService = serviceType === "Other" ? customService : serviceType;

    if (!finalService || !details) {
      alert("Please provide a service type and details!");
      return;
    }

    try {
      await axios.post(
        "https://medical-app-backend-7lq4.onrender.com/requests",
        { serviceType: finalService, details },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Service booked!");
      setServiceType("");
      setCustomService("");
      setDetails("");
    } catch (err) {
      console.error(err);
      alert("Failed to book service.");
    }
  };

  return (
    <div className="container">
      <h2>Book a Service</h2>
      <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
        Select Service Type:
      </label>
      <select
        value={serviceType}
        onChange={e => setServiceType(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "12px 14px",
          marginBottom: "18px",
          borderRadius: "8px",
          border: "1px solid #444",
          backgroundColor: "#2a2a2a",
          color: "#f0f0f0",
          fontSize: "1em",
          cursor: "pointer",
        }}
      >
        <option value="">-- Select a Service --</option>
        <option value="General Checkup">General Checkup</option>
        <option value="Dental">Dental</option>
        <option value="Physiotherapy">Physiotherapy</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Dermatology">Dermatology</option>
        <option value="Other">Other</option>
      </select>


      {serviceType === "Other" && (
        <input
          placeholder="Enter your service"
          value={customService}
          onChange={e => setCustomService(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: "12px 14px",
            marginBottom: "18px",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#2a2a2a",
            color: "#f0f0f0",
            fontSize: "1em",
          }}
        />
      )}
      <input
        placeholder="Details (e.g., Fever for 3 days)"
        value={details}
        onChange={e => setDetails(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "12px 14px",
          marginBottom: "18px",
          borderRadius: "8px",
          border: "1px solid #444",
          backgroundColor: "#2a2a2a",
          color: "#f0f0f0",
          fontSize: "1em",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "12px 0",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(90deg, #646cff, #535bf2)",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
}
