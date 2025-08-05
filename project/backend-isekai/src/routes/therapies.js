import express from 'express';
import { auth } from '../middleware/auth.js';
import { Therapy } from '../models/Therapy.js';

const router = express.Router();

// Crear nueva terapia
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, xp } = req.body;
    if (!name || !description || typeof xp !== 'number') {
      return res.status(400).json({ message: 'Faltan campos requeridos (name, description, xp).' });
    }
    const therapy = await Therapy.create({ name, description, xp });
    res.status(201).json(therapy);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la terapia.' });
  }
});

// Obtener todas las terapias
router.get('/', auth, async (req, res) => {
  try {
    const therapies = await Therapy.find();
    res.json(therapies);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las terapias.' });
  }
});

export default router;
