import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
export const GemsPage = (): JSX.Element => {

  // Gems data
  const gems = [
    {
      id: 1,
      name: "GEMA DE SABIDURÍA",
      image: "/gemas-1.png",
      type: "Gema Mental",
      rarity: "Legendario",
      power: "Aumenta la claridad mental y la toma de decisiones",
      value: 500,
      effects: ["Concentración +25%", "Memoria +20%", "Intuición +30%"],
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      name: "GEMA DE VALOR",
      image: "/gemas-1.png",
      type: "Gema Emocional",
      rarity: "Épico",
      power: "Fortalece la confianza y reduce la ansiedad",
      value: 350,
      effects: ["Confianza +30%", "Ansiedad -25%", "Determinación +20%"],
      color: "from-red-400 to-red-600"
    },
    {
      id: 3,
      name: "GEMA DE SERENIDAD",
      image: "/gemas-1.png",
      type: "Gema Espiritual",
      rarity: "Mítico",
      power: "Proporciona paz interior y equilibrio emocional",
      value: 750,
      effects: ["Calma +40%", "Equilibrio +35%", "Paz interior +50%"],
      color: "from-green-400 to-green-600"
    },
    {
      id: 4,
      name: "GEMA DE CREATIVIDAD",
      image: "/gemas-1.png",
      type: "Gema Artística",
      rarity: "Raro",
      power: "Desbloquea el potencial creativo y la inspiración",
      value: 275,
      effects: ["Creatividad +35%", "Inspiración +25%", "Expresión +20%"],
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 5,
      name: "GEMA DE COMPASIÓN",
      image: "/gemas-1.png",
      type: "Gema Social",
      rarity: "Épico",
      power: "Mejora la empatía y las relaciones interpersonales",
      value: 400,
      effects: ["Empatía +30%", "Comunicación +25%", "Comprensión +35%"],
      color: "from-pink-400 to-pink-600"
    },
    {
      id: 6,
      name: "GEMA DE RESISTENCIA",
      image: "/gemas-1.png",
      type: "Gema Física",
      rarity: "Legendario",
      power: "Aumenta la resistencia emocional y física",
      value: 550,
      effects: ["Resistencia +40%", "Recuperación +30%", "Energía +25%"],
      color: "from-orange-400 to-orange-600"
    }
  ];

  const [selectedGem, setSelectedGem] = useState<number | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Mítico": return "text-purple-600 bg-purple-100 border-purple-300";
      case "Legendario": return "text-yellow-600 bg-yellow-100 border-yellow-300";
      case "Épico": return "text-blue-600 bg-blue-100 border-blue-300";
      case "Raro": return "text-green-600 bg-green-100 border-green-300";
      default: return "text-gray-600 bg-gray-100 border-gray-300";
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
            GEMAS
          </h1>
        </header>

        {/* Header Section */}
        <div className="text-center py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Bagel Fat One' }}>
            <span className="text-gray-800">Colecciona </span>
            <span className="text-purple-600">gemas</span>
            <span className="text-gray-800"> poderosas!</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada gema te otorga poderes especiales para tu crecimiento personal y emocional
          </p>
        </div>

        {/* Gems Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="bg-[#a8c5cc] rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gems.map((gem) => (
                <Card
                  key={gem.id}
                  className={`bg-[#d4e4e7] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-none cursor-pointer transform hover:scale-105 ${
                    selectedGem === gem.id ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                  }`}
                  onClick={() => setSelectedGem(selectedGem === gem.id ? null : gem.id)}
                >
                  <CardContent className="p-6">
                    {/* Gem Image with Gradient Background */}
                    <div className={`bg-gradient-to-br ${gem.color} rounded-xl p-6 mb-4 h-48 flex items-center justify-center shadow-inner`}>
                      <img
                        src={gem.image}
                        alt={gem.name}
                        className="w-24 h-24 object-contain drop-shadow-lg"
                      />
                    </div>

                    {/* Gem Name */}
                    <h3 className="text-center font-bold text-lg mb-2 text-gray-800" style={{ fontFamily: 'Quicksand' }}>
                      {gem.name}
                    </h3>

                    {/* Gem Type */}
                    <p className="text-center text-sm text-gray-600 mb-3">
                      {gem.type}
                    </p>

                    {/* Rarity Badge */}
                    <div className="flex justify-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRarityColor(gem.rarity)}`}>
                        {gem.rarity}
                      </span>
                    </div>

                    {/* Value */}
                    <div className="text-center mb-4">
                      <p className="text-xs text-gray-600">Valor</p>
                      <p className="font-bold text-xl text-yellow-600">{gem.value} GP</p>
                    </div>

                    {/* Power Description */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">Poder:</p>
                      <p className="text-sm text-gray-700 text-center italic">
                        {gem.power}
                      </p>
                    </div>

                    {/* Effects */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">Efectos:</p>
                      <div className="space-y-1">
                        {gem.effects.map((effect, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mr-2"></div>
                            <span className="text-xs text-gray-700">{effect}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className={`w-full mt-4 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
                        selectedGem === gem.id 
                          ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                          : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Obteniendo ${gem.name}`);
                      }}
                    >
                      {selectedGem === gem.id ? 'SELECCIONADA' : 'OBTENER'}
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
            <Link to="/pets">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
                Ver Mascotas
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
