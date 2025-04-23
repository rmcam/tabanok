import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HashLink } from 'react-router-hash-link'; // Importar HashLink

interface HeroProps {
  title: string;
  description: string;
  buttons?: {
    label: string;
    variant: 'default' | 'secondary' | 'link' | 'destructive' | 'outline' | 'ghost';
    onClick?: () => void;
    action?: 'openSignupModal';
    href?: string; // Añadir propiedad href
  }[];
  imageSrc: string;
  imageAlt: string;
  onComienzaAhoraClick?: () => void;
}

const HeroSection: React.FC<HeroProps> = ({
  title,
  description,
  buttons,
  imageSrc,
  imageAlt,
  onComienzaAhoraClick,
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center py-12 px-4 relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          y,
        }}
      />
      <div className="absolute inset-0 bg-teal-700 opacity-60"></div>{' '}
      {/* Cambiado a superposición teal con opacidad */}
      <div className="hero-content text-center md:text-left relative z-10">
        <h2 className="text-4xl font-bold mb-6 text-white">{title}</h2>
        <p className="text-xl mb-8 text-white">{description}</p>
        {buttons && (
          <div className="space-x-4 mt-8">
            {buttons.map((button, buttonIndex) => {
              // Determinar el manejador de clic
              const handleClick =
                button.action === 'openSignupModal' ? onComienzaAhoraClick : button.onClick;

              // Renderizar como HashLink si tiene href, de lo contrario como Button
              if (button.href) {
                return (
                  <HashLink key={buttonIndex} to={button.href} smooth={true} duration={500}>
                    <Button
                      variant={
                        button.variant as
                          | 'default'
                          | 'secondary'
                          | 'link'
                          | 'destructive'
                          | 'outline'
                          | 'ghost'
                      }
                      onClick={handleClick} // Mantener el manejador de clic para acciones adicionales si es necesario
                    >
                      {button.label}
                    </Button>
                  </HashLink>
                );
              } else {
                return (
                  <Button
                    key={buttonIndex}
                    variant={
                      button.variant as
                        | 'default'
                        | 'secondary'
                        | 'link'
                        | 'destructive'
                        | 'outline'
                        | 'ghost'
                    }
                    onClick={handleClick}
                  >
                    {button.label}
                  </Button>
                );
              }
            })}
          </div>
        )}
      </div>
      <div className="hero-image relative z-10">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={clsx('rounded-xl shadow-md w-96 border-4 border-yellow-500')}
        />
      </div>
    </section>
  );
};

export default HeroSection;
