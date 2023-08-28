import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
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
          Sign In
        </Typography>

        <form className="flex flex-col items-center mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 w-5/6 flex flex-col gap-6">
            <Input
              size="lg"
              label="Username"
              name="username"
              value={input.username}
              onChange={handleOnChange}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              value={input.password}
              onChange={handleOnChange}
            />
          </div>
          <Button className="mt-6 mb-2 flex" onClick={handleSubmit}>
            Sign In
          </Button>
        </form>
      </Card>
    </Card>
  );
}

export default Login;
