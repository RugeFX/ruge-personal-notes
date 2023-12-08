import { useCallback, useLayoutEffect, useState } from "react";
import NoteCard from "./note-card";
import {
  archiveNote,
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
  unarchiveNote,
} from "@/lib/note-utils";
import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";
import SearchInput from "./search-input";

export default function NotesList({ archived = false }) {
  const getNoteFn = archived ? getArchivedNotes : getActiveNotes;

  const [notes, setNotes] = useState(getNoteFn);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const filterNoteByTitle = useCallback(
    (filter) =>
      getNoteFn().filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase())),
    [getNoteFn]
  );

  const onDeleteNote = (id) => {
    deleteNote(id);
    setNotes(search ? filterNoteByTitle(search) : getNoteFn());
  };

  const onArchiveNote = (id) => {
    if (archived) unarchiveNote(id);
    else archiveNote(id);

    setNotes(search ? filterNoteByTitle(search) : getNoteFn());
  };

  const onSearchChange = (e) => {
    setSearchParams({ search: e.currentTarget.value });
  };

  useLayoutEffect(() => {
    setNotes(search ? filterNoteByTitle(search) : getNoteFn());
  }, [search]);

  return (
    <div className="space-y-4">
      <SearchInput keyword={search} onChange={onSearchChange} />
      <div className="w-full mb-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note.id} {...note} onDelete={onDeleteNote} onArchive={onArchiveNote} />
          ))
        ) : (
          <div className="col-span-full text-center">
            <Typography variant="h2" className="text-xl">
              Notes not found
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}

NotesList.propTypes = {
  archived: PropTypes.bool,
};
