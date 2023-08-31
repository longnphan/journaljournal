import { useEffect, useState } from "react";
import InboxList from "../components/InboxList";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function Inbox() {
  const [messageList, setMessageList] = useState([]);

  const getMessages = async () => {
    try {
      const messages = await axios.get("/api/dm");
      console.log("this is messages inside Inbox.jsx:", messages);
      setMessageList(messages.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <Card className="mt-6 w-1/2 mx-auto">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Inbox
          </Typography>
          {<InboxList messages={messageList} />}
        </CardBody>
      </Card>
    </>
  );
}

export default Inbox;
