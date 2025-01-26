import React from "react";
import ReactModal from "react-modal";
import { FaReact, FaJava, FaDatabase, FaGithub } from "react-icons/fa";
import { SiMaterialdesign } from "react-icons/si";
import TechnologyCard from "./Technology";

// Configuración del Modal
ReactModal.setAppElement("#root");

const ProjectModal = ({ project, handleCloseViewMore }) => {
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={handleCloseViewMore}
      contentLabel="Project Details"
      className="bg-white p-8 rounded-xl shadow-lg max-w-5xl w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl overflow-y-auto max-h-[80vh] transition-all duration-300 ease-in-out transform"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      {/* Título del Proyecto */}
      <h3 className="text-4xl font-bold text-blue-600 mb-6">{project.title}</h3>

      {/* Información General */}
      <section className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaReact className="text-blue-500 text-xl" />
          Información General
        </h4>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
        <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
      </section>

      {/* Objetivo del Proyecto */}
      <section className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaGithub className="text-gray-500 text-xl" />
          Objetivo del Proyecto
        </h4>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
        <p className="text-gray-700 text-lg">{project.longDescription}</p>
      </section>

      {/* Objetivos */}
      <section className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaReact className="text-blue-500 text-xl" />
          Objetivos
        </h4>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
        <ul className="list-disc pl-6 text-gray-700 text-lg">
          {project.objective.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </section>

      {/* Características Clave */}
      <section className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaDatabase className="text-gray-600 text-xl" />
          Características Clave
        </h4>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
        <ul className="list-disc pl-6 text-gray-700 text-lg">
          {project.keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Desafíos */}
      <section className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <SiMaterialdesign className="text-gray-600 text-xl" />
          Desafíos
        </h4>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
        <ul className="list-disc pl-6 text-gray-700 text-lg">
          {project.challenges.map((challenge, index) => (
            <li key={index}>{challenge}</li>
          ))}
        </ul>
      </section>

      {/* Tecnologías Implementadas */}
      <section className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <SiMaterialdesign className="text-gray-600 text-xl" />
          Tecnologías Implementadas
        </h4>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {project.techStack.map((tech, index) => (
            <TechnologyCard
              key={index}
              icon={tech.icon}
              name={tech.name}
              color={`from-${tech.color}-500 to-${tech.color}-700`} 
            />
          ))}
        </div>
      </section>

      {/* Arquitectura */}
      <section className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaDatabase className="text-gray-600 text-xl" />
          Arquitectura
        </h4>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
        <p className="text-gray-700 text-lg">{project.architecture}</p>
      </section>

      {/* Metodologías */}
      <section className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaJava className="text-orange-500 text-xl" />
          Metodologías de Trabajo
        </h4>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
        <p className="text-gray-700 text-lg">{project.methodology}</p>
      </section>

      {/* Duración y Rol */}
      <section className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaGithub className="text-gray-600 text-xl" />
          Duración y Rol
        </h4>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
        <p className="text-gray-700 text-lg">Duración: {project.duration}</p>
        <p className="text-gray-700 text-lg">Rol: {project.role}</p>
      </section>

      {/* Control de Versiones */}
      <section className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaGithub className="text-gray-600 text-xl" />
          Control de Versiones
        </h4>
        <div className="border-b border-gray-300 mt-2 mb-4"></div>
        <p className="text-gray-700 text-lg">El control de versiones fue gestionado mediante Git y GitHub, permitiendo un seguimiento detallado de los cambios.</p>
      </section>

      {/* Botón para cerrar */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleCloseViewMore}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Cerrar
        </button>
      </div>
    </ReactModal>
  );
};

export default ProjectModal;

