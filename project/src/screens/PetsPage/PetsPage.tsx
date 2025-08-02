import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const PetsPage = (): JSX.Element => {
  // Navigation menu items
  const navItems = [
    { text: "NOSOTROS", color: "text-[#ffef00]" },
    { text: "SERVICIOS", color: "text-[#ffef00]" },
    { text: "INICIAR SESION", color: "text-white" },
    { text: "CREAR CUENTA", color: "text-white" },
  ];

  // Pets data
  const pets = [
    {
      id: 1,
      name: "PEGASO DORADO",
      image: "/caballo-1.png",
      type: "Compañero Volador",
      rarity: "Legendario",
      abilities: ["Vuelo rápido", "Curación emocional", "Guía espiritual"],
      level: 15,
      loyalty: 95
    },
    {
      id: 2,
      name: "DRAGÓN BEBÉ",
      image: "/gemas-1.png", // Usando como placeholder
      type: "Guardián Mágico",
      rarity: "Épico",
      abilities: ["Protección", "Sabiduría ancestral", "Fuego curativo"],
      level: 12,
      loyalty: 88
    },
    {
      id: 3,
      name: "FÉNIX CRISTAL",
      image: "/group-265.svg",
      type: "Ave Mística",
      rarity: "Mítico",
      abilities: ["Renacimiento", "Purificación", "Luz sanadora"],
      level: 20,
      loyalty: 100
    },
    {
      id: 4,
      name: "LOBO LUNAR",
      image: "/vector.svg",
      type: "Compañero Nocturno",
      rarity: "Raro",
      abilities: ["Intuición", "Protección nocturna", "Conexión lunar"],
      level: 8,
      loyalty: 75
    }
  ];

  const [selectedPet, setSelectedPet] = useState<number | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Mítico": return "text-purple-600 bg-purple-100";
      case "Legendario": return "text-yellow-600 bg-yellow-100";
      case "Épico": return "text-blue-600 bg-blue-100";
      case "Raro": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1920px] relative">
        {/* Header con fondo y botón de inicio */}
        <header className="relative w-full h-[180px] flex items-center justify-center bg-[url('/rectangle-119.png')] bg-cover bg-center mb-8">
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 px-6 py-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-yellow-100 transition">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0f2d34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>
              <span className="font-bold text-[#0f2d34] text-lg">Inicio</span>
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center" style={{ fontFamily: 'Bagel Fat One', color: '#f7f15a', textShadow: '2px 2px 8px #00000080' }}>
            MASCOTAS
          </h1>
        </header>

        {/* Header Section */}
        <div className="text-center py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Bagel Fat One' }}>
            <span className="text-gray-800">¡Adopta </span>
            <span className="text-purple-600">mascotas</span>
            <span className="text-gray-800"> eternas!</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada mascota te acompañará en tu viaje emocional, brindándote apoyo y habilidades especiales
          </p>
        </div>

        {/* Pets Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="bg-[#a8c5cc] rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pets.map((pet) => (
                <Card
                  key={pet.id}
                  className={`bg-[#d4e4e7] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-none cursor-pointer transform hover:scale-105 ${
                    selectedPet === pet.id ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                  }`}
                  onClick={() => setSelectedPet(selectedPet === pet.id ? null : pet.id)}
                >
                  <CardContent className="p-6">
                    {/* Pet Image */}
                    <div className="bg-gray-200 rounded-xl p-4 mb-4 h-48 flex items-center justify-center">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-32 h-32 object-contain"
                      />
                    </div>

                    {/* Pet Name */}
                    <h3 className="text-center font-bold text-lg mb-2 text-gray-800" style={{ fontFamily: 'Quicksand' }}>
                      {pet.name}
                    </h3>

                    {/* Pet Type */}
                    <p className="text-center text-sm text-gray-600 mb-3">
                      {pet.type}
                    </p>

                    {/* Rarity Badge */}
                    <div className="flex justify-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRarityColor(pet.rarity)}`}>
                        {pet.rarity}
                      </span>
                    </div>

                    {/* Level and Loyalty */}
                    <div className="flex justify-between mb-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Nivel</p>
                        <p className="font-bold text-lg text-gray-800">{pet.level}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Lealtad</p>
                        <p className="font-bold text-lg text-gray-800">{pet.loyalty}%</p>
                      </div>
                    </div>

                    {/* Abilities */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">Habilidades:</p>
                      <div className="space-y-1">
                        {pet.abilities.map((ability, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                            <span className="text-xs text-gray-700">{ability}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className={`w-full mt-4 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
                        selectedPet === pet.id 
                          ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                          : 'bg-[#6b8e95] hover:bg-[#5a7a82] text-white'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Adoptando ${pet.name}`);
                      }}
                    >
                      {selectedPet === pet.id ? 'SELECCIONADA' : 'ADOPTAR'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="container mx-auto px-4 pb-8">
          <div className="flex justify-center gap-6">
            <Link to="/characters">
              <Button className="bg-[#6b8e95] hover:bg-[#5a7a82] text-white px-6 py-3 rounded-lg font-semibold">
                Ver Personajes
              </Button>
            </Link>
            <Link to="/gems">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
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

        {/* Footer Section */}
        <footer className="bg-[#6b8e95] text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <img
                className="w-[30px] h-[30px]"
                alt="Email icon"
                src="/vector-1.svg"
              />
              <span className="font-light text-lg underline">
                Isekai@gmail.com
              </span>
            </div>
            
            <div className="flex justify-center items-center gap-4 mb-6">
              <img
                className="w-[30px] h-[30px]"
                alt="Phone icon"
                src="/vector.svg"
              />
              <span className="font-light text-lg underline">
                000-000-0000
              </span>
            </div>

            <div className="text-sm">
              ISEKAI 2025 - Todos los derechos reservados
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};