import { Card, CardContent } from "../../../components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down';
  trendValue?: string;
  icon?: string;
}

const StatCard = ({ title, value, trend, trendValue, icon }: StatCardProps) => {
  return (
    <Card className="bg-white/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-300">{title}</p>
            <h4 className="text-2xl font-bold text-white mt-1">{value}</h4>
            {trend && trendValue && (
              <p className={`text-sm mt-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </p>
            )}
          </div>
          {icon && <span className="text-3xl text-white opacity-80">{icon}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default function DashboardStats() {
  return (
    <div className="space-y-6">
      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Usuarios Activos"
          value="1,234"
          trend="up"
          trendValue="12% vs mes anterior"
          icon="👥"
        />
        <StatCard
          title="Nuevos Registros"
          value="256"
          trend="up"
          trendValue="8% esta semana"
          icon="✨"
        />
        <StatCard
          title="Actividades Completadas"
          value="3,456"
          trend="up"
          trendValue="15% vs mes anterior"
          icon="✅"
        />
        <StatCard
          title="Tiempo Promedio"
          value="45 min"
          trend="down"
          trendValue="3% esta semana"
          icon="⏱️"
        />
      </div>

      {/* Estadísticas Detalladas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Actividades Más Populares</h3>
            <div className="space-y-4">
              {[
                { name: "Meditación Grupal", participants: 45, completion: 92 },
                { name: "Ejercicios de Respiración", participants: 38, completion: 88 },
                { name: "Terapia de Grupo", participants: 32, completion: 95 },
                { name: "Yoga en Línea", participants: 28, completion: 85 }
              ].map((activity) => (
                <div key={activity.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{activity.name}</p>
                    <p className="text-sm text-gray-300">{activity.participants} participantes</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 bg-white/20 rounded-full h-2 mr-3">
                      <div
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: `${activity.completion}%` }}
                      />
                    </div>
                    <span className="text-white">{activity.completion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Estado de Terapeutas</h3>
            <div className="space-y-4">
              {[
                { name: "Dr. García", status: "Disponible", patients: 12, rating: 4.8 },
                { name: "Dra. Rodríguez", status: "En sesión", patients: 15, rating: 4.9 },
                { name: "Dr. Martínez", status: "Descanso", patients: 10, rating: 4.7 },
                { name: "Dra. López", status: "Disponible", patients: 8, rating: 4.6 }
              ].map((therapist) => (
                <div key={therapist.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{therapist.name}</p>
                    <p className="text-sm text-gray-300">{therapist.patients} pacientes activos</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      therapist.status === 'Disponible' 
                        ? 'bg-green-500/20 text-green-400'
                        : therapist.status === 'En sesión'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {therapist.status}
                    </span>
                    <span className="text-yellow-400">⭐ {therapist.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas de Progreso */}
      <Card className="bg-white/10">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Progreso General</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-300 mb-1">Tasa de Retención</p>
              <div className="flex items-center gap-2">
                <div className="w-full bg-white/20 rounded-full h-4">
                  <div
                    className="bg-purple-400 h-4 rounded-full"
                    style={{ width: '85%' }}
                  />
                </div>
                <span className="text-white font-medium">85%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-1">Satisfacción</p>
              <div className="flex items-center gap-2">
                <div className="w-full bg-white/20 rounded-full h-4">
                  <div
                    className="bg-yellow-400 h-4 rounded-full"
                    style={{ width: '92%' }}
                  />
                </div>
                <span className="text-white font-medium">92%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-1">Compromiso</p>
              <div className="flex items-center gap-2">
                <div className="w-full bg-white/20 rounded-full h-4">
                  <div
                    className="bg-green-400 h-4 rounded-full"
                    style={{ width: '78%' }}
                  />
                </div>
                <span className="text-white font-medium">78%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
