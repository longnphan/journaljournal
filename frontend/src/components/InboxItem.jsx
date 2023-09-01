import { useNavigate } from "react-router-dom";
import axios from "axios";

function InboxItem({ message }) {
  const { createdAt, fromUsername, _id, read, subject } = message;
  const navigate = useNavigate();

  const handleClick = async () => {
      // marks DM as read
      try {
        await axios.patch(`/api/dm/${_id}`);
        navigate(`/inbox/${_id}`);
      } catch (err) {
        console.log(err);
      }
    };
  

  return (
    <>
      <div
        className={`flex hover:bg-gray-300 gap-5 border-b cursor-pointer ${
          !read ? "font-bold" : ""
        }`}
        onClick={handleClick}
      >
        <h2 className="w-28">{fromUsername}</h2>
        <h2 className="w-60">{subject}</h2>
        <h2>{createdAt.slice(0, 10)}</h2>
      </div>
    </>
  );
}

export default InboxItem;
