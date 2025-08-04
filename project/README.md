# 🎮 ISEKAI - Plataforma de Terapia Gamificada

**ISEKAI** es una plataforma digital terapéutica que transforma el proceso de autoconocimiento y acompañamiento emocional en una experiencia inmersiva y gamificada.

## 🌟 Características Principales

- 🎯 **Terapia Gamificada**: Convierte el proceso terapéutico en una aventura interactiva
- 🎨 **Interfaz Inmersiva**: Diseño visual atractivo con elementos de fantasía
- 📱 **Responsive Design**: Funciona perfectamente en todos los dispositivos
- 🔒 **Profesional**: Respaldado por profesionales de la salud mental
- 👥 **Panel de Administración**: Gestión completa de usuarios, terapeutas y citas
- 🗓️ **Sistema de Citas**: Programación y gestión de citas terapéuticas
- 🏆 **Logros y Progreso**: Sistema de gamificación para seguimiento del progreso

## 🛠️ Tecnologías Utilizadas

### Frontend
- ⚛️ React con TypeScript
- ⚡ Vite como bundler
- 🎨 TailwindCSS para estilos
- 🎯 Radix UI para componentes accesibles
- 🔄 React Router para navegación

### Backend
- 📦 Node.js y Express
- 🗄️ MongoDB con Mongoose
- 🔑 JWT para autenticación
- 🔒 Middleware de seguridad

## 📂 Estructura del Proyecto

\`\`\`
isekai-v4/
├── project/                  # Frontend
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   │   └── ui/         # Componentes de interfaz
│   │   ├── screens/        # Páginas de la aplicación
│   │   ├── lib/           # Utilidades y configuraciones
│   │   └── styles/        # Estilos globales
│   ├── public/            # Archivos estáticos
│   └── backend-isekai/    # Backend
│       ├── src/
│       │   ├── models/    # Modelos de Mongoose
│       │   ├── routes/    # Rutas de la API
│       │   └── middleware/# Middlewares
\`\`\`

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js (v14 o superior)
- MongoDB
- NPM o Yarn

### Instalación

1. Clonar el repositorio:
\`\`\`bash
git clone https://github.com/dillerchaguala/isekai-v4.git
cd isekai-v4
\`\`\`

2. Instalar dependencias:
\`\`\`bash
# Frontend
cd project
npm install

# Backend
cd backend-isekai
npm install
\`\`\`

3. Configurar variables de entorno:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/isekai-v4
JWT_SECRET=your_secret_key
\`\`\`

4. Iniciar el proyecto:
\`\`\`bash
# Backend
cd backend-isekai
npm run dev

# Frontend
cd project
npm run dev
\`\`\`

## 🔧 Configuración del Panel de Administración

### Funcionalidades Implementadas:
- 📊 Dashboard con estadísticas
- 👥 Gestión de usuarios
- 📋 Gestión de actividades
- 👨‍⚕️ Gestión de terapeutas
- 🏆 Gestión de logros

### Sistema de Citas:
- ✅ Verificación de disponibilidad
- 📅 Límite de citas por usuario
- ⏰ Gestión de horarios
- 🔄 Reagendamiento
- ❌ Cancelación de citas

## 🎨 Estilos y Temas

### Colores Principales:
- 🌊 Fondo: #0f2d34 (con transparencia)
- 🌿 Primario: hsl(142.1, 76.2%, 36.3%)
- ⚪ Secundario: hsl(240, 4.8%, 95.9%)
- ⬜ Texto: #FFFFFF

### Componentes UI:
- 📑 Tabs personalizados (Radix UI)
- 🔳 Botones con variantes
- 🎯 Modales interactivos
- 🎴 Cards para contenido

## 📱 Responsive Design

La plataforma está optimizada para:
- 💻 Escritorio
- 📱 Móvil
- 📟 Tablet

## 🔒 Seguridad

- 🔑 Autenticación JWT
- 👤 Roles de usuario
- 🛡️ Middleware de protección
- 🔐 Encriptación de contraseñas

## 🔄 API Endpoints

### Autenticación:
- 📝 POST /api/auth/register - Registro
- 🔑 POST /api/auth/login - Login
- ✅ GET /api/auth/validate - Validación

### Citas:
- 📋 GET /api/appointment/user/:userId
- ➕ POST /api/appointment
- 🕒 GET /api/appointment/horarios-disponibles/:dia
- 🔄 PATCH /api/appointment/reagendar/:appointmentId
- ❌ PATCH /api/appointment/cancelar/:appointmentId

## 📈 Estado Actual

### Completado:
- ✅ Sistema de autenticación
- ✅ Panel de administración
- ✅ Gestión de citas
- ✅ Landing page
- ✅ Sistema de roles

### En Desarrollo:
- 🎮 Sistema de gamificación
- 🏆 Sistema de logros
- 💬 Chat en tiempo real
- 🔔 Sistema de notificaciones

## 🛠️ Tecnologías

- **React 18** - Framework de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de desarrollo rápida
- **Tailwind CSS** - Framework de estilos
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos modernos

## Getting started

> **Prerequisites:**
> The following steps require [NodeJS](https://nodejs.org/en/) to be installed on your system, so please
> install it beforehand if you haven't already.

To get started with your project, you'll first need to install the dependencies with:

```
npm install
```

Then, you'll be able to run a development version of the project with:

```
npm run dev
```

After a few seconds, your project should be accessible at the address
[http://localhost:5173/](http://localhost:5173/)


If you are satisfied with the result, you can finally build the project for release with:

```
npm run build
```

## 🎮 Funcionalidades

### 📦 Paquetes de Terapia
- **Exploradores**: Nivel básico con mini tests y diario emocional
- **Aventureros**: Retos terapéuticos y contenido exclusivo
- **Héroes**: Sesiones personalizadas con seguimiento profesional

### 🏆 Sistema de Recompensas
- Personajes únicos desbloqueables
- Mascotas eternas como compañeros
- Gemas y elementos coleccionables

### 🎯 Beneficios
- Acompañamiento emocional flexible
- Educación emocional accesible y divertida
- Entorno seguro con apoyo profesional

## 📁 Estructura del Proyecto

```
isekai-project/
├── public/          # Assets (imágenes, iconos)
├── src/
│   ├── components/  # Componentes reutilizables
│   ├── screens/     # Pantallas principales
│   └── lib/         # Utilidades
├── package.json     # Dependencias
└── vite.config.ts   # Configuración
```

## 🚀 Deploy

El proyecto está optimizado para deployment en:
- Netlify
- Vercel
- GitHub Pages

## 📄 Licencia

ISEKAI 2025 - Todos los derechos reservados

## 🤝 Contribuir

Si quieres contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Contacto

- Email: Isekai@gmail.com
- Teléfono: 000-000-0000

---

Desarrollado con ❤️ para transformar la terapia en una aventura