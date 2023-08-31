import React from "react";

function InboxItem({ message }) {
  const { createdAt, from, subject } = message;

  return (
    <>
      <tbody>
        <tr className="cursor-pointer" onClick={() => console.log("clicked")}>
          <td>{from}</td>
          <td>{subject}</td>
          <td>{createdAt.slice(0, 10)}</td>
        </tr>
      </tbody>
    </>
  );
}

export default InboxItem;
