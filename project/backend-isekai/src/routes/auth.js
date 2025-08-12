import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateVerificationToken, sendVerificationEmail } from '../utils/emailUtils.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'isekai_secret';

// Listar todos los usuarios (solo admin)
// Cambiar el rol de un usuario (solo admin)
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!['user', 'admin', 'therapist'].includes(role)) {
      return res.status(400).json({ message: 'Rol no válido.' });
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.json({ message: 'Rol actualizado correctamente.', user });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el rol.' });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios.' });
  }
});

// Registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El correo ya está registrado.' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    
    const user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || 'user',
      isEmailVerified: false,
      verificationCode: verificationToken,
      verificationCodeExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
    });
    
    await user.save();
    
    // Crear progreso inicial para el usuario
    const { Progress } = await import('../models/Progress.js');
    const progress = new Progress({ userId: user._id });
    await progress.save();
    
    // Enviar correo de verificación
    try {
      await sendVerificationEmail(email, verificationToken);
      res.status(201).json({ 
        message: 'Usuario registrado correctamente. Por favor verifica tu correo electrónico.' 
      });
    } catch (emailError) {
      console.error('Error al enviar el correo de verificación:', emailError);
      // El usuario ya está creado, pero hubo un problema con el correo
      res.status(201).json({ 
        message: 'Usuario registrado, pero hubo un problema al enviar el correo de verificación. Por favor, usa la opción de reenviar correo de verificación.',
        emailError: true
      });
    }
  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ message: 'Error en el registro: ' + err.message });
  }
});

// Verificar código
router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ 
      email,
      verificationCode: code,
      verificationCodeExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Código de verificación inválido o expirado' 
      });
    }

    // Marcar el correo como verificado
    user.isEmailVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    res.json({ 
      message: 'Correo electrónico verificado exitosamente',
      verified: true
    });
  } catch (error) {
    console.error('Error al verificar código:', error);
    res.status(500).json({ message: 'Error al verificar el código' });
  }
});

// Reenviar código de verificación
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Este correo ya está verificado' });
    }

    // Generar nuevo código
    const newCode = generateVerificationToken();
    user.verificationCode = newCode;
    user.verificationCodeExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 horas
    await user.save();

    // Enviar nuevo correo
    await sendVerificationEmail(email, newCode);
    
    res.json({ message: 'Nuevo código de verificación enviado' });
  } catch (error) {
    console.error('Error al reenviar verificación:', error);
    res.status(500).json({ message: 'Error al reenviar el código de verificación' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });
    
    // Verificar si el correo está verificado
    if (!user.isEmailVerified) {
      return res.status(403).json({ 
        message: 'Por favor verifica tu correo electrónico antes de iniciar sesión.',
        needsVerification: true,
        email: user.email
      });
    }
    
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        isEmailVerified: user.isEmailVerified 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
});

export default router;
