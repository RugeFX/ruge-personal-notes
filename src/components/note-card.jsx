import { Card, CardBody, CardFooter, IconButton, Typography } from "@material-tailwind/react";
import { ArchiveIcon, ArchiveRestoreIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { dateStringToLocale } from "@/lib/utils";
import { useLocaleContext } from "@/contexts/locale-context";

export default function NoteCard({ id, title, body, createdAt, archived, onArchive, onDelete }) {
  const { locale } = useLocaleContext();

  return (
    <Card className="w-full bg-card border border-accent hover:border-primary hover:bg-accent/20 transition-colors">
      <CardBody>
        <Typography
          as={Link}
          to={`/details/${id}`}
          variant="h5"
          className="text-foreground hover:underline"
        >
          {title}
        </Typography>
        <Typography variant="small" className="text-card-foreground/60">
          {dateStringToLocale(locale === "id" ? "id-ID" : "en-US", createdAt)}
        </Typography>
        <div className="text-card-foreground">{parser(body)}</div>
      </CardBody>
      <CardFooter className="pt-0 mt-auto w-full flex gap-2 justify-end">
        <IconButton
          variant="filled"
          className="bg-background text-foreground focus:bg-secondary hover:bg-secondary focus:ring-2 active:ring-2 ring-white"
          name="archive"
          onClick={() => onArchive(id)}
        >
          {archived ? (
            <ArchiveRestoreIcon className="w-5 h-5" />
          ) : (
            <ArchiveIcon className="w-5 h-5" />
          )}
        </IconButton>
        <IconButton
          variant="filled"
          className="bg-background text-foreground focus:bg-destructive hover:bg-destructive focus:ring-2 active:ring-2 ring-white"
          name="delete"
          onClick={() => onDelete(id)}
        >
          <TrashIcon className="w-5 h-5" />
        </IconButton>
      </CardFooter>
    </Card>
  );
}

NoteCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
