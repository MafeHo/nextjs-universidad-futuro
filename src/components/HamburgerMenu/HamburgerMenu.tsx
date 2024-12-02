"use client";

import { useState } from "react";
import Link from "next/link";

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Botón del menú hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center w-8 h-8 space-y-1 bg-transparent focus:outline-none md:hidden"
        aria-label="Toggle navigation menu"
      >
        <span
          className={`h-1 w-full bg-white rounded transform transition duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`h-1 w-full bg-white rounded transition duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`h-1 w-full bg-white rounded transform transition duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Menú desplegable */}
      <div
        className={`fixed top-0 left-0 w-full bg-black bg-opacity-90 transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
      >
        <nav className="flex flex-col items-center justify-center h-screen space-y-6 text-white">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="text-lg hover:underline"
          >
            Inicio
          </Link>
          <Link
            href="/events"
            onClick={handleLinkClick}
            className="text-lg hover:underline"
          >
            Mis Eventos
          </Link>
          <Link
            href="/aboutus"
            onClick={handleLinkClick}
            className="text-lg hover:underline"
          >
            Acerca de nosotros
          </Link>
          <Link
            href="/login"
            onClick={handleLinkClick}
            className="text-lg hover:underline"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/signIn"
            onClick={handleLinkClick}
            className="text-lg hover:underline"
          >
            Registrarse
          </Link>
          <Link
            href="/calendario"
            onClick={handleLinkClick}
            className="text-lg hover:underline"
          >
            Calendario de eventos
          </Link>
        </nav>
      </div>
    </div>
  );
};
