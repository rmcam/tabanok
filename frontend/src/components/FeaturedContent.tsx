import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

const FeaturedContent: React.FC = () => {
  const featuredContentData = [
    { id: 1, title: 'Artículo 1', description: 'Descripción del artículo 1' },
    { id: 2, title: 'Artículo 2', description: 'Descripción del artículo 2' },
    { id: 3, title: 'Artículo 3', description: 'Descripción del artículo 3' },
  ];

  return (
    <div>
      <h2>Contenido Destacado</h2>
      <Carousel>
        <CarouselContent>
          {featuredContentData.map((item) => (
            <CarouselItem key={item.id}>
              <div className="p-1">
                <div className="flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-md border">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeaturedContent;
