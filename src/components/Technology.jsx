import React from "react";

export default function TechnologyCard({ icon: Icon, name, color }) {
  return (
    <div
      className={`shadow-md rounded-lg flex items-center gap-1 p-1 bg-gradient-to-r ${color} hover:scale-105 transition-transform duration-300`}
    >
      {/* Icono */}
      <div className="text-base"> {/* Reducir tamaño del ícono */}
        <Icon />
      </div>
      {/* Nombre de la tecnología */}
      <h3 className="text-xs font-bold text-white"> {/* Reducir tamaño del texto */}
        {name}
      </h3>
    </div>
  );
}