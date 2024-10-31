"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/calendario");
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          className="w-full h-auto object-cover"
          src="/images/campus-universitario.jpg"
          alt="Imagen del campus universitario"
          width={1920}
          height={300}
          priority
        />
      </div>

      {/* Botón centrado */}
      <div className="flex justify-center items-center w-full absolute top-1/4">
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 bg-blue-600 dark:bg-gray-900 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          ¡Explora eventos!
        </button>
      </div>
    </div>
  );
}
