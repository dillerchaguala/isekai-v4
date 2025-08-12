import dotenv from 'dotenv';
// Cargar variables de entorno primero
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointment.js';
import progressRoutes from './routes/progress.js';
import communityRoutes from './routes/community.js';
import activitiesRouter from './routes/activities.js';
import therapiesRouter from './routes/therapies.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/activities', activitiesRouter);
app.use('/api/therapies', therapiesRouter);

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/community', communityRoutes);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/isekai-v4';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor backend escuchando en puerto ${PORT}`));
  })
  .catch(err => console.error('Error de conexión a MongoDB:', err));
