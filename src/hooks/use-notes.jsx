import { getActiveNotes, getArchivedNotes } from "@/api/notes";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useNotes(archived = false) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getNotes = useCallback(async () => {
    setIsLoading(true);

    const { data, error } = archived ? await getArchivedNotes() : await getActiveNotes();

    if (error) {
      toast.error(`Error while fetching notes: ${data}`);
      setIsLoading(false);
      return;
    }

    setNotes(data.data);
    setIsLoading(false);
  }, [archived]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return { notes, isLoading, refetch: getNotes };
}
