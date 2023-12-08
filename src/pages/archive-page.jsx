import NotesList from "@/components/notes-list";
import { Typography } from "@material-tailwind/react";

export default function ArchivePage() {
  return (
    <div className="space-y-4 mb-4">
      <Typography variant="h1" className="text-2xl mb-4">
        Archived Notes
      </Typography>
      <NotesList archived />
    </div>
  );
}
