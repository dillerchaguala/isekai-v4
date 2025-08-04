import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  dia: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  sede: {
    type: String,
    required: true
  },
  discapacidades: {
    type: String,
    default: ''
  },
  comentarios: {
    type: String,
    default: ''
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);
