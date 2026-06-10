import { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  id: string; // Tu clave o ID de zona de Adsterra
  format: '728x90' | '468x60' | '300x250' | '160x600';
  className?: string;
}

export function AdsterraBanner({ id, format, className }: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Si no está en el cliente o no hay contenedor, retornar
    if (typeof window === 'undefined' || !containerRef.current) return;

    const [width, height] = format.split('x').map(Number);

    // Si la clave ID es un placeholder o está vacía, no inyectar
    if (!id || id.startsWith('TU_ID')) return;

    // Crear el bloque de configuración global atOptions
    const optionsScript = document.createElement('script');
    optionsScript.type = 'text/javascript';
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '${id}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    // Crear el script de invocación de Adsterra
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.highperformanceformat.com/${id}/invoke.js`;

    // Limpiar el contenedor antes de inyectar
    containerRef.current.innerHTML = '';
    
    // Adjuntar los scripts de Adsterra
    containerRef.current.appendChild(optionsScript);
    containerRef.current.appendChild(invokeScript);

    return () => {
      // Limpiar al desmontar el componente
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [id, format]);

  return (
    <div 
      className={`no-print flex items-center justify-center overflow-hidden bg-white/5 border border-white/5 rounded-xl min-h-[90px] text-center select-none ${className}`}
    >
      <div ref={containerRef} className="w-full flex justify-center items-center">
        {/* Placeholder visual si no se ha configurado un ID de Adsterra válido */}
        <div className="py-4 px-6 text-gray-500">
          <span className="block text-[8px] uppercase tracking-[0.2em] text-[#d4af37] font-extrabold mb-1">
            Espacio Publicitario
          </span>
          <span className="text-[10px] block font-light">
            Banner Adsterra ({format})
          </span>
          <span className="text-[9px] block text-gray-600 font-mono mt-1">
            ID: {id || 'Pendiente'}
          </span>
        </div>
      </div>
    </div>
  );
}
