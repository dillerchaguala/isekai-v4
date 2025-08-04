import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import UsersManagement from './sections/UsersManagement';
import ActivitiesManagement from './sections/ActivitiesManagement';
import TherapistsManagement from './sections/TherapistsManagement';
import AchievementsManagement from './sections/AchievementsManagement';
import DashboardStats from './sections/DashboardStats';
import { useAuth } from '../../lib/AuthContext';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-[url(/rectangle-119.png)] bg-cover bg-[50%_50%]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#0f2d34cc] backdrop-blur-md rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
            <div className="flex gap-4">
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                Exportar Datos
              </Button>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                Nueva Actividad
              </Button>
            </div>
          </div>

          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white/10 p-1">
              <TabsTrigger 
                value="dashboard"
                className="text-white data-[state=active]:bg-white/20"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="users"
                className="text-white data-[state=active]:bg-white/20"
              >
                Usuarios
              </TabsTrigger>
              <TabsTrigger 
                value="activities"
                className="text-white data-[state=active]:bg-white/20"
              >
                Actividades
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
