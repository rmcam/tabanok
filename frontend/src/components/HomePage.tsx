import { Activity, Book, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Usuario 1",
    text: "Excelente plataforma para aprender Kamëntsá. ¡Muy recomendada!",
  },
  {
    name: "Usuario 2",
    text: "Me encanta la interfaz y la facilidad de uso. ¡Sigan así!",
  },
  {
    name: "Usuario 3",
    text: "Los recursos interactivos son muy útiles para el aprendizaje. ¡Gracias!",
  },
];

const featuredLessons = [
  {
    title: "Saludos en Kamëntsá",
    description: "Aprende a saludar en Kamëntsá de manera correcta.",
  },
  {
    title: "Números en Kamëntsá",
    description: "Conoce los números básicos en la lengua Kamëntsá.",
  },
  {
    title: "Colores en Kamëntsá",
    description: "Descubre los colores en Kamëntsá y su pronunciación.",
  },
];

const heroCards = [
  {
    title: "Transforma la educación",
    description: "Descubre una plataforma innovadora para enseñar la lengua Kamëntsá de manera divertida y efectiva.",
    buttons: [
      { label: "Comienza ahora", variant: "default" },
      { label: "Más información", variant: "secondary" },
    ],
  },
  {
    title: "Potencia tu enseñanza",
    description: "Facilitamos el aprendizaje con recursos interactivos. Accede a estadísticas y reportes detallados.",
  },
  {
    title: "Cómo funciona",
    description: "Una guía sencilla para comenzar. Crea y organiza lecciones fácilmente. Diseña actividades que fomenten la participación. Estructura el contenido de manera efectiva. Monitorea el rendimiento de tus estudiantes.",
  },
  {
    title: "Actividades Recomendadas",
    description: "Descubre nuevas actividades para aprender la lengua Kamëntsá. Aprende a saludar en Kamëntsá. Aprende los números en Kamëntsá. Aprende los colores en Kamëntsá.",
  },
  {
    title: "Últimas Lecciones",
    description: "Descubre las últimas lecciones creadas por nuestros docentes. Aprende los nombres de los animales en Kamëntsá. Aprende los nombres de la comida en Kamëntsá. Aprende los nombres de los miembros de la familia en Kamëntsá.",
  },
  {
    title: "Evaluaciones Efectivas",
    description: "Recibe retroalimentación instantánea. Motiva a tus estudiantes con recompensas. Interfaz intuitiva y culturalmente relevante. Diseñado para todos los usuarios.",
  },
  {
    title: "Nuestra misión es empoderar a los docentes",
    description: "Facilitamos el aprendizaje de la lengua Kamëntsá.",
  },
];

const HomePage = () => {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-12">
        <div className="hero-content text-center md:text-left">
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {heroCards.map((card, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent>
                      <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                      <p>{card.description}</p>
                      {card.buttons && (
                        <div className="space-x-4 mt-4">
                          {card.buttons.map((button, buttonIndex) => (
                            <Button key={buttonIndex} variant={button.variant as "default" | "secondary" | "link" | "destructive" | "outline" | "ghost"}>
                              {button.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="hero-image">
          <img src="/kamentsa.jpg" alt="Cultura Kamëntsá" className="rounded-xl shadow-md" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Card: Lecciones Interactivas */}
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Book className="h-6 w-6 mb-2" />
              <h3 className="text-xl font-semibold mb-2">Lecciones Interactivas</h3>
              <p className="text-gray-600 text-center">
                Aprende sobre la cultura Kamëntsá a través de lecciones
                interactivas y divertidas.
              </p>
            </CardContent>
          </Card>

          {/* Feature Card: Gamificación */}
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Gamepad2 className="h-6 w-6 mb-2" />
              <h3 className="text-xl font-semibold mb-2">Gamificación</h3>
              <p className="text-gray-600 text-center">
                Gana puntos y recompensas mientras avanzas en tu aprendizaje.
              </p>
            </CardContent>
          </Card>

          {/* Feature Card: Seguimiento de Progreso */}
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Activity className="h-6 w-6 mb-2" />
              <h3 className="text-xl font-semibold mb-2">
                Seguimiento de Progreso
              </h3>
              <p className="text-gray-600 text-center">
                Visualiza tu progreso y mantente motivado para alcanzar tus
                metas.
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
                  <CardContent className="p-4">
                    <p className="text-center">{testimonial.text}</p>
                    <p className="text-sm text-gray-500 text-center">
                      - {testimonial.name}
                    </p>
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
        <h2 className="text-2xl font-bold text-center mb-4">Contacto</h2>
        <p className="text-center text-gray-700 mb-4">
          ¿Tienes preguntas? ¡Contáctanos en <a href="mailto:info@tabanok.com" className="text-blue-500">info@tabanok.com</a>!
        </p>
        <form className="max-w-md mx-auto flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="p-2 border rounded"
          />
          <textarea placeholder="Mensaje" className="p-2 border rounded h-32" />
          <Button>Enviar</Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-800 text-white">
        <p>© 2025 Tabanok</p>
      </footer>
    </div>
  );
};

export default HomePage;
