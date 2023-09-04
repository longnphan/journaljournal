import { useSelector } from "react-redux";
import FriendItem from "./FriendItem";
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

function FriendList({ friends }) {
  const userId = useSelector(state => state.auth.userInfo?.username);

  console.log("This is userId inside FriendList:", userId);
  const pendingApproval = [...friends].filter(
    item =>
      item.username !== userId &&
      item.isApproved === "false" &&
      item.friendName === userId
  );

  console.log("this is pendingApproval arr in FriendList:", pendingApproval);
  const renderFriends = pendingApproval
    .reverse()
    .map(item => <FriendItem key={item._id} friend={item}></FriendItem>);

  return (
    <>
      <Typography variant="h5" color="blue-gray" className="mb-2">
        Pending Requests
      </Typography>
      {renderFriends}
    </>
  );
}

export default FriendList;
