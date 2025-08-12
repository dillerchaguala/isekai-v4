import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Configuración del transportador de correo (para Gmail)
const createTransporter = () => {
  console.log('Configurando nodemailer con:', {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? '****' : 'no password set'
  });

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER y EMAIL_PASS son requeridos en el archivo .env');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS.replace(/\s+/g, '') // Eliminar espacios en blanco
    },
    logger: true,
    debug: true
  });
};

export const generateVerificationToken = () => {
  // Generar un código numérico de 6 dígitos
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerificationEmail = async (email, code) => {
  console.log('Intentando enviar correo a:', email);
  
  const transporter = createTransporter();
  const mailOptions = {
    from: `"ISEKAI" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verifica tu cuenta de ISEKAI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0F2D34;">¡Bienvenido a ISEKAI!</h1>
        <p>Gracias por registrarte. Tu código de verificación es:</p>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${code}
        </div>
        <p>Este código expirará en 24 horas.</p>
        <p>Si no has creado una cuenta en ISEKAI, puedes ignorar este correo.</p>
      </div>
    `
  };

  try {
    console.log('Verificando conexión SMTP...');
    await transporter.verify();
    console.log('Conexión SMTP verificada correctamente');
    
    console.log('Enviando correo...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Error detallado al enviar el correo:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: error.stack
    });
    throw error; // Propagar el error para mejor manejo
  }
};
