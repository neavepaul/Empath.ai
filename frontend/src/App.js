// import * as faceapi from 'face-api.js';
//import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Face from "./components/Face";
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <div className="screen">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/face" element={<Face/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
