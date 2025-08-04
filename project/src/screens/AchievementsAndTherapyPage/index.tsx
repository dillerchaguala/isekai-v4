import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentModal } from '../../components/ui/AppointmentModal';
import { PageHeader } from '../../components/ui/page-header';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Footer } from '../../components/ui/footer';
import { therapyTypes, achievements } from '../../data/activities';

interface Achievement {
  achievementId: string;
  progress: number;
}

export const AchievementsAndTherapyPage = () => {
  const navigate = useNavigate();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedTherapy, setSelectedTherapy] = useState<string | null>(null);
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      const { achievements } = JSON.parse(savedProgress);
      setUserAchievements(achievements);
    }
  }, []);

  const handleBookAppointment = (therapyId: string) => {
    setSelectedTherapy(therapyId);
    setIsAppointmentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Logros y Terapias" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Sección de Terapias */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Servicios de Terapia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapyTypes.map((therapy) => (
              <Card
                key={therapy.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{therapy.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{therapy.name}</h3>
                  <p className="text-gray-600 mb-4">{therapy.description}</p>
                  <ul className="space-y-2 mb-4">
                    {therapy.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>Duración: {therapy.duration}</span>
                    <span>Nivel {therapy.requiredLevel}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-yellow-500">+{therapy.xpReward} XP</span>
                    <span className="text-blue-500">+{therapy.gemsReward} Gemas</span>
                  </div>
                  <Button
                    onClick={() => handleBookAppointment(therapy.id)}
                    className="w-full bg-pink-500 text-white hover:bg-pink-600"
                  >
                    Agendar Cita
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sección de Logros */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tus Logros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Logros de Ejercicios */}
            {achievements.exercise.map((achievement) => {
              const userAchievement = userAchievements.find(
                (a) => a.achievementId === achievement.id
              );
              const progress = userAchievement?.progress || 0;

              return (
                <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">{achievement.icon}</span>
                      <div>
                        <h4 className="font-bold">{achievement.name}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (progress / achievement.requiredProgress) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-medium">{progress}/{achievement.requiredProgress}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-500">+{achievement.reward.xp} XP</span>
                        <span className="text-blue-500">+{achievement.reward.gems} Gemas</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />

      {isAppointmentModalOpen && (
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          userId={JSON.parse(localStorage.getItem('isekaiUser') || '{}').id}
          selectedTherapyType={selectedTherapy || undefined}
        />
      )}
    </div>
  );
};
