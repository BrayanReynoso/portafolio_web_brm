import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaCcVisa, FaFile, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FaCakeCandles } from 'react-icons/fa6';
import AboutMe from './AboutMe';
import Projects from './Projects';
import useSEO from '../hooks/useSEO';
import { LiaDev } from 'react-icons/lia';

export default function Home() {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const socialIconsRef = useRef(null);
  useSEO({
    title: "Home | Mi Portafolio",
    description: "Conoce los proyectos en los que he trabajado y las tecnologías que he utilizado.",
    icon: <LiaDev color='white'/>,
      
    })
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
          toggleActions: "play none none reverse",
          once: true, 
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
          toggleActions: "play none none reverse",
          once: true, 
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
          toggleActions: "play none none reverse",
          once: true, 
        },
      }
    );

   
  }, []);

  return (
    <>
    <section className='overflow-hidden'>
      <div className="flex h-screen w-full bg-gradient-to-br from-blue-700 via-blue-400 to-blue-500">
        <div className="w-screen h-full flex items-center justify-center relative">
          <div className="text-center max-w-2xl px-4">
            <h1 ref={titleRef} className="welcome-title text-6xl font-bold text-blue-900 mb-6">
              Hola!, Bienvenido a mi Portafolio Web
            </h1>
            <p ref={paragraphRef} className="text-xl text-blue-300 mb-8">
              Soy Brayan Reynoso Macedo, un desarrollador Full Stack apasionado por crear experiencias digitales únicas.
            </p>
            <div ref={socialIconsRef} className="flex justify-center space-x-6 text-4xl text-blue-700">
              <a href="https://github.com/BrayanReynoso" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900 transition">
                <FaGithub className='text-blue-900'/>
              </a>
              <a href="https://www.linkedin.com/in/brayan-reynoso-macedo-55a216283/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900 transition">
                <FaLinkedin  className='text-blue-900'/>
              </a>
             
              <a href="/assets/cv/CV_BRAYAN_REYNOSO_MACEDO.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900 transition">
                <FaFile  className='text-blue-900'/>
              </a>
            </div>
          </div>
          

          {/* Elementos de fondo animados */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-300 rounded-full opacity-50 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400 rounded-full opacity-40 animate-float-slow"></div>
          
        </div>
      </div>
    </section>
    <AboutMe />
    <Projects />
    </>

  );
}