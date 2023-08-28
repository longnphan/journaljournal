import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";

function Entry() {
  const [input, setInput] = useState({
    title: "",
    entry: "",
  });

  const handleOnChange = e => {
    const name = e.target.name;
    const input = e.target.value;
    setInput(prev => ({ ...prev, [name]: input }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Card className="mt-6 my-8 w-96 mx-auto">
      <Card
        className="flex flex-col items-center"
        color="transparent"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Add New entry
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
              size="lg"
              label="Entry"
              name="entry"
              value={input.entry}
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

export default Entry;
