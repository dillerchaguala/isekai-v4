import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Footer } from "../../components/ui/footer";
import { AppointmentModal } from "../../components/ui/AppointmentModal";

// Tipos para las actividades y progreso
import { DailyActivity, Exercise, dailyActivities, unlockableCharacters, unlockablePets, achievements } from "../../data/activities";
import { weeklyTopPlayers, communityHighlights, groupActivities } from "../../data/community";
import { ExerciseModal } from "../../components/ui/ExerciseModal";

interface Progress {
  level: number;
  experience: number;
  unlockedCharacters: string[];
  unlockedPets: string[];
  gems: number;
  sessionStreak: number;
  achievements: Achievement[];
  dailyActivities: DailyActivity[];
}

interface Achievement {
  achievementId: string;
  progress: number;
}

export const AuthenticatedLandingPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  // Función para actualizar XP y nivel
  const updateProgress = async (xpGained: number) => {
    if (!progress) return;

    setIsLoading(true);
    try {
      // Simulación de la actualización mientras se implementa el backend
      const currentXP = progress.experience + xpGained;
      const xpPerLevel = 1000;
      const newLevel = Math.floor(currentXP / xpPerLevel) + 1;
      
      const updatedProgress = {
        ...progress,
        experience: currentXP,
        level: newLevel,
      };
      
      setProgress(updatedProgress);
      
      // Guardar en localStorage para persistencia temporal
      localStorage.setItem('userProgress', JSON.stringify(updatedProgress));

      // Verificar si subió de nivel
      if (newLevel > progress.level) {
        alert(`¡Felicidades! Has alcanzado el nivel ${newLevel}`);
      }
    } catch (error) {
      console.error('Error actualizando progreso:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para completar una actividad
  const completeActivity = async (activityId: string, xp: number) => {
    if (isLoading) return;

    try {
      // Primero actualizamos el estado de la actividad
      setProgress(prev => {
        if (!prev) return prev;
        const updatedActivities = prev.dailyActivities.map(activity =>
          activity.id === activityId ? { ...activity, completed: true } : activity
        );
        
        const updatedProgress = {
          ...prev,
          dailyActivities: updatedActivities
        };
        
        // Guardar en localStorage
        localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
        return updatedProgress;
      });

      // Luego actualizamos el XP
      await updateProgress(xp);
    } catch (error) {
      console.error('Error completando actividad:', error);
    }
  };

  // Navigation menu items con onClick
  const navItems = [
    { text: `¡Hola, ${userName}!`, color: "text-yellow-400 font-bold", onClick: () => {} },
    { text: "Ejercicios", color: "text-yellow-400 font-bold", onClick: () => navigate('/exercises') },
    { text: "Logros", color: "text-yellow-400 font-bold", onClick: () => navigate('/achievements') },
    { text: "CERRAR SESIÓN", color: "text-white font-bold", onClick: () => {
      localStorage.removeItem('isekaiUser');
      localStorage.removeItem('isekaiToken');
      navigate('/');
    }}
  ];

  useEffect(() => {
    const user = localStorage.getItem('isekaiUser');
    // Si no hay usuario autenticado, redirige al inicio
    if (!user) {
      navigate('/');
      return;
    }

    try {
      const userObj = JSON.parse(user);
      if (!userObj || !userObj.name || !userObj.id) {
        // Si el objeto de usuario no es válido, limpia el almacenamiento y redirige
        localStorage.removeItem('isekaiUser');
        localStorage.removeItem('isekaiToken');
        navigate('/');
        return;
      }

      // Si todo está bien, actualiza el estado
      setUserName(userObj.name);
      fetchProgress();
    } catch (error) {
      // Si hay un error al parsear el usuario, limpia el almacenamiento y redirige
      localStorage.removeItem('isekaiUser');
      localStorage.removeItem('isekaiToken');
      navigate('/');
    }
  }, [navigate]);

  const fetchProgress = async () => {
    try {
      // Intentar obtener el progreso del localStorage primero
      const savedProgress = localStorage.getItem('userProgress');
      const lastLoginDate = localStorage.getItem('lastLoginDate');
      const today = new Date().toDateString();
      
      // Si es un nuevo día y hay progreso guardado, actualizar la racha
      if (savedProgress && lastLoginDate !== today) {
        const progressData = JSON.parse(savedProgress);
        progressData.sessionStreak = (progressData.sessionStreak || 0) + 1;
        progressData.gems = (progressData.gems || 0) + 5; // Bonus de gemas por racha
        progressData.experience = (progressData.experience || 0) + 50; // XP por racha diaria
        localStorage.setItem('userProgress', JSON.stringify(progressData));
        localStorage.setItem('lastLoginDate', today);
        setProgress(progressData);
        return;
      } else if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
        return;
      }

      // Si no hay progreso guardado, crear uno inicial
      localStorage.setItem('lastLoginDate', today);
      const initialProgress: Progress = {
        level: 1,
        experience: 0,
        unlockedCharacters: [],
        unlockedPets: [],
        gems: 0,
        sessionStreak: 0,
        achievements: [
          ...achievements.exercise.map(a => ({ achievementId: a.id, progress: 0 })),
          ...achievements.therapy.map(a => ({ achievementId: a.id, progress: 0 })),
          ...achievements.social.map(a => ({ achievementId: a.id, progress: 0 }))
        ],
        dailyActivities: dailyActivities
      };

      setProgress(initialProgress);
      localStorage.setItem('userProgress', JSON.stringify(initialProgress));
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <div className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full bg-[url(/rectangle-119.png)] bg-cover bg-[50%_50%]">
          {/* Navigation Bar */}
          <nav className="absolute w-full h-auto md:h-[121px] top-0 left-0 bg-[#0f2d34ab] py-4 md:py-0">
            <div className="flex flex-col md:flex-row items-center h-full px-4 md:px-8 w-full gap-4 md:gap-0">
              {/* Menú */}
              <div className="flex-1"></div>
              <div className="flex flex-col md:flex-row items-center gap-4">
                {navItems.map((item, index) => (
                  <Button
                    key={`nav-${index}`}
                    variant="ghost"
                    className="w-full md:w-[230px] h-[62px] bg-[#d9d9d966] rounded-[20px] shadow-[5px_4px_4px_#00000040]"
                    onClick={item.onClick}
                  >
                    <span className={`font-['Quicksand',Helvetica] font-bold text-base md:text-xl ${item.color}`}>
                      {item.text}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </nav>

          {/* Header con Estadísticas */}
          <div className="pt-32 px-4 container mx-auto">
            <div className="bg-[#0f2d34cc] backdrop-blur-md rounded-3xl p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                  <CardContent className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Nivel Actual</h3>
                    <div className="relative">
                      <p className="text-4xl font-bold">{progress?.level || 1}</p>
                      <div className="w-full bg-white/20 rounded-full h-3 mt-2">
                        <div
                          className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${((progress?.experience || 0) % 1000) / 10}%` }}
                        />
                      </div>
                      <p className="text-sm mt-2">
                        {progress?.experience || 0} / {(progress?.level || 1) * 1000} XP
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                  <CardContent className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Desbloqueos</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">Personajes</p>
                        <p className="text-2xl font-bold">{progress?.unlockedCharacters?.length || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm">Mascotas</p>
                        <p className="text-2xl font-bold">{progress?.unlockedPets?.length || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm">Gemas</p>
                        <p className="text-2xl font-bold">{progress?.gems || 0}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                  <CardContent className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Racha</h3>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-4xl font-bold">{progress?.sessionStreak || 0}</p>
                        <p className="text-sm opacity-75">días consecutivos</p>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-purple-400 h-2 rounded-full"
                            style={{ width: `${((progress?.sessionStreak || 0) % 7) * 14.28}%` }}
                          />
                        </div>
                        <p className="text-xs mt-1">Próxima recompensa: {7 - ((progress?.sessionStreak || 0) % 7)} días</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sección de Desbloqueos y Progreso */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Panel de Actividades y XP */}
              <div className="bg-[#0f2d34cc] backdrop-blur-md rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Actividades Diarias</h2>
                <div className="grid grid-cols-1 gap-4">
                  {progress?.dailyActivities?.map((activity) => (
                    <Card 
                      key={activity.id}
                      className={`${
                        activity.completed 
                          ? 'bg-green-900/20' 
                          : 'bg-white/10 hover:bg-white/20'
                      } transition-colors cursor-pointer`}
                    >
                      <CardContent className="p-4 text-white">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-bold">{activity.name}</h4>
                              <p className="text-sm opacity-75">{activity.description}</p>
                              <p className="text-sm text-yellow-400">+{activity.xp} XP Total</p>
                            </div>
                          </div>
                          
                          {!activity.completed && (
                            <div className="space-y-2">
                              <h5 className="font-semibold text-sm text-gray-300">Ejercicios disponibles:</h5>
                              <div className="grid grid-cols-1 gap-2">
                                {activity.exercises.map((exercise) => (
                                  <Button
                                    key={exercise.id}
                                    onClick={() => {
                                      setSelectedExercise(exercise);
                                      setIsExerciseModalOpen(true);
                                    }}
                                    variant="outline"
                                    className="w-full justify-between"
                                  >
                                    <span>{exercise.name}</span>
                                    <span>+{exercise.xp} XP</span>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-end">
                            <Button
                              onClick={() => completeActivity(activity.id, activity.xp)}
                              className={`${
                                activity.completed
                                  ? 'bg-green-500 hover:bg-green-600'
                                  : 'bg-yellow-400 hover:bg-yellow-500'
                              } text-gray-900`}
                              disabled={activity.completed || isLoading}
                            >
                              {activity.completed ? '¡Completado!' : 'Completar Actividad'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Actividad especial de racha diaria */}
                  <Card className="bg-purple-900/20 border border-purple-500/30">
                    <CardContent className="p-4 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">¡Racha Diaria!</h4>
                          <p className="text-sm opacity-75">
                            +50 XP y {progress?.gems || 0} gemas
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm mb-1">
                            Próxima recompensa en {7 - ((progress?.sessionStreak || 0) % 7)} días
                          </p>
                          <div className="w-32 bg-white/20 rounded-full h-2">
                            <div
                              className="bg-purple-400 h-2 rounded-full"
                              style={{
                                width: `${((progress?.sessionStreak || 0) % 7) * 14.28}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Panel de Desbloqueos */}
              <div className="bg-[#0f2d34cc] backdrop-blur-md rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Próximos Desbloqueos</h2>
                <div className="grid grid-cols-1 gap-4">
                  {unlockableCharacters
                    .filter(char => !progress?.unlockedCharacters.includes(char.id))
                    .slice(0, 2)
                    .map(character => (
                      <Card key={character.id} className="bg-white/10">
                        <CardContent className="p-4 text-white">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-bold">{character.name}</h4>
                              <p className="text-sm opacity-75">Necesitas: Nivel {character.requiredLevel}</p>
                              <p className="text-sm mt-2">{character.description}</p>
                            </div>
                            <div className="w-32 h-32 bg-white/20 rounded-lg overflow-hidden">
                              <img 
                                src={character.image} 
                                alt={character.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {unlockablePets
                    .filter(pet => !progress?.unlockedPets.includes(pet.id))
                    .slice(0, 2)
                    .map(pet => (
                      <Card key={pet.id} className="bg-white/10">
                        <CardContent className="p-4 text-white">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-bold">{pet.name}</h4>
                              <p className="text-sm opacity-75">Necesitas: Nivel {pet.requiredLevel}</p>
                              <p className="text-sm mt-2">{pet.description}</p>
                            </div>
                            <div className="w-32 h-32 bg-white/20 rounded-lg overflow-hidden">
                              <img 
                                src={pet.image} 
                                alt={pet.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>

            {/* Sección de Comunidad */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Ranking Semanal */}
              <Card className="bg-[#0f2d34cc] backdrop-blur-md border border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">🏆 Top Jugadores de la Semana</h3>
                  <div className="space-y-4">
                    {weeklyTopPlayers.map((player, index) => (
                      <div key={player.id} className="flex items-center space-x-4">
                        <div className="w-8 h-8 flex items-center justify-center font-bold text-lg text-white">
                          {index === 0 && "🥇"}
                          {index === 1 && "🥈"}
                          {index === 2 && "🥉"}
                          {index > 2 && `#${index + 1}`}
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold">{player.name}</p>
                          <p className="text-sm text-gray-300">Nivel {player.level} • {player.xp} XP</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Logros Destacados */}
              <Card className="bg-[#0f2d34cc] backdrop-blur-md border border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">✨ Logros Destacados</h3>
                  <div className="space-y-4">
                    {communityHighlights.map((highlight) => (
                      <div key={highlight.id} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{highlight.achievementIcon}</span>
                          <h4 className="font-bold text-white">{highlight.title}</h4>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{highlight.description}</p>
                        <div className="text-sm text-yellow-400">
                          {highlight.userName} • {new Date(highlight.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actividades Grupales */}
              <Card className="bg-[#0f2d34cc] backdrop-blur-md border border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">👥 Actividades Grupales</h3>
                  <div className="space-y-4">
                    {groupActivities.map((activity) => (
                      <div key={activity.id} className="bg-white/5 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white">{activity.title}</h4>
                          <span className="text-xs text-yellow-400">+{activity.xpReward} XP</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">{activity.description}</p>
                        <div className="flex justify-between text-sm">
                          <div className="text-gray-400">
                            📅 {activity.date} • ⏰ {activity.time}
                          </div>
                          <div className="text-purple-400">
                            {activity.participants}/{activity.maxParticipants} 👥
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-3 bg-purple-500 hover:bg-purple-600 text-white"
                          variant="default"
                        >
                          Unirse
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="mt-auto">
          <Footer />
        </div>
        
        {/* Modal de Citas */}
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          userId={JSON.parse(localStorage.getItem('isekaiUser') || '{}').id}
        />

        {/* Modal de Ejercicios */}
        {selectedExercise && (
          <ExerciseModal
            isOpen={isExerciseModalOpen}
            onClose={() => {
              setIsExerciseModalOpen(false);
              setSelectedExercise(null);
            }}
            exercise={selectedExercise}
            onComplete={() => {
              updateProgress(selectedExercise.xp);
              setIsExerciseModalOpen(false);
              setSelectedExercise(null);
            }}
          />
        )}


      </div>
    </div>
  );
};
