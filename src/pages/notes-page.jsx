import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { PlusCircleIcon } from "lucide-react";
import NotesList from "@/components/notes-list";
import { index } from "@/lib/localized-content";
import { useLocaleContext } from "@/contexts/locale-context";

export default function NotesPage() {
  const { locale } = useLocaleContext();

  return (
    <div className="space-y-4 mb-4">
      <Typography variant="h1" className="text-2xl mb-4">
        {index[locale].heading}
      </Typography>
      <NotesList />
      <Link
        to="/new"
        className={`flex flex-col gap-2 items-center justify-center text-accent-foreground w-full h-full py-10 border-2 border-accent border-dashed rounded-lg hover:bg-accent/20 hover:border-primary transition-colors col-span-full`}
      >
        <PlusCircleIcon className="w-10 h-10" />
        {index[locale].add}
      </Link>
    </div>
  );
}
