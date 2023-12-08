import { archiveNote, deleteNote, getNote, unarchiveNote } from "@/lib/note-utils";
import { dateStringToLocale } from "@/lib/utils";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArchiveIcon, ArchiveRestoreIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parser from "html-react-parser";
import toast from "react-hot-toast";

export default function NoteDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(() => getNote(id));

  if (!note)
    return (
      <Typography variant="h1" className="text-2xl text-center mb-4">
        Note not found!
      </Typography>
    );

  const onArchive = () => {
    if (note.archived) unarchiveNote(note.id);
    else archiveNote(note.id);

    toast.success(`Successfully ${!note.archived ? "archived" : "unarchived"} note!`);
    setNote(() => getNote(id));
  };

  const onDelete = () => {
    deleteNote(note.id);
    toast.success(`Successfully deleted note!`);
    navigate("/");
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-col sm:flex-row">
        <div>
          <Typography variant="h1" className="text-3xl">
            {note.title}
          </Typography>
          <Typography variant="small" className="text-foreground/60">
            {dateStringToLocale(note.createdAt)}
          </Typography>
        </div>
        <div className="flex gap-2">
          <IconButton
            variant="filled"
            className={`focus:ring-2 active:ring-2 ring-white ${
              note.archived
                ? "text-background bg-foreground focus:bg-foreground/60 hover:bg-foreground/60"
                : "text-foreground bg-background focus:bg-secondary hover:bg-secondary"
            }`}
            name="archive"
            onClick={onArchive}
          >
            {note.archived ? (
              <ArchiveRestoreIcon className="w-5 h-5" />
            ) : (
              <ArchiveIcon className="w-5 h-5" />
            )}
          </IconButton>
          <IconButton
            variant="filled"
            className="bg-background text-foreground focus:bg-destructive hover:bg-destructive focus:ring-2 active:ring-2 ring-white"
            name="delete"
            onClick={onDelete}
          >
            <TrashIcon className="w-5 h-5" />
          </IconButton>
        </div>
      </div>
      <article className="w-full prose-lg prose-invert">{parser(note.body)}</article>
    </div>
  );
}
