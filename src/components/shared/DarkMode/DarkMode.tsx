"use client";
import { useEffect } from "react";

export const DarkMode = () => {
    // Función que alterna el modo oscuro
    const toggleDarkMode = () => {
        const htmlElement = document.querySelector("html");
        if (htmlElement) {
            htmlElement.classList.toggle("dark");
        }
    };

    // Efecto para manejar el evento del botón
    useEffect(() => {
        const toggleButton = document.querySelector("#toggle");

        // Asegúrate de que el botón existe antes de agregar el evento
        if (toggleButton) {
            toggleButton.addEventListener("click", toggleDarkMode);
        }

        // Limpiar el efecto eliminando el event listener
        return () => {
            if (toggleButton) {
                toggleButton.removeEventListener("click", toggleDarkMode);
            }
        };
    }, []); // El arreglo vacío significa que se ejecutará una vez al montar

    return (
        <button id="toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
                <path className="fill-current text-primary dark:text-white" fillRule="evenodd" d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"/>
            </svg>
        </button>
    );
}
