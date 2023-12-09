import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./contexts/auth-context";
import { LocaleProvider } from "./contexts/locale-context";
import { ThemeProvider } from "./contexts/theme-context";

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
