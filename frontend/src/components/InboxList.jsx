import React from "react";
import InboxItem from "./InboxItem";

function InboxList({ messages }) {
  const renderInbox = messages
    .reverse()
    .map(item => <InboxItem key={item._id} message={item}></InboxItem>);

  return (
    <>
      <div className="flex gap-5 font-bold underline">
        <h2 className="w-28">From</h2>
        <h2 className="w-60">Subject</h2>
        <h2>Date</h2>
      </div>
      {renderInbox}
    </>
  );
}

export default InboxList;
