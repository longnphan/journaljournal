import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import baseURL from "../../api";
import axios from "axios";

function ReplyForm({ isReply, messageItem }) {
  const { from, fromUsername, message, subject, to } = messageItem;

  const [input, setInput] = useState({
    subject: `RE: ${subject}`,
    message: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { _id: userId, username } = useSelector(state => state.auth.userInfo);

  const handleOnChange = e => {
    const name = e.target.name;
    const input = e.target.value;
    setInput(prev => ({ ...prev, [name]: input }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post(baseURL + "/api/dm", {
        ...input,
        to: from,
        from: to,
        fromUsername: username,
      });
      navigate("/inbox");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mt-6 my-8 w-1/2 mx-auto">
      <Card
        className="flex flex-col items-center"
        color="transparent"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Reply to DM
        </Typography>

        <form className="flex flex-col items-center mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 w-5/6 flex flex-col gap-6">
            <Input
              size="lg"
              label="Subject"
              name="subject"
              value={input.subject}
              onChange={handleOnChange}
            />

            <Textarea
              className="h-52"
              size="lg"
              label="Message"
              name="message"
              value={input.message}
              onChange={handleOnChange}
            />
          </div>
          <CardFooter className="flex gap-2 pt-0 mx-auto">
            <Button
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              onClick={handleSubmit}
            >
              Reply
            </Button>
            <Button
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              onClick={() => isReply()}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Card>
  );
}

export default ReplyForm;
