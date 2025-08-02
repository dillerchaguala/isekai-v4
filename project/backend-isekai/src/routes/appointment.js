import express from 'express';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

const router = express.Router();

// Endpoint para administrador: ver todas las citas
router.get('/all', async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener todas las citas.' });
  }
});

// Agendar cita
router.post('/', async (req, res) => {
  try {
    const { userId, date, details } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    const appointment = new Appointment({ user: userId, date, details });
    await appointment.save();
    res.status(201).json({ message: 'Cita agendada correctamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al agendar cita.' });
  }
});

// Listar citas de usuario
router.get('/:userId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.params.userId });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener citas.' });
  }
});

export default router;
