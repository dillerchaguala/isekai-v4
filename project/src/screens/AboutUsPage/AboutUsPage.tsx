import { Home } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/ui/footer";

export function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* Header visual igual a otras páginas */}
      <header className="relative w-full h-[180px] bg-[url(/rectangle-119.png)] bg-cover bg-[50%_50%] flex items-center justify-center">
        <div className="absolute w-full h-full top-0 left-0 bg-[#0f2d34ab] z-10" />
        <div className="absolute w-full h-full flex items-center justify-center z-20">
          <div className="[font-family:'Bagel_Fat_One',Helvetica] font-normal text-[#fff557] text-6xl text-center [text-shadow:0px_4px_4px_#00000040] flex items-center justify-center w-full h-full">
            SOBRE NOSOTROS
          </div>
        </div>
      </header>

      {/* Botón Inicio en el header */}
      <button
        className="absolute top-6 left-6 z-30 bg-white bg-opacity-80 rounded-full px-6 py-2 shadow-lg flex items-center gap-2 hover:bg-yellow-100 transition"
        onClick={() => navigate('/')}
      >
        <Home className="w-6 h-6 text-[#0f2d34]" />
        <span className="font-bold text-[#0f2d34] text-lg">Inicio</span>
      </button>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Misión */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nuestra<br />
                <span className="text-yellow-400">Misión</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                En Isekai, nos dedicamos a proporcionar un espacio seguro y acogedor donde cada persona puede encontrar apoyo profesional y comprensión. Nuestra misión es hacer que la terapia sea accesible y cómoda, combinando la experiencia profesional con un ambiente único y acogedor.
              </p>
            </div>
            <div className="relative h-[400px]">
              <img
                src="/aventura-2.png"
                alt="Misión Isekai"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Visión */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px]">
              <img
                src="/caballero--2--1.png"
                alt="Visión Isekai"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nuestra<br />
                <span className="text-pink-500">Visión</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Aspiramos a transformar la manera en que las personas perciben y acceden a la terapia, creando un espacio donde la salud mental se aborda de manera innovadora y efectiva. Queremos ser reconocidos como pioneros en la integración de elementos lúdicos y terapéuticos para crear experiencias significativas de sanación.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Nuestros <span className="text-blue-500">Valores</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Compromiso</h3>
              <p className="text-gray-600">
                Nos dedicamos completamente al bienestar y progreso de cada persona que confía en nosotros.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovación</h3>
              <p className="text-gray-600">
                Buscamos constantemente nuevas formas de hacer la terapia más efectiva y accesible.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Empatía</h3>
              <p className="text-gray-600">
                Entendemos y acompañamos a cada persona en su proceso único de crecimiento personal.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
