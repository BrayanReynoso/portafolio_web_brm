import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCode, FaReact, FaDatabase, FaGithub, FaBootstrap,
  FaLaptopCode, FaUserTie, FaChevronLeft, FaChevronRight,
  FaBusinessTime,
  FaJava,
  FaLink
} from "react-icons/fa";
import { SiDart, SiDocker, SiFlutter, SiFramer, SiMaterialdesign, SiNextdotjs, SiNextui, SiSpring, SiTailwindcss } from "react-icons/si";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { IoClose } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const ImageCarousel = ({ images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const imageRef = useRef(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" }
      );
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" }
    );
  }, [currentImageIndex]);

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden rounded-lg group bg-black/10 p-4">
      {/* Imagen actual del carrusel */}
      <img
        ref={imageRef}
        src={images[currentImageIndex]}
        alt={`${title} screenshot`}
        className="max-w-full max-h-full object-contain cursor-pointer"
        onClick={handleImageClick}
      />

      {/* Botones de navegación */}
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

          {/* Indicador de página */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
            {currentImageIndex + 1} / {images.length}
          </div>
        </>
      )}

      {/* Modal para ver la imagen en grande */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl max-h-full overflow-auto bg-white rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-2xl bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition"
            >
              <IoClose />
            </button>
            <img
              src={images[currentImageIndex]}
              alt={`${title} full view`}
              className="w-full h-auto max-h-screen object-contain rounded-lg"
            />
          </div>
        </div>
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

                {/* Condicional para mostrar el enlace si existe */}
                {project.link && (
                  <div className="mt-4 flex hover:text-black">
                    <FaLink className="me-2" />
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline "
                    >
                      Ver Proyecto
                    </a>
                  </div>
                )}
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
      uid: "mi-cartem-app-gestion-empresas",
      title: "Cartem Manager | Sistema de Gestión Empresarial",
      year: "Noviembre 2024 - Presente",
      description: "Cartem es un sistema de gestión empresarial diseñado para administrar múltiples empresas dentro de una misma plataforma. Permite gestionar los recursos de cada empresa, incluyendo almacenes, empleados, productos y operaciones comerciales. Además, el sistema cuenta con un dashboard interactivo que ofrece análisis detallados sobre el rendimiento de cada empresa, facilitando la toma de decisiones estratégicas y mejorando la eficiencia operativa en tiempo real.",
      objectives: [
        "Gestionar múltiples empresas de manera eficiente desde una misma plataforma.",
        "Administrar recursos como almacenes, empleados y productos por empresa.",
        "Proveer análisis en tiempo real sobre el rendimiento de las empresas a través de un dashboard.",
        "Mejorar la eficiencia operativa y la toma de decisiones mediante reportes detallados."
      ],
      techStack: [
        { name: "Next JS", icon: SiNextdotjs, color: "blue" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "blue" },
        {name: "Next UI", icon: SiNextui, color: "blue"},
        {name: "Framer Motion", icon: SiFramer, color: "green"},
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "Java Spring Boot", icon: SiSpring, color: "green" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "assets/images/cartem/cartem_login.png",
        "assets/images/cartem/cartem_dashboard.png",
        "assets/images/cartem/cartem_profile.png",
        "assets/images/cartem/cartem_notificaciones_screen.png",
        "assets/images/cartem/cartem_register_modal_product.png"
      ],
      type: "profesional",
    },
    {
      uid: "mi-warehouse-app-gestion-tareas",
      title: "Warehouse Master | App Mobile y Web",
      year: "Noviembre 2024 - Diciembre 2024",
      description: `
      Warehouse Master es una solución integral compuesta por una aplicación móvil y una plataforma web diseñadas para gestionar eficientemente las operaciones de almacén. La aplicación móvil se centra en los movimientos de entrada y salida de mercancías, permitiendo a los usuarios realizar un seguimiento en tiempo real del inventario, mientras que la plataforma web facilita la administración de productos, empleados, almacenes y otros recursos. Con Warehouse Master, las operaciones se realizan de manera ordenada y precisa, adaptándose a las necesidades de las empresas y mejorando significativamente sus procesos.
    `,
      objectives: [
        "Simplificar la gestión de inventarios en almacenes.",
        "Ofrecer seguimiento en tiempo real de movimientos de mercancías desde la aplicación móvil.",
        "Facilitar la administración de productos, empleados y almacenes desde la plataforma web.",
        "Reducir errores operativos y optimizar la eficiencia."
      ],
      techStack: [
        { name: "Flutter", icon: SiFlutter, color: "blue" },
        { name: "Material Design", icon: SiMaterialdesign, color: "black" },
        { name: "Next JS", icon: SiNextdotjs, color: "blue" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "blue" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "Java Spring Boot", icon: SiSpring, color: "green" },
        { name: "Docker", icon: SiDocker, color: "blue" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "assets/images/warehouse_master/warehouse_login_screen.png",
        "assets/images/warehouse_master/warehouse_web_login_screen.png",
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
        { name: "Java Spring Boot", icon: SiSpring, color: "green" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "GitHub", icon: FaGithub, color: "red" },
      ],
      images: [
        "assets/images/mi_credito_ya/mi_credito_ya_login.png",
        "assets/images/mi_credito_ya/mi_credito_ya_home_screen.png",
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
        "Centralización y automatización de los procesos de ventas, permitiendo una gestión más fluida y eficiente a lo largo del ciclo de ventas.",
        "Optimización del sistema de gestión de inventarios con un seguimiento en tiempo real, mejorando el control y la actualización de existencias.",
        "Implementación del registro de productos mediante la importación de archivos Excel, facilitando la carga masiva de datos de manera más rápida y precisa.",
      ],
      techStack: [
        { name: "React", icon: FaReact, color: "blue" },
        { name: "Bootstrap 5", icon: FaBootstrap, color: "purple" },
        { name: "MySQL", icon: FaDatabase, color: "orange" },
        { name: "GitHub", icon: FaGithub, color: "red" },
        { name: "Java Spring Boot", icon: SiSpring, color: "green" },
      ],
      images: [
        "assets/images/jorges_autos/jorges_autos_login_screen_img.png",
        "assets/images/jorges_autos/screen_info_jorges_autos.jpg",
        "assets/images/jorges_autos/jorges_autos_excel.jpg",
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
        { name: "Material Design", icon: SiMaterialdesign, color: "black" },
        { name: "Dart", icon: SiDart, color: "black" },
        { name: "Firestore", icon: FaDatabase, color: "red" },
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
        Una landing page interactiva diseñada para mostrar un modelo 3D del Jetta Volkswagen 2019. El objetivo principal es destacar las características del vehículo a través de un diseño visualmente atractivo y funcional, permitiendo al usuario explorar el coche en detalle. Esta página cuenta con un modelo 3D interactivo que puede ser rotado, acercado y alejado, para una visualización detallada del vehículo. Además, la página está optimizada para ofrecer una experiencia de usuario fluida.
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
      link: "https://brayanreynoso.github.io/landing-page-volkswagen-2019/",
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