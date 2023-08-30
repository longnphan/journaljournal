import { Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Edit from "./pages/Edit";
import Entry from "./pages/Entry";
import Friends from "./pages/Friends";
import Help from "./pages/Help";
import Inbox from "./pages/Inbox";
import Journal from "./pages/Journal";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Update from "./pages/users/Update";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/help" element={<Help />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<Update />} />
        <Route path="/journal/entry" element={<Entry />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
