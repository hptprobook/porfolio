import { useEffect, useState } from "react";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";

type Theme = "dark" | "light" | null;

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(
        localStorage.getItem("theme") as Theme
    );

    const themeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return (
        <div className="nav_ac" onClick={themeToggle}>
            <WiMoonAltWaningCrescent4 />
        </div>
    );
};

export default ThemeToggle;
