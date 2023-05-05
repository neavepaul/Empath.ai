import React from "react";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  return (
    <>
      <div className="emotion-header nav-header">
        <div className="emotion">
          Welcome to <span className="blue-texts">Empath</span>
          <br/>Choose your preferred mode of <span className="blue-texts">Interaction</span>
        </div>
      </div>
      <div className="button-container">
        <button
          className="sign-in-btn blue-text nav-btn"
          onClick={() => navigate("/face")}
        >
          Face & Audio
        </button>
        <button
          className="sign-in-btn blue-text nav-btn"
          onClick={() => navigate("/chat")}
        >
          Chat
        </button>
      </div>
    </>
  );
}

export default Navigation;
