import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server'; // Necesitamos esta función para convertir JSX en HTML

export default function useSEO({ title, description, icon }) {
  useEffect(() => {
    // Cambiar el título de la página
    document.title = title || 'Default Title';

    // Cambiar la descripción
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Default description');
    } else {
      const metaTag = document.createElement('meta');
      metaTag.name = 'description';
      metaTag.content = description || 'Default description';
      document.head.appendChild(metaTag);
    }

    // Convertir el ícono JSX en un string SVG y luego a base64
    if (icon) {
      const iconMarkup = renderToStaticMarkup(icon); // Convierte el JSX a un string SVG
      const base64Icon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(iconMarkup)}`;

      // Cambiar el ícono (favicon)
      const linkIcon = document.querySelector('link[rel="icon"]');
      if (linkIcon) {
        linkIcon.setAttribute('href', base64Icon);
      } else {
        const iconLink = document.createElement('link');
        iconLink.rel = 'icon';
        iconLink.href = base64Icon;
        document.head.appendChild(iconLink);
      }
    } else {
      // Si no se pasa ícono, se establece el ícono predeterminado
      const linkIcon = document.querySelector('link[rel="icon"]');
      if (linkIcon) {
        linkIcon.setAttribute('href', '/favicon.ico');
      } else {
        const iconLink = document.createElement('link');
        iconLink.rel = 'icon';
        iconLink.href = '/favicon.ico';
        document.head.appendChild(iconLink);
      }
    }
  }, [title, description, icon]); // Dependencias para actualizar los valores si cambian
}