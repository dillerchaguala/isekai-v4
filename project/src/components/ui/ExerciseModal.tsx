import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Exercise } from "../../data/activities";
import { Button } from "./button";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise;
  onComplete: () => void;
}

export const ExerciseModal = ({
  isOpen,
  onClose,
  exercise,
  onComplete,
}: ExerciseModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Convertir la duración del ejercicio a segundos
  const getDurationInSeconds = () => {
    const durationStr = exercise.duration;
    const minutes = parseInt(durationStr.split(' ')[0]);
    return minutes * 60;
  };

  // Iniciar el temporizador
  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(getDurationInSeconds());
  };

  // Manejar el siguiente paso
  const handleNextStep = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Manejar el paso anterior
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Efecto para el temporizador
  useEffect(() => {
    let interval: number;
    if (isTimerRunning && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => window.clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0f2d34] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>{exercise.name}</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Panel Izquierdo - Descripción y Timer */}
            <div className="space-y-4">
              <p className="text-lg">{exercise.description}</p>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-4">Temporizador</h3>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-4">
                    {formatTime(timer)}
                  </div>
                  <Button
                    onClick={() => {
                      if (isTimerRunning) {
                        setIsTimerRunning(false);
                      } else {
                        startTimer();
                      }
                    }}
                    className="w-full"
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Iniciar
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span>Duración: {exercise.duration}</span>
                  <span className="text-yellow-400">+{exercise.xp} XP</span>
                </div>
              </div>
            </div>

            {/* Panel Derecho - Pasos */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-4">Pasos del Ejercicio</h3>
              <div className="space-y-4">
                {/* Paso Actual */}
                <div className="bg-white/20 rounded-lg p-4 min-h-[200px] flex flex-col justify-between">
                  <div>
                    <span className="text-yellow-400 font-bold">
                      Paso {currentStep + 1} de {exercise.steps.length}
                    </span>
                    <p className="text-lg mt-2">{exercise.steps[currentStep]}</p>
                  </div>
                  
                  {/* Controles de Navegación */}
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleNextStep}
                      disabled={currentStep === exercise.steps.length - 1}
                    >
                      Siguiente
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Lista de Todos los Pasos */}
                <div className="bg-black/20 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Todos los pasos:</h4>
                  <ol className="list-decimal pl-4 space-y-2">
                    {exercise.steps.map((step, index) => (
                      <li
                        key={index}
                        className={`${
                          index === currentStep ? "text-yellow-400" : "text-gray-400"
                        } cursor-pointer hover:text-white transition-colors`}
                        onClick={() => setCurrentStep(index)}
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleComplete}
              className="bg-green-500 hover:bg-green-600"
            >
              Completar Ejercicio
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
