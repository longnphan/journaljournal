import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";

function Friends() {
  const [input, setInput] = useState("");
  const [userList, setUserList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const currentUser = useSelector(state => state.auth.userInfo?.username);

  const handleOnChange = e => {
    setInput(e.target.value);
    const users = [
      ...userList.filter(
        item => item.username !== currentUser && item.username !== "admin"
      ),
    ];
    let newList = users.filter(item => item.username.includes(input));
    setFilteredList(newList);
  };

  const getUsers = async () => {
    try {
      const users = await axios.get("/api/user");
      setUserList(users.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = e => {
    const name = e.target.innerText;
    setInput(name);
    setFilteredList([]);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Card className="mt-6 w-2/5 h-96 mx-auto">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Friends
          </Typography>
          <div className="relative mt-3 flex w-full max-w-[24rem]">
            <Input
              label="Search for Friends"
              value={input}
              onChange={handleOnChange}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              color="gray"
              className="!absolute right-1 top-1 rounded"
            >
              Add
            </Button>
          </div>
          <div>
            {filteredList.map(item => (
              <h2
                key={item._id}
                className="ml-3 mr-1 hover:bg-gray-200"
                onClick={e => handleFilter(e)}
              >
                {item.username}
              </h2>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Friends;
