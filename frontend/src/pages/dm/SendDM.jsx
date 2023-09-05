import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import baseURL from "../../../api";
import axios from "axios";

function SendDM() {
  const [input, setInput] = useState({
    subject: "",
    message: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { toId, toName } = location.state;
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
        to: toId,
        from: userId,
        fromUsername: username,
      });
      navigate("/friends");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mt-6 my-8 w-96 mx-auto">
      <ArrowLeftCircleIcon
        className="h-6 w-6 ml-1 mt-1 cursor-pointer"
        onClick={() => navigate("/friends")}
      />
      <Card
        className="flex flex-col items-center"
        color="transparent"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Send DM
        </Typography>

        <form className="flex flex-col items-center mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 w-5/6 flex flex-col gap-6">
            {/* "to" input is disable */}
            <Input
              size="lg"
              label="To"
              name="to"
              defaultValue={toName}
              disabled
            />

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
          <Button className="mt-6 mb-2 flex" onClick={handleSubmit}>
            Send
          </Button>
        </form>
      </Card>
    </Card>
  );
}

export default SendDM;
