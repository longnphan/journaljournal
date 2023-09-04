import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Edit from "./pages/Edit";
import Entry from "./pages/Entry";
import Friends from "./pages/Friends";
import Help from "./pages/Help";
import Inbox from "./pages/dm/Inbox";
import Journal from "./pages/Journal";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import ShowDM from "./pages/dm/ShowDM";
import ShowFriends from "./pages/ShowFriends";
import Update from "./pages/users/Update";
import { NavBar } from "./components/NavBar";

function App() {
  const username = useSelector(state => state.auth.userInfo?.username);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {!username ? (
          <Route path="*" element={<Navigate to="/" />} />
        ) : (
          <>
            <Route path="/help" element={<Help />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/update" element={<Update />} />
            <Route path="/journal/entry" element={<Entry />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/inbox/:id" element={<ShowDM />} />
            <Route path="/journal/:id" element={<Edit />} />
            <Route path="/friends/:id" element={<ShowFriends />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
