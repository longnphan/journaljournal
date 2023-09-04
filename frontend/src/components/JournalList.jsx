import JournalItem from "./JournalItem";

function JournalList({ entries, editable }) {
  const renderJournal = entries
    .reverse()
    .map(item => <JournalItem key={item._id} entry={item} editable={editable}></JournalItem>);

  return (
    <>
      {renderJournal}
    </>
  );
}

export default JournalList;
