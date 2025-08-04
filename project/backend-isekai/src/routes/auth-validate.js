import express from 'express';
import { User } from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Validar token y rol de administrador
router.get('/validate', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ valid: true, user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    }});
  } catch (err) {
    res.status(500).json({ message: 'Error al validar el token' });
  }
});

export default router;
