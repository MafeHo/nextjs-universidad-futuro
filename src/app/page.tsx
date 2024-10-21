import Image from "next/image";
import Calendar from "../components/home/Calendar/Calendar"; // Asegúrate de que la ruta sea correcta

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center lg:min-h-screen">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Muestra el calendario antes de la imagen */}
        <Calendar  />
        <Image
          className="w-full h-auto object-cover"
          src="/images/campus-universitario.jpg"
          alt="Imagen del campus universitario"
          width={1920}
          height={300}
          priority
        />
      </main>
    </div>
  );
}
