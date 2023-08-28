import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    pwConfirm: "",
  });

  const handleOnChange = e => {
    const name = e.target.name;
    const input = e.target.value;
    setInput(prev => ({ ...prev, [name]: input }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (input.password !== input.pwConfirm) alert("passwords don't match");
  };

  return (
    <Card className="mt-6 my-8 w-96 mx-auto">
      <Card
        className="flex flex-col items-center"
        color="transparent"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
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
              size="lg"
              label="Email"
              name="email"
              value={input.email}
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
            <Input
              type="password"
              size="lg"
              label="Confirm Password"
              name="pwConfirm"
              value={input.pwConfirm}
              onChange={handleOnChange}
            />
          </div>
          <Button className="mt-6 flex" onClick={handleSubmit}>
            Register
          </Button>
          <Typography
            color="gray"
            className="mt-4 mb-2 text-center font-normal"
          >
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </Card>
  );
}

export default Register;
