import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { PageHeader } from '../../components/ui/page-header';
import { Footer } from '../../components/ui/footer';

interface Progress {
  level: number;
  experience: number;
  unlockedCharacters: Array<{
    characterId: string;
    unlockedAt: string;
    level: number;
  }>;
  achievements: Array<{
    achievementId: string;
    progress: number;
    unlockedAt: string;
  }>;
  questsCompleted: number;
  sessionStreak: number;
}

export const ProfilePage = () => {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ name: string; email: string; id: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('isekaiUser');
    const token = localStorage.getItem('isekaiToken');

    if (!userStr || !token) {
      navigate('/');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
    } catch (err) {
      navigate('/');
      return;
    }

    const fetchProgress = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/progress/progress', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token inválido o expirado
            localStorage.removeItem('isekaiUser');
            localStorage.removeItem('isekaiToken');
            navigate('/');
            return;
          }
          throw new Error('Error al cargar el progreso');
        }
        
        const data = await response.json();
        setProgress(data);
      } catch (err) {
        setError('Error al cargar el progreso');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [navigate]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-2xl text-gray-600">Cargando perfil...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-2xl text-red-600">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="MI PERFIL" />
      
      {/* Sección de información del usuario */}
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{user?.name || 'Usuario'}</h2>
                <p className="text-xl opacity-90">{user?.email || 'Correo no disponible'}</p>
              </div>
              <div className="mt-4 md:mt-0 text-center">
                <div className="text-4xl font-bold mb-2">Nivel {progress?.level || 1}</div>
                <div className="text-lg">
                  {progress?.experience || 0} / {(progress?.level || 1) * 1000} XP
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-100">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Personajes Desbloqueados</h3>
              <div className="text-3xl font-bold text-blue-600">
                {progress?.unlockedCharacters.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-100">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Logros Completados</h3>
              <div className="text-3xl font-bold text-green-600">
                {progress?.achievements.filter(a => a.progress >= 100).length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-100">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Misiones Completadas</h3>
              <div className="text-3xl font-bold text-yellow-600">
                {progress?.questsCompleted || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-100">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Racha de Sesiones</h3>
              <div className="text-3xl font-bold text-purple-600">
                {progress?.sessionStreak || 0} días
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sección de navegación */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/characters">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Mis Personajes
            </Button>
          </Link>
          <Link to="/achievements">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Mis Logros
            </Button>
          </Link>
          <Link to="/appointments">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Mis Citas
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline">
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};
