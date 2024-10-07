import Link from 'next/link';
import { DarkMode } from '../DarkMode';

export const Header = async () => {
    return (
        <header className="flex items-center justify-between w-full h-16 bg-blue-600 pr-8 dark:bg-blue-950">
          <div className="flex items-center text-white">
            <div className="text-xl font-bold bg-black h-16 px-8 pt-4">UNF</div>
            <nav className="hidden md:flex space-x-12 pl-12 ">
              <Link href="/" className="text-white hover:text-blue-500">Home</Link>
              <Link href="/evets" className="text-white hover:text-blue-500">Events</Link>
              <Link href="/contact" className="text-white hover:text-blue-500">Contact</Link>
              <Link href="/about" className="text-white hover:text-blue-500">About</Link>

            </nav>
          </div>
    
          {/* Botón Iniciar Sesión */}
          <div>
            <DarkMode />
          </div>
        </header>
      );
}