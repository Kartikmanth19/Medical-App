import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookService from "./pages/BookService";
import MyRequests from "./pages/MyRequests";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole("");
    navigate("/");
  };

  return (
    <div>
      <header style={{ textAlign: "center", padding: "20px 0", color: "#646cff" }}>
        <h1>Medical Services App</h1>
      </header>
       
       <nav
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "25px 25px",
    background: "linear-gradient(90deg, #646cff, #535bf2)",
    borderRadius: "0 0 10px 10px",
  }}
>
  {!isLoggedIn ? (
    <>
      <Link to="/" style={{ color: "#fff", fontWeight: "500" }}>Login</Link>
      <Link to="/register" style={{ color: "#fff", fontWeight: "500" }}>Register</Link>
    </>
  ) : role === "admin" ? (
    <>
      <span style={{ color: "#ffd54f", fontWeight: "600" }}>Hi , {localStorage.getItem("email")}</span>

      <Link to="/admin" style={{ color: "#fff", fontWeight: "500" }}>Admin</Link>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #ff4d4f, #d9363e)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={e => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
          }}
        >
          Logout
        </button>
      </div>
    </>
  ) : (
    <>
      <span style={{ color: "#ffd54f", fontWeight: "600" }}>Hi , {localStorage.getItem("email")}</span>

      <Link to="/book" style={{ color: "#fff", fontWeight: "500" }}>Book</Link>
      <Link to="/requests" style={{ color: "#fff", fontWeight: "500" }}>My Requests</Link>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #ff4d4f, #d9363e)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={e => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
          }}
        >
          Logout
        </button>
      </div>
    </>
  )}
</nav>

      

      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/book" element={<BookService />} />
            <Route path="/requests" element={<MyRequests />} />
            {role === "admin" && <Route path="/admin" element={<AdminPanel />} />}
            <Route path="/" element={<BookService />} />
            <Route path="/register" element={<BookService />} />
          </>
        )}
      </Routes>
    </div>
  );
}
