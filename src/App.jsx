import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UnderlineTabsNav from "./components/underline-tabs-nav";
import NotesPage from "./pages/notes-page";
import ArchivePage from "./pages/archive-page";
import AddNotePage from "./pages/add-note-page";
import NoteDetailsPage from "./pages/note-details-page";
import NotFoundPage from "./pages/not-found-page";

function App() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col bg-background">
      <UnderlineTabsNav />
      <main className="mt-4 flex-1 container">
        <Routes>
          <Route index path="/" element={<NotesPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/new" element={<AddNotePage />} />
          <Route path="/details/:id" element={<NoteDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
