import { useState } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

function Journal() {
  const [journalList, setJournalList] = useState([]);

  const getEntries = async () => {
    try {
      const entries = await axios.get("/api/journal");
      console.log("this is messages inside Journal.jsx:", journalList);
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
        </CardBody>
      </Card>
    </>
  );
}

export default Journal;
