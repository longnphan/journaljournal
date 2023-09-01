import React from "react";
import InboxItem from "./InboxItem";

function InboxList({ messages }) {
  const renderInbox = messages.map(item => (
    <InboxItem key={item._id} message={item}></InboxItem>
  ));

  return (
    <>
      <div className="flex gap-5 font-bold underline">
        <h2 className="w-28">From</h2>
        <h2 className="w-60">Subject</h2>
        <h2 >Date</h2>
      </div>
      {renderInbox}
      {/* <table className="table-auto w-full">
        <thead>
          <tr >
            <th>From</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        {renderInbox}
      </table> */}
    </>
  );
}

export default InboxList;
