import NotesList from "@/components/notes-list";
import { useLocaleContext } from "@/contexts/locale-context";
import { index } from "@/lib/localized-content";
import { Typography } from "@material-tailwind/react";

export default function ArchivePage() {
  const { locale } = useLocaleContext();

  return (
    <div className="space-y-4 mb-4">
      <Typography variant="h1" className="text-2xl mb-4">
        {index[locale].archive}
      </Typography>
      <NotesList archived />
    </div>
  );
}
