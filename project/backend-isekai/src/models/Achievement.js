import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['SESSION', 'CHARACTER', 'QUEST', 'STREAK', 'SPECIAL'],
    required: true
  },
  requirement: {
    type: Number,  // Cantidad necesaria para desbloquear el logro
    required: true
  },
  reward: {
    type: {
      type: String,
      enum: ['EXPERIENCE', 'CHARACTER', 'CUSTOMIZATION'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  icon: {
    type: String,
    required: true
  },
  isSecret: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Definimos algunos logros predeterminados
achievementSchema.statics.defaultAchievements = [
  {
    title: "Primer Paso",
    description: "Completa tu primera sesión de terapia",
    type: "SESSION",
    requirement: 1,
    reward: {
      type: "EXPERIENCE",
      amount: 500
    },
    icon: "/achievements/first-step.png"
  },
  {
    title: "Guerrero Emocional",
    description: "Completa 10 sesiones de terapia",
    type: "SESSION",
    requirement: 10,
    reward: {
      type: "CHARACTER",
      amount: 1
    },
    icon: "/achievements/emotional-warrior.png"
  },
  {
    title: "Racha de Bienestar",
    description: "Mantén una racha de 7 días consecutivos",
    type: "STREAK",
    requirement: 7,
    reward: {
      type: "EXPERIENCE",
      amount: 1000
    },
    icon: "/achievements/streak.png"
  }
];

// Método para verificar si un usuario ha alcanzado un logro
achievementSchema.methods.checkProgress = function(currentProgress) {
  return currentProgress >= this.requirement;
};

export const Achievement = mongoose.model('Achievement', achievementSchema);
