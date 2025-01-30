import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact, FaNodeJs, FaJava, FaCss3Alt, FaDatabase,
  FaGraduationCap, FaTrophy, FaBootstrap, FaGithub,
  FaHtml5, FaJs, FaAngular, FaCode
} from "react-icons/fa";
import { FaFlutter } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiPersistent, SiPostman, SiSpring, SiTypescript, SiVuetify } from "react-icons/si";
import useSEO from '../hooks/useSEO';
import { MdOutlinePersonOutline } from "react-icons/md";
import { DiFirebase } from "react-icons/di";
gsap.registerPlugin(ScrollTrigger);

const TechBadge = ({ icon: Icon, name, color }) => (
  <div className="flex items-center bg-white/10 rounded-full px-4 py-2 transform transition-all hover:scale-105 hover:shadow-lg">
    <Icon className={`mr-2 text-2xl ${color}`} />
    <span className="font-medium text-white">{name}</span>
  </div>
);

const Timeline = ({ events }) => (
  <div className="relative border-l-4 border-blue-500 pl-6 space-y-6">
    {events.map((event, index) => (
      <div
        key={index}
        className="relative transform transition-all hover:scale-[1.02] hover:translate-x-2"
      >
        <div className="absolute -left-[42px] mt-1.5 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <FaCode className="text-white" />
        </div>
        <div className="bg-white/10 p-4 rounded-lg">
          <h4 className="font-bold text-xl text-blue-300">{event.title}</h4>
          <p className="text-white/80">{event.description}</p>
          <span className="text-sm text-blue-200 mt-2">{event.date}</span>
        </div>
      </div>
    ))}
  </div>
);

export default function EnhancedAboutMe() {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const socialIconsRef = useRef(null);
  const technologiesRef = useRef(null);
  const educationRef = useRef(null);
  const achievementsRef = useRef(null);

  useEffect(() => {
    // Animación de desvanecimiento y desplazamiento para el título
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: "elastic.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
    // Animación de desvanecimiento y desplazamiento para el párrafo
    gsap.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animación de los íconos sociales (escala y desvanecimiento)
    gsap.fromTo(
      socialIconsRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: socialIconsRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animación de las tecnologías
    gsap.fromTo(
      technologiesRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: technologiesRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animación de la sección de educación
    gsap.fromTo(
      educationRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: educationRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animación de los logros
    gsap.fromTo(
      achievementsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: achievementsRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

  }, []);

  const technologies = [
    { name: "React Native", icon: FaReact, color: "text-blue-500" },
    { name: "Flutter", icon: FaFlutter, color: "text-blue-500" },
    { name: "React", icon: FaReact, color: "text-cyan-400" },
    { name: "Vue 3", icon: FaReact, color: "text-green-500" },
    { name: "Next.js", icon: FaReact, color: "text-blue-500" },
    { name: "Angular", icon: FaAngular, color: "text-red-500" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
    { name: "Tailwind CSS", icon: RiTailwindCssFill, color: "text-sky-400" },
    { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
    { name: "Vuetify", icon: SiVuetify, color: "text-blue-500" },
    { name: "Bootstrap", icon: FaBootstrap, color: "text-purple-500" },
    { name: "MongoDB", icon: FaDatabase, color: "text-green-500" },
    { name: "MySQL", icon: FaDatabase, color: "text-blue-500" },
    { name: "GitHub", icon: FaGithub, color: "text-orange-500" },
    { name: "HTML5", icon: FaHtml5, color: "text-red-500" },
    { name: "JavaScript", icon: FaJs, color: "text-yellow-500" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "Java", icon: FaJava, color: "text-red-500" },
    {name: "Srping Boot", icon: SiSpring, color: "text-green-600"},
    {name: "Firebase", icon: DiFirebase, color: "text-yellow-500"},
    {name: "Postman", icon: SiPostman, color: "text-orange-500"},
  ];

  const educationEvents = [
    {
      title: "Ing. Desarrollo y Gestión de Software",
      description: "Universidad Tecnológica Emiliano Zapata del Estado de Morelos - UTEZ",
      date: "2023 - 2025"
    },
    {
      title: "T.S.U. Desarrollo de Software Multiplataforma",
      description: "Universidad Tecnológica Emiliano Zapata del Estado de Morelos - UTEZ", 
      date: "2021 - 2023"
    }
  ];
  return (
    <div className="h-auto w-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-600 text-white py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Intro Section */}
        <section className="text-center mb-16" ref={titleRef}>
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
            Brayan Reynoso Macedo
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto" ref={paragraphRef}>
            Desarrollador Full Stack apasionado por crear aplicaciones web escalables y soluciones móviles con tecnologías de punta.
            <br />
          </p>
        </section>

        {/* Technologies Section */}
        <section className="mb-16" ref={technologiesRef}>
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-200">
            Tecnologías con las que trabajo
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <TechBadge
                key={index}
                icon={tech.icon}
                name={tech.name}
                color={tech.color}
              />
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16" ref={educationRef}>
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-200">
            <FaGraduationCap className="inline-block mr-2 text-blue-900" /> Educación
          </h2>
          <Timeline events={educationEvents} />
        </section>

        {/* Achievements Section */}
        <section ref={achievementsRef}>
          <h2 className="text-3xl font-semibold text-center mb-8 text-blue-200">
            <FaTrophy className="inline-block mr-2 text-yellow-400" /> Logros
          </h2>
          <div className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-all">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">
              Hackathon Morelos
            </h3>
            <p className="text-white/80">
              3er lugar en la 13ª Hackathon Morelos con el proyecto “Energéticamente Responsable”, una aplicación móvil desarrollada por un equipo de 5 personas para visualizar y optimizar el consumo energético en los hogares. Competimos contra 242 participantes y logramos destacar por nuestra propuesta innovadora y el impacto potencial en la eficiencia energética.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}