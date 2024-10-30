// DobleFactor.tsx
"use client";

import { useRef, useState, useEffect } from "react";

export const DobleFactor = () => {
  const digit1Ref = useRef<HTMLInputElement>(null);
  const digit2Ref = useRef<HTMLInputElement>(null);
  const digit3Ref = useRef<HTMLInputElement>(null);
  const digit4Ref = useRef<HTMLInputElement>(null);

  const [code, setCode] = useState<string>("");

  useEffect(() => {
    // Focaliza el primer input al cargar la página
    digit1Ref.current?.focus();
  }, []);

  const onDigitInput = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Permite solo números y limita la longitud a 1
    if (!/^\d*$/.test(value)) {
      event.target.value = "";
      return;
    }

    // Enfoca al siguiente input si hay un valor
    if (value !== "") {
      switch (index) {
        case 1:
          digit2Ref.current?.focus();
          break;
        case 2:
          digit3Ref.current?.focus();
          break;
        case 3:
          digit4Ref.current?.focus();
          break;
        default:
          break;
      }
    }
  };

  const verifyCode = () => {
    const codeEntered = [
      digit1Ref.current?.value,
      digit2Ref.current?.value,
      digit3Ref.current?.value,
      digit4Ref.current?.value,
    ].join("");

    setCode(codeEntered);
    console.log("Código ingresado:", codeEntered);
    // Aquí podrías agregar la lógica de verificación del código
  };

  return (
    <section className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-800">Código de verificación</h1>
        <p className="text-gray-600 mt-2">Ingresa el código que te enviamos al correo electrónico</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-center space-x-2 mb-4">
          <input
            ref={digit1Ref}
            type="text"
            maxLength={1}
            className="digit-input w-12 h-14 text-center border border-purple-600 rounded-lg text-lg"
            onChange={(e) => onDigitInput(1, e)}
          />
          <input
            ref={digit2Ref}
            type="text"
            maxLength={1}
            className="digit-input w-12 h-14 text-center border border-purple-600 rounded-lg text-lg"
            onChange={(e) => onDigitInput(2, e)}
          />
          <input
            ref={digit3Ref}
            type="text"
            maxLength={1}
            className="digit-input w-12 h-14 text-center border border-purple-600 rounded-lg text-lg"
            onChange={(e) => onDigitInput(3, e)}
          />
          <input
            ref={digit4Ref}
            type="text"
            maxLength={1}
            className="digit-input w-12 h-14 text-center border border-purple-600 rounded-lg text-lg"
            onChange={(e) => onDigitInput(4, e)}
          />
        </div>
        <button
          onClick={verifyCode}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Enviar
        </button>
        {code && <p className="text-center mt-4">Código ingresado: {code}</p>}
      </div>
    </section>
  );
};

export default DobleFactor;
