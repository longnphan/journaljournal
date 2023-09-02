import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import JournalList from "../components/JournalList";

function Journal() {
  const [journalList, setJournalList] = useState([]);

  const { username } = useSelector(state => state.auth.userInfo);

  const getEntries = async () => {
    try {
      const entries = await axios.get("/api/journal", { params: { username } });
      setJournalList(entries.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <>
      <Card className="mt-6 w-1/2 mx-auto">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Journal
          </Typography>
          {<JournalList entries={journalList} />}
        </CardBody>
      </Card>
    </>
  );
}

export default Journal;
