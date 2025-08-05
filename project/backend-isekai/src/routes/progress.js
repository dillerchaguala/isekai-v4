import express from 'express';
import { Progress } from '../models/Progress.js';
import { Achievement } from '../models/Achievement.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Obtener el progreso del usuario
// Inicializar dailyActivities y sessionStreak para el usuario
router.post('/initialize', auth, async (req, res) => {
  try {
    const { dailyActivities, sessionStreak } = req.body;
    let progress = await Progress.findOne({ userId: req.user.userId });
    if (!progress) {
      progress = new Progress({ userId: req.user.userId });
    }
    // Guardar dailyActivities y sessionStreak
    progress.dailyActivities = dailyActivities;
    progress.sessionStreak = sessionStreak || 0;
    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Error al inicializar el progreso' });
  }
});
router.get('/progress', auth, async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.user.userId });
    
    if (!progress) {
      progress = new Progress({ userId: req.user.userId });
      await progress.save();
    }
    
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el progreso' });
  }
});

// Actualizar experiencia del usuario
router.post('/experience', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    let progress = await Progress.findOne({ userId: req.user.userId });
    
    if (!progress) {
      progress = new Progress({ userId: req.user.userId });
    }
    
    const newLevel = await progress.addExperience(amount);
    
    res.json({
      level: newLevel,
      experience: progress.experience
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la experiencia' });
  }
});

// Desbloquear un personaje
router.post('/unlock-character', auth, async (req, res) => {
  try {
    const { characterId } = req.body;
    let progress = await Progress.findOne({ userId: req.user.userId });
    
    if (!progress) {
      progress = new Progress({ userId: req.user.userId });
    }
    
    const unlocked = await progress.unlockCharacter(characterId);
    
    if (unlocked) {
      res.json({ message: 'Personaje desbloqueado exitosamente' });
    } else {
      res.status(400).json({ message: 'El personaje ya está desbloqueado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al desbloquear el personaje' });
  }
});

// Obtener todos los logros
router.get('/achievements', auth, async (req, res) => {
  try {
    const achievements = await Achievement.find();
    const progress = await Progress.findOne({ userId: req.user.userId });
    
    const achievementsWithProgress = achievements.map(achievement => {
      const userProgress = progress?.achievements.find(
        a => a.achievementId === achievement.id
      );
      
      return {
        ...achievement.toObject(),
        progress: userProgress?.progress || 0,
        isUnlocked: userProgress?.progress >= achievement.requirement
      };
    });
    
    res.json(achievementsWithProgress);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los logros' });
  }
});

// Actualizar progreso de un logro
router.post('/achievement-progress', auth, async (req, res) => {
  try {
    const { achievementId, progress } = req.body;
    let userProgress = await Progress.findOne({ userId: req.user.userId });
    
    if (!userProgress) {
      userProgress = new Progress({ userId: req.user.userId });
    }
    
    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      return res.status(404).json({ message: 'Logro no encontrado' });
    }
    
    const updatedAchievements = await userProgress.updateAchievement(achievementId, progress);
    
    // Verificar si se desbloqueó el logro
    if (progress >= achievement.requirement) {
      // Otorgar recompensa
      if (achievement.reward.type === 'EXPERIENCE') {
        await userProgress.addExperience(achievement.reward.amount);
      }
    }
    
    res.json({
      achievements: updatedAchievements,
      level: userProgress.level,
      experience: userProgress.experience
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el progreso del logro' });
  }
});

export default router;
