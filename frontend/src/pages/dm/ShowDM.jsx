import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import ReplyForm from "../../components/ReplyForm";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";

function ShowDM() {
  const [messageItem, setMessageItem] = useState({});
  const [reply, setReply] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteMessage = async () => {
    try {
      await axios.delete(`/api/dm/${id}`);
      navigate("/inbox");
    } catch (err) {
      console.log(err);
    }
  };

  const getMessage = async () => {
    try {
      const message = await axios.get(`/api/dm/${id}`);
      setMessageItem(...message.data);
    } catch (err) {
      console.log(err);
    }
  };

  const isReply = () => {
    setReply(false)
  }

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <>
      <Card className="mt-6 w-1/2 mx-auto">
        <ArrowLeftCircleIcon
          className="h-6 w-6 ml-1 mt-1 cursor-pointer"
          onClick={() => navigate("/inbox")}
        />
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            From: {messageItem.fromUsername}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Subject: {messageItem.subject}
          </Typography>
          <p className="mb-2">{messageItem.message}</p>
        </CardBody>
        {!reply &&
        <CardFooter className="flex gap-2 pt-0 mx-auto">
          <Button
            className="bg-black text-white hover:scale-105"
            onClick={() => setReply(true)}
          >
            Reply
          </Button>
          <Button
            className="bg-black text-white hover:scale-105"
            onClick={() => deleteMessage()}
          >
            Delete
          </Button>
        </CardFooter>
        }
      </Card>

    {reply &&
    <ReplyForm isReply={isReply} messageItem={messageItem} />
    }

    </>
  );
}

export default ShowDM;
