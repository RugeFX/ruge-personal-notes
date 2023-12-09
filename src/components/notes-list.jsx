import NoteCard from "./note-card";
import PropTypes from "prop-types";
import { Spinner, Typography } from "@material-tailwind/react";
import SearchInput from "./search-input";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { archiveNote, deleteNote, unarchiveNote } from "@/api/notes";
import useNotes from "@/hooks/use-notes";
import toast from "react-hot-toast";
import { useLocaleContext } from "@/contexts/locale-context";
import { actions, index } from "@/lib/localized-content";

export default function NotesList({ archived = false }) {
  const { locale } = useLocaleContext();
  const { notes, isLoading, refetch } = useNotes(archived);
  const [searchNotes, setSearchNotes] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  useEffect(() => {
    if (search !== "") {
      setSearchNotes(
        notes.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [search, notes]);

  const onDeleteNote = async (id) => {
    const { data, error } = await deleteNote(id);

    if (error) {
      toast.error(`${actions[locale].delete.fail}, ${data}`);
      return;
    }

    toast.success(`${actions[locale].delete.success}`);
    refetch();
  };

  const onArchiveNote = async (id) => {
    const { data, error } = archived ? await unarchiveNote(id) : await archiveNote(id);

    if (error) {
      toast.error(`${actions[locale][!archived ? "archive" : "unarchive"].fail}, ${data}`);
      return;
    }

    toast.success(`${actions[locale][!archived ? "archive" : "unarchive"].success}`);
    refetch();
  };

  const onSearchChange = (e) => {
    setSearchParams({ search: e.currentTarget.value });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <Spinner />
        {index[locale].loading_notes}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SearchInput keyword={search} onChange={onSearchChange} />
      <div className="w-full mb-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {search && searchNotes.length > 0 ? (
          searchNotes.map((note) => (
            <NoteCard key={note.id} {...note} onDelete={onDeleteNote} onArchive={onArchiveNote} />
          ))
        ) : !search && notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note.id} {...note} onDelete={onDeleteNote} onArchive={onArchiveNote} />
          ))
        ) : (
          <div className="col-span-full text-center">
            <Typography variant="h2" className="text-xl">
              {index[locale].note_not_found}
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
