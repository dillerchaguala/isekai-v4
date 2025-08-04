import { Brain, Heart, MessageCircle, Calendar, Users, Phone, Mail, Home } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/ui/footer";


function TherapyTypesPage() {
  const navigate = useNavigate();

  // La página de tipos de terapia es pública, no necesita verificación de autenticación

  return (
    <div className="bg-white min-h-screen">
      {/* Header visual igual a LandingPage */}
      <header className="relative w-full h-[180px] bg-[url(/rectangle-119.png)] bg-cover bg-[50%_50%] flex items-center justify-center">
        <div className="absolute w-full h-full top-0 left-0 bg-[#0f2d34ab] z-10" />
        <div className="absolute w-full h-full flex items-center justify-center z-20">
          <div className="[font-family:'Bagel_Fat_One',Helvetica] font-normal text-[#fff557] text-6xl text-center [text-shadow:0px_4px_4px_#00000040] flex items-center justify-center w-full h-full">
            TIPOS DE TERAPIA
          </div>
        </div>
      </header>
      {/* Botón Inicio en el header */}
      <button
        className="absolute top-6 left-6 z-30 bg-white bg-opacity-80 rounded-full px-6 py-2 shadow-lg flex items-center gap-2 hover:bg-yellow-100 transition"
        onClick={() => {
          const isAuth = localStorage.getItem('isekaiUser');
          navigate(isAuth ? '/home' : '/');
        }}
      >
        <Home className="w-6 h-6 text-[#0f2d34]" />
        <span className="font-bold text-[#0f2d34] text-lg">Inicio</span>
      </button>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* First Section - Terapia Individual */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Terapia<br />
                <span className="text-pink-500">Individual</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                La terapia individual es un espacio seguro y confidencial donde puedes explorar tus pensamientos, 
                emociones y comportamientos con un profesional capacitado. Te ayudamos a desarrollar herramientas 
                para manejar el estrés, la ansiedad, la depresión y otros desafíos de la vida.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Brain className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Autoconocimiento</h3>
                    <p className="text-sm text-gray-600">Explora tus patrones de pensamiento</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Bienestar emocional</h3>
                    <p className="text-sm text-gray-600">Desarrolla herramientas de manejo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Comunicación</h3>
                    <p className="text-sm text-gray-600">Mejora tus habilidades sociales</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Flexibilidad</h3>
                    <p className="text-sm text-gray-600">Horarios adaptados a ti</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-200 rounded-3xl transform rotate-3"></div>
                <img 
                  src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Terapia Individual" 
                  className="relative rounded-3xl shadow-xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Second Section - Terapia de Pareja */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="absolute inset-0 bg-pink-200 rounded-3xl transform -rotate-3"></div>
                <img 
                  src="https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Terapia de Pareja" 
                  className="relative rounded-3xl shadow-xl w-full h-96 object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Terapia de<br />
                <span className="text-pink-500">Pareja</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                La terapia de pareja ofrece un espacio neutral donde ambos miembros pueden expresar sus 
                sentimientos y trabajar juntos para fortalecer su relación. Abordamos problemas de comunicación, 
                conflictos y ayudamos a reconstruir la confianza y la intimidad.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Comunicación efectiva</h3>
                    <p className="text-sm text-gray-600">Aprende a expresarte mejor</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Reconexión emocional</h3>
                    <p className="text-sm text-gray-600">Fortalece el vínculo afectivo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Resolución de conflictos</h3>
                    <p className="text-sm text-gray-600">Maneja las diferencias sanamente</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Brain className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Entendimiento mutuo</h3>
                    <p className="text-sm text-gray-600">Comprende la perspectiva del otro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Third Section - Terapia Familiar */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Terapia<br />
                <span className="text-pink-500">Familiar</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                La terapia familiar se enfoca en mejorar la comunicación y resolver conflictos dentro del 
                núcleo familiar. Trabajamos con todos los miembros para crear un ambiente más armonioso 
                y funcional, fortaleciendo los lazos familiares y promoviendo el bienestar de todos.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Dinámicas familiares</h3>
                    <p className="text-sm text-gray-600">Mejora las relaciones familiares</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Comunicación abierta</h3>
                    <p className="text-sm text-gray-600">Fomenta el diálogo constructivo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Apoyo mutuo</h3>
                    <p className="text-sm text-gray-600">Fortalece los vínculos afectivos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Brain className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Resolución colaborativa</h3>
                    <p className="text-sm text-gray-600">Encuentra soluciones en conjunto</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-200 rounded-3xl transform rotate-3"></div>
                <img 
                  src="https://images.pexels.com/photos/7176305/pexels-photo-7176305.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Terapia Familiar" 
                  className="relative rounded-3xl shadow-xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Fourth Section - Terapia Grupal */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="absolute inset-0 bg-pink-200 rounded-3xl transform -rotate-3"></div>
                <img 
                  src="https://images.pexels.com/photos/7176298/pexels-photo-7176298.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Terapia Grupal" 
                  className="relative rounded-3xl shadow-xl w-full h-96 object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Terapia<br />
                <span className="text-pink-500">Grupal</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                La terapia grupal ofrece la oportunidad de conectar con otras personas que enfrentan 
                desafíos similares. En un ambiente de apoyo y comprensión mutua, los participantes 
                comparten experiencias, aprenden unos de otros y desarrollan habilidades sociales.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Apoyo comunitario</h3>
                    <p className="text-sm text-gray-600">Conecta con personas afines</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Habilidades sociales</h3>
                    <p className="text-sm text-gray-600">Practica la comunicación grupal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Empatía y comprensión</h3>
                    <p className="text-sm text-gray-600">Desarrolla la inteligencia emocional</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Brain className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Perspectivas diversas</h3>
                    <p className="text-sm text-gray-600">Aprende de diferentes experiencias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para comenzar tu proceso de sanación?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Cada persona es única y merece un enfoque personalizado. Contáctanos para encontrar 
            el tipo de terapia que mejor se adapte a tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Agendar Cita</span>
            </button>
            <button className="border border-pink-500 text-pink-500 hover:bg-pink-50 px-8 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Más Información</span>
            </button>
          </div>
        </section>
      </main>
      <Footer className="mt-20" />
    </div>
  );
}

export default TherapyTypesPage;
