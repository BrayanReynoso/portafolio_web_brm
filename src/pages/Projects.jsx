import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode, FaReact, FaDatabase, FaGithub, FaBootstrap, FaCss3Alt, FaJava } from "react-icons/fa";
import { SiMaterialdesign, SiTailwindcss } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const Timeline = ({ projects }) => {
  const eventRefs = useRef([]);

  useEffect(() => {
    eventRefs.current.forEach((event, index) => {
      gsap.fromTo(
        event,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: event,
            start: "top 80%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative border-l-4 border-blue-500 pl-6 space-y-6">
      {projects.map((project, index) => (
        <div
          key={index}
          ref={(el) => (eventRefs.current[index] = el)}
          className="relative transform transition-all hover:scale-[1.02] hover:translate-x-2"
        >
          {/* Ícono del evento */}
          <div className="absolute -left-[42px] mt-1.5 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <FaCode className="text-white" />
          </div>

          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Información del Proyecto - Izquierda */}
              <div className="flex-1">
                <h4 className="font-bold text-2xl text-blue-300 mb-2">{project.title}</h4>
                <span className="text-sm text-blue-200">{project.year}</span>
                <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Tecnologías Usadas */}
                <div className="mt-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Tecnologías Usadas:</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <div
                        key={i}
                        className="flex items-center bg-white/10 rounded-full px-3 py-1"
                      >
                        <tech.icon className={`text-${tech.color}-500 mr-2`} />
                        <span className="text-sm text-white">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Imágenes del Proyecto - Derecha */}
              <div className="flex-shrink-0 w-full lg:w-1/3">
                <div className="relative w-full h-48 overflow-hidden rounded-lg">
                  <img
                    src={project.images[0]}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Botón "Ver Más" */}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-blue-500 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-400 transition"
                onClick={() => console.log("Ver más:", project.title)}
              >
                Ver Más
              </button>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default function Projects() {
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
        "public/assets/images/jorges_autos/jorges_autos_login_screen.png",
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
      description: "Colaboré como desarrollador front-end móvil en el desarrollo de una aplicación móvil diseñada para optimizar y gestionar los movimientos de salida y entrada de un almacén. La aplicación permite a los usuarios realizar un seguimiento en tiempo real de las mercancías que entran y salen del almacén, mejorando la eficiencia en el control de inventarios. Trabajé en la creación de interfaces intuitivas y funcionales utilizando Flutter, asegurando una experiencia de usuario fluida y dinámica.",
      techStack: [
        { name: "React", icon: FaReact, color: "blue" },
        { name: "Tailwind CSS", icon: FaCss3Alt, color: "gray" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "/assets/images/warehouse_master/warehouse_login_screen.png",
        "https://placehold.co/400x300/pink/white",
        "https://placehold.co/400x300/brown/white",
      ],
      type: "profesional",  // Tipo profesional
    },
    // Proyecto personal Brew Station
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

  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 py-16 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Mis Proyectos
        </h2>
        <Timeline projects={projects} />
      </div>
    </section>
  );
}