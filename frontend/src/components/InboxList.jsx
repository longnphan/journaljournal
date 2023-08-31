import React from "react";
import InboxItem from "./InboxItem";

function InboxList({ messages }) {
  const renderInbox = messages.map(item => (
    <InboxItem key={item._id} message={item}></InboxItem>
  ));

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>From</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        {renderInbox}
      </table>
    </>
  );
}

export default InboxList;
