"use client";

import { Stethoscope } from "lucide-react";
import Link from "next/link";

export function Header() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="font-bold">
              SuperGIT Motion
            </span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <button onClick={() => scrollTo('products')} className="transition-colors hover:text-primary">Products</button>
          <button onClick={() => scrollTo('about')} className="transition-colors hover:text-primary">About</button>
          <button onClick={() => scrollTo('explainer')} className="transition-colors hover:text-primary">AI Explainer</button>
          <button onClick={() => scrollTo('contact')} className="transition-colors hover:text-primary">Contact</button>
        </nav>
      </div>
    </header>
  );
}
