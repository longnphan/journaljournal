import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardFooter,
  Input,
  Radio,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import baseURL from "../../api";
import axios from "axios";

function Edit() {
  const location = useLocation();
  const { title, message, userId, visibility } = location.state;
  const [input, setInput] = useState({
    title,
    message,
    visibility,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/journal/${id}`);
      navigate("/journal");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = e => {
    const name = e.target.name;
    const input = e.target.value;
    setInput(prev => ({ ...prev, [name]: input }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log("this is input inside of Edit.jsx:", input);
    try {
      await axios.put(baseURL + `/api/journal/${id}`, { ...input, userId });
      navigate("/journal");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mt-6 my-8 w-96 mx-auto">
      <ArrowLeftCircleIcon
        className="h-6 w-6 ml-1 mt-1 cursor-pointer"
        onClick={() => navigate("/journal")}
      />
      <Card
        className="flex flex-col items-center"
        color="transparent"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Edit Entry
        </Typography>

        <form className="flex flex-col items-center mt-8 mb-2 w-96 max-w-screen-lg sm:w-96">
          <div className="mb-4 w-5/6 flex flex-col gap-6">
            <Input
              size="lg"
              label="Title"
              name="title"
              value={input.title}
              onChange={handleOnChange}
            />

            <Textarea
              size="lg"
              className="h-48"
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
                defaultChecked={visibility === "only me" ? true : false}
              />
              <Radio
                name="visibility"
                label="Friends"
                value="friends"
                onChange={handleOnChange}
                defaultChecked={visibility === "friends" ? true : false}
              />
            </div>
          </div>

          <CardFooter className="flex gap-2 pt-0 mx-auto">
            <Button
              className="bg-black text-white hover:scale-105"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              className="bg-black text-white hover:scale-105"
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Card>
  );
}

export default Edit;
