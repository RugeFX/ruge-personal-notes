import { useAuthContext } from "@/contexts/auth-context";
import { useLocaleContext } from "@/contexts/locale-context";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { BookMarkedIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { ThemeToggler } from "./theme-toggler";

export default function UnderlineTabsNav() {
  const { locale, toggleLocale } = useLocaleContext();
  const { userInfo, logout } = useAuthContext();

  return (
    <header className="w-full mt-4 space-y-4 container">
      <div className="flex justify-between">
        <Link to="/" className="flex items-center gap-3">
          <BookMarkedIcon className="text-foreground" />
          <p className="text-primary text-2xl font-bold hidden sm:block">Ruge Personal Notes</p>
        </Link>

        <div className="flex gap-2 items-center">
          <ThemeToggler />
          <Button variant="text" className="text-base text-foreground" onClick={toggleLocale}>
            {locale === "id" ? "EN" : "ID"}
          </Button>
          <Menu>
            <MenuHandler>
              <Button variant="gradient" color="blue">
                {userInfo}
              </Button>
            </MenuHandler>
            <MenuList className="bg-background border-secondary">
              <MenuItem
                className="hover:!text-secondary-foreground hover:!bg-secondary"
                onClick={logout}
              >
                {locale === "id" ? "Keluar" : "Logout"}
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <nav className="flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `w-full text-center py-3 border-b-2 rounded-t-lg transition-colors hover:text-accent-foreground ${
              isActive
                ? "bg-accent border-accent-foreground text-primary"
                : "hover:bg-accent/20 border-accent text-primary/50 dark:text-accent rounded-none"
            }`
          }
        >
          Notes
        </NavLink>
        <NavLink
          to="/archive"
          className={({ isActive }) =>
            `w-full text-center py-3 border-b-2 rounded-t-lg transition-colors hover:text-accent-foreground ${
              isActive
                ? "bg-accent border-accent-foreground text-primary"
                : "hover:bg-accent/20 border-accent text-primary/50 dark:text-accent rounded-none"
            }`
          }
        >
          Archive
        </NavLink>
      </nav>
    </header>
  );
}
