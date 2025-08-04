export interface TopPlayer {
  id: string;
  name: string;
  level: number;
  xp: number;
  avatar: string;
  achievements: number;
}

export interface CommunityHighlight {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  achievementIcon: string;
  date: string;
}

export interface GroupActivity {
  id: string;
  title: string;
  description: string;
  participants: number;
  maxParticipants: number;
  date: string;
  time: string;
  duration: string;
  type: 'meditation' | 'exercise' | 'therapy';
  xpReward: number;
}

// Datos de ejemplo para el ranking semanal
export const weeklyTopPlayers: TopPlayer[] = [
  {
    id: '1',
    name: 'DragonMaster',
    level: 15,
    xp: 15000,
    avatar: '/valiente.png',
    achievements: 12
  },
  {
    id: '2',
    name: 'PeaceSeeker',
    level: 14,
    xp: 14200,
    avatar: '/maga.png',
    achievements: 10
  },
  {
    id: '3',
    name: 'MindfulWarrior',
    level: 13,
    xp: 13800,
    avatar: '/sacerdotiza.png',
    achievements: 11
  },
  {
    id: '4',
    name: 'SereneSpirit',
    level: 12,
    xp: 12500,
    avatar: '/Mago.png',
    achievements: 9
  },
  {
    id: '5',
    name: 'HealingHero',
    level: 12,
    xp: 12300,
    avatar: '/heroeEspada.png',
    achievements: 8
  }
];

// Logros destacados de la comunidad
export const communityHighlights: CommunityHighlight[] = [
  {
    id: '1',
    title: '¡30 Días Consecutivos!',
    description: 'Ha completado 30 días seguidos de meditación',
    userId: '1',
    userName: 'DragonMaster',
    achievementIcon: '🏆',
    date: '2025-08-03'
  },
  {
    id: '2',
    title: 'Maestro del Mindfulness',
    description: 'Completó todas las meditaciones guiadas',
    userId: '2',
    userName: 'PeaceSeeker',
    achievementIcon: '🧘‍♂️',
    date: '2025-08-04'
  },
  {
    id: '3',
    title: 'Inspiración Comunitaria',
    description: 'Ayudó a 10 nuevos miembros en su viaje',
    userId: '3',
    userName: 'MindfulWarrior',
    achievementIcon: '💫',
    date: '2025-08-04'
  }
];

// Actividades grupales disponibles
export const groupActivities: GroupActivity[] = [
  {
    id: '1',
    title: 'Meditación Grupal: Paz Interior',
    description: 'Sesión de meditación guiada en grupo para principiantes',
    participants: 8,
    maxParticipants: 15,
    date: '2025-08-05',
    time: '18:00',
    duration: '30 minutos',
    type: 'meditation',
    xpReward: 100
  },
  {
    id: '2',
    title: 'Yoga en Comunidad',
    description: 'Práctica de yoga suave para todos los niveles',
    participants: 12,
    maxParticipants: 20,
    date: '2025-08-06',
    time: '09:00',
    duration: '45 minutos',
    type: 'exercise',
    xpReward: 150
  },
  {
    id: '3',
    title: 'Círculo de Apoyo',
    description: 'Comparte experiencias y aprende de otros en tu viaje',
    participants: 5,
    maxParticipants: 10,
    date: '2025-08-07',
    time: '17:00',
    duration: '1 hora',
    type: 'therapy',
    xpReward: 200
  }
];
