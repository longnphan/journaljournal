import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
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
          <p className="mb-2">
            {messageItem.message}
          </p>
        </CardBody>
        <CardFooter className="flex gap-2 pt-0 mx-auto">
          <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
            Reply
          </Button>
          <Button
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            onClick={() => deleteMessage()}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default ShowDM;
