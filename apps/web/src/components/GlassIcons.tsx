import { useNavigate } from 'react-router-dom';

interface GlassIconItem {
  icon: React.ReactNode;
  label: string;
  query?: string;
  cardType?: 'me' | 'projects' | 'skills' | 'contact' | 'resume' | 'fun';
  color?: string;
  customClass?: string;
}

interface GlassIconsProps {
  items: GlassIconItem[];
  className?: string;
}

const colorGradients: Record<string, string> = {
  me: 'linear-gradient(135deg, hsl(280, 70%, 50%), hsl(260, 70%, 45%))',
  projects: 'linear-gradient(135deg, hsl(220, 70%, 50%), hsl(200, 70%, 45%))',
  skills: 'linear-gradient(135deg, hsl(160, 70%, 50%), hsl(140, 70%, 45%))',
  fun: 'linear-gradient(135deg, hsl(340, 70%, 50%), hsl(320, 70%, 45%))',
  contact: 'linear-gradient(135deg, hsl(40, 70%, 50%), hsl(20, 70%, 45%))',
  resume: 'linear-gradient(135deg, hsl(10, 70%, 50%), hsl(350, 70%, 45%))',
  default: 'linear-gradient(135deg, hsl(0, 0%, 60%), hsl(0, 0%, 50%))',
};

const GlassIcons = ({ items, className }: GlassIconsProps) => {
  const navigate = useNavigate();

  const getBackgroundStyle = (item: GlassIconItem) => {
    if (item.color) {
      return { background: item.color };
    }
    if (item.cardType && colorGradients[item.cardType]) {
      return { background: colorGradients[item.cardType] };
    }
    return { background: colorGradients.default };
  };

  const handleClick = (item: GlassIconItem) => {
    if (item.cardType) {
      navigate('/chat', { state: { cardType: item.cardType } });
    } else {
      const query = item.query || `Tell me about ${item.label.toLowerCase()}`;
      navigate('/chat', { state: { initialQuery: query } });
    }
  };

  return (
    <div className={`flex justify-center items-start flex-wrap gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8 overflow-visible ${className || ''}`}>
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          aria-label={item.label}
          onClick={() => handleClick(item)}
          className={`relative bg-transparent outline-none border-none cursor-pointer w-[3.5em] h-[3.5em] sm:w-[4em] sm:h-[4em] md:w-[4.5em] md:h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group mb-8 sm:mb-10 md:mb-12 ${
            item.customClass || ''
          }`}
        >
          <span
            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] [will-change:transform] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
            style={{
              ...getBackgroundStyle(item),
              boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.2)'
            }}
          ></span>

          <span
            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] [-moz-backdrop-filter:blur(0.75em)] [will-change:transform] transform group-hover:[transform:translate3d(0,0,2em)]"
            style={{
              boxShadow: '0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset'
            }}
          >
            <span className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center text-white" aria-hidden="true">
              {item.icon}
            </span>
          </span>

          <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-xs sm:text-sm md:text-base opacity-100 transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-1 sm:translate-y-2 group-hover:scale-110 group-hover:font-semibold text-gray-900">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;
