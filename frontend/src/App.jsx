import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
