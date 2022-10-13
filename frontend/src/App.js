// import * as faceapi from 'face-api.js';
//import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <div className="screen">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
