"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomArrowProps } from "react-slick";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const slides = [
  {
    key: 1,
    title: "Nuestra Misión",
    text: "En la Universidad Nacional Futuro, creemos en el poder de la educación y la colaboración para transformar vidas. Nuestra misión es facilitar el acceso a experiencias de aprendizaje únicas y de alto impacto que enriquezcan el crecimiento académico y profesional. ",
    image: "/images/student.jpg",
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Nuestra Visión",
    text: "Nuestro objetivo es convertirnos en la principal plataforma de eventos académicos y profesionales de la región, promoviendo una red universitaria que inspire innovación y fomente una cultura de aprendizaje continuo.",
    image: "/images/teenagers.jpg",
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Tipos de eventos",
    text: "En nuestra plataforma encontrarás una amplia gama de eventos que abarcan diferentes intereses y disciplinas. Ofrecemos conferencias, talleres práctico y  seminarios. Todos estos eventos están diseñados para complementar la formación académica y preparar a nuestros estudiantes.",
    image: "/images/campus-universitario.jpg",
    backgroundColor: "#22bcb5",
  },
];

export const AboutUsPage = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
  
    return (
      <div className="container mx-auto p-7">
        <h1 className="text-2xl font-bold text-center mt-14 mb-4 dark:text-gray-200 md:mt-18">
          Acerca de nosotros
        </h1>
        <Slider {...settings} className="">
          {slides.map((slide) => (
            <div
              key={slide.key}
              className="relative p-4 text-center rounded-lg shadow-md dark:bg-gray-800 md:p-8 lg:p-4"
            >
              <div className="relative w-full h-[250px] sm:h-[300px] md:h-[330px] lg:h-[380px] xl:h-[430px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  layout="fill"
                  objectFit="cover"  
                  className="rounded-md"
                />
              </div>
              <p className="mt-4 text-xl font-semibold text-black dark:text-gray-300 ">
                {slide.title}
              </p>
              <p className="mt-2 text-md text-black dark:text-gray-400">
                {slide.text}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  

const SampleNextArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <span>Next</span>
    </div>
  );
};

const SamplePrevArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <span>Prev</span>
    </div>
  );
};
