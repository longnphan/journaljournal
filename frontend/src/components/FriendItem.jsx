import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import baseURL from "../../api";
import axios from "axios";

function FriendItem({ friend }) {
  const { _id, username } = friend;
  const navigate = useNavigate();

  const handleApprove = async () => {
    try {
      await axios.put(baseURL + `/api/friend/${_id}`, {
        ...friend,
        isApproved: "true",
      });
      navigate("/inbox");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async () => {
    try {
      await axios.put(baseURL + `/api/friend/${_id}`, {
        ...friend,
        isApproved: "declined",
      });
      navigate("/inbox");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-between mt-2" key={crypto.randomUUID()}>
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
