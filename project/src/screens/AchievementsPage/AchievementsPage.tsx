import { useEffect, useState } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import { achievements } from "../../data/activities";
import { Footer } from "../../components/ui/footer";

interface Achievement {
  achievementId: string;
  progress: number;
}

interface UserProgress {
  achievements: Achievement[];
}

export function AchievementsPage() {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Cargar los logros del usuario desde localStorage
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      const progress: UserProgress = JSON.parse(savedProgress);
      setUserAchievements(progress.achievements);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[url(/rectangle-119.png)] bg-cover bg-[50%_50%]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Logros</h1>

        {/* Logros de Ejercicios */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">💪 Logros de Ejercicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.exercise.map((achievement) => {
              const userAchievement = userAchievements.find(
                (a) => a.achievementId === achievement.id
              );
              return (
                <Card key={achievement.id} className="bg-[#0f2d34cc] backdrop-blur-md border border-white/20">
                  <CardContent className="p-6">
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{achievement.icon}</span>
                        <h3 className="font-bold">{achievement.name}</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">{achievement.description}</p>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${userAchievement?.progress || 0}%` }}
                        />
                      </div>
                      <p className="text-sm mt-2">{userAchievement?.progress || 0}% completado</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Logros de Terapia */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">🧘‍♂️ Logros de Terapia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.therapy.map((achievement) => {
              const userAchievement = userAchievements.find(
                (a) => a.achievementId === achievement.id
              );
              return (
                <Card key={achievement.id} className="bg-[#0f2d34cc] backdrop-blur-md border border-white/20">
                  <CardContent className="p-6">
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{achievement.icon}</span>
                        <h3 className="font-bold">{achievement.name}</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">{achievement.description}</p>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${userAchievement?.progress || 0}%` }}
                        />
                      </div>
                      <p className="text-sm mt-2">{userAchievement?.progress || 0}% completado</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Logros Sociales */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">👥 Logros Sociales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.social.map((achievement) => {
              const userAchievement = userAchievements.find(
                (a) => a.achievementId === achievement.id
              );
              return (
                <Card key={achievement.id} className="bg-[#0f2d34cc] backdrop-blur-md border border-white/20">
                  <CardContent className="p-6">
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{achievement.icon}</span>
                        <h3 className="font-bold">{achievement.name}</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">{achievement.description}</p>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${userAchievement?.progress || 0}%` }}
                        />
                      </div>
                      <p className="text-sm mt-2">{userAchievement?.progress || 0}% completado</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
