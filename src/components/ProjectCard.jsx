import React, { useState, useEffect } from "react";
import TechnologyCard from "./Technology";

export default function ProjectCard({ project, onViewMore }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  // Lógica de desplazamiento automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, [project.images.length]);

  // Navegación manual del carrusel
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  return (
<div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">      {/* Carrusel */}
      <div className="relative w-full h-56 overflow-hidden rounded-lg mb-6">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {project.images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-56">
              <img
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Botones de Navegación */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
        >
          ←
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
        >
          →
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {project.images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-blue-500" : "bg-gray-300"
              } transition-all duration-300`}
            ></div>
          ))}
        </div>
      </div>

      {/* Información del Proyecto */}
      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
      <span className="text-sm text-blue-200">{project.year}</span>
      <p className="mt-4 text-sm text-gray-400 leading-relaxed">
        {showMore ? project.longDescription : project.description}
      </p>

      {/* Tecnologías */}
      <div className="mt-6">
        <h4 className="font-semibold text-blue-200 mb-3">Tecnologías Usadas:</h4>
        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech, index) => (
            <TechnologyCard
              key={index}
              icon={tech.icon}
              name={tech.name}
              color={`from-${tech.color}-500 to-${tech.color}-700`}
            />
          ))}
        </div>
      </div>

      {/* Ver Más */}
      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-400 transition"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Ver Menos" : "Ver Más"}
        </button>
      </div>
    </div>
  );
}