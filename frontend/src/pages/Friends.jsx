import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
import FriendList from "../components/FriendList";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import baseURL from "../../api";

function Friends() {
  const [input, setInput] = useState({
    friendName: "",
    friendId: "",
  });

  const [userList, setUserList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [size, setSize] = useState(null);

  const { _id: userId, username } = useSelector(state => state.auth.userInfo);

  // Opens modal and adds friend
  const handleOpen = async value => {
    if (input.friendName.trim()) {
      try {
        await axios.post(baseURL + "/api/friend", {
          userId,
          username,
          friendName: input.friendName,
          friendId: input.friendId,
        });
        setSize(value);
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

  const getFriends = async () => {
    try {
      const friends = await axios.get("/api/friend", {
        headers: {
          userid: userId,
        },
      });
      setFriendsList(friends.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const users = await axios.get(baseURL + "/api/user");
      setUserList(users.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = friendInfo => {
    setInput({
      friendName: friendInfo.username,
      friendId: friendInfo._id,
    });
    setFilteredList([]);
  };

  useEffect(() => {
    getUsers();
    getFriends();
  }, []);

  if (!friendsList || !userList) return <h1>Loading...</h1>;

  return (
    <>
      {/* Friends card */}
      <Card className="mt-6 w-2/5 min-h-[30%] mx-auto">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Friends
          </Typography>

          {friendsList && friendsList
            .filter(item => item.isApproved === "true")
            .map(item =>
              item.username === username ? (
                <div
                  key={item._id}
                  className="flex justify-between hover:bg-gray-200"
                >
                  <Link
                    to={`/friends/${item.friendId}`}
                    state={{ friendName: item.friendName }}
                  >
                    <p className="text-xl text-blue-700">{item.friendName}</p>
                  </Link>

                  <Link
                    to={"/send"}
                    state={{ toName: item.friendName, toId: item.friendId }}
                  >
                    <PencilSquareIcon className="h-4 w-4 ml-1 mt-1 text-black hover:text-gray-600 cursor-pointer" />
                  </Link>
                </div>
              ) : (
                <div
                  key={item._id}
                  className="flex justify-between hover:bg-gray-200"
                >
                  <Link
                    to={`/friends/${item.userId}`}
                    state={{ friendName: item.username }}
                  >
                    <p className="text-xl text-blue-700">{item.username}</p>
                  </Link>

                  <Link
                    key={item._id}
                    to={"/send"}
                    state={{ toName: item.username, toId: item.userId }}
                  >
                    <PencilSquareIcon className="h-4 w-4 ml-1 mt-1 text-black hover:text-gray-600 cursor-pointer" />
                  </Link>
                </div>
              )
            )}
        </CardBody>
      </Card>

      {/* Modal */}
      <div>
        <Dialog
          open={size === "xs" || size === "sm"}
          size={size || "sm"}
          handler={handleOpen}
        >
          <DialogHeader>Friend Request Pending...</DialogHeader>
          <DialogBody divider>
            {`A friend request has been sent to ${input.friendName}`}
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

      {/* Add friends card */}
      <Card className="mt-6 w-2/5 min-h-[10%] mx-auto">
        <CardBody>{<FriendList friends={friendsList} />}</CardBody>
      </Card>

      <Card className="mt-6 w-2/5 min-h-[30%] mx-auto">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Add Friends
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
    </>
  );
}

export default Friends;
