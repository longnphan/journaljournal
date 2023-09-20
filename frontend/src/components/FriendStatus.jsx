import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

function FriendStatus({ friendsList }) {
  const { username } = useSelector(state => state.auth.userInfo);

  if (!friendsList) return <h1>Loading...</h1>;

  return (
    <>
      {friendsList
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
    </>
  );
}

export default FriendStatus;
