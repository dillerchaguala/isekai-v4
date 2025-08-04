import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ExerciseModal } from "../../components/ui/ExerciseModal";
import { dailyActivities, Exercise } from "../../data/activities";

export const ExercisesPage = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[url(/rectangle-119.png)] bg-cover bg-[50%_50%] pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="bg-[#0f2d34cc] backdrop-blur-md rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Ejercicios y Actividades</h1>
            <Button
              onClick={() => navigate('/home')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
            >
              Volver al Inicio
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dailyActivities.map((activity) => (
              <Card key={activity.id} className="bg-white/10">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {activity.name}
                      </h2>
                      <p className="text-gray-300">
                        {activity.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">
                        Ejercicios Disponibles:
                      </h3>
                      <div className="grid gap-3">
                        {activity.exercises.map((exercise) => (
                          <button
                            key={exercise.id}
                            onClick={() => {
                              setSelectedExercise(exercise);
                              setIsExerciseModalOpen(true);
                            }}
                            className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-left w-full group"
                          >
                            <div>
                              <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                                {exercise.name}
                              </h4>
                              <p className="text-sm text-gray-300 mt-1">
                                Duración: {exercise.duration}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-400 font-bold">
                                +{exercise.xp} XP
                              </span>
                              <svg
                                className="w-6 h-6 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <span className="text-yellow-400 font-bold">
                        Total: +{activity.xp} XP
                      </span>
                      <span className="text-sm text-gray-300">
                        {activity.exercises.length} ejercicios
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedExercise && (
        <ExerciseModal
          isOpen={isExerciseModalOpen}
          onClose={() => {
            setIsExerciseModalOpen(false);
            setSelectedExercise(null);
          }}
          exercise={selectedExercise}
          onComplete={() => {
            setIsExerciseModalOpen(false);
            setSelectedExercise(null);
            // Aquí puedes añadir la lógica para actualizar el progreso
          }}
        />
      )}
    </div>
  );
};
