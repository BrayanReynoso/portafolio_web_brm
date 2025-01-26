import React, { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCode, FaReact, FaDatabase, FaGithub, FaBootstrap,
  FaLaptopCode, FaUserTie, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { SiDart, SiFlutter, SiMaterialdesign, SiTailwindcss } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const ImageCarousel = ({ images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg group">
      <img
        src={images[currentImageIndex]}
        alt={`${title} screenshot`}
        className="w-full h-full object-contain"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <FaChevronRight />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
            {currentImageIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

const Timeline = ({ projects }) => {
  const eventRefs = React.useRef([]);

  React.useEffect(() => {
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
          <div className={`absolute -left-[42px] mt-1.5 w-8 h-8 rounded-full flex items-center justify-center 
            ${project.type === 'profesional' ? 'bg-green-500' : 'bg-purple-500'}`}>
            {project.type === 'profesional' ? (
              <FaUserTie className="text-white" />
            ) : (
              <FaLaptopCode className="text-white" />
            )}
          </div>

          <div className={`p-6 rounded-lg shadow-lg 
            ${project.type === 'profesional'
              ? 'bg-green-900/20 border-l-4 border-green-500'
              : 'bg-purple-900/20 border-l-4 border-purple-500'}`}>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-2xl text-white mb-2">{project.title}</h4>
                  <span className={`text-sm font-semibold rounded-full px-3 py-1 
                    ${project.type === 'profesional'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-purple-500/20 text-purple-300'}`}>
                    {project.type === 'profesional' ? 'Proyecto Profesional' : 'Proyecto Personal'}
                  </span>
                </div>
                <span className="text-sm text-blue-200">{project.year}</span>

                <div className="mt-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Objetivos:</h5>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {project.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Tecnologías:</h5>
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

              <div className="flex-shrink-0 w-full lg:w-1/2">
                <ImageCarousel images={project.images} title={project.title} />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className={`text-white text-sm py-2 px-4 rounded-lg transition 
                  ${project.type === 'profesional'
                    ? 'bg-green-500 hover:bg-green-400'
                    : 'bg-purple-500 hover:bg-purple-400'}`}
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
      description: `
        SIREF es una aplicación web diseñada para optimizar los procesos de ventas en empresas automotrices. Su propósito principal es centralizar y automatizar tareas administrativas y operativas, permitiendo a los equipos de ventas enfocarse en generar resultados. 
        La plataforma incluye módulos para la gestión de inventarios, seguimiento de clientes y generación de reportes detallados que permiten tomar decisiones basadas en datos en tiempo real.
        Al implementar SIREF, las empresas pueden mejorar significativamente la productividad, reducir errores manuales y ofrecer una experiencia de usuario más eficiente y moderna.
      `,
      objectives: [
        "Centralizar y automatizar procesos de ventas en empresas automotrices.",
        "Optimizar la gestión de inventarios y seguimiento de clientes.",
        "Facilitar la toma de decisiones basadas en datos reales."
      ],
      techStack: [
        { name: "React", icon: FaReact, color: "blue" },
        { name: "Bootstrap 5", icon: FaBootstrap, color: "purple" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "public/assets/images/jorges_autos/jorges_autos_login_screen.png",
        "/assets/images/jorges_autos/screen_info_jorges_autos.jpg",
        "https://placehold.co/400x300/green/white",
      ],
      type: "profesional",
    },
    {
      uid: "mi-credito-app",
      title: "Mi Crédito App | App Mobile",
      year: "Enero 2024 - Junio 2024",
      description: `
        Mi Crédito App es una solución móvil dirigida a vendedores que necesitan agilizar la gestión de su cartera de clientes. La aplicación permite a los usuarios registrar nuevos clientes, realizar consultas de crédito y dar seguimiento a pagos y adeudos de manera rápida y sencilla.
        Diseñada con un enfoque en la usabilidad, la app incluye una interfaz intuitiva y características que permiten sincronizar datos en tiempo real. Con Mi Crédito App, los vendedores pueden optimizar sus operaciones diarias y mejorar su productividad.
      `,
      objectives: [
        "Facilitar la gestión de créditos y pagos en tiempo real.",
        "Proveer herramientas móviles intuitivas para vendedores.",
        "Optimizar el seguimiento de clientes y mejorar la productividad."
      ],
      techStack: [
        { name: "React Native", icon: FaReact, color: "blue" },
        { name: "Material Design", icon: SiMaterialdesign, color: "black" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "/assets/images/mi_credito_ya/micredito_screen_login.png",
        "https://placehold.co/400x300/purple/white",
        "https://placehold.co/400x300/yellow/black",
      ],
      type: "profesional",
    },
    {
      uid: "mi-credito-app-gestion-tareas",
      title: "Warehouse Master | App Mobile",
      year: "Noviembre 2024 - Diciembre 2024",
      description: `
        Warehouse Master es una aplicación móvil diseñada para gestionar eficientemente los movimientos de entrada y salida de mercancías en almacenes. La plataforma permite a los usuarios realizar un seguimiento en tiempo real de su inventario, optimizando así el control y reduciendo errores en el manejo de mercancías.
        Con características como la generación de reportes y alertas automatizadas, Warehouse Master asegura que las operaciones en el almacén se realicen de manera ordenada y precisa, adaptándose a las necesidades de empresas de todos los tamaños.
      `,
      objectives: [
        "Simplificar la gestión de inventarios en almacenes.",
        "Ofrecer seguimiento en tiempo real de movimientos de mercancías.",
        "Reducir errores operativos y optimizar la eficiencia."
      ],
      techStack: [
        { name: "Flutter", icon: SiFlutter, color: "blue" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "blue" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "/assets/images/warehouse_master/warehouse_login_screen.png",
        "https://placehold.co/400x300/pink/white",
        "https://placehold.co/400x300/brown/white",
      ],
      type: "profesional",
    },
    {
      uid: "brew-station-app",
      title: "Brew Station App",
      year: "2024 - Presente",
      description: `
        Brew Station App es una solución digital integral para la gestión de cafeterías. La aplicación permite a los propietarios y empleados gestionar productos, ventas y pedidos en tiempo real. Con un diseño amigable y herramientas avanzadas, Brew Station ayuda a reducir el tiempo de atención al cliente y a optimizar el flujo de operaciones en la cafetería.
        Además, la integración con Firebase asegura que los datos sean almacenados y sincronizados de manera segura, proporcionando una plataforma confiable y escalable para negocios pequeños y medianos.
      `,
      objectives: [
        "Ofrecer una herramienta eficiente para la gestión integral de cafeterías.",
        "Optimizar el flujo de operaciones y reducir tiempos de atención.",
        "Garantizar la seguridad y escalabilidad mediante Firebase."
      ],
      techStack: [
        { name: "Flutter", icon: SiFlutter, color: "blue" },
        { name: "Dart", icon: SiDart, color: "black" },
        { name: "Firebase", icon: FaDatabase, color: "red" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "/assets/images/brew_station/brew_station_splash.png",
        "/assets/images/brew_station/brew_station_home.png",
        "/assets/images/brew_station/brew_station_cart.png",
      ],
      type: "personal",
    },
    {
      uid: "portafolio-web",
      title: "Portafolio Web",
      year: "2024 - Presente",
      description: `
        Este portafolio web está diseñado para mostrar de manera profesional proyectos y habilidades de un desarrollador full stack. Con un diseño moderno y responsivo, el portafolio permite a los visitantes explorar proyectos, tecnologías utilizadas y la experiencia general del desarrollador.
        La plataforma también incluye secciones para contacto y presentación personal, adaptándose perfectamente a cualquier dispositivo para ofrecer una navegación óptima.
      `,
      objectives: [
        "Mostrar proyectos y habilidades de forma profesional y atractiva.",
        "Crear una experiencia de usuario fluida y moderna.",
        "Facilitar la exploración de información relevante sobre el desarrollador."
      ],
      techStack: [
        { name: "React", icon: FaReact, color: "blue" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "blue" },
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