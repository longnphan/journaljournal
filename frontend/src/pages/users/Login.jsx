import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = e => {
    const name = e.target.name;
    const input = e.target.value;
    setInput(prev => ({ ...prev, [name]: input }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const authRes = await axios.post("/api/user/auth", input);

      console.log("This is authRes in Login.jsx:", authRes.data);
      dispatch(setUser(authRes.data));
      navigate("/journal");
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

          <Typography
            color="gray"
            className="mt-4 mb-2 text-center font-normal"
          >
            Are you a new user?{" "}
            <Link
              to={"/register"}
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Create an account
            </Link>
          </Typography>
        </form>
      </Card>
    </Card>
  );
}

export default Login;
