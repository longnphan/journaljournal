import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";

function Friends() {
  const [input, setInput] = useState({
    friendName: "",
    friendId: "",
  });

  const [userList, setUserList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [size, setSize] = useState(null);

  const { _id: userId, username } = useSelector(state => state.auth.userInfo);

  // Opens modal and adds friend
  const handleOpen = async value => {
    if (input.friendName.trim().length > 0) {
      try {
        console.log("this is input inside handleOpen:", input);
        await axios.post("/api/friend", {
          userId,
          username,
          friendName: input.friendName,
          friendId: input.friendId,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleConfirm = () => {
    setInput({
      friendName: "",
      friendId: "",
    });
    setSize(null);
  };

  const handleOnChange = e => {
    const name = e.target.name;
    const input = e.target.value;
    setInput(prev => ({ ...prev, [name]: input }));

    const users = [
      ...userList.filter(
        item => item.username !== username && item.username !== "admin"
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

  const handleFilter = friendInfo => {
    setInput({
      friendName: friendInfo.username ,
      friendId: friendInfo._id,
    });
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
              name="friendName"
              value={input.friendName}
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
              onClick={() => handleOpen("sm")}
            >
              Add
            </Button>
          </div>
          <div>
            {filteredList.map(item => (
              <h2
                key={item._id}
                className="ml-3 mr-1 hover:bg-gray-200"
                onClick={() => handleFilter(item)}
              >
                {item.username}
              </h2>
            ))}
          </div>
        </CardBody>
      </Card>

      <div>
        <Dialog
          open={size === "xs" || size === "sm"}
          size={size || "sm"}
          handler={handleOpen}
        >
          <DialogHeader>Friend Request Pending...</DialogHeader>
          <DialogBody divider>
            `A friend request has been sent to ${input.friendName}`
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="blue-gray"
              onClick={handleConfirm}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
}

export default Friends;
