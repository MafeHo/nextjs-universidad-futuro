"use client";
import { useEffect, useState } from "react";

export const DarkMode = () => {
  // estado para controlar si el modo oscuro está activado o no
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // efecto para aplicar la clase "dark" 
  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (isDarkMode) {
      htmlElement?.classList.add("dark");
    } else {
      htmlElement?.classList.remove("dark");
    }
  }, [isDarkMode]); // se ejecuta cada vez que isDarkMode cambia

  return (
    <button id="toggle" onClick={toggleDarkMode}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-moon"
        viewBox="0 0 16 16"
      >
        <path
          className="fill-current text-white dark:text-white"
          fillRule="evenodd"
          d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"
        />
      </svg>
    </button>
  );
};
