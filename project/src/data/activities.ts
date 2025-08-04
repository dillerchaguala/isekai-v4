export interface Exercise {
  id: string;
  name: string;
  description: string;
  steps: string[];
  duration: string;
  xp: number;
}

export interface DailyActivity {
  id: string;
  name: string;
  description: string;
  xp: number;
  exercises: Exercise[];
  completed: boolean;
}

export const dailyActivities: DailyActivity[] = [
  {
    id: 'exercises',
    name: 'Ejercicios Diarios',
    description: 'Rutina de ejercicios para mantener tu bienestar físico y mental',
    xp: 50,
    exercises: [
      {
        id: 'breathing',
        name: 'Ejercicios de Respiración',
        description: 'Técnicas de respiración para reducir el estrés',
        steps: [
          'Siéntate en una posición cómoda',
          'Inhala profundamente por 4 segundos',
          'Mantén la respiración por 4 segundos',
          'Exhala lentamente por 4 segundos',
          'Repite 5 veces'
        ],
        duration: '5 minutos',
        xp: 15
      },
      {
        id: 'stretching',
        name: 'Estiramientos Básicos',
        description: 'Ejercicios de estiramiento para mejorar la flexibilidad',
        steps: [
          'Estira los brazos hacia arriba',
          'Inclínate suavemente hacia los lados',
          'Rota los hombros',
          'Estira las piernas'
        ],
        duration: '10 minutos',
        xp: 20
      }
    ],
    completed: false
  },
  {
    id: 'yoga',
    name: 'Yoga para Principiantes',
    description: 'Secuencia de yoga suave para mejorar la flexibilidad y reducir el estrés',
    xp: 80,
    exercises: [
      {
        id: 'sun-salutation',
        name: 'Saludo al Sol',
        description: 'Secuencia básica de yoga para activar el cuerpo',
        steps: [
          'Comienza en posición de montaña (Tadasana)',
          'Levanta los brazos hacia el cielo',
          'Flexiona hacia adelante',
          'Paso atrás a posición de tabla',
          'Baja a posición de cobra',
          'Perro mirando hacia abajo',
          'Regresa a posición inicial'
        ],
        duration: '10 minutos',
        xp: 30
      },
      {
        id: 'seated-poses',
        name: 'Posturas Sentadas',
        description: 'Posturas suaves de yoga para liberar tensión',
        steps: [
          'Siéntate en posición fácil',
          'Realiza torsiones suaves',
          'Estira la columna hacia adelante',
          'Practica el ángulo sentado',
          'Finaliza con postura de descanso'
        ],
        duration: '15 minutos',
        xp: 35
      }
    ],
    completed: false
  },
  {
    id: 'mental-exercises',
    name: 'Ejercicios Mentales',
    description: 'Actividades para mantener tu mente ágil y enfocada',
    xp: 65,
    exercises: [
      {
        id: 'visualization',
        name: 'Ejercicio de Visualización',
        description: 'Práctica de visualización para reducir la ansiedad',
        steps: [
          'Encuentra un lugar tranquilo',
          'Imagina un lugar seguro y peaceful',
          'Observa los detalles en tu mente',
          'Conecta con las sensaciones',
          'Mantén la imagen por 5 minutos'
        ],
        duration: '10 minutos',
        xp: 25
      },
      {
        id: 'gratitude-practice',
        name: 'Práctica de Gratitud',
        description: 'Ejercicio para cultivar una mentalidad positiva',
        steps: [
          'Toma un cuaderno y lápiz',
          'Escribe 3 cosas por las que estás agradecido/a',
          'Reflexiona sobre cada una',
          'Describe por qué te hacen sentir gratitud',
          'Comparte con alguien si te sientes cómodo/a'
        ],
        duration: '15 minutos',
        xp: 30
      }
    ],
    completed: false
  },
  {
    id: 'meditation',
    name: 'Práctica de Mindfulness',
    description: 'Ejercicios de meditación y atención plena',
    xp: 75,
    exercises: [
      {
        id: 'body-scan',
        name: 'Escaneo Corporal',
        description: 'Meditación guiada de consciencia corporal',
        steps: [
          'Acuéstate en una posición cómoda',
          'Cierra los ojos y respira profundamente',
          'Concentra tu atención en cada parte del cuerpo',
          'Observa las sensaciones sin juzgar'
        ],
        duration: '15 minutos',
        xp: 35
      },
      {
        id: 'loving-kindness',
        name: 'Meditación de Amor y Bondad',
        description: 'Práctica para desarrollar compasión hacia uno mismo y los demás',
        steps: [
          'Siéntate en una posición cómoda',
          'Comienza enviando buenos deseos hacia ti mismo',
          'Extiende los buenos deseos a seres queridos',
          'Amplía el círculo a personas neutras',
          'Finalmente, incluye a todas las personas'
        ],
        duration: '20 minutos',
        xp: 40
      },
      {
        id: 'walking-meditation',
        name: 'Meditación Caminando',
        description: 'Práctica de atención plena en movimiento',
        steps: [
          'Encuentra un espacio tranquilo para caminar',
          'Camina muy lentamente, consciente de cada paso',
          'Observa las sensaciones en tus pies',
          'Mantén la atención en el movimiento',
          'Si la mente divaga, regresa suavemente al caminar'
        ],
        duration: '15 minutos',
        xp: 35
      }
    ],
    completed: false
  }
];

export const unlockablePets = [
  {
    id: 'dragon-pet',
    name: 'Dragón Bebé',
    description: 'Un pequeño dragón que te acompañará en tu viaje',
    requiredLevel: 5,
    image: '/Dragon.png'
  },
  {
    id: 'horse-pet',
    name: 'Caballo Mágico',
    description: 'Un noble corcel que te ayudará en tu aventura',
    requiredLevel: 10,
    image: '/caballo-1.png'
  }
];

export const unlockableCharacters = [
  {
    id: 'warrior',
    name: 'Guerrero',
    description: 'Un valiente guerrero con gran fuerza física',
    requiredLevel: 3,
    image: '/heroeEspada.png'
  },
  {
    id: 'mage',
    name: 'Mago',
    description: 'Un poderoso mago con habilidades místicas',
    requiredLevel: 7,
    image: '/Mago.png'
  },
  {
    id: 'priestess',
    name: 'Sacerdotisa',
    description: 'Una sabia sacerdotisa con poderes curativos',
    requiredLevel: 12,
    image: '/sacerdotiza.png'
  }
];

export const achievements = {
  exercise: [
    {
      id: 'first-steps',
      name: 'Primeros Pasos',
      description: 'Completa tu primera semana de ejercicios',
      requiredProgress: 7,
      currentProgress: 0,
      reward: {
        xp: 100,
        gems: 50
      },
      icon: '🏃‍♂️'
    },
    {
      id: 'mindfulness-master',
      name: 'Maestro del Mindfulness',
      description: 'Completa 30 días de meditación',
      requiredProgress: 30,
      currentProgress: 0,
      reward: {
        xp: 500,
        gems: 200
      },
      icon: '🧘‍♂️'
    },
    {
      id: 'exercise-streak',
      name: 'Rutina Imparable',
      description: 'Mantén una racha de ejercicios durante 15 días',
      requiredProgress: 15,
      currentProgress: 0,
      reward: {
        xp: 300,
        gems: 150
      },
      icon: '🔥'
    },
    {
      id: 'morning-person',
      name: 'Madrugador',
      description: 'Completa 10 ejercicios matutinos',
      requiredProgress: 10,
      currentProgress: 0,
      reward: {
        xp: 200,
        gems: 100
      },
      icon: '🌅'
    }
  ],
  therapy: [
    {
      id: 'therapy-beginner',
      name: 'Inicio del Viaje',
      description: 'Completa tu primera sesión de terapia',
      requiredProgress: 1,
      currentProgress: 0,
      reward: {
        xp: 200,
        gems: 100
      },
      icon: '🌟'
    },
    {
      id: 'consistent-growth',
      name: 'Crecimiento Constante',
      description: 'Asiste a 5 sesiones de terapia',
      requiredProgress: 5,
      currentProgress: 0,
      reward: {
        xp: 1000,
        gems: 500
      },
      icon: '📈'
    },
    {
      id: 'journal-master',
      name: 'Maestro del Diario',
      description: 'Completa 20 entradas en tu diario emocional',
      requiredProgress: 20,
      currentProgress: 0,
      reward: {
        xp: 400,
        gems: 200
      },
      icon: '📔'
    },
    {
      id: 'milestone-achiever',
      name: 'Logros Significativos',
      description: 'Alcanza 3 objetivos terapéuticos',
      requiredProgress: 3,
      currentProgress: 0,
      reward: {
        xp: 800,
        gems: 400
      },
      icon: '🎯'
    }
  ],
  social: [
    {
      id: 'friendship',
      name: 'Lazos de Amistad',
      description: 'Conecta con 3 compañeros de terapia',
      requiredProgress: 3,
      currentProgress: 0,
      reward: {
        xp: 300,
        gems: 150
      },
      icon: '🤝'
    },
    {
      id: 'support-champion',
      name: 'Campeón del Apoyo',
      description: 'Ayuda a 5 compañeros en su proceso',
      requiredProgress: 5,
      currentProgress: 0,
      reward: {
        xp: 400,
        gems: 200
      },
      icon: '🏆'
    },
    {
      id: 'group-therapy-star',
      name: 'Estrella Grupal',
      description: 'Participa en 10 sesiones de terapia grupal',
      requiredProgress: 10,
      currentProgress: 0,
      reward: {
        xp: 600,
        gems: 300
      },
      icon: '⭐'
    },
    {
      id: 'community-builder',
      name: 'Constructor de Comunidad',
      description: 'Organiza 2 eventos sociales con compañeros',
      requiredProgress: 2,
      currentProgress: 0,
      reward: {
        xp: 500,
        gems: 250
      },
      icon: '🌈'
    }
  ]
};

export const therapyTypes = [
  {
    id: 'individual',
    name: 'Terapia Individual',
    description: 'Sesiones personalizadas uno a uno con un terapeuta',
    benefits: [
      'Atención completamente personalizada',
      'Ambiente confidencial y seguro',
      'Flexibilidad en horarios'
    ],
    duration: '45 minutos',
    requiredLevel: 1,
    xpReward: 200,
    gemsReward: 100,
    icon: '👤'
  },
  {
    id: 'group',
    name: 'Terapia Grupal',
    description: 'Sesiones en grupo para compartir experiencias y aprender de otros',
    benefits: [
      'Apoyo de personas con experiencias similares',
      'Desarrollo de habilidades sociales',
      'Precio más accesible'
    ],
    duration: '60 minutos',
    requiredLevel: 3,
    xpReward: 300,
    gemsReward: 150,
    icon: '👥'
  },
  {
    id: 'meditation',
    name: 'Sesiones de Meditación',
    description: 'Aprende técnicas de mindfulness y meditación',
    benefits: [
      'Reduce el estrés y la ansiedad',
      'Mejora la concentración',
      'Desarrolla la atención plena'
    ],
    duration: '30 minutos',
    requiredLevel: 2,
    xpReward: 150,
    gemsReward: 75,
    icon: '🧘‍♂️'
  },
  {
    id: 'art',
    name: 'Terapia de Arte',
    description: 'Expresa tus emociones a través del arte',
    benefits: [
      'Expresión creativa de emociones',
      'No requiere habilidades artísticas previas',
      'Desarrollo de la autoexpresión'
    ],
    duration: '60 minutos',
    requiredLevel: 5,
    xpReward: 250,
    gemsReward: 125,
    icon: '🎨'
  }
];
