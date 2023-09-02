import { useNavigate } from "react-router-dom";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function JournalItem({ entry }) {
  const { _id, createdAt, title, message, userId, visibility } = entry;
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate(`/journal/${_id}`, {
      state: { title, message, userId, visibility },
    });
  };

  return (
    <>
      <Card className="mt-6 w-9/10 mx-auto">
        <div className="flex justify-between p-2 bg-gray-700 rounded-t-xl">
          <Typography variant="h6" color="white" className="mb-2">
            {title}
          </Typography>
          <Typography variant="h6" color="white" className="mb-2">
            {createdAt.slice(0, 10)}
          </Typography>
          <div className="flex gap-1">
            <PencilIcon
              className="h-5 w-5 ml-1 mt-1 text-white hover:text-black cursor-pointer"
              onClick={handleClick}
            />
          </div>
        </div>
        <CardBody>
          <p>{message}</p>
        </CardBody>
      </Card>
    </>
  );
}

export default JournalItem;
