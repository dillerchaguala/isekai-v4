import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
}

export const PageHeader = ({ title }: PageHeaderProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header visual */}
      <header className="relative w-full h-[180px] bg-[url(/rectangle-119.png)] bg-cover bg-[50%_50%] flex items-center justify-center">
        <div className="absolute w-full h-full top-0 left-0 bg-[#0f2d34ab] z-10" />
        <div className="absolute w-full h-full flex items-center justify-center z-20">
          <div className="[font-family:'Bagel_Fat_One',Helvetica] font-normal text-[#fff557] text-6xl text-center [text-shadow:0px_4px_4px_#00000040] flex items-center justify-center w-full h-full">
            {title}
          </div>
        </div>
      </header>

      {/* Botón Inicio en el header */}
      <button
        className="absolute top-6 left-6 z-30 bg-white bg-opacity-80 rounded-full px-6 py-2 shadow-lg flex items-center gap-2 hover:bg-yellow-100 transition"
        onClick={() => navigate('/')}
      >
        <Home className="w-6 h-6 text-[#0f2d34]" />
        <span className="font-bold text-[#0f2d34] text-lg">Inicio</span>
      </button>
    </>
  );
};
