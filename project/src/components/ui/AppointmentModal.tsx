import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    dia: '',
    hora: '',
    sede: '',
    discapacidades: '',
    comentarios: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Obtener el userId del usuario logueado desde localStorage
    const user = localStorage.getItem('isekaiUser');
    const userId = user ? JSON.parse(user).id : null;
    if (!userId) {
      alert('Debes iniciar sesión para agendar una cita');
      return;
    }
    const appointmentData = {
      userId,
      date: `${formData.dia}T${formData.hora}`,
      details: `${formData.nombre} ${formData.apellidos} - ${formData.sede} - ${formData.discapacidades} - ${formData.comentarios}`,
    };
    const res = await fetch('http://localhost:4000/api/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Cita agendada correctamente');
      onClose();
    } else {
      alert(data.message || 'Error al agendar cita');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" 
         style={{ backgroundColor: 'rgba(15, 45, 52, 0.7)' }}>
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl mx-4 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>
        {/* Content */}
        <div className="p-8 pt-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Bagel Fat One' }}>
              AGENDA TU CITA
            </h1>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Primera fila - Nombre y Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-yellow-300/50 transition-all duration-200 backdrop-blur-sm"
                  placeholder="Nombre"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-yellow-300/50 transition-all duration-200 backdrop-blur-sm"
                  placeholder="Apellidos"
                  required
                />
              </div>
            </div>
            {/* Segunda fila - Día y Hora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  name="dia"
                  value={formData.dia}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-yellow-300/50 transition-all duration-200 backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-yellow-300/50 transition-all duration-200 backdrop-blur-sm"
                  required
                />
              </div>
            </div>
            {/* Tercera fila - Sede y Discapacidades */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <select
                  name="sede"
                  value={formData.sede}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-yellow-300/50 transition-all duration-200 backdrop-blur-sm"
                  required
                >
                  <option value="" className="text-gray-900">Sede</option>
                  <option value="bogota-norte" className="text-gray-900">Bogotá Norte</option>
                  <option value="bogota-sur" className="text-gray-900">Bogotá Sur</option>
                  <option value="bogota-centro" className="text-gray-900">Bogotá Centro</option>
                  <option value="virtual" className="text-gray-900">Virtual</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  name="discapacidades"
                  value={formData.discapacidades}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-yellow-300/50 transition-all duration-200 backdrop-blur-sm"
                  placeholder="Discapacidades"
                />
              </div>
            </div>
            {/* Comentarios */}
            <div>
              <textarea
                name="comentarios"
                value={formData.comentarios}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-yellow-300/50 transition-all duration-200 backdrop-blur-sm resize-none"
                placeholder="Tus comentarios..."
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-12 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
