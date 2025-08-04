import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Home } from 'lucide-react';
import { PageHeader } from "../../components/ui/page-header";
import { Footer } from "../../components/ui/footer";

export const PackagesPage = (): JSX.Element => {

  // Packages data based on the image
  const packages = [
    {
      id: 1,
      title: "PAQUETE EXPLORADOR",
      color: "bg-gray-300",
      borderColor: "border-gray-400",
      buttonColor: "bg-gray-500 hover:bg-gray-600",
      benefits: [
        "Mini test de alma elemental",
        "Diario emocional limitado",
        "Retos semanales gratuitos para autorreflexión, sin feedback terapéutico"
      ],
      detailedInfo: [
        "Descubre qué tipo de alma elemental eres de forma gratuita y básica",
        "Acceso limitado a herramientas de autorreflexión",
        "Contenido básico sin seguimiento profesional",
        "Acceso restringido a funcionalidades premium"
      ]
    },
    {
      id: 2,
      title: "PAQUETE AVENTURERO",
      color: "bg-purple-200",
      borderColor: "border-purple-400",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      benefits: [
        "Retos terapéuticos estructurados",
        "Contenido desbloqueable (videos, audios, arte) exclusivo",
        "Feedback limitado de un terapeuta-guía"
      ],
      detailedInfo: [
        "Acceso completo a retos y actividades estructuradas",
        "Biblioteca de contenido multimedia exclusivo",
        "Seguimiento básico con profesionales certificados",
        "Herramientas avanzadas de autoconocimiento",
        "Acceso a comunidad de usuarios premium"
      ]
    },
    {
      id: 3,
      title: "PAQUETE HÉROE",
      color: "bg-pink-200",
      borderColor: "border-pink-400",
      buttonColor: "bg-pink-500 hover:bg-pink-600",
      benefits: [
        "Sesiones personalizadas con seguimiento terapéutico real",
        "Todo lo del nivel anterior",
        "Hoja de ruta narrativa ajustada según sus vivencias"
      ],
      detailedInfo: [
        "Sesiones individuales con terapeutas especializados",
        "Plan de tratamiento completamente personalizado",
        "Seguimiento continuo y ajustes en tiempo real",
        "Acceso prioritario a nuevas funcionalidades",
        "Soporte 24/7 y consultas ilimitadas",
        "Narrativa única adaptada a tu historia personal"
      ]
    }
  ];

  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1920px] relative">
        <PageHeader title="PAQUETES DISPONIBLES" />

        {/* Header Section */}
        <div className="text-center py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Bagel Fat One' }}>
            <span className="text-gray-800">¡Descubre nuestras </span>
            <span className="text-purple-600">OFERTAS</span>
            <span className="text-gray-800"> para ti!</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elige el paquete que mejor se adapte a tu viaje de crecimiento personal
          </p>
        </div>

        {/* Packages Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.id} className="flex flex-col">
                {/* Main Package Card */}
                <Card
                  className={`${pkg.color} ${pkg.borderColor} border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 mb-6 ${
                    selectedPackage === pkg.id ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                  }`}
                  onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
                >
                  <CardContent className="p-8">
                    {/* Package Title */}
                    <h3 className="text-center font-bold text-2xl mb-8 text-gray-800" style={{ fontFamily: 'Quicksand' }}>
                      {pkg.title}
                    </h3>

                    {/* Benefits List */}
                    <div className="space-y-4 mb-8">
                      {pkg.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-base leading-relaxed">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button 
                      className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-white ${pkg.buttonColor}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Comprando ${pkg.title}`);
                      }}
                    >
                      COMPRAR
                    </Button>
                  </CardContent>
                </Card>

                {/* Detailed Information Card */}
                <Card className="bg-blue-50 border-2 border-blue-200 rounded-2xl shadow-md">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-4 text-blue-800" style={{ fontFamily: 'Quicksand' }}>
                      Información de beneficios
                    </h4>
                    
                    <div className="space-y-3">
                      {pkg.detailedInfo.map((info, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-blue-700 text-sm leading-relaxed">
                            {info}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="container mx-auto px-4 pb-8">
          <div className="flex justify-center gap-6 flex-wrap">
            <Link to="/characters">
              <Button className="bg-[#6b8e95] hover:bg-[#5a7a82] text-white px-6 py-3 rounded-lg font-semibold">
                Ver Personajes
              </Button>
            </Link>
            <Link to="/pets">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
                Ver Mascotas
              </Button>
            </Link>
            <Link to="/gems">
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold">
                Ver Gemas
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="px-6 py-3 rounded-lg font-semibold">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};