export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">About SuperGIT Facts</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A journey of innovation, quality, and customer-centric solutions in healthcare technology.
          </p>
        </div>
        <div className="relative w-full max-w-4xl mx-auto">
          <svg viewBox="0 0 800 300" className="w-full">
            <path
              d="M 50 150 C 150 50, 250 50, 350 150 S 550 250, 650 150"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              className="draw-on-scroll"
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4 md:px-10">
            <div className="text-center p-2 rounded-lg bg-background/80">
              <h3 className="font-bold text-lg md:text-xl">20+</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Years of Experience</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-background/80 -translate-y-12 md:-translate-y-20">
              <h3 className="font-bold text-lg md:text-xl">100+</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-background/80">
              <h3 className="font-bold text-lg md:text-xl">5+</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Countries Served</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-background/80 translate-y-12 md:translate-y-20">
              <h3 className="font-bold text-lg md:text-xl">50+</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Team Members</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-background/80">
              <h3 className="font-bold text-lg md:text-xl">99%</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
