import express from 'express';
import { auth } from '../middleware/auth.js';
import { CompletedActivity } from '../models/CompletedActivity.js';
import { Progress } from '../models/Progress.js';
import { Activity } from '../models/Activity.js';

const router = express.Router();
// Obtener todas las actividades diarias
router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las actividades.' });
  }
});
// Crear nueva actividad diaria
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, xp } = req.body;
    if (!name || !description || typeof xp !== 'number') {
      return res.status(400).json({ message: 'Faltan campos requeridos (name, description, xp).' });
    }
    const activity = await Activity.create({ name, description, xp });
    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la actividad.' });
  }
});
// Endpoint para obtener actividades completadas por usuario actual
router.get('/completed', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const completed = await CompletedActivity.find({ userId });
    res.json(completed);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener actividades completadas' });
  }
});

// Endpoint para completar una actividad
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const activityId = req.params.id;
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Verificar si ya la completó hoy
    const alreadyCompleted = await CompletedActivity.findOne({
      userId,
      activityId,
      date: today
    });
    if (alreadyCompleted) {
      return res.status(400).json({ message: 'Ya completaste esta actividad hoy.' });
    }

    // Registrar como completada
    await CompletedActivity.create({ userId, activityId, date: today });

    // Sumar XP al usuario (puedes ajustar la cantidad)
    const xp = req.body.xp || 50;
    let progress = await Progress.findOne({ userId });
    if (!progress) progress = new Progress({ userId });
    await progress.addExperience(xp);

    res.json({ message: 'Actividad completada', xp, level: progress.level, experience: progress.experience });
  } catch (err) {
    res.status(500).json({ message: 'Error al completar la actividad' });
  }
});

export default router;
