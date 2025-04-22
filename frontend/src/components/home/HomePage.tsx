import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Activity, Book, Gamepad2 } from 'lucide-react';
import HeroSection from './components/HeroSection';
import { Card, CardContent } from '../ui';

const testimonials = [
  {
    name: 'Usuario 1',
    text: 'Excelente plataforma para aprender Kamëntsá. ¡Muy recomendada!',
  },
  {
    name: 'Usuario 2',
    text: 'Me encanta la interfaz y la facilidad de uso. ¡Sigan así!',
  },
  {
    name: 'Usuario 3',
    text: 'Los recursos interactivos son muy útiles para el aprendizaje. ¡Gracias!',
  },
];

const featuredLessons = [
  {
    title: 'Saludos en Kamëntsá',
    description: 'Aprende a saludar en Kamëntsá de manera correcta.',
  },
  {
    title: 'Números en Kamëntsá',
    description: 'Conoce los números básicos en la lengua Kamëntsá.',
  },
  {
    title: 'Colores en Kamëntsá',
    description: 'Descubre los colores en Kamëntsá y su pronunciación.',
  },
];

const heroCards = [
  {
    title: 'Transforma la educación',
    description:
      'Descubre una plataforma innovadora para enseñar la lengua Kamëntsá de manera divertida y efectiva.',
    buttons: [
      { label: 'Comienza ahora', variant: 'default' },
      { label: 'Más información', variant: 'secondary' },
    ],
  },
  {
    title: 'Potencia tu enseñanza',
    description:
      'Facilitamos el aprendizaje con recursos interactivos. Accede a estadísticas y reportes detallados.',
  },
  {
    title: 'Cómo funciona',
    description:
      'Una guía sencilla para comenzar. Crea y organiza lecciones fácilmente. Diseña actividades que fomenten la participación. Estructura el contenido de manera efectiva. Monitorea el rendimiento de tus estudiantes.',
  },
  {
    title: 'Actividades Recomendadas',
    description:
      'Descubre nuevas actividades para aprender la lengua Kamëntsá. Aprende a saludar en Kamëntsá. Aprende los números en Kamëntsá. Aprende los colores en Kamëntsá.',
  },
  {
    title: 'Últimas Lecciones',
    description:
      'Descubre las últimas lecciones creadas por nuestros docentes. Aprende los nombres de los animales en Kamëntsá. Aprende los nombres de la comida en Kamëntsá. Aprende los nombres de los miembros de la familia en Kamëntsá.',
  },
  {
    title: 'Evaluaciones Efectivas',
    description:
      'Recibe retroalimentación instantánea. Motiva a tus estudiantes con recompensas. Interfaz intuitiva y culturalmente relevante. Diseñado para todos los usuarios.',
  },
  {
    title: 'Nuestra misión es empoderar a los docentes',
    description: 'Facilitamos el aprendizaje de la lengua Kamëntsá.',
  },
];

const HomePage = () => {
  return (
    <div className="container mx-auto py-8">
      <HeroSection
        title={heroCards[0].title}
        description={heroCards[0].description}
        buttons={heroCards[0].buttons.map(button => ({
          ...button,
          variant: button.variant as "default" | "secondary" | "link" | "destructive" | "outline" | "ghost"
        }))}
        imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Ni%C3%B1os_Kamentsa.JPG/1280px-Ni%C3%B1os_Kamentsa.JPG"
        imageAlt="Niños Kamentsa"
      />

      {/* Features Section */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Card: Lecciones Interactivas */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center">
              <Book className="h-8 w-8 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Lecciones Interactivas</h3>
              <p className="text-gray-700 text-center">
                Descubre la riqueza de la cultura Kamëntsá a través de lecciones interactivas y
                atractivas.
              </p>
            </CardContent>
          </Card>

          {/* Gamification */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center">
              <Gamepad2 className="h-8 w-8 mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Gamificación</h3>
              <p className="text-gray-700 text-center">
                Gana puntos y recompensas mientras avanzas en tu aprendizaje.
              </p>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center">
              <Activity className="h-8 w-8 mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">Seguimiento de Progreso</h3>
              <p className="text-gray-700 text-center">
                Visualiza tu progreso y mantente motivado para alcanzar tus metas.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Lessons Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-4">Lecciones Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredLessons.map((lesson, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="flex flex-col h-full">
                <img
                  src="https://artesaniasdecolombia.com.co/PortalAC/images/artesanias/galeria/principal/etnias/kamentsa/Kamentsa_01.jpg"
                  alt={lesson.title}
                  className="rounded-md mb-2 h-32 w-full object-cover"
                  aria-label={lesson.title}
                />
                <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                <p className="text-gray-600">{lesson.description}</p>
                <Button className="mt-auto">Ver lección</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-4">Testimonios</h2>
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center">
                    <p className="text-center">{testimonial.text}</p>
                    <p className="text-sm text-gray-500 text-center">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Contact Section */}
      <section className="py-8 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-4">¿Tienes preguntas?</h2>
        <p className="text-center text-gray-700 mb-4">
          ¡Contáctanos en <a href="mailto:info@tabanok.com" className="text-blue-500">info@tabanok.com</a>!
        </p>
        <div className="max-w-md mx-auto text-center">
          <Button variant="default" asChild>
            <a href="mailto:info@tabanok.com">Contáctanos por correo</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-1 text-gray-500 text-sm">
        <p>© 2025 Tabanok</p>
      </footer>
    </div>
  );
};

export default HomePage;
