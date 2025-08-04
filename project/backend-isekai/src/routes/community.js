import express from 'express';
import { auth } from '../middleware/auth.js';
import { Progress } from '../models/Progress.js';
import { GroupActivity } from '../models/GroupActivity.js';
import { User } from '../models/User.js';

const router = express.Router();

// Obtener el ranking semanal
router.get('/ranking/weekly', auth, async (req, res) => {
  try {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const topPlayers = await Progress.find({
      updatedAt: { $gte: weekAgo }
    })
    .populate('userId', 'name avatar')
    .sort({ experience: -1 })
    .limit(5);

    const ranking = topPlayers.map(player => ({
      id: player.userId._id,
      name: player.userId.name,
      avatar: player.userId.avatar,
      level: player.level,
      xp: player.experience
    }));

    res.json(ranking);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el ranking', error: error.message });
  }
});

// Obtener logros destacados de la comunidad
router.get('/achievements/highlights', auth, async (req, res) => {
  try {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const highlights = await Progress.find({
      'achievements.unlockedAt': { $gte: weekAgo }
    })
    .populate('userId', 'name')
    .sort({ 'achievements.unlockedAt': -1 })
    .limit(5);

    const formattedHighlights = highlights.map(h => ({
      id: h._id,
      title: h.achievements[0].achievementId,
      description: 'Logro desbloqueado',
      userId: h.userId._id,
      userName: h.userId.name,
      achievementIcon: '🏆',
      date: h.achievements[0].unlockedAt
    }));

    res.json(formattedHighlights);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los logros destacados', error: error.message });
  }
});

// Obtener actividades grupales
router.get('/activities/group', auth, async (req, res) => {
  try {
    const activities = await GroupActivity.find({
      date: { $gte: new Date() },
      status: 'scheduled'
    }).sort({ date: 1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las actividades grupales', error: error.message });
  }
});

// Unirse a una actividad grupal
router.post('/activities/group/:id/join', auth, async (req, res) => {
  try {
    const activity = await GroupActivity.findById(req.params.id);
    
    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    if (activity.participants.length >= activity.maxParticipants) {
      return res.status(400).json({ message: 'La actividad está llena' });
    }

    // Verificar si el usuario ya está inscrito
    const alreadyJoined = activity.participants.some(p => p.userId.toString() === req.user._id.toString());
    if (alreadyJoined) {
      return res.status(400).json({ message: 'Ya estás inscrito en esta actividad' });
    }

    activity.participants.push({
      userId: req.user._id,
      joinedAt: new Date()
    });

    await activity.save();
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error al unirse a la actividad', error: error.message });
  }
});

// Crear una nueva actividad grupal (solo admin)
router.post('/activities/group', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'No tienes permisos para crear actividades' });
    }

    const activity = new GroupActivity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la actividad', error: error.message });
  }
});

export default router;
