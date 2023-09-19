import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Button,
  Card,
  Input,
  Radio,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import baseURL from "../../api";
import { useNavigate } from "react-router-dom";

function Entry() {
  const [input, setInput] = useState({
    title: "",
    message: "",
    visibility: "only me",
  });
  const navigate = useNavigate();
  const userId = useSelector(state => state.auth.userInfo._id);

  const handleOnChange = e => {
    const name = e.target.name;
    const input = e.target.value;
    setInput(prev => ({ ...prev, [name]: input }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(baseURL + "/api/journal", { ...input, userId });
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
          Add New Entry
        </Typography>

        <form className="flex flex-col items-center mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 w-5/6 flex flex-col gap-6">
            <Input
              size="lg"
              label="Title"
              name="title"
              value={input.title}
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
            <label className="text-sm pl-2">Who can view this?</label>
            <div className="gap-2 -mt-6">
              <Radio
                name="visibility"
                label="Only Me"
                value="only me"
                onChange={handleOnChange}
                defaultChecked
              />
              <Radio
                name="visibility"
                label="Friends"
                value="friends"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <Button className="mt-6 mb-2 flex" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Card>
    </Card>
  );
}

export default Entry;
