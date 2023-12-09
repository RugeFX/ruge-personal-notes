import { useThemeContext } from "@/contexts/theme-context";
import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { ComputerIcon, MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggler() {
  const { theme, setTheme } = useThemeContext();

  return (
    <Menu>
      <MenuHandler>
        <IconButton variant="text" color="blue">
          {theme === "system" ? <ComputerIcon /> : theme === "dark" ? <MoonIcon /> : <SunIcon />}
        </IconButton>
      </MenuHandler>
      <MenuList className="bg-background border-secondary">
        <MenuItem
          className="hover:!text-secondary-foreground hover:!bg-secondary"
          onClick={() => setTheme("system")}
        >
          System
        </MenuItem>
        <MenuItem
          className="hover:!text-secondary-foreground hover:!bg-secondary"
          onClick={() => setTheme("dark")}
        >
          Dark
        </MenuItem>
        <MenuItem
          className="hover:!text-secondary-foreground hover:!bg-secondary"
          onClick={() => setTheme("light")}
        >
          Light
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
