import { dateStringToLocale } from "@/lib/utils";
import { IconButton, Spinner, Typography } from "@material-tailwind/react";
import { ArchiveIcon, ArchiveRestoreIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parser from "html-react-parser";
import toast from "react-hot-toast";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "@/api/notes";
import { useLocaleContext } from "@/contexts/locale-context";
import { actions, details } from "@/lib/localized-content";

export default function NoteDetailsPage() {
  const { locale } = useLocaleContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getNoteDetails(id) {
      setIsLoading(true);
      const { data, error } = await getNote(id);

      if (error) {
        console.error(data);
        setIsLoading(false);
        return;
      }

      setNote(data.data);
      setIsLoading(false);
    }

    getNoteDetails(id);
  }, [id]);

  const onArchive = async () => {
    const { data, error } = note.archived
      ? await unarchiveNote(note.id)
      : await archiveNote(note.id);

    if (error) {
      toast.error(`${actions[locale][!note.archived ? "archive" : "unarchive"].fail}, ${data}`);
      return;
    }

    setNote((prev) => ({ ...prev, archived: !prev.archived }));
    toast.success(`${actions[locale][!note.archived ? "archive" : "unarchive"].success}`);
  };

  const onDelete = async () => {
    const { data, error } = await deleteNote(note.id);

    if (error) {
      toast.error(`${actions[locale].delete.fail}, ${data}`);
      return;
    }

    toast.success(`${actions[locale].delete.success}`);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <Spinner />
        {details[locale].loading_note}
      </div>
    );
  }

  if (!note)
    return (
      <Typography variant="h1" className="text-2xl text-center mb-4">
        {details[locale].not_found}
      </Typography>
    );

  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-col sm:flex-row">
        <div>
          <Typography variant="h1" className="text-3xl">
            {note.title}
          </Typography>
          <Typography variant="small" className="text-foreground/60">
            {dateStringToLocale(locale === "id" ? "id-ID" : "en-US", note.createdAt)}
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
