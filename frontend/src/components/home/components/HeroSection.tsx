import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  description: string;
  buttons?: { label: string; variant: 'default' | 'secondary' | 'link' | 'destructive' | 'outline' | 'ghost'; onClick?: () => void }[];
  imageSrc: string;
  imageAlt: string;
}

const HeroSection: React.FC<HeroProps> = ({ title, description, buttons, imageSrc, imageAlt }) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-4">
      <div className="hero-content text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-4">{description}</p>
        {buttons && (
          <div className="space-x-4 mt-4">
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
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="hero-image">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="rounded-xl shadow-md w-96"
        />
      </div>
    </section>
  );
};

export default HeroSection;
