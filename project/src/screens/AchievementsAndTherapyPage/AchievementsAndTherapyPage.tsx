import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { achievements, therapyTypes } from "../../data/activities";

export const AchievementsAndTherapyPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'achievements' | 'therapy'>('achievements');

  // Función para calcular el progreso en porcentaje
  const calculateProgress = (current: number, required: number) => {
    return Math.min((current / required) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-[url(/rectangle-119.png)] bg-cover bg-[50%_50%] pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="bg-[#0f2d34cc] backdrop-blur-md rounded-3xl p-8">
          {/* Header con navegación */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white">
                {activeTab === 'achievements' ? 'Tus Logros' : 'Terapias Disponibles'}
              </h1>
              <p className="text-gray-300 mt-2">
                {activeTab === 'achievements' 
                  ? 'Completa objetivos para ganar recompensas' 
                  : 'Explora diferentes tipos de terapia'}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setActiveTab('achievements')}
                variant={activeTab === 'achievements' ? 'default' : 'outline'}
                className={activeTab === 'achievements' ? 'bg-yellow-400 text-gray-900' : ''}
              >
                Logros
              </Button>
              <Button
                onClick={() => setActiveTab('therapy')}
                variant={activeTab === 'therapy' ? 'default' : 'outline'}
                className={activeTab === 'therapy' ? 'bg-yellow-400 text-gray-900' : ''}
              >
                Terapias
              </Button>
              <Button
                onClick={() => navigate('/home')}
                variant="outline"
              >
                Volver al Inicio
              </Button>
            </div>
          </div>

          {/* Contenido de Logros */}
          {activeTab === 'achievements' && (
            <div className="space-y-8">
              {Object.entries(achievements).map(([category, categoryAchievements]) => (
                <div key={category} className="space-y-4">
                  <h2 className="text-2xl font-bold text-white capitalize">
                    Logros de {category === 'exercise' ? 'Ejercicios' : 
                              category === 'therapy' ? 'Terapia' : 'Sociales'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryAchievements.map((achievement) => (
                      <Card key={achievement.id} className="bg-white/10">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-3xl">{achievement.icon}</span>
                              <h3 className="text-xl font-bold text-white mt-2">
                                {achievement.name}
                              </h3>
                            </div>
                            <div className="text-right">
                              <span className="text-yellow-400 font-bold">+{achievement.reward.xp} XP</span>
                              <br />
                              <span className="text-emerald-400 font-bold">+{achievement.reward.gems} 💎</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mt-2">{achievement.description}</p>
                          
                          {/* Barra de Progreso */}
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">Progreso</span>
                              <span className="text-gray-300">
                                {achievement.currentProgress}/{achievement.requiredProgress}
                              </span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${calculateProgress(
                                    achievement.currentProgress,
                                    achievement.requiredProgress
                                  )}%`
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contenido de Terapias */}
          {activeTab === 'therapy' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {therapyTypes.map((therapy) => (
                <Card key={therapy.id} className="bg-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-3xl">{therapy.icon}</span>
                        <h3 className="text-xl font-bold text-white mt-2">
                          {therapy.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-yellow-400 font-bold">+{therapy.xpReward} XP</span>
                        <br />
                        <span className="text-emerald-400 font-bold">+{therapy.gemsReward} 💎</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mt-2">{therapy.description}</p>
                    
                    <div className="mt-4 space-y-2">
                      <h4 className="font-semibold text-white">Beneficios:</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        {therapy.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-gray-300">Duración: </span>
                        <span className="text-white">{therapy.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-300">Nivel requerido: </span>
                        <span className="text-white">{therapy.requiredLevel}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                      onClick={() => {
                        // Aquí podemos agregar la lógica para agendar la terapia
                      }}
                    >
                      Agendar Sesión
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
