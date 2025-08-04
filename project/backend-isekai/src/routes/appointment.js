import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Configuración de horarios disponibles
const HORARIOS_DISPONIBLES = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
];

const MAX_CITAS_POR_DIA = 3;
const MAX_CITAS_PENDIENTES_POR_USUARIO = 2;

// Obtener todas las citas de un usuario
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({ userId });
    res.json(appointments);
  } catch (err) {
    console.error('Error al obtener citas:', err);
    res.status(500).json({ message: 'Error al obtener las citas.' });
  }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      nombre,
      apellidos,
      dia,
      hora,
      sede,
      discapacidades,
      comentarios,
      estado
    } = req.body;

    const newAppointment = new Appointment({
      userId,
      nombre,
      apellidos,
      dia,
      hora,
      sede,
      discapacidades,
      comentarios,
      estado: estado || 'pendiente'
    });

    // Validar horario disponible
    if (!HORARIOS_DISPONIBLES.includes(hora)) {
      return res.status(400).json({ 
        message: 'Horario no disponible. Por favor seleccione un horario válido.',
        horariosDisponibles: HORARIOS_DISPONIBLES
      });
    }

    // Verificar disponibilidad para el día y hora seleccionados
    const citasExistentes = await Appointment.find({ 
      dia, 
      hora,
      estado: { $ne: 'cancelada' }
    });

    if (citasExistentes.length >= MAX_CITAS_POR_DIA) {
      return res.status(400).json({ 
        message: 'No hay disponibilidad en este horario. Por favor seleccione otro horario.' 
      });
    }

    // Verificar límite de citas pendientes por usuario
    const citasPendientes = await Appointment.find({
      userId,
      estado: 'pendiente'
    });

    if (citasPendientes.length >= MAX_CITAS_PENDIENTES_POR_USUARIO) {
      return res.status(400).json({ 
        message: `No puede tener más de ${MAX_CITAS_PENDIENTES_POR_USUARIO} citas pendientes.` 
      });
    }

    const savedAppointment = await newAppointment.save();
    res.status(201).json({ 
      message: 'Cita agendada correctamente.',
      appointment: savedAppointment
    });
  } catch (err) {
    console.error('Error al agendar cita:', err);
    res.status(500).json({ message: 'Error al agendar cita.' });
  }
});

// Obtener horarios disponibles para un día específico
router.get('/horarios-disponibles/:dia', async (req, res) => {
  try {
    const { dia } = req.params;
    
    // Obtener todas las citas para ese día que no estén canceladas
    const citasDelDia = await Appointment.find({
      dia,
      estado: { $ne: 'cancelada' }
    });

    // Filtrar horarios que ya tienen el máximo de citas
    const horariosDisponibles = HORARIOS_DISPONIBLES.filter(horario => {
      const citasEnHorario = citasDelDia.filter(cita => cita.hora === horario).length;
      return citasEnHorario < MAX_CITAS_POR_DIA;
    });

    res.json({ horariosDisponibles });
  } catch (err) {
    console.error('Error al obtener horarios disponibles:', err);
    res.status(500).json({ message: 'Error al obtener horarios disponibles.' });
  }
});

// Reagendar una cita
router.patch('/reagendar/:appointmentId', async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { dia, hora } = req.body;

    // Validar nuevo horario
    if (!HORARIOS_DISPONIBLES.includes(hora)) {
      return res.status(400).json({ 
        message: 'Horario no disponible. Por favor seleccione un horario válido.',
        horariosDisponibles: HORARIOS_DISPONIBLES
      });
    }

    // Verificar disponibilidad para el nuevo día y hora
    const citasExistentes = await Appointment.find({ 
      dia, 
      hora,
      estado: { $ne: 'cancelada' },
      _id: { $ne: appointmentId }
    });

    if (citasExistentes.length >= MAX_CITAS_POR_DIA) {
      return res.status(400).json({ 
        message: 'No hay disponibilidad en este horario. Por favor seleccione otro horario.' 
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { dia, hora },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    res.json({ 
      message: 'Cita reagendada correctamente.',
      appointment: updatedAppointment
    });
  } catch (err) {
    console.error('Error al reagendar cita:', err);
    res.status(500).json({ message: 'Error al reagendar la cita.' });
  }
});

// Cancelar una cita
router.patch('/cancelar/:appointmentId', async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { motivo } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { 
        estado: 'cancelada',
        comentarios: motivo || 'Cancelada por el usuario'
      },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    res.json({ 
      message: 'Cita cancelada correctamente.',
      appointment: updatedAppointment
    });
  } catch (err) {
    console.error('Error al cancelar cita:', err);
    res.status(500).json({ message: 'Error al cancelar la cita.' });
  }
});

// Obtener estadísticas de citas por sede
router.get('/estadisticas/por-sede', async (req, res) => {
  try {
    const estadisticas = await Appointment.aggregate([
      {
        $group: {
          _id: '$sede',
          total: { $sum: 1 },
          pendientes: {
            $sum: { $cond: [{ $eq: ['$estado', 'pendiente'] }, 1, 0] }
          },
          confirmadas: {
            $sum: { $cond: [{ $eq: ['$estado', 'confirmada'] }, 1, 0] }
          },
          canceladas: {
            $sum: { $cond: [{ $eq: ['$estado', 'cancelada'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json(estadisticas);
  } catch (err) {
    console.error('Error al obtener estadísticas:', err);
    res.status(500).json({ message: 'Error al obtener estadísticas.' });
  }
});

export default router;
