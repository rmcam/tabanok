import { Button } from '@/components/ui/button';
import clsx from 'clsx';

interface HeroProps {
  title: string;
  description: string;
  buttons?: {
    label: string;
    variant: 'default' | 'secondary' | 'link' | 'destructive' | 'outline' | 'ghost';
    onClick?: () => void;
    action?: 'openSignupModal';
  }[];
  imageSrc: string;
  imageAlt: string;
  onComienzaAhoraClick?: () => void;
}

import { motion, useScroll, useTransform } from 'framer-motion';

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
            {buttons.map((button, buttonIndex) => (
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
                onClick={
                  button.action === 'openSignupModal' ? onComienzaAhoraClick : button.onClick
                }
              >
                {button.label}
              </Button>
            ))}
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
