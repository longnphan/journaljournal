import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

function Reply() {
  const [input, setInput] = useState({
    subject: "",
    message: "",
  });

  const navigate = useNavigate();
  const { _id: userId, username } = useSelector(state => state.auth.userInfo);

  const handleOnChange = e => {
    const name = e.target.name;
    const input = e.target.value;
    setInput(prev => ({ ...prev, [name]: input }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log("this is input inside of Help.jsx:", input);
    try {
      await axios.post("/api/dm", {
        ...input,
        to: "64ee2e434a748f8e53b07c50",
        from: userId,
        fromUsername: username,
        username,
      });
      navigate("/journal");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mt-6 my-8 w-96 mx-auto">
      <Card
        className="flex flex-col items-center"
        color="transparent"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Report Bugs or Request Help
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
              className="h-48"
              size="lg"
              label="Message"
              name="message"
              value={input.message}
              onChange={handleOnChange}
            />
          </div>
          <Button className="mt-6 mb-2 flex" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Card>
    </Card>
  );
}

export default Reply;
