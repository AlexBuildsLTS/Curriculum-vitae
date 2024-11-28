import React, { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 text-sm font-semibold border rounded text-slate-lightest border-green hover:bg-green hover:text-navy-primary"
      aria-label="Toggle Theme">
      {theme === "light" ? "🌞" : "🌜"}
    </button>
  );
};

export default ThemeToggle;
