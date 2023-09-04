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

function FriendItem({ friend }) {
  const { _id, username } = friend;

  const handleApprove = async () => {
    console.log("inside of handleApprove in FriendItem");
    try {
      await axios.put(`/api/friend/${_id}`, {
        ...friend,
        isApproved: "true",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async () => {
    console.log("inside of handleDecline in FriendItem");
    try {
      await axios.put("/api/friend", {
        ...friend,
        isApproved: "declined",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-between mt-2">
        <p className="ml-2 text-xl">{username}</p>
        <div className="gap-2">
          <Button
            size="sm"
            color="gray"
            className="rounded"
            onClick={handleApprove}
          >
            Approve
          </Button>
          <Button
            size="sm"
            color="gray"
            className="ml-2 rounded"
            onClick={handleDecline}
          >
            Decline
          </Button>
        </div>
      </div>
    </>
  );
}

export default FriendItem;
