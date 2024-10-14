import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center lg:min-h-screen">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
