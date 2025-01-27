import React, { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCode, FaReact, FaDatabase, FaGithub, FaBootstrap,
  FaLaptopCode, FaUserTie, FaChevronLeft, FaChevronRight,
  FaObjectGroup,
  FaBusinessTime,
  FaJava
} from "react-icons/fa";
import { SiDart, SiFlutter, SiMaterialdesign, SiTailwindcss } from "react-icons/si";
import { MdPlaylistAddCheckCircle } from "react-icons/md";

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
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden rounded-lg group bg-black/20 p-4">
      <img
        src={images[currentImageIndex]}
        alt={`${title} screenshot`}
        className="max-w-full max-h-full object-contain"
      />

      {images.length > 1 && (
        <>
          {/* Botones de navegación */}
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

          {/* Indicador de página */}
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
            toggleActions: "play reverse play reverse",
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
          <div
            className={`absolute -left-[42px] mt-1.5 w-8 h-8 rounded-full flex items-center justify-center 
              ${project.type === 'profesional' ? 'bg-green-500' : 'bg-purple-500'}`}
          >
            {project.type === 'profesional' ? (
              <FaUserTie className="text-white" />
            ) : (
              <FaLaptopCode className="text-white" />
            )}
          </div>

          {/* Tarjeta del proyecto */}
          <div
            className={`p-6 rounded-lg shadow-lg relative 
              ${project.type === 'profesional'
                ? 'bg-green-900/20 border-l-4 border-green-500'
                : 'bg-purple-900/20 border-l-4 border-purple-500'}`}
          >
            {/* Badge del tipo de proyecto */}
            <span
              className={`absolute top-4 right-4 text-sm font-semibold rounded-full px-3 py-1 z-20 
                ${project.type === 'profesional'
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-purple-500/20 text-purple-300'}`}
            >
              {project.type === 'profesional' ? 'Proyecto Profesional' : 'Proyecto Personal'}
            </span>

            <div className="flex flex-col lg:flex-row gap-6 relative">
              {/* Información del proyecto */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-2xl text-white mb-2">{project.title}</h4>
                </div>
                <span className="flex items-center text-sm text-blue-200">
                  <FaBusinessTime size={20} className="me-2" /> {project.year}
                </span>

                {/* Descripción */}
                <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Objetivos */}
                <div className="mt-4">
                  <h5 className="flex items-center font-semibold text-blue-200 mb-2">
                    <MdPlaylistAddCheckCircle size={20} className="me-2" /> Objetivos:
                  </h5>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {project.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                {/* Tecnologías */}
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

              {/* Carrusel de imágenes */}
              <div className="flex-shrink-0 w-full lg:w-1/2 relative flex items-center justify-center p-4">
                <ImageCarousel images={project.images} title={project.title} />
              </div>
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
        "assets/images/warehouse_master/warehouse_login_screen.png",
        "https://placehold.co/400x300/pink/white",
        "https://placehold.co/400x300/brown/white",
      ],
      type: "profesional",
    },
    {
      uid: "mi-credito-app",
      title: "Mi Crédito App | App Mobile",
      year: "Enero 2024 - Junio 2024",
      description: `
    Mi Crédito App es una solución móvil diseñada para el usuario final que facilita la gestión de préstamos personales. Los clientes pueden consultar ofertas, solicitar créditos, ajustar plazos de pago y ver el estado de sus préstamos en tiempo real. La app también permite a los usuarios realizar pagos y gestionar sus adeudos, todo desde una interfaz intuitiva.
    La gestión administrativa y seguimiento de los préstamos es realizada desde una app web, asegurando una experiencia eficiente tanto para los prestatarios como para los prestamistas.
  `,
  objectives: [
    "Permitir a los clientes solicitar créditos y gestionar sus préstamos fácilmente.",
    "Facilitar el ajuste de los tiempos de pago y el seguimiento de saldos.",
    "Ofrecer una experiencia transparente con acceso a la información en tiempo real.",
    "Garantizar un proceso ágil y sencillo para realizar pagos directamente desde la app."
  ],
      techStack: [
        { name: "React Native", icon: FaReact, color: "blue" },
        { name: "Material Design", icon: SiMaterialdesign, color: "black" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "assets/images/mi_credito_ya/micredito_screen_login.png",
        "assets/images/mi_credito_ya/mi_credito_ya_prestamo_screen.png",
        "assets/images/mi_credito_ya/mi_credito_ya_profile.png",
      ],
      type: "profesional",
    },
 
    {
      uid: "si-ref-jorges-autos",
      title: "SIREF | App Web",
      year: "Mayo 2023 - Enero 2024",
      description: `
        SIREF es una aplicación web diseñada para optimizar los procesos de ventas en empresas automotrices. Su propósito principal es centralizar y automatizar tareas administrativas y operativas, permitiendo a los equipos de ventas enfocarse en generar resultados. 
        La plataforma incluye módulos para la gestión de inventarios, seguimiento de clientes y generación de reportes detallados que permiten tomar decisiones basadas en datos en tiempo real.
        Al implementar SIREF, se aumenta la productividad, y se reducen errores manuales y ofrece una experiencia de usuario más eficiente y moderna.
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
        {name: "Spring Boot", icon: FaJava, color: "green"},
      ],
      images: [
        "assets/images/jorges_autos/jorges_autos_login_screen_img.png",
        "assets/images/jorges_autos/screen_info_jorges_autos.jpg",
        "https://placehold.co/400x300/green/white",
      ],
      type: "profesional",
    },
    {
      uid: "brew-station-app",
      title: "Brew Station | App Mobile",
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
        "assets/images/brew_station/brew_station_splash.png",
        "assets/images/brew_station/brew_station_home.png",
        "assets/images/brew_station/brew_station_cart.png",
      ],
      type: "personal",
    },
    {
      uid: "jeta-volkswagen-2019-landing-page",
      title: "Landing Page | Jetta Volkswagen 2019 🚗",
      year: "2024 - Presente",
      description: `
        Una landing page interactiva diseñada para mostrar un modelo 3D del Jetta Volkswagen 2019. El objetivo principal es destacar las características del vehículo a través de un diseño visualmente atractivo y funcional, permitiendo al usuario explorar el coche en detalle. Esta página cuenta con un modelo 3D interactivo que puede ser rotado, acercado y alejado, para una visualización detallada del vehículo. Además, la página está optimizada para ofrecer una experiencia de usuario fluida en todos los dispositivos.
      `,
      objectives: [
        "Destacar las características del Jetta Volkswagen 2019 mediante un modelo 3D interactivo.",
        "Permitir a los usuarios explorar el vehículo con opciones de rotación, zoom y vistas detalladas.",
        "Crear una experiencia visual dinámica y atractiva con animaciones sincronizadas con el desplazamiento del usuario.",
      ],
      techStack: [
        { name: "React Vite", icon: FaReact, color: "blue" },
        { name: "React Three", icon: FaCode, color: "purple" },
        { name: "React Fiber", icon: FaCode, color: "purple" },
        { name: "GSAP", icon: FaCode, color: "green" },
      ],
      images: [
        "assets/images/landing_page_volkwagen_jetta/volkswagen_jetta.png",
        "assets/images/landing_page_volkwagen_jetta/volkswagen_jetta_faros.png",
        "assets/images/landing_page_volkwagen_jetta/volkswagen_jetta_llandas.png",
        "assets/images/landing_page_volkwagen_jetta/volkswagen_jetta_faros_traceros.png",
        "assets/images/landing_page_volkwagen_jetta/volkswagen_jetta_diseno.png"
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
        "assets/images/portfolio/portafolio_screen.png",
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