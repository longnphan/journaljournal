import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InboxList from "../../components/InboxList";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import baseURL from "../../../api";
import axios from "axios";

function Inbox() {
  const [messageList, setMessageList] = useState([]);

  const { _id: userId } = useSelector(state => state.auth.userInfo);

  const getMessages = async () => {
    try {
      const messages = await axios.get(baseURL + "/api/dm", {
        headers: {
          userid: userId,
        },
      });
      setMessageList(messages.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  if (!messageList) return <h1>Loading...</h1>;

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
