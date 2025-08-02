import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const CharactersPage = (): JSX.Element => {
  // Characters data
  const characters = [
    {
      id: 1,
      name: "EL MAGO SABIO",
      image: "/caballero--2--1.png", // Usando una imagen disponible
      stats: {
        energia: 85,
        fuerza: 60,
        estrategia: 95,
        vuelo: 40,
        resistencia: 70,
        daño: 80
      }
    },
    {
      id: 2,
      name: "AVENTURERO VALIENTE",
      image: "/superheroe-2.png", // Usando una imagen disponible
      stats: {
        energia: 90,
        fuerza: 85,
        estrategia: 75,
        vuelo: 30,
        resistencia: 80,
        daño: 85
      }
    },
    {
      id: 3,
      name: "DRAGÓN PROTECTOR",
      image: "/caballo-1.png", // Usando una imagen disponible como placeholder
      stats: {
        energia: 95,
        fuerza: 70,
        estrategia: 60,
        vuelo: 100,
        resistencia: 90,
        daño: 95
      }
    },
    {
      id: 4,
      name: "ÁGUILA REAL",
      image: "/gemas-1.png", // Usando una imagen disponible como placeholder
      stats: {
        energia: 80,
        fuerza: 65,
        estrategia: 70,
        vuelo: 100,
        resistencia: 75,
        daño: 70
      }
    }
  ];

  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);

  const getStatColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
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
            PERSONAJES
          </h1>
        </header>
        <div className="text-center py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Bagel Fat One' }}>
            <span className="text-gray-800">¡Desbloquea </span>
            <span className="text-purple-600">personajes</span>
            <span className="text-gray-800"> y </span>
            <span className="text-purple-600">mascotas</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: 'Bagel Fat One' }}>
            increíbles!
          </h2>
        </div>
        {/* Characters Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="bg-[#a8c5cc] rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {characters.map((character) => (
                <Card
                  key={character.id}
                  className={`bg-[#d4e4e7] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-none cursor-pointer transform hover:scale-105 ${
                    selectedCharacter === character.id ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                  }`}
                  onClick={() => setSelectedCharacter(selectedCharacter === character.id ? null : character.id)}
                >
                  <CardContent className="p-6">
                    {/* Character Image */}
                    <div className="bg-gray-200 rounded-xl p-4 mb-4 h-48 flex items-center justify-center">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                    {/* Character Name */}
                    <h3 className="text-center font-bold text-lg mb-6 text-gray-800" style={{ fontFamily: 'Quicksand' }}>
                      {character.name}
                    </h3>
                    {/* Stats */}
                    <div className="space-y-3">
                      {Object.entries(character.stats).map(([statName, value]) => (
                        <div key={statName} className="flex flex-col">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-semibold text-gray-700 uppercase" style={{ fontFamily: 'Quicksand' }}>
                              {statName}
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                              {value}
                            </span>
                          </div>
                          <div className="w-full bg-gray-300 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getStatColor(value)} transition-all duration-500`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Action Button */}
                    <Button 
                      className={`w-full mt-6 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
                        selectedCharacter === character.id 
                          ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                          : 'bg-[#6b8e95] hover:bg-[#5a7a82] text-white'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí puedes agregar la lógica para desbloquear
                        console.log(`Desbloqueando ${character.name}`);
                      }}
                    >
                      {selectedCharacter === character.id ? 'SELECCIONADO' : 'DESBLOQUEAR'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
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