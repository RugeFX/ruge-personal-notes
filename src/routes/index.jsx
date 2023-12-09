import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./private-route";
import NotesPage from "@/pages/notes-page";
import ArchivePage from "@/pages/archive-page";
import AddNotePage from "@/pages/add-note-page";
import NoteDetailsPage from "@/pages/note-details-page";
import NotFoundPage from "@/pages/not-found-page";
import LoginPage from "@/pages/login-page";
import RootLayout from "@/layouts/root-layout";
import RegisterPage from "@/pages/register-page";
import GuestRoute from "./guest-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, path: "/", element: <NotesPage /> },
      { path: "/archive", element: <ArchivePage /> },
      { path: "/new", element: <AddNotePage /> },
      { path: "/details/:id", element: <NoteDetailsPage /> },
    ],
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  { path: "/*", element: <NotFoundPage /> },
]);
