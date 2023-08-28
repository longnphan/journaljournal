import { Routes, Route } from "react-router-dom";
import Entry from "./pages/Entry";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/entry" element={<Entry />} />
      </Routes>
    </>
  );
}

export default App;
