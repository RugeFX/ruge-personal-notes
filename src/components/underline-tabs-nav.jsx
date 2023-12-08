import { BookMarkedIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function UnderlineTabsNav() {
  return (
    <nav className="w-full mt-4 space-y-4 container">
      <Link to="/" className="flex items-center gap-3">
        <BookMarkedIcon className="text-foreground" />
        <p className="text-primary text-2xl font-bold hidden sm:block">Ruge Personal Notes</p>
      </Link>
      <div className="flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `w-full text-center py-3 border-b-2 rounded-t-lg transition-colors hover:text-accent-foreground ${
              isActive
                ? "bg-accent border-accent-foreground text-accent-foreground"
                : "hover:bg-accent/20 border-accent text-accent rounded-none"
            }`
          }
        >
          Notes
        </NavLink>
        <NavLink
          to="/archive"
          className={({ isActive }) =>
            `w-full text-center py-3 border-b-2 rounded-t-lg rounded-none transition-colors hover:text-accent-foreground ${
              isActive
                ? "bg-accent border-accent-foreground text-accent-foreground"
                : "hover:bg-accent/20 border-accent text-accent rounded-none"
            }`
          }
        >
          Archive
        </NavLink>
      </div>
    </nav>
  );
}
