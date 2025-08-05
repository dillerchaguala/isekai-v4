import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Footer } from "../../components/ui/footer";
import { AppointmentModal } from "../../components/ui/AppointmentModal";

// Tipos para las actividades y progreso
import { DailyActivity, Exercise } from "../../data/activities";
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
  // const [exercises, setExercises] = useState<Exercise[]>([]);
  // const [achievementsList, setAchievementsList] = useState<Achievement[]>([]);
  const [dailyActivitiesList, setDailyActivitiesList] = useState<DailyActivity[]>([]);

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

    // Solo permite completar una vez por día
    setProgress(prev => {
      if (!prev) return prev;
      const activity = prev.dailyActivities.find(a => a.id === activityId);
      if (activity?.completed) return prev; // Ya completada hoy
      const updatedActivities = prev.dailyActivities.map(a =>
        a.id === activityId ? { ...a, completed: true } : a
      );
      const updatedProgress = {
        ...prev,
        dailyActivities: updatedActivities
      };
      localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
      // Suma XP solo si no estaba completada
      updateProgress(xp);
      return updatedProgress;
    });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
      return;
    }
    try {
      const userObj = JSON.parse(user);
      if (!userObj || !userObj.name || !userObj.id) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
        return;
      }
      setUserName(userObj.name);
      fetchProgress();
      // fetchExercises();
      // fetchAchievements();
      fetchDailyActivities();
      // Reiniciar actividades si es un nuevo día
      const today = new Date().toDateString();
      const lastReset = localStorage.getItem('lastDailyReset');
      if (lastReset !== today) {
        setProgress(prev => {
          if (!prev) return prev;
          const resetActivities = prev.dailyActivities.map(a => ({ ...a, completed: false }));
          const updatedProgress = { ...prev, dailyActivities: resetActivities };
          localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
          // Actualiza también en el backend
          const token = localStorage.getItem('token');
          fetch('http://localhost:4000/api/progress/initialize', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dailyActivities: resetActivities, sessionStreak: prev.sessionStreak })
          });
          return updatedProgress;
        });
        localStorage.setItem('lastDailyReset', today);
      }
    } catch (error) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate]);

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/progress/progress', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('No se pudo obtener el progreso');
      let progressData = await res.json();
      if (!progressData.dailyActivities || progressData.dailyActivities.length === 0) {
        // Si el backend no tiene actividades diarias, usa las del backend (no locales)
        const dailyRes = await fetch('http://localhost:4000/api/activities', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const dailyFromBackend = dailyRes.ok ? await dailyRes.json() : [];
        const initializedActivities = dailyFromBackend.map((a: any) => ({ ...a, completed: false }));
        // POST para guardar en el backend
        const saveRes = await fetch('http://localhost:4000/api/progress/initialize', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ dailyActivities: initializedActivities, sessionStreak: 0 })
        });
        if (!saveRes.ok) throw new Error('No se pudo inicializar el progreso en el backend');
        progressData = await saveRes.json();
      }
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  // Obtener ejercicios desde el backend
  // const fetchExercises = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const res = await fetch('http://localhost:4000/api/exercises', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     if (!res.ok) throw new Error('No se pudo obtener los ejercicios');
  //     const data = await res.json();
  //     setExercises(data);
  //   } catch (error) {
  //     setExercises([]);
  //   }
  // };

  // Obtener logros desde el backend
  // const fetchAchievements = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const res = await fetch('http://localhost:4000/api/achievements', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     if (!res.ok) throw new Error('No se pudo obtener los logros');
  //     const data = await res.json();
  //     setAchievementsList(data);
  //   } catch (error) {
  //     setAchievementsList([]);
  //   }
  // };

  // Obtener actividades diarias desde el backend
  const fetchDailyActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/activities', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('No se pudo obtener las actividades diarias');
      const data = await res.json();
      setDailyActivitiesList(data);
    } catch (error) {
      setDailyActivitiesList([]);
    }
  };

  const navItems = [
    { text: `¡Hola, ${userName}!`, color: "text-yellow-400 font-bold", onClick: () => {} },
    { text: "Ejercicios", color: "text-yellow-400 font-bold", onClick: () => navigate('/exercises') },
    { text: "Logros", color: "text-yellow-400 font-bold", onClick: () => navigate('/achievements') },
    { text: "CERRAR SESIÓN", color: "text-white font-bold", onClick: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/');
    }}
  ];

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
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">Días Consecutivos</p>
                        <p className="text-2xl font-bold">{progress?.sessionStreak || 0}</p>
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

            {/* Panel de Actividades Diarias */}
            <div className="bg-[#0f2d34cc] backdrop-blur-md rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Actividades Diarias</h2>
              <div className="grid grid-cols-1 gap-4">
                {(progress?.dailyActivities?.length ? progress.dailyActivities : dailyActivitiesList).map((activity) => (
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
                        <h4 className="font-bold text-lg mb-1">{activity.name}</h4>
                        <p className="text-sm opacity-75 mb-2">{activity.description}</p>
                        <p className="text-sm text-yellow-400">Total: +{activity.xp} XP</p>
                        <div className="flex justify-end mt-2">
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
          userId={JSON.parse(localStorage.getItem('user') || '{}').id}
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
