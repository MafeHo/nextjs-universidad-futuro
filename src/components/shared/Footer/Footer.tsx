"use client";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-blue-600 dark:bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center gap-5 text-center ">
          {/* Sección 1: Información de la Empresa */}
          <div>
            <h3 className="font-bold ">Eventos UNF</h3>
            <p className="text-sm">
              Encuentra los mejores eventos académicos y culturales en la
              Universidad Nacional de Futuro.
            </p>
          </div>

          {/* Sección 2: Enlaces */}
          <div>
            <h3 className="font-bold ">Enlaces útiles</h3>
            <div className="space-x-4 text-sm">
              <Link
                href="/"
                className="dark:dark:hover:text-blue-500 hover:text-gray-200"
              >
                Inicio
              </Link>
              <Link
                href="/aboutus"
                className="dark:dark:hover:text-blue-500 hover:text-gray-200"
              >
                Acerca de
              </Link>
              <Link
                href="/calendario"
                className="dark:hover:text-blue-500 hover:text-gray-200"
              >
                Calendario
              </Link>
            </div>
          </div>
          {/* Sección 3: contacto */}
          <div>
            <h3 className="font-bold ">Contacto</h3>
            <p className="text-sm">Calle 123, Ciudad Futuro, UF</p>
            <p className="text-sm">+123 456 7890</p>
          </div>

          {/* Sección 4: Redes sociales */}
          <div>
            <h3 className="font-bold ">Síguenos</h3>
            <div className="space-x-4 text-sm">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-white dark:hover:text-blue-500 hover:text-gray-200"
              >
                Facebook
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-white dark:hover:text-blue-500 hover:text-gray-200"
              >
                Twitter
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-white dark:hover:text-blue-500 hover:text-gray-200"
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-4 pt-4 text-center">
          <p>&copy; 2024 Eventos UNF. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
