import jwt from 'jsonwebtoken';
const JWT_SECRET = 'isekai_secret'; // Debería estar en variables de entorno

export const auth = async (req, res, next) => {
  try {
    // Obtener el token del header 'Authorization'
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No hay token de autenticación' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Agregar la información del usuario decodificada a la request
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token no válido' });
  }
};
