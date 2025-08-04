import { useState } from 'react';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = '' }: FooterProps): JSX.Element => {
  const [showMapModal, setShowMapModal] = useState(false);

  return (
    <>
      <footer className={`bg-[#f5f0a1] text-[#0f2d34] py-12 ${className}`}>
        <div className="container mx-auto px-4">
          {/* Título con líneas decorativas */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-[2px] w-24 bg-[#0f2d34]"></div>
            <h2 className="text-5xl [font-family:'Bagel_Fat_One',Helvetica]">ISEKAI</h2>
            <div className="h-[2px] w-24 bg-[#0f2d34]"></div>
          </div>

          {/* Contenido del Footer en 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Columna de Contacto */}
            <div className="text-center">
              <h3 className="font-bold text-2xl mb-6 [font-family:'Bagel_Fat_One',Helvetica]">Contacto</h3>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 hover:text-[#0f2d34cc] transition-colors">
                  <img className="w-8 h-8" alt="Email icon" src="/vector-1.svg" />
                  <span className="font-light text-lg">Isekai@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 hover:text-[#0f2d34cc] transition-colors">
                  <img className="w-8 h-8" alt="Phone icon" src="/vector.svg" />
                  <span className="font-light text-lg">000-000-0000</span>
                </div>
              </div>
            </div>

            {/* Columna de Redes Sociales */}
            <div className="text-center">
              <h3 className="font-bold text-2xl mb-6 [font-family:'Bagel_Fat_One',Helvetica]">Síguenos</h3>
              <div className="flex justify-center gap-6">
                <a href="#" className="transform hover:scale-110 transition-transform">
                  <img className="w-10 h-10" alt="Facebook" src="/facebook-1.png" />
                </a>
                <a href="#" className="transform hover:scale-110 transition-transform">
                  <img className="w-10 h-10" alt="Instagram" src="/social-1.png" />
                </a>
                <a href="#" className="transform hover:scale-110 transition-transform">
                  <img className="w-10 h-10" alt="Twitter" src="/logotipos-1.png" />
                </a>
              </div>
            </div>

            {/* Columna de Ubicación */}
            <div className="text-center">
              <h3 className="font-bold text-2xl mb-6 [font-family:'Bagel_Fat_One',Helvetica]">Ubicación</h3>
              <button 
                onClick={() => setShowMapModal(true)}
                className="inline-flex items-center gap-3 text-[#0f2d34] hover:text-[#0f2d34cc] transition-all transform hover:scale-105"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg">Bogotá, Colombia</span>
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center border-t-2 border-[#0f2d34] pt-6">
            <p className="text-lg font-light">ISEKAI 2025 - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>

      {/* Modal del Mapa */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-[90vw] max-w-[800px] h-[500px]">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 bg-white rounded-full p-2 shadow-lg transform hover:scale-110 transition-transform"
              onClick={() => setShowMapModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-center text-[#0f2d34] [font-family:'Bagel_Fat_One',Helvetica]">
                Nuestra Ubicación
              </h3>
            </div>
            <iframe
              title="Ubicación ISEKAI"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.51141489705!2d-74.107807!3d4.649832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2zQm9nb3TDoQ!5e0!3m2!1ses!2sco!4v1659432175637!5m2!1ses!2sco"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </>
  );
};
