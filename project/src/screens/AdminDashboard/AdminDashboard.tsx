import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
// ...existing code...
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import UsersManagement from "./sections/UsersManagement.tsx";
import ActivitiesManagement from "./sections/ActivitiesManagement.tsx";
import TherapistsManagement from "./sections/TherapistsManagement.tsx";
import AchievementsManagement from "./sections/AchievementsManagement.tsx";
import DashboardStats from './sections/DashboardStats';
import AppointmentsManagement from "./sections/AppointmentsManagement.tsx";
import TherapiesManagement from "./sections/TherapiesManagement.tsx";
import ExercisesManagement from "./sections/ExercisesManagement.tsx";
import { useAuth } from '../../lib/AuthContext';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[url(/rectangle-119.png)] bg-cover bg-[50%_50%]">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8">
        <div className="bg-[#0f2d34cc] backdrop-blur-md rounded-3xl p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">Panel de Administración</h1>
            <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <Button className="bg-[#183c4a] text-white border border-white hover:bg-[#24506a] w-full sm:w-auto">
                Exportar Datos
              </Button>
              <Button onClick={handleLogout} className="bg-[#24506a] text-white border border-white hover:bg-[#183c4a] w-full sm:w-auto">
                Cerrar sesión
              </Button>
            </div>
          </div>

          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white/10 p-1 flex overflow-x-auto whitespace-nowrap rounded-lg">
              <TabsTrigger 
                value="dashboard"
                className="text-white data-[state=active]:bg-white/20 min-w-[120px]"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="users"
                className="text-white data-[state=active]:bg-white/20 min-w-[120px]"
              >
                Usuarios
              </TabsTrigger>
              <TabsTrigger 
                value="activities"
                className="text-white data-[state=active]:bg-white/20 min-w-[120px]"
              >
                Actividades
              </TabsTrigger>
              <TabsTrigger 
                value="appointments"
                className="text-white data-[state=active]:bg-white/20"
              >
                Citas Agendadas
              </TabsTrigger>
              <TabsTrigger 
                value="therapies"
                className="text-white data-[state=active]:bg-white/20"
              >
                Terapias
              </TabsTrigger>
              <TabsTrigger 
                value="exercises"
                className="text-white data-[state=active]:bg-white/20"
              >
                Ejercicios
              </TabsTrigger>
              <TabsTrigger 
                value="therapists"
                className="text-white data-[state=active]:bg-white/20"
              >
                Terapeutas
              </TabsTrigger>
              <TabsTrigger 
                value="achievements"
                className="text-white data-[state=active]:bg-white/20"
              >
                Logros
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="dashboard">
                <DashboardStats />
              </TabsContent>

              <TabsContent value="users">
                <UsersManagement />
              </TabsContent>

              <TabsContent value="activities">
                <ActivitiesManagement />
              </TabsContent>

              <TabsContent value="appointments">
                <AppointmentsManagement />
              </TabsContent>

              <TabsContent value="therapies">
                <TherapiesManagement />
              </TabsContent>

              <TabsContent value="exercises">
                <ExercisesManagement />
              </TabsContent>

              <TabsContent value="therapists">
                <TherapistsManagement />
              </TabsContent>

              <TabsContent value="achievements">
                <AchievementsManagement />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
