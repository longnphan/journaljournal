import { Typography } from "@material-tailwind/react";
import JournalList from "../components/JournalList";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function ShowFriends() {
  const [friendJournal, setFriendJournal] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const getFriendJournal = async () => {
    try {
      const entries = await axios.get(`/api/journal/${id}`);
      const filteredEntries = entries.data.filter(
        item => item.visibility === "friends"
      );
      setFriendJournal(filteredEntries);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriendJournal();
  }, []);

  return (
    <div className="w-2/5 mx-auto">
      <Typography
        variant="h5"
        color="blue-gray"
        className="flex mb-2 mt-6 gap-4"
      >
        <ArrowLeftCircleIcon
          className="h-6 w-6 ml-1 mt-1 cursor-pointer"
          onClick={() => navigate("/friends")}
        />
        {`${location.state.friendName}'s Journal`}
      </Typography>
      {friendJournal.length === 0 && <h1>There are no journal entries.</h1>}
      {<JournalList entries={friendJournal} editable={false} />}
    </div>
  );
}

export default ShowFriends;
