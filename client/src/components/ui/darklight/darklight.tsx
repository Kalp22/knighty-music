"use client";
import { useState, useEffect } from "react";

import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

export default function Darklight() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div
      className="flex justify-center items-center cursor-pointer p-2 rounded-full hover:bg-gray-300 hover:text-gray-800"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <MdOutlineLightMode size={25} />
      ) : (
        <MdOutlineDarkMode size={25} />
      )}
    </div>
  );
}
