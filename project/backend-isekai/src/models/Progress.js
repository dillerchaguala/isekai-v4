import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  dailyActivities: {
    type: Array,
    default: []
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  experience: {
    type: Number,
    default: 0
  },
  gems: {
    type: Number,
    default: 0
  },
  unlockedCharacters: [{
    characterId: {
      type: String,
      required: true
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    },
    level: {
      type: Number,
      default: 1
    }
  }],
  unlockedPets: [{
    petId: {
      type: String,
      required: true
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    },
    level: {
      type: Number,
      default: 1
    }
  }],
  achievements: [{
    achievementId: {
      type: String,
      required: true
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0
    }
  }],
  questsCompleted: {
    type: Number,
    default: 0
  },
  sessionStreak: {
    type: Number,
    default: 0
  },
  lastSessionDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Método para añadir experiencia y subir de nivel si corresponde
progressSchema.methods.addExperience = async function(amount) {
  this.experience += amount;
  
  // Calculamos si debe subir de nivel (cada nivel requiere más experiencia)
  const experienceNeeded = this.level * 1000; // Ejemplo: nivel 1 = 1000xp, nivel 2 = 2000xp, etc.
  
  if (this.experience >= experienceNeeded) {
    this.level += 1;
    this.experience -= experienceNeeded;
  }
  
  await this.save();
  return this.level;
};

// Método para desbloquear un personaje
progressSchema.methods.unlockCharacter = async function(characterId) {
  if (!this.unlockedCharacters.find(char => char.characterId === characterId)) {
    this.unlockedCharacters.push({ characterId });
    await this.save();
    return true;
  }
  return false;
};

// Método para actualizar el progreso de un logro
progressSchema.methods.updateAchievement = async function(achievementId, progress) {
  const achievement = this.achievements.find(a => a.achievementId === achievementId);
  
  if (achievement) {
    achievement.progress = progress;
  } else {
    this.achievements.push({ achievementId, progress });
  }
  
  await this.save();
  return this.achievements;
};

export const Progress = mongoose.model('Progress', progressSchema);
