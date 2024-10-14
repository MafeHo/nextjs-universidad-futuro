import Link from "next/link";
import { DarkMode } from "../DarkMode";

export const Header = async () => {
  return (
    <>
      {/* Header for larger screens */}
      <header className="hidden md:flex items-center justify-between w-full h-16 bg-blue-600 pr-8 dark:bg-gray-900 fixed z-10 top-0">
        <div className="flex items-center text-white">
          <div className="text-xl font-bold bg-black h-16 px-8 pt-4">UNF</div>
          <nav className="hidden md:flex space-x-12 pl-12">
            <Link href="/" className="text-white hover:text-blue-500">
              Home
            </Link>
            <Link href="/events" className="text-white hover:text-blue-500">
              Events
            </Link>
            <Link href="/contact" className="text-white hover:text-blue-500">
              Contact
            </Link>
            <Link href="/about" className="text-white hover:text-blue-500">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <DarkMode />
          <Link href="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path
                className="fill-current text-white dark:text-white"
                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </svg>
          </Link>
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                className="fill-current text-white dark:text-white"
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </Link>
        </div>
      </header>

      {/* Header for small screens */}
      <header className="md:hidden flex items-center align-middle w-full h-16 bg-blue-600 pr-8 dark:bg-blue-950 fixed z-10 bottom-0">
        <div className="flex items-center text-white justify-start">
          <div className="text-xl font-bold bg-black h-16 px-8 pt-4">UNF</div>
        </div>

        <div className="flex items-center space-x-9 p-12 justify-center" >
          <DarkMode />
          <Link href="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path
                className="fill-current text-white dark:text-white"
                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </svg>
          </Link>
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                className="fill-current text-white dark:text-white"
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </Link>
        </div>
      </header>
    </>
  );
};
