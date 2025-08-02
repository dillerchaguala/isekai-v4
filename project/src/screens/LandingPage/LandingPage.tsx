
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { LoginModal } from "../../components/ui/login";
import { AppointmentModal } from "../../components/ui/AppointmentModal";

export const LandingPage = (): JSX.Element => {
  const [showMapModal, setShowMapModal] = useState(false);
  // Estados para los modales
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login');
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showTherapyContent, setShowTherapyContent] = useState(false);
  const navigate = useNavigate();

  // Navigation menu items con onClick
  const navItems = [
    { text: "NOSOTROS", color: "text-[#ffef00]" },
    { text: "SERVICIOS", color: "text-[#ffef00]" },
    userName
      ? { text: `¡Hola, ${userName}!`, color: "text-yellow-400 font-bold" }
      : { text: "INICIAR SESION", color: "text-white", onClick: () => { setLoginMode('login'); setLoginOpen(true); } },
    userName
      ? { text: "CERRAR SESIÓN", color: "text-white font-bold", onClick: () => {
          localStorage.removeItem('isekaiUser');
          localStorage.removeItem('isekaiToken');
          setUserName(null);
        } }
      : { text: "CREAR CUENTA", color: "text-white", onClick: () => { setLoginMode('register'); setLoginOpen(true); } },
  ];
  // Al cargar la página, si hay usuario en localStorage, mostrar su nombre
  useEffect(() => {
    const user = localStorage.getItem('isekaiUser');
    if (user) {
      try {
        const userObj = JSON.parse(user);
        if (userObj.role !== 'admin') {
          setUserName(userObj.name);
        }
      } catch {}
    }
  }, []);

  // Package tiers data
  const packageTiers = [
    {
      title: "EXPLORADORES",
      icon: "/sombrero-de-explorador--1--1.png",
      iconAlt: "Sombrero de explorador",
      features: [
        { icon: "/group-182.png", text: "Mini test de alma elemental." },
        { icon: "/group-183.png", text: "Diario emocional limitado." },
        {
          icon: "/group-184.png",
          text: "Retos semanales gratuitos para autorreflexión, sin feedback terapéutico.",
        },
      ],
      rectangleSrc: "/rectangle-315.svg",
    },
    {
      title: "AVENTUREROS",
      icon: "/aventura-2.png",
      iconAlt: "Aventura",
      features: [
        { icon: "/group-222.png", text: "Retos terapéuticos estructurados" },
        {
          icon: "/group-223.png",
          text: "Contenido desbloqueable (videos, audios, arte) exclusivo.",
        },
        {
          icon: "/group-224.png",
          text: "Feedback limitado de un terapeuta-guía.",
        },
      ],
      rectangleSrc: "/rectangle-329.svg",
    },
    {
      title: "HEROES",
      icon: "/superheroe-2.png",
      iconAlt: "Superheroe",
      features: [
        {
          icon: "/group-225.png",
          text: "Sesiones personalizadas con seguimiento terapéutico real.",
        },
        { icon: "/group-226.png", text: "Todo lo del nivel anterior." },
        {
          icon: "/group-227.png",
          text: "Hoja de ruta narrativa ajustada según sus vivencias",
        },
      ],
      rectangleSrc: "/rectangle-334.svg",
    },
  ];

  // ...existing code...

  // Reward items data
  const rewardItems = [
    {
      title: "PERSONAJES UNÍCOS",
      image: "/caballero--2--1.png",
      alt: "Caballero",
    },
    {
      title: "MASCOTAS ETERNAS",
      image: "/caballo-1.png",
      alt: "Caballo",
    },
    {
      title: "GEMAS",
      image: "/gemas-1.png",
      alt: "Gemas",
    },
  ];

  // Hero section action cards
  const heroActionCards = [
    {
      icon: "/group-260.png",
      alt: "Agenda",
      text: "AGENDA TU CITA",
      bgImage: "/rectangle-402.svg",
    },
    {
      icon: "/terapia-1.png",
      alt: "Terapia",
      text: "TIPOS DE TERAPIA",
      bgImage: "/rectangle-133-1.svg",
    },
    {
      icon: "/notas-de-campo-1.png",
      alt: "Notas de campo",
      text: "PAQUETES",
      bgImage: "/rectangle-133.svg",
    },
  ];

  // Social media links
  const socialLinks = [
    { icon: "/facebook-1.png", alt: "Facebook" },
    { icon: "/social-1.png", alt: "Instagram" },
    { icon: "/logotipos-1.png", alt: "Twitter" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1920px] relative">
        {/* Hero Section */}
        <section className="relative w-full h-[1240px] bg-[url(/rectangle-119.png)] bg-cover bg-[50%_50%]">
          {/* Navigation Bar */}
          <nav className="absolute w-full h-[121px] top-0 left-0 bg-[#0f2d34ab]">
            <div className="flex items-center h-full px-8 w-full">
              {/* Menú izquierdo */}
              <div className="flex items-center gap-4">
                {navItems.slice(0,2).map((item, index) => (
                  <Button
                    key={`nav-${index}`}
                    variant="ghost"
                    className="w-[230px] h-[62px] bg-[#d9d9d966] rounded-[20px] shadow-[5px_4px_4px_#00000040]"
                    onClick={item.onClick}
                  >
                    <span
                      className={`font-['Quicksand',Helvetica] font-bold text-xl ${item.color}`}
                    >
                      {item.text}
                    </span>
                  </Button>
                ))}
              </div>
              {/* Menú usuario a la derecha */}
              <div className="flex items-center gap-4 ml-auto">
                {navItems.slice(2).map((item, index) => (
                  <Button
                    key={`user-nav-${index}`}
                    variant="ghost"
                    className="w-[230px] h-[62px] bg-[#d9d9d966] rounded-[20px] shadow-[5px_4px_4px_#00000040]"
                    onClick={item.onClick}
                  >
                    <span
                      className={`font-['Quicksand',Helvetica] font-bold text-xl ${item.color}`}
                    >
                      {item.text}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          {/* Icono izquierdo eliminado */}

          <img
            className="absolute w-[431px] h-[154px] top-[375px] left-[746px]"
            alt="I SEKA i"
            src="/i-seka-i.svg"
          />

          <div className="absolute w-[1534px] h-[61px] top-[570px] left-[193px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Bagel_Fat_One',Helvetica] font-normal text-[#fff557] text-6xl text-center tracking-[0] leading-normal whitespace-nowrap">
            TERAPIA GAMIFICADA
          </div>

          {/* Action Cards */}
          <div className="absolute bottom-[86px] left-0 right-0 flex justify-center gap-12">
            {heroActionCards.map((card, index) => (
              <Card
                key={`action-card-${index}`}
                className="w-[270px] h-[300px] bg-transparent border-none"
              >
                <CardContent
                  className={`p-0 h-full bg-[url(${card.bgImage})] bg-[100%_100%] relative flex flex-col items-center justify-center`}
                >
                  <img
                    className="w-[130px] h-[130px] object-cover mb-10"
                    alt={card.alt}
                    src={card.icon}
                  />
                  <div className="absolute bottom-11 [font-family:'Quicksand',Helvetica] font-semibold text-white text-2xl text-center">
                    {card.text}
                  </div>
                  {card.text === "AGENDA TU CITA" && (
                    <Button
                      className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
                      onClick={() => setAppointmentOpen(true)}
                    >
                      Agendar cita
                    </Button>
                  )}
                  {card.text === "TIPOS DE TERAPIA" && (
                    <Button
                      className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
                      onClick={() => navigate('/therapy-types')}
                    >
                      Tipos de terapia
                    </Button>
                  )}
                  {card.text === "PAQUETES" && (
                    <Button
                      className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
                      onClick={() => navigate('/packages')}
                    >
                      Paquetes
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Packages Section */}
        <section className="w-full flex justify-center gap-12 mt-[72px]">
          {packageTiers.map((tier, index) => (
            <div key={`tier-${index}`} className="relative w-[452px] h-[581px]">
              {/* Background elements */}
              <div className="absolute w-[168px] h-[158px] top-[420px] left-0 bg-[#dfa1ff] rounded-[15px] shadow-[5px_5px_4px_#0000004c]" />
              <div className="absolute w-[168px] h-[158px] top-[423px] left-0 bg-[#dfa1ff] rounded-[15px] shadow-[5px_5px_4px_#0000004c]" />
              <div className="absolute w-[168px] h-[158px] top-[423px] left-[284px] bg-[#dfa1ff] rounded-[15px] shadow-[5px_5px_4px_#0000004c]" />
              <div className="absolute w-[146px] h-[137px] top-[371px] left-[220px] bg-[#dfa1ff] rounded-[15px] shadow-[5px_5px_4px_#0000004c]" />

              {/* Circle with icon */}
              <div className="absolute w-[130px] h-[130px] top-0 left-[161px] bg-[#0f2d34cc] rounded-[65px] shadow-[inset_5px_5px_5px_#00000059] flex items-center justify-center">
                <img
                  className="w-[65px] h-[65px] object-cover"
                  alt={tier.iconAlt}
                  src={tier.icon}
                />
              </div>

              {/* Main content card */}
              <Card className="absolute w-[428px] h-[508px] top-[67px] left-4 border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <img
                    className="w-full h-full"
                    alt="Rectangle"
                    src={tier.rectangleSrc}
                  />

                  <div className="absolute w-[234px] top-[52px] left-[134px] [font-family:'Quicksand',Helvetica] font-bold text-[#1e2f59] text-[28px] tracking-[0] leading-[normal] whitespace-nowrap">
                    {tier.title}
                  </div>

                  {/* Features list */}
                  <div className="absolute top-[120px] left-[38px] flex flex-col gap-12">
                    {tier.features.map((feature, featureIndex) => (
                      <div
                        key={`feature-${index}-${featureIndex}`}
                        className="flex items-start gap-4"
                      >
                        <img
                          className="w-10 h-10"
                          alt="Feature icon"
                          src={feature.icon}
                        />
                        <div className="[font-family:'Quicksand',Helvetica] font-normal text-black text-[22px] tracking-[0] leading-[normal] max-w-[320px]">
                          {feature.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action button */}
                  <Button className="absolute w-[225px] h-[60px] top-[478px] left-[197px] bg-white rounded-[20px] border-2 border-solid border-[#dfa1ff] shadow-[5px_4px_4px_#00000040] [font-family:'Quicksand',Helvetica] font-semibold text-[#0f2d34] text-[23px] [text-shadow:0px_4px_4px_#00000040]">
                    ADQUIRIR
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </section>

        {/* Therapy Section with Animation */}
        <section className="py-12 w-full bg-white">
          <div className="w-full max-w-[1421px] mx-auto">
            <div
              className="relative w-full bg-white shadow-none p-0 min-h-96 overflow-hidden cursor-pointer"
              onMouseEnter={() => setShowTherapyContent(true)}
              onMouseLeave={() => setShowTherapyContent(false)}
            >
              {showTherapyContent && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-[10rem] md:text-[12rem] font-bold text-gray-100 select-none leading-[0.7] tracking-widest mt-12 md:mt-20" style={{ fontFamily: 'Bagel Fat One' }}>
                      ISEKAI
                    </h1>
                  </div>
                  <div className="relative z-10 mt-16 transition-opacity duration-500 opacity-100">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-12 mt-12">
                      <div className="mb-6 md:mb-0">
                        <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: 'Bagel Fat One' }}>
                          <span className="text-yellow-400">Terapia</span>
                        </h2>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800" style={{ fontFamily: 'Bagel Fat One' }}>
                          profesional
                        </h2>
                      </div>
                      <div className="flex-1 md:ml-8 max-w-2xl md:max-w-[700px] md:-ml-8">
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed" style={{ width: '100%', maxWidth: '700px' }}>
                          <strong>ISEKAI</strong> es una plataforma digital terapéutica que transforma el proceso de autoconocimiento y acompañamiento emocional en una experiencia inmersiva y gamificada. Combina narrativa simbólica, arte interactivo y herramientas clínicas para guiar a cada persona en un "viaje" por su propio mundo emocional, con el apoyo de profesionales de la salud mental.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400 mb-6 md:ml-8 mt-24 md:mt-32" style={{ fontFamily: 'Bagel Fat One' }}>
                        BENEFICIOS
                      </h3>
                      <div className="space-y-4 md:ml-8">
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <p className="text-gray-700 text-base md:text-lg">
                            Acompañamiento emocional flexible y adaptado al ritmo de cada usuario.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <p className="text-gray-700 text-base md:text-lg">
                            Educación emocional accesible, divertida y visualmente atractiva.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <p className="text-gray-700 text-base md:text-lg">
                            Un entorno seguro que combina apoyo profesional y lenguaje narrativo inmersivo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        

        {/* Discover Emotional Journey Section */}

        {/* Discover Emotional Journey Section with Hover Effect */}
        <section className="relative w-[1421px] h-[357px] mt-[200px] mx-auto">
          <div
            className="absolute w-[1421px] h-[322px] top-[35px] left-0 rounded-[30px] border-[3px] border-solid border-[#9b0081] shadow-[0px_4px_4px_#00000040,inset_0px_4px_4px_#00000040] transition-colors duration-300"
            style={{ backgroundColor: undefined }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#5c7bb7'; // azul más claro
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '';
            }}
          >
            <CardContent className="p-12 relative">
              <div className="[text-shadow:5px_4px_4px_#00000040] [font-family:'Bagel_Fat_One',Helvetica] font-normal text-[#0f2d34cc] text-[34px] tracking-[0] leading-[normal]">
                DESCUBRE EL VIAJE EMOCIONAL
              </div>

              <Separator className="my-6 w-[822px] h-[3px] bg-[url(/line-21.svg)]" />

              <div className="[text-shadow:5px_4px_4px_#00000040] [font-family:'Quicksand',Helvetica] font-normal text-[#030000] text-[22px] tracking-[2.20px] leading-[26.1px] max-w-[833px]">
                Es un juego terapéutico donde completas actividades para
                desbloquear cofres con recompensas simbólicas y subir de nivel.
                Cada avance refleja tu progreso emocional y convierte tu
                autoconocimiento en una experiencia interactiva y motivadora.
              </div>

              <img
                className="absolute w-[292px] h-[251px] top-[40px] left-[871px] object-cover"
                alt="Rectangle"
                src="/rectangle-140.png"
              />

              <img
                className="absolute w-[244px] h-[290px] top-[-35px] left-[1137px] object-cover"
                alt="Rectangle"
                src="/rectangle-139.png"
              />
            </CardContent>
          </div>
        </section>

        {/* Rewards Banner */}
        <div className="w-full h-[124px] mt-[141px] bg-[#f5f0a1c2] flex items-center justify-center">
          <div className="[font-family:'Bagel_Fat_One',Helvetica] font-normal text-[#0f2d34cc] text-[40px] tracking-[0] leading-[normal] text-center">
            CADA ACTIVIDAD QUE COMPLETES,TE DARA LAS SIGUIENTES RECOMPENSAS
          </div>
        </div>

        {/* Rewards Section - Icons are clickable and redirect to their pages */}
        <section className="flex justify-center gap-16 mt-[154px]">
          {rewardItems.map((reward, index) => {
            let to = undefined;
            if (reward.title === "PERSONAJES UNÍCOS") to = "/characters";
            if (reward.title === "MASCOTAS ETERNAS") to = "/pets";
            if (reward.title === "GEMAS") to = "/gems";
            return (
              <div key={`reward-${index}`} className="flex flex-col items-center">
                <div
                  className="w-[311px] h-[283px] bg-[#f5f0a1] rounded-[155.5px/141.5px] border-4 border-solid shadow-[5px_4px_4px_#00000040] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => to && navigate(to)}
                >
                  <img
                    className="w-[230px] h-[228px] object-cover"
                    alt={reward.alt}
                    src={reward.image}
                  />
                </div>
                <div className="mt-6 [text-shadow:5px_4px_4px_#00000040] [font-family:'Quicksand',Helvetica] font-bold text-[#000000e6] text-3xl tracking-[0] leading-[normal] text-center">
                  {reward.title}
                </div>
              </div>
            );
          })}
        </section>

        {/* Call to Action Section */}
        <section className="mt-[331px] flex flex-col items-center">
          <div className="[text-shadow:10px_10px_4px_#00000026] [font-family:'Bagel_Fat_One',Helvetica] font-normal text-[#964889] text-[65px] text-center tracking-[5.20px] leading-[80px]">
            ¿Qué esperas para
          </div>
          <div className="[text-shadow:10px_10px_4px_#00000026] [font-family:'Bagel_Fat_One',Helvetica] font-normal text-[#964889] text-[50px] text-center tracking-[12.50px] leading-[normal]">
            COMENZAR TU VIAJE EMOCIONAL?
          </div>

          <Button className="mt-[100px] w-[342px] h-[87px] bg-white rounded-[15px] border-2 border-solid border-[#9b0081] shadow-[10px_10px_4px_#00000026] [font-family:'Quicksand',Helvetica] font-bold text-black text-[35px] tracking-[8.75px]">
            CONTACTAR
          </Button>
        </section>

        {/* Footer Section */}
        <footer className="relative w-full h-[250px] bg-[#f5f0a1] mt-[120px]">
          <img
            className="absolute w-[35px] h-[40px] top-[130px] left-[80px]"
            alt="Group"
            src="/group-265.svg"
          />
          <img
            className="absolute w-[35px] h-[40px] top-[160px] left-[140px]"
            alt="Group"
            src="/group-265.svg"
          />
          <img
            className="absolute w-[35px] h-[40px] top-[170px] left-[220px]"
            alt="Group"
            src="/group-265.svg"
          />
          <div className="absolute w-[460px] h-[27px] bottom-[75px] left-[730px] [font-family:'Inter',Helvetica] font-normal text-black text-xl text-center">
            ISEKAI 2025- Todos los derechos reservados
          </div>
          {/* Legal Links */}
          <div className="absolute right-[80px] bottom-[35px]">
            <div className="[font-family:'Quicksand',Helvetica] font-normal text-black text-2xl text-center mb-4">
              POLITICAS DE PRIVACIDAD
            </div>
            <div className="[font-family:'Quicksand',Helvetica] font-normal text-black text-2xl text-center">
              DERECHOS RESERVADOS
            </div>
          </div>
        </footer>

        {/* Modales */}
        <LoginModal
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          mode={loginMode}
          onSwitchMode={setLoginMode}
          onLoginSuccess={() => {
            setLoginOpen(false);
            const user = localStorage.getItem('isekaiUser');
            let role = '';
            let name = '';
            try {
              const userObj = user ? JSON.parse(user) : null;
              role = userObj?.role || '';
              name = userObj?.name || '';
            } catch (e) {
              role = '';
              name = '';
            }
            if (role === 'admin') {
              navigate('/admin-appointments');
            } else {
              setUserName(name);
              // El usuario normal permanece en la landing
            }
          }}
        />
        <AppointmentModal
          isOpen={appointmentOpen}
          onClose={() => setAppointmentOpen(false)}
        />
        {/* Modal para el mapa */}
        {showMapModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 relative w-[90vw] max-w-[600px] h-[400px] flex flex-col">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-2xl font-bold"
                onClick={() => setShowMapModal(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">Ubicación: Bogotá, Colombia</h2>
              <iframe
                title="Ubicación ISEKAI"
                src="https://www.google.com/maps?q=Bogotá,Colombia&output=embed"
                width="100%"
                height="320"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};