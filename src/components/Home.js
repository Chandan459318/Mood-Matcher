import React from "react";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic (e.g., clear user session, redirect to login)
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div>
      <NavigationBar onLogout={handleLogout} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)", // Adjust height for the navigation bar
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
          Welcome to Mood Matcher
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          Your personalized book recommendation system based on your mood!
        </p>
        <button
          onClick={() => navigate("/questionnaire")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
