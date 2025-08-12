import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode: (mode: 'login' | 'register') => void;
  onLoginSuccess?: (user: any, token: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  onSwitchMode,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  React.useEffect(() => {
    setSuccessMsg('');
    setVerificationStatus(null);
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Si estamos en modo registro y la cuenta fue creada, mostrar verificación
      if (verificationStatus === 'pending') {
        return; // No hacer nada si estamos esperando verificación
      }
      
      if (mode === 'login') {
        // LOGIN
        const res = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        
        if (res.ok) {
          // Guardar usuario y token con las claves correctas
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          // Llamar al callback para que el padre maneje la redirección y el estado
          if (onLoginSuccess) onLoginSuccess(data.user, data.token);
        } else if (res.status === 403 && data.needsVerification) {
          setVerificationStatus('pending');
          setSuccessMsg('Por favor verifica tu correo electrónico antes de iniciar sesión.');
          // Ofrecer reenviar el código de verificación
          const resendRes = await fetch('http://localhost:4000/api/auth/send-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          const resendData = await resendRes.json();
          if (resendRes.ok) {
            setSuccessMsg(resendData.message);
          }
        } else {
          setSuccessMsg(data.message || 'Error al iniciar sesión');
        }
      } else {
        // REGISTRO
        if (password !== confirmPassword) {
          setSuccessMsg('Las contraseñas no coinciden');
          return;
        }

        const res = await fetch('http://localhost:4000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: email.split('@')[0], email, password }),
        });
        const data = await res.json();
        
        if (res.ok) {
          setSuccessMsg('Cuenta creada exitosamente. Por favor revisa tu correo electrónico y usa el código de verificación.');
          setVerificationStatus('pending');
          // No limpiar el email porque lo necesitamos para la verificación
          setPassword('');
          setConfirmPassword('');
        } else {
          setSuccessMsg(data.message || 'Error al registrar');
          setVerificationStatus(null);
        }
      }
    } catch (error) {
      setSuccessMsg('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(15, 45, 52, 0.8)' }}>
      <div 
        className="relative w-full max-w-md mx-4 rounded-2xl shadow-2xl"
        style={{ backgroundColor: '#0F2D34' }}
      >
        {/* Header solo con X */}
        <div className="flex items-center justify-end p-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="text-white hover:text-yellow-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
            {successMsg && (
              <div className="mb-4 p-3 bg-yellow-500/20 rounded-lg">
                <p className="text-yellow-300 text-sm">{successMsg}</p>
                {verificationStatus === 'pending' && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent mb-2"
                      placeholder="Ingresa el código de verificación"
                      maxLength={6}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          setLoading(true);
                          try {
                            const res = await fetch('http://localhost:4000/api/auth/verify-code', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ email, code: verificationCode }),
                            });
                            const data = await res.json();
                            if (res.ok && data.verified) {
                              setVerificationStatus('verified');
                              setSuccessMsg('Email verificado correctamente. Ya puedes iniciar sesión.');
                              // Limpiar el código y cambiar a modo login
                              setVerificationCode('');
                              onSwitchMode('login');
                            } else {
                              setSuccessMsg(data.message || 'Error al verificar el código');
                            }
                          } catch (error) {
                            setSuccessMsg('Error al verificar el código');
                          } finally {
                            setLoading(false);
                          }
                        }}
                        className="flex-1 py-2 bg-yellow-300 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                        disabled={loading || !verificationCode}
                      >
                        Verificar código
                      </button>
                      <button
                        onClick={async () => {
                          setLoading(true);
                          try {
                            const res = await fetch('http://localhost:4000/api/auth/resend-verification', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ email }),
                            });
                            const data = await res.json();
                            if (res.ok) {
                              setSuccessMsg(data.message || 'Correo de verificación reenviado. Por favor revisa tu bandeja de entrada.');
                            } else {
                              setSuccessMsg(data.message || 'Error al reenviar el correo de verificación');
                            }
                          } catch (error) {
                            setSuccessMsg('Error al reenviar el correo de verificación.');
                          } finally {
                            setLoading(false);
                          }
                        }}
                        className="text-yellow-400 hover:text-yellow-300 text-sm underline py-2 px-4"
                        disabled={loading}
                      >
                        Reenviar código
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <p className="text-white/70 text-sm">
              {mode === 'login' 
                ? 'Ingresa a tu cuenta de ISEKAI' 
                : 'Únete a la aventura terapéutica'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-yellow-300 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
            {successMsg && mode === 'register' && (
              <div className="text-green-400 text-center mt-4 font-semibold">
                {successMsg}
              </div>
            )}
          </form>

          {/* Switch entre login y registro */}
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button
                onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
                className="ml-2 text-yellow-300 hover:text-yellow-400 font-medium transition-colors"
              >
                {mode === 'login' ? 'Crear cuenta' : 'Iniciar sesión'}
              </button>
            </p>
          </div>

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <button className="text-yellow-300 hover:text-yellow-400 text-sm transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
