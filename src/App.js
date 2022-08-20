import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Home from "./components/Home"


function App() {
  
  return (
   
      <Router>
        <div className='flex-1 justify-center align-middle'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Main/:id" element={<Main />} />
          </Routes>
        </div>
      </Router>

  );
}

export default App;
