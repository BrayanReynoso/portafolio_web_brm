import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact, FaAngular, FaDatabase, FaJava,
  FaGithub, FaBootstrap, FaCode, FaArrowLeft, FaArrowRight
} from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";
import { SiMaterialdesign } from "react-icons/si";
import useSEO from "../hooks/useSEO";
import { LiaDev } from "react-icons/lia";

gsap.registerPlugin(ScrollTrigger);

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          display: 'flex'
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 flex justify-center items-center"
          >
            <img
              src={img}
              alt={`Project screenshot ${index + 1}`}
              className="w-[100%] h-[100%] object-cover"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 
        bg-blue-500/50 text-white p-2 rounded-full"
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 
        bg-blue-500/50 text-white p-2 rounded-full"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

const ProjectTimeline = ({ projects, title }) => {
  const projectRefs = useRef([]);

  useEffect(() => {
    projectRefs.current.forEach((project, index) => {
      gsap.fromTo(
        project,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 80%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative">
      <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
        {title}
      </h2>
      <div className=" relative border-l-4 border-blue-500 pl-6">
        {projects.map((project, index) => (
          <div
            key={project.uid}
            ref={(el) => (projectRefs.current[index] = el)}
            className={`
              mb-10 relative
              ${index % 2 === 0 ? 'pr-8 text-left' : 'pl-8'}
              flex items-center space-x-8 
              flex-row-reverse
            `}
          >
            {/* Información del Proyecto */}
            <div className="flex bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-blue-300/20 transform transition-all duration-300  hover:shadow-2xl hover:border-blue-400">
              {/* Información del proyecto */}
              <div className="flex-1 pr-6">
                <h3 className="text-3xl font-semibold text-blue-900 mb-3 hover:text-blue-700 transition-all">
                  {project.title}
                </h3>
                <p className="text-blue-700 mb-3">{project.year}</p>
                <p className="text-blue-600 mb-5">{project.description}</p>

                {/* Tecnología utilizada */}
                <div className="flex flex-wrap justify-start space-x-4 mt-4">
                  {project.techStack.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="
                        flex items-center bg-blue-200/20 
                        rounded-full px-4 py-2 text-sm font-medium 
                        transition-all transform hover:scale-105 hover:bg-blue-500 hover:text-white
                      "
                    >
                      <tech.icon className={`mr-2 text-${tech.color}-500`} />
                      <span className="text-blue-700">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carrusel de imágenes */}
              <div className="flex-shrink-0 w-[50%] h-[300px] rounded-lg overflow-hidden shadow-lg">
                <ImageCarousel images={project.images} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function EnhancedProjects() {
  const projects = [
    {
      uid: "si-ref-jorges-autos",
      title: "SIREF | App Web",
      year: "Mayo 2023 - Enero 2024",
      description: "Formé parte del equipo que desarrolló un proyecto interno para optimizar procesos de ventas, contribuyendo a un aumento significativo en la productividad y eficiencia de la empresa.",
      techStack: [
        { name: "React", icon: FaReact, color: "blue" },
        { name: "Bootstrap 5", icon: FaBootstrap, color: "gray" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "/assets/images/jorges_autos/login_screen_jorges_autos.png",
        "/assets/images/jorges_autos/screen_info_jorges_autos.jpg",
        "https://placehold.co/400x300/green/white",
      ],
      type: "profesional",  // Tipo profesional
    },
    {
      uid: "mi-credito-app",
      title: "Mi credito App | App Mobile",
      year: "Enero 2024 - Junio 2024",
      description: "Colaboré en el desarrollo de una aplicación móvil para Android utilizando React Native y JavaScript, contribuyendo a mejorar la eficiencia operativa de los vendedores",
      techStack: [
        { name: "React Native", icon: FaReact, color: "blue" },
        { name: "Material Design", icon: SiMaterialdesign, color: "gray" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "/assets/images/mi_credito_ya/micredito_screen_login.png",
        "https://placehold.co/400x300/purple/white",
        "https://placehold.co/400x300/yellow/black",
      ],
      type: "profesional",  // Tipo profesional
    },
    {
      uid: "mi-credito-app-gestion-tareas",
      title: "Warehouse Master | App Mobile",
      year: "Noviembre 2024 - Diciembre 2024",
      description: "Colaboré en el desarrollo de una aplicación móvil para Android utilizando React Native y JavaScript, contribuyendo a mejorar la eficiencia operativa de los vendedores",
      techStack: [
        { name: "React", icon: FaReact, color: "blue" },
        { name: "Tailwind CSS", icon: FaCss3Alt, color: "gray" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "/assets/images/mi_credito_ya/login_screen_micredito.png",
        "https://placehold.co/400x300/pink/white",
        "https://placehold.co/400x300/brown/white",
      ],
      type: "profesional",  // Tipo profesional
    },
  ];

  const personalProjects = [
    {
      uid: "brew-station-app",
      title: "Brew Station App",
      year: "2024 - Presente",
      description: "Aplicación móvil desarrollada con Flutter para la gestión de una cafetería. Permite gestionar productos, ventas y pedidos.",
      techStack: [
        { name: "Flutter", icon: FaReact, color: "blue" },  // Reemplazar con ícono adecuado de Flutter
        { name: "Dart", icon: FaJava, color: "purple" },
        { name: "Firebase", icon: FaDatabase, color: "red" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "/assets/images/brew_station/brew_station_splash.png",
        "/assets/images/brew_station/brew_station_home.png",
        "/assets/images/brew_station/brew_station_cart.png",
      ],
      type: "personal",  // Tipo personal
    },
    {
      uid: "portafolio-web",
      title: "Portafolio Web",
      year: "2024 - Presente",
      description: "Portafolio web desarrollado con React, Tailwind CSS y Vite. Presenta los proyectos realizados y es un ejemplo de mi trabajo en desarrollo front-end.",
      techStack: [
        { name: "React", icon: FaReact, color: "blue" },
        { name: "Tailwind CSS", icon: FaCss3Alt, color: "gray" },
        { name: "Vite", icon: FaReact, color: "purple" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "/assets/images/portfolio/portafolio_screen.png",
        "https://placehold.co/400x300/blue/white",
        "https://placehold.co/400x300/green/white",
      ],
      type: "personal",
    },
  ];

  useSEO({
    title: "Projects | My Portfolio",
    description: "Explore professional and personal projects showcasing innovative web and mobile development.",
    icon: <LiaDev />
  });

  return (
    <section className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-600 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <ProjectTimeline
          projects={projects}
          title="Experiecnia Profesional"
        />
        <ProjectTimeline
          projects={personalProjects}
          title="Proyectos personales"
        />
      </div>
    </section>
  );
}