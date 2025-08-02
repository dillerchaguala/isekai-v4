import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Appointment', appointmentSchema);
