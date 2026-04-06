"use client";

import { type FormEvent, useState, useTransition } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Clock3,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { explainTerm } from "@/app/actions";
import { MarqueeBand } from "@/components/MarqueeBand";
import { VelocityImage } from "@/components/VelocityImage";
import { HeroSection } from "@/components/sections/HeroSection";
import { StackedCards } from "@/components/sections/StackedCards";
import { SplitHeading } from "@/hooks/useSplitReveal";

const presetTerms = ["NPHIES", "EMR", "CDSS", "HIS"];

function makeEditorialImage(
  title: string,
  accent: string,
  secondary: string,
  label: string
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFF8ED" />
          <stop offset="55%" stop-color="#F0DCC0" />
          <stop offset="100%" stop-color="#18120D" />
        </linearGradient>
        <radialGradient id="orb" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(235 260) rotate(34) scale(320)">
          <stop stop-color="${accent}" stop-opacity="0.82" />
          <stop offset="1" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" />
      <rect x="60" y="60" width="1080" height="780" rx="48" stroke="rgba(255,255,255,0.22)" stroke-width="2" />
      <circle cx="245" cy="250" r="260" fill="url(#orb)" />
      <circle cx="965" cy="180" r="120" fill="${secondary}" fill-opacity="0.18" />
      <path d="M120 620C250 520 360 490 480 520C620 555 690 710 840 700C930 694 1000 660 1080 560" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
      <path d="M140 696C248 604 372 564 520 594C664 621 774 770 996 730" stroke="rgba(255,255,255,0.32)" stroke-width="2" stroke-dasharray="12 12" />
      <rect x="700" y="358" width="300" height="220" rx="32" fill="rgba(24,18,13,0.9)" />
      <rect x="730" y="392" width="120" height="10" rx="5" fill="${accent}" />
      <rect x="730" y="438" width="210" height="12" rx="6" fill="rgba(255,255,255,0.18)" />
      <rect x="730" y="470" width="170" height="12" rx="6" fill="rgba(255,255,255,0.14)" />
      <rect x="730" y="502" width="220" height="12" rx="6" fill="rgba(255,255,255,0.14)" />
      <text x="120" y="170" fill="#17120D" font-size="82" font-family="Arial, sans-serif" font-weight="700">${title}</text>
      <text x="122" y="226" fill="rgba(23,18,13,0.62)" font-size="24" font-family="Arial, sans-serif" letter-spacing="7">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const operationsImage = makeEditorialImage(
  "Operations",
  "#FF9900",
  "#FFD79B",
  "CAREFLOW ATLAS"
);

const claimsImage = makeEditorialImage(
  "Claims",
  "#F28B20",
  "#FFB861",
  "REVENUE SIGNAL"
);

const insightImage = makeEditorialImage(
  "Clinical",
  "#FFB347",
  "#FFE5B5",
  "GUIDANCE ENGINE"
);

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-[#8c6f57]">
      <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
      {children}
    </p>
  );
}

export default function Home() {
  const [term, setTerm] = useState("NPHIES");
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleExplain = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      setError(null);
      setExplanation(null);

      const response = await explainTerm({ term });

      if (response.error) {
        setError(response.error);
        return;
      }

      setExplanation(response.explanation ?? "No explanation returned.");
    });
  };

  return (
    <main className="relative z-10 text-[#16110b]">
      <div className="fixed inset-x-0 top-5 z-40 px-4 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/10 bg-[rgba(255,251,246,0.72)] px-4 py-3 shadow-[0_20px_50px_rgba(17,12,8,0.08)] backdrop-blur-xl md:px-6">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16110b] text-[#ffb44a]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-headline text-sm font-semibold uppercase tracking-[0.22em]">
                SuperGIT
              </p>
              <p className="text-[0.64rem] uppercase tracking-[0.3em] text-[#8c6f57]">
                Editorial Motion
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#5b483a] lg:flex">
            <a href="#story">Story</a>
            <a href="#products">Products</a>
            <a href="#explainer">Explainer</a>
            <a href="#contact">Contact</a>
          </nav>

          <a
            href="#contact"
            data-magnetic
            className="inline-flex items-center gap-2 rounded-full bg-[#16110b] px-4 py-2 text-sm font-semibold text-[#fff8ee] transition-transform hover:-translate-y-0.5"
          >
            Request demo
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div id="top" />
      <HeroSection />
      <MarqueeBand />
      <StackedCards />

      <section
        id="story"
        className="relative px-6 py-28 md:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-8" data-speed="0.9">
            <SectionLabel>Editorial system story</SectionLabel>
            <SplitHeading className="font-headline text-4xl font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-[#18120d] md:text-6xl">
              Built to feel deliberate, not decorative.
            </SplitHeading>
            <p className="max-w-xl text-lg leading-8 text-[#5b483a] md:text-xl">
              The ambition here is not “more animation.” It is weighted motion,
              layered depth, and scroll choreography that feels authored. Like
              turning the page of a hardcover object, every section should land
              with intent.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "Smooth scroll inertia that softens the entire page.",
                "Ambient background systems that breathe under content.",
                "Pinned sequences that sell product hierarchy with gravity.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-black/10 bg-[rgba(255,252,247,0.72)] p-5 text-sm leading-7 text-[#3b2c22] shadow-[0_24px_60px_rgba(17,12,8,0.08)] backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <VelocityImage
              src={operationsImage}
              alt="Editorial illustration of healthcare operations"
              className="aspect-[4/3]"
            />
            <div
              className="absolute -bottom-8 right-4 max-w-sm rounded-[1.8rem] border border-black/10 bg-[rgba(24,18,13,0.9)] p-6 text-[#fff6e9] shadow-[0_35px_100px_rgba(17,12,8,0.24)]"
              data-speed="1.08"
              data-lag="0.18"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#ffcb79]">
                Hardcover pacing
              </p>
              <p className="mt-4 text-sm leading-7 text-[#ecd9bc]">
                Cream surfaces, amber accents, and charcoal overlays keep the
                page luxurious instead of default SaaS-clean.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <VelocityImage
              src={claimsImage}
              alt="Editorial claims and finance illustration"
              className="aspect-[4/3]"
            />
          </div>

          <div className="order-1 space-y-8 lg:order-2" data-speed="0.92">
            <SectionLabel>Single line of sight</SectionLabel>
            <SplitHeading className="font-headline text-4xl font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-[#18120d] md:text-6xl">
              Claims, finance, and clinical context stay visually connected.
            </SplitHeading>
            <p className="max-w-xl text-lg leading-8 text-[#5b483a] md:text-xl">
              Instead of dumping everything into one repetitive grid, the page
              uses long-form visual sequencing. Motion doesn’t decorate the
              message, it carries hierarchy, mood, and trust.
            </p>
            <div className="grid gap-4">
              {[
                {
                  icon: Workflow,
                  title: "Flow before features",
                  body: "Sections are assembled to create momentum, not just describe capabilities.",
                },
                {
                  icon: ShieldCheck,
                  title: "Trust through restraint",
                  body: "The palette stays warm and expensive while the motion remains confident and measured.",
                },
                {
                  icon: BrainCircuit,
                  title: "Signal-rich detail",
                  body: "Small overlays, velocity shifts, and magnetic interactions make the experience feel alive.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[1.6rem] border border-black/10 bg-[rgba(255,252,247,0.72)] p-5 shadow-[0_24px_60px_rgba(17,12,8,0.08)] backdrop-blur"
                  >
                    <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                    <p className="mt-4 font-headline text-2xl font-semibold uppercase tracking-[-0.03em] text-[#18120d]">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#564438]">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2.4rem] border border-black/10 bg-[#16110b] px-8 py-10 text-[#fff6e8] shadow-[0_42px_120px_rgba(17,12,8,0.24)] md:px-12 md:py-14">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-8">
              <SectionLabel>Clinical intelligence</SectionLabel>
              <SplitHeading className="font-headline text-4xl font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-[#fff8ef] md:text-6xl">
                Dark contrast. Warm highlights. Premium rhythm.
              </SplitHeading>
              <p className="max-w-xl text-lg leading-8 text-[#ecd9bc]">
                This darker chapter gives the experience a tonal weight shift,
                the way a luxury editorial piece changes paper stock or ink
                density mid-story.
              </p>
            </div>
            <div className="relative">
              <VelocityImage
                src={insightImage}
                alt="Editorial clinical intelligence illustration"
                className="aspect-[16/10]"
              />
              <div
                className="absolute left-4 top-4 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-[#ffca75]"
                data-speed="1.1"
              >
                data-lag / 0.18
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="explainer"
        className="relative px-6 py-28 md:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-8" data-speed="0.9">
            <SectionLabel>AI healthcare term explainer</SectionLabel>
            <SplitHeading className="font-headline text-4xl font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-[#18120d] md:text-6xl">
              Teach the language without breaking the mood.
            </SplitHeading>
            <p className="max-w-xl text-lg leading-8 text-[#5b483a] md:text-xl">
              The tool remains useful, but now it belongs to the page. The form
              is staged as another premium chapter instead of a generic widget
              dropped into the middle of the story.
            </p>

            <div className="flex flex-wrap gap-3">
              {presetTerms.map((item) => (
                <button
                  key={item}
                  type="button"
                  data-magnetic
                  onClick={() => setTerm(item)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                    term === item
                      ? "border-[#16110b] bg-[#16110b] text-[#fff7eb]"
                      : "border-black/10 bg-[rgba(255,252,247,0.72)] text-[#18120d] hover:border-[hsl(var(--primary))]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-black/10 bg-[rgba(255,252,247,0.78)] p-6 shadow-[0_28px_80px_rgba(17,12,8,0.1)] backdrop-blur sm:p-8">
            <form onSubmit={handleExplain} className="space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="term"
                  className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8c6f57]"
                >
                  Healthcare term
                </label>
                <input
                  id="term"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Type NPHIES, EMR, CDSS, or HIS"
                  className="w-full rounded-[1.5rem] border border-black/10 bg-white/80 px-5 py-4 text-base text-[#18120d] outline-none transition-colors placeholder:text-[#9e866f] focus:border-[hsl(var(--primary))]"
                />
              </div>

              <button
                type="submit"
                data-magnetic
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-full bg-[#16110b] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff7eb] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
              >
                {isPending ? "Explaining..." : "Explain term"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {error ? (
              <div className="mt-6 rounded-[1.6rem] border border-[#f28b20]/30 bg-[#fff2dd] p-5 text-sm leading-7 text-[#6d4523]">
                {error}
              </div>
            ) : null}

            {explanation ? (
              <div className="mt-6 rounded-[1.8rem] border border-black/10 bg-[#16110b] p-6 text-[#fff7eb]">
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#ffcb79]">
                  Plain-language explanation
                </p>
                <p className="mt-4 text-base leading-8 text-[#ecd9bc]">
                  {explanation}
                </p>
              </div>
            ) : (
              <div className="mt-6 rounded-[1.8rem] border border-dashed border-black/10 p-6 text-sm leading-7 text-[#6a5647]">
                Ask for a term and the response appears here as a clean editorial
                callout instead of a default app panel.
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative px-6 pb-28 pt-10 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-black/10 bg-[rgba(255,252,247,0.74)] p-8 shadow-[0_34px_100px_rgba(17,12,8,0.12)] backdrop-blur md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div className="space-y-8">
              <SectionLabel>Closing chapter</SectionLabel>
              <SplitHeading className="font-headline text-4xl font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-[#18120d] md:text-6xl">
                Ready to make the whole site feel this expensive?
              </SplitHeading>
              <p className="max-w-2xl text-lg leading-8 text-[#5b483a] md:text-xl">
                The homepage now has the right ingredients for a serious
                award-site feel: smoother physics, cursor treatment, layered
                ambient depth, and scroll scenes with actual dramatic weight.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: PhoneCall, label: "Phone", value: "+966 12 345 6789" },
                { icon: Mail, label: "Email", value: "info@supergit.com" },
                { icon: MapPin, label: "Address", value: "Hira Street, Jeddah, KSA" },
                { icon: Clock3, label: "Hours", value: "Sun - Thu / 9:00 AM - 6:00 PM" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-[1.6rem] border border-black/10 bg-white/72 p-5 shadow-[0_20px_60px_rgba(17,12,8,0.08)]"
                  >
                    <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                    <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8c6f57]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-medium text-[#18120d]">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
