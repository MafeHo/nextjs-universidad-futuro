"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Cards from "../components/home/Cards/Cards";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/calendario");
  };

  return (
    <div className="relative w-full lg:min-h-screen">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 h-[80vh] -z-10">
        <Image
          className="w-full h-full object-cover"
          src="/images/campus-universitario.jpg"
          alt="Imagen del campus universitario"
          layout="fill"
          priority
        />
      </div>

      <section>
        <div className="flex flex-col items-center justify-center w-full h-[80vh] bg-gray-900 bg-opacity-50">
          <h1 className="text-white text-3xl font-bold text-center">
            ¡Bienvenido a Eventos UNF!
          </h1>
          <p className="text-white text-lg text-center mt-4">
            Encuentra eventos académicos y culturales en un solo lugar.
          </p>
        </div>
      </section>

      {/* Botón centrado */}
      <div className="flex justify-center items-center w-full absolute top-[50vh]">
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 bg-blue-600 dark:bg-gray-900 dark:hover:bg-gray-800 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          ¡Explora eventos!
        </button>
      </div>

      <div className="m-5">
        <Cards
          limit={3}
          defaultImages={[
            "/images/event1.jpg",
            "/images/event2.jpg",
            "/images/event3.jpg",
          ]}
        />
      </div>
    </div>
  );
}
