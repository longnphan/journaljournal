import { Routes, Route } from "react-router-dom";
import Edit from "./pages/Edit";
import Entry from "./pages/Entry";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
