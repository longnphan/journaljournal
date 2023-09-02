import JournalItem from "./JournalItem";

function JournalList({ entries }) {
  const renderJournal = entries
    .reverse()
    .map(item => <JournalItem key={item._id} entry={item}></JournalItem>);

  return (
    <>
      {renderJournal}
    </>
  );
}

export default JournalList;
