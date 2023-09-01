import { TrashIcon } from "@heroicons/react/24/outline";

function InboxItem({ message }) {
  const { createdAt, fromUsername, subject } = message;

  return (
    <>
      <div className="flex hover:bg-gray-300 gap-5">
        <h2 className="w-28">{fromUsername}</h2>
        <h2 className="w-60">{subject}</h2>
        <h2>{createdAt.slice(0, 10)}</h2>
      </div>
      {/* <div>
      <TrashIcon className="h-6 w-6" strokeWidth="2" />
      </div> */}
    </>
  );
}

export default InboxItem;
