import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import JournalList from "../components/JournalList";
import baseURL from "../../api";

function Journal() {
  const [journalList, setJournalList] = useState([]);
  console.log("this is baseURL in Journal", baseURL)

  const { username } = useSelector(state => state.auth.userInfo);

  const getEntries = async () => {
    try {
      const entries = await axios.get(baseURL + "/api/journal", {
        params: { username },
      });
      setJournalList(entries.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  if (!journalList) return <h1>Loading...</h1>;

  return (
    <div className="w-2/5 mx-auto">
      <Typography variant="h5" color="blue-gray" className="mb-2 mt-6">
        Journal
      </Typography>
      {journalList.length === 0 && <h1>You have no journal entries.</h1>}
      {<JournalList entries={journalList} editable />}
    </div>
  );
}

export default Journal;
