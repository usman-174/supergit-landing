"use client";

import { Button } from "@/components/ui/button";

const KineticTitle = ({ text }: { text: string }) => {
  return (
    <h1 className="kinetic-title text-4xl font-extrabold tracking-tight lg:text-7xl">
      {text.split(" ").map((word, index) => (
        <span key={index} className="word">
          <span className="word-inner" style={{ animationDelay: `${index * 0.1}s` }}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </h1>
  );
};

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="w-full py-24 md:py-32 lg:py-48 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <KineticTitle text="Healthcare Technology Reimagined with Motion" />
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover our innovative solutions through a dynamic, interactive, and visually stunning journey.
            </p>
          </div>
          <div className="space-x-4">
            <Button onClick={() => scrollTo('products')}>Explore Products</Button>
            <Button variant="outline" onClick={() => scrollTo('contact')}>Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
