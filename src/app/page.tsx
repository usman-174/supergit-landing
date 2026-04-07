"use client";

import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Cpu,
  Gauge,
  HeartPulse,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Workflow,
} from "lucide-react";

import { explainTerm } from "@/app/actions";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const presetTerms = ["NPHIES", "EMR", "CDSS", "HIS"];
const heroPulseHeights = [52, 84, 66, 108, 72, 118, 90];

const signalLoops = [
  "Doctor command",
  "AI lab routing",
  "Radiology desk",
  "Claims sync",
  "Care-team telemetry",
  "Command center",
  "Decision engine",
  "Live hospital mesh",
];

const heroMiniCards = [
  {
    title: "Doctor board",
    value: "184 live",
    body: "Consultants, theatre slots, and ward rounds synced in one control layer.",
    position:
      "-left-3 top-10 hidden w-60 rounded-[1.5rem] md:block xl:-left-10 xl:top-14",
  },
  {
    title: "AI lab",
    value: "612 runs",
    body: "Inference batches, triage confidence, and escalation queues stay visible.",
    position:
      "right-0 top-0 hidden w-56 rounded-[1.5rem] sm:block lg:-right-8 xl:-right-10",
  },
  {
    title: "Radiology",
    value: "06 min TAT",
    body: "Urgent reads surface early while non-critical studies remain paced and traceable.",
    position:
      "bottom-0 left-8 hidden w-64 rounded-[1.5rem] sm:block lg:-bottom-6 xl:left-12",
  },
];

type CounterMetric = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  note: string;
};

const commandMetrics: CounterMetric[] = [
  {
    label: "Doctors connected",
    value: 248,
    suffix: "+",
    note: "live staff coverage across clinics, wards, and procedure rooms",
  },
  {
    label: "AI lab confidence",
    value: 98.4,
    suffix: "%",
    decimals: 1,
    note: "model-assisted checks with real-time exception review",
  },
  {
    label: "Radiology turnaround",
    value: 6,
    suffix: "m",
    note: "average urgent imaging response inside the command layer",
  },
  {
    label: "Claims cleared",
    value: 1240,
    suffix: "+",
    note: "submission and payer sync events processed per shift",
  },
];

type ModuleCard = {
  icon: typeof Activity;
  eyebrow: string;
  title: string;
  body: string;
  statValue: number;
  statSuffix?: string;
  statDecimals?: number;
  statLabel: string;
  tracks: string[];
};

const moduleCards: ModuleCard[] = [
  {
    icon: Stethoscope,
    eyebrow: "Doctor cockpit",
    title: "Give clinicians one calm surface for rounds, consults, and discharge pressure.",
    body: "A dense but legible command view for doctors that balances appointments, inpatient flow, escalations, and follow-up actions without dropping context.",
    statValue: 93,
    statSuffix: "%",
    statLabel: "round completion",
    tracks: ["Ward coverage", "Consult queue", "Discharge readiness"],
  },
  {
    icon: BrainCircuit,
    eyebrow: "AI lab orchestration",
    title: "Make AI work look supervised, measurable, and production-ready.",
    body: "Inference volume, confidence drift, approval gates, and model queue health sit side by side so the AI lab reads like an operational unit, not a black box.",
    statValue: 612,
    statSuffix: "+",
    statLabel: "daily inference runs",
    tracks: ["Queue health", "Confidence watch", "Escalation routing"],
  },
  {
    icon: Activity,
    eyebrow: "Radiology desk",
    title: "Surface imaging demand with throughput, urgency, and team workload in view.",
    body: "Radiology panels combine queue depth, first-read timers, modality mix, and exception alerts so high-pressure imaging work never feels hidden.",
    statValue: 7,
    statSuffix: "m",
    statLabel: "first-read target",
    tracks: ["Urgent studies", "MRI / CT balance", "Result release cadence"],
  },
  {
    icon: ShieldCheck,
    eyebrow: "Claims command",
    title: "Connect finance and clinical events without leaving the dashboard language.",
    body: "Claims status, denial risk, NPHIES handoffs, and payer latency are presented in the same visual system as care operations, so trust carries across the page.",
    statValue: 99.2,
    statSuffix: "%",
    statDecimals: 1,
    statLabel: "clean submission rate",
    tracks: ["Eligibility sync", "Denial prevention", "Payer response watch"],
  },
];

const workflowRows = [
  {
    title: "Doctors",
    detail: "184 clinicians online",
    bullets: [
      "Critical consults promoted into the first decision lane",
      "Rounds sequenced by discharge confidence and room readiness",
      "Procedure blocks balanced against staffing gaps in real time",
    ],
  },
  {
    title: "AI lab",
    detail: "32 active queues",
    bullets: [
      "Models flagged when confidence slips beyond target range",
      "Inference batches routed toward human approval when needed",
      "Escalations land in the same screen as clinical operations",
    ],
  },
  {
    title: "Radiology",
    detail: "61 studies in motion",
    bullets: [
      "Urgent reads pinned ahead of routine backlog without visual noise",
      "Modalities grouped by wait-time pressure and specialist availability",
      "Results release stays tied to downstream care-team actions",
    ],
  },
  {
    title: "Finance + NPHIES",
    detail: "Payer sync stable",
    bullets: [
      "Clean claims score and exception volume stay visible to operators",
      "Revenue handoffs reflect actual clinical milestones",
      "Denial patterns become part of the same command narrative",
    ],
  },
];

const contactCards = [
  { icon: PhoneCall, label: "Phone", value: "+966 12 345 6789" },
  { icon: Mail, label: "Email", value: "info@supergit.com" },
  { icon: MapPin, label: "Address", value: "Hira Street, Jeddah, KSA" },
  { icon: Clock3, label: "Hours", value: "Sun - Thu / 9:00 AM - 6:00 PM" },
];

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function formatCount(value: number, decimals = 0) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#79a7c9]">
      <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
      {children}
    </p>
  );
}

function CountUp({
  value,
  suffix = "",
  decimals = 0,
  prefix = "",
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  prefix?: string;
}) {
  return (
    <span
      className="counter-value"
      data-count={value}
      data-decimals={decimals}
      data-suffix={suffix}
      data-prefix={prefix}
    >
      {`${prefix}${formatCount(0, decimals)}${suffix}`}
    </span>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const [term, setTerm] = useState("NPHIES");
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

      intro
        .from(".nav-shell", {
          y: -28,
          opacity: 0,
          duration: 0.9,
        })
        .from(
          ".hero-copy > *",
          {
            y: 42,
            opacity: 0,
            duration: 0.92,
            stagger: 0.08,
          },
          "-=0.52"
        )
        .from(
          ".hero-screen",
          {
            y: 44,
            opacity: 0,
            rotateX: 8,
            transformOrigin: "center bottom",
            duration: 1.1,
          },
          "-=0.7"
        )
        .from(
          ".hero-float-card",
          {
            y: 56,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
          },
          "-=0.74"
        );

      gsap.utils.toArray<HTMLElement>("[data-float-card]").forEach((card, index) => {
        const yOffset = 12 + index * 6;
        const xOffset = index % 2 === 0 ? 10 : -10;

        gsap.to(card, {
          y: index % 2 === 0 ? -yOffset : yOffset,
          x: xOffset,
          rotation: index % 2 === 0 ? 1.2 : -1.2,
          duration: 3.8 + index * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.to(".hero-screen", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-grid-backdrop", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.utils.toArray<HTMLElement>(".loop-track").forEach((track, index) => {
        const width = track.scrollWidth / 2;
        const reverse = track.dataset.direction === "reverse";

        gsap.fromTo(
          track,
          { x: reverse ? -width : 0 },
          {
            x: reverse ? 0 : -width,
            duration: 18 + index * 4,
            ease: "none",
            repeat: -1,
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".metric-bar-fill").forEach((bar, index) => {
        gsap.fromTo(
          bar,
          { scaleX: 0.18 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.6 + index * 0.18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".scan-sweep").forEach((sweep, index) => {
        gsap.fromTo(
          sweep,
          { xPercent: -120, opacity: 0.14 },
          {
            xPercent: 120,
            opacity: 0.48,
            duration: 4.4 + index,
            ease: "none",
            repeat: -1,
            repeatDelay: 1.1,
          }
        );
      });

      gsap.to(".orbit-ring", {
        rotate: 360,
        transformOrigin: "center center",
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      gsap.utils.toArray<HTMLElement>(".counter-value").forEach((counter) => {
        ScrollTrigger.create({
          trigger: counter,
          start: "top 82%",
          once: true,
          onEnter: () => {
            const total = Number(counter.dataset.count ?? 0);
            const decimals = Number(counter.dataset.decimals ?? 0);
            const suffix = counter.dataset.suffix ?? "";
            const prefix = counter.dataset.prefix ?? "";
            const state = { value: 0 };

            gsap.to(state, {
              value: total,
              duration: 1.8,
              ease: "power2.out",
              onUpdate() {
                counter.textContent = `${prefix}${formatCount(
                  state.value,
                  decimals
                )}${suffix}`;
              },
            });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-panel").forEach((panel, index) => {
        gsap.from(panel, {
          y: 42,
          opacity: 0,
          duration: 0.9,
          delay: index * 0.06,
          ease: "expo.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 82%",
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

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

  const dashboardTheme = {
    "--primary": "191 94% 62%",
    "--ring": "191 94% 62%",
  } as CSSProperties;

  const doubledSignals = [...signalLoops, ...signalLoops];

  return (
    <main
      ref={pageRef}
      style={dashboardTheme}
      className="relative min-h-screen overflow-hidden bg-[#04101a] text-[#ecf7ff]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,185,255,0.22),transparent_30%),radial-gradient(circle_at_82%_10%,rgba(45,211,191,0.18),transparent_26%),linear-gradient(180deg,#06131f_0%,#071a27_45%,#04101a_100%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(127,177,214,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(127,177,214,0.08)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:radial-gradient(circle_at_top,black,transparent_82%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,16,26,0.05)_0%,rgba(4,16,26,0)_18%,rgba(4,16,26,0.24)_100%)]" />

      <div className="fixed inset-x-0 top-4 z-40 px-4 md:px-6">
        <div className="nav-shell mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[rgba(5,18,29,0.74)] px-4 py-3 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl md:px-6">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--primary))]/18 text-[hsl(var(--primary))] shadow-[0_0_32px_rgba(78,203,255,0.22)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-headline text-sm font-semibold uppercase tracking-[0.22em] text-white">
                SuperGIT
              </p>
              <p className="text-[0.64rem] uppercase tracking-[0.3em] text-[#81a8c5]">
                Hospital Command Grid
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#a8bfd1] lg:flex">
            <a href="#overview" className="transition-colors hover:text-white">
              Overview
            </a>
            <a href="#systems" className="transition-colors hover:text-white">
              Systems
            </a>
            <a href="#consultation" className="transition-colors hover:text-white">
              Consultation
            </a>
            <a href="#explainer" className="transition-colors hover:text-white">
              Explainer
            </a>
            <a href="#contact" className="transition-colors hover:text-white">
              Contact
            </a>
          </nav>

          <a
            href="#consultation"
            data-magnetic
            className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/14 px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Book a walkthrough
            <ArrowUpRight className="h-4 w-4 text-[hsl(var(--primary))]" />
          </a>
        </div>
      </div>

      <div id="top" />

      <section
        id="overview"
        className="hero-section relative px-4 pb-20 pt-32 md:px-8 md:pb-24 lg:px-12 xl:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="hero-copy relative z-10 space-y-6">
            <SectionLabel>Intelligent hospital operations</SectionLabel>

            <h1 className="max-w-4xl font-headline text-[clamp(3.2rem,7.8vw,7.3rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-white">
              A living system dashboard for doctors, AI lab, and radiology.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-[#9bb4c7] md:text-xl">
              The homepage should feel like a premium command center, not a static
              landing page. We combine deep telemetry, animated data surfaces, and
              cinematic motion so every module looks active, supervised, and ready
              for high-pressure healthcare operations.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Live care-team telemetry",
                "AI lab oversight",
                "Radiology queue control",
                "Claims and NPHIES sync",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#c2d8e7]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#systems"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#04101a] transition-transform duration-300 hover:-translate-y-1"
              >
                Explore systems
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#explainer"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-1"
              >
                Open AI explainer
                <ArrowUpRight className="h-4 w-4 text-[hsl(var(--primary))]" />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "14 specialties",
                  body: "One visual rhythm for outpatient, inpatient, and theatre operations.",
                },
                {
                  title: "Decision-safe AI",
                  body: "Machine outputs always sit beside human approval and escalation lanes.",
                },
                {
                  title: "Screen-first clarity",
                  body: "Dense information without the clutter and dead SaaS spacing.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/10 bg-[rgba(8,23,35,0.74)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(var(--primary))]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#8ea6bb]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[32rem] lg:min-h-[42rem]">
            <div className="hero-screen relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[rgba(7,23,35,0.9)] p-6 shadow-[0_45px_120px_rgba(0,0,0,0.34)] md:p-7">
              <div className="hero-grid-backdrop absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(100,221,255,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_100%)]" />
              <div className="scan-sweep absolute inset-y-0 left-[-18%] w-[36%] bg-[linear-gradient(90deg,transparent,rgba(104,223,255,0.18),transparent)] blur-2xl" />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[hsl(var(--primary))]">
                      Hospital command grid
                    </p>
                    <p className="mt-3 font-headline text-3xl font-semibold uppercase leading-none text-white md:text-4xl">
                      Multi-screen orchestration layer
                    </p>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#b7d0e0]">
                    <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
                    Syncing live
                  </div>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
                  <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(5,18,29,0.78)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#87b8d8]">
                          Admissions pulse
                        </p>
                        <p className="mt-3 text-3xl font-semibold text-white">
                          84% staff aligned
                        </p>
                      </div>
                      <div className="rounded-2xl border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/10 p-3 text-[hsl(var(--primary))]">
                        <Gauge className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-6 grid h-40 grid-cols-7 items-end gap-3">
                      {heroPulseHeights.map((height, index) => (
                        <div
                          key={`${height}-${index}`}
                          className="relative h-full overflow-hidden rounded-full bg-white/5"
                        >
                          <div
                            className="pulse-bar absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-[#34d399] via-[hsl(var(--primary))] to-[#9be7ff]"
                            style={{ height }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        {
                          label: "Doctor capacity",
                          value: "92%",
                          tone: "Schedules stable and balanced against escalation risk.",
                        },
                        {
                          label: "AI triage",
                          value: "31 queues",
                          tone: "Inference lanes supervised with approval checkpoints.",
                        },
                        {
                          label: "Radiology ready",
                          value: "67 studies",
                          tone: "Urgent reads stay highlighted without overwhelming the screen.",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4"
                        >
                          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#8cb1cb]">
                            {item.label}
                          </p>
                          <p className="mt-3 text-xl font-semibold text-white">
                            {item.value}
                          </p>
                          <p className="mt-3 text-xs leading-6 text-[#7d9ab1]">
                            {item.tone}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {[
                      {
                        icon: HeartPulse,
                        title: "Doctor sync",
                        value: "27 critical consults",
                        body: "Rounds, consults, and specialist escalation stay pinned to staffing reality.",
                      },
                      {
                        icon: Cpu,
                        title: "AI lab confidence",
                        value: "98.4% verified",
                        body: "Model outputs remain fast, monitored, and routed back into clinician review.",
                      },
                      {
                        icon: Workflow,
                        title: "Radiology throughput",
                        value: "06 min first read",
                        body: "Urgent studies and backlog movement appear as active lanes, not static numbers.",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="rounded-[1.55rem] border border-white/10 bg-[rgba(5,18,29,0.84)] p-5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#8eb4cf]">
                                {item.title}
                              </p>
                              <p className="mt-3 text-2xl font-semibold text-white">
                                {item.value}
                              </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-[hsl(var(--primary))]">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>
                          <p className="mt-4 text-sm leading-7 text-[#88a4b8]">
                            {item.body}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {heroMiniCards.map((card) => (
              <motion.div
                key={card.title}
                data-float-card
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`hero-float-card absolute border border-white/10 bg-[rgba(8,23,35,0.86)] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur ${card.position}`}
              >
                <p className="text-[0.66rem] uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                  {card.title}
                </p>
                <p className="mt-3 text-xl font-semibold text-white">{card.value}</p>
                <p className="mt-3 text-xs leading-6 text-[#86a5be]">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-8 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[rgba(7,23,35,0.74)] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.24)] backdrop-blur md:p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {commandMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                {...fadeUp}
                transition={{
                  ...fadeUp.transition,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="reveal-panel rounded-[1.55rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#8ab4d0]">
                  {metric.label}
                </p>
                <p className="mt-3 font-headline text-4xl font-semibold uppercase tracking-[-0.03em] text-white">
                  <CountUp
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                  />
                </p>
                <p className="mt-4 text-sm leading-7 text-[#88a2b7]">{metric.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="space-y-4 border-y border-white/10 bg-white/[0.02] py-5">
          <div className="overflow-hidden">
            <div className="loop-track flex w-max" data-direction="forward">
              {doubledSignals.map((item, index) => (
                <span
                  key={`${item}-forward-${index}`}
                  className="mx-4 rounded-full border border-white/10 bg-[rgba(9,28,42,0.8)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#d7ebf7]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="loop-track flex w-max" data-direction="reverse">
              {doubledSignals.map((item, index) => (
                <span
                  key={`${item}-reverse-${index}`}
                  className="mx-4 rounded-full border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="systems" className="relative px-4 py-24 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="max-w-3xl space-y-6">
            <SectionLabel>System modules</SectionLabel>
            <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-white md:text-6xl">
              Each surface should feel like an advanced hospital screen, not a
              marketing card.
            </h2>
            <p className="text-lg leading-8 text-[#97b0c3] md:text-xl">
              The visual language is darker, more operational, and more alive. We
              use motion to suggest constant supervision, while the cards stay calm
              enough to feel trustworthy in healthcare.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {moduleCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.eyebrow}
                  {...fadeUp}
                  transition={{
                    ...fadeUp.transition,
                    delay: index * 0.07,
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="reveal-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(7,23,35,0.82)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.24)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(92,226,255,0.08),transparent_35%)]" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-6">
                      <div className="space-y-4">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[hsl(var(--primary))]">
                          {card.eyebrow}
                        </p>
                        <h3 className="max-w-xl font-headline text-3xl font-semibold uppercase leading-[0.96] tracking-[-0.04em] text-white">
                          {card.title}
                        </h3>
                      </div>
                      <div className="rounded-[1.4rem] border border-[hsl(var(--primary))]/18 bg-[hsl(var(--primary))]/10 p-4 text-[hsl(var(--primary))]">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <p className="mt-5 text-base leading-8 text-[#8ca7bc]">
                      {card.body}
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-end">
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                        <p className="text-[0.66rem] uppercase tracking-[0.26em] text-[#88afcb]">
                          {card.statLabel}
                        </p>
                        <p className="mt-3 font-headline text-4xl font-semibold uppercase text-white">
                          <CountUp
                            value={card.statValue}
                            suffix={card.statSuffix}
                            decimals={card.statDecimals}
                          />
                        </p>
                      </div>

                      <div className="space-y-4">
                        {card.tracks.map((track) => (
                          <div key={track} className="rounded-[1.3rem] border border-white/10 bg-[#081c2c] p-4">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-medium text-[#d5e8f4]">
                                {track}
                              </span>
                              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-[hsl(var(--primary))]">
                                Live
                              </span>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                              <div className="metric-bar-fill h-full rounded-full bg-gradient-to-r from-[hsl(var(--primary))] via-[#2dd4bf] to-[#9be7ff]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-24 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.86fr_1.14fr]">
          <motion.div {...fadeUp} className="space-y-7">
            <SectionLabel>Command choreography</SectionLabel>
            <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-white md:text-6xl">
              The page should read like one connected operations mesh.
            </h2>
            <p className="text-lg leading-8 text-[#97b0c3] md:text-xl">
              Instead of isolated feature blocks, we stage doctors, AI lab,
              radiology, and claims as neighboring lanes inside a single system.
              That gives the interface more gravity and makes the motion feel
              purposeful.
            </p>

            <div className="grid gap-3">
              {[
                "Floating cards keep the hero active without feeling noisy.",
                "Counters wake up only when they enter view.",
                "Loop bands reinforce the multi-system environment.",
                "Panel motion stays smooth and controlled, like a live console.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-white/10 bg-[rgba(7,23,35,0.7)] px-5 py-4 text-sm leading-7 text-[#cfe4f1]"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="reveal-panel relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[rgba(7,23,35,0.84)] p-6 shadow-[0_36px_110px_rgba(0,0,0,0.28)]"
          >
            <div className="scan-sweep absolute inset-y-0 left-[-20%] w-[34%] bg-[linear-gradient(90deg,transparent,rgba(103,223,255,0.14),transparent)] blur-2xl" />
            <div className="orbit-ring absolute -right-10 -top-10 h-40 w-40 rounded-full border border-[hsl(var(--primary))]/18">
              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary))]" />
            </div>

            <div className="relative grid gap-4 lg:grid-cols-2">
              {workflowRows.map((row) => (
                <motion.div
                  key={row.title}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="rounded-[1.7rem] border border-white/10 bg-[#081b2a] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                        {row.title}
                      </p>
                      <p className="mt-3 text-xl font-semibold text-white">
                        {row.detail}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[0.64rem] uppercase tracking-[0.22em] text-[#b9d3e4]">
                      Active
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {row.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-[#8ea7ba]"
                      >
                        {bullet}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="explainer" className="relative px-4 py-24 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
          <motion.div {...fadeUp} className="space-y-7">
            <SectionLabel>AI clinical explainer</SectionLabel>
            <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-white md:text-6xl">
              Keep the explainer inside the dashboard language.
            </h2>
            <p className="text-lg leading-8 text-[#97b0c3] md:text-xl">
              The tool should still feel useful, but now it belongs to a live
              healthcare system view. It reads more like a clinical intelligence
              console than a standalone form.
            </p>

            <div className="flex flex-wrap gap-3">
              {presetTerms.map((item) => (
                <button
                  key={item}
                  type="button"
                  data-magnetic
                  onClick={() => setTerm(item)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-colors ${
                    term === item
                      ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/14 text-white"
                      : "border-white/10 bg-white/5 text-[#cde0ed] hover:border-[hsl(var(--primary))]/40"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(7,23,35,0.72)] p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                Decoder status
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#8cb3cf]">
                    Glossary depth
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    <CountUp value={420} suffix="+" />
                  </p>
                </div>
                <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#8cb3cf]">
                    Response clarity
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    <CountUp value={96} suffix="%" />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="reveal-panel rounded-[2.2rem] border border-white/10 bg-[rgba(7,23,35,0.84)] p-6 shadow-[0_34px_100px_rgba(0,0,0,0.28)] backdrop-blur sm:p-8"
          >
            <form onSubmit={handleExplain} className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[hsl(var(--primary))]">
                    Clinical intelligence decoder
                  </p>
                  <p className="mt-3 font-headline text-3xl font-semibold uppercase leading-none text-white">
                    Explain the term fast
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#b8d2e2]">
                  Live AI assist
                </div>
              </div>

              <label className="block">
                <span className="mb-3 block text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#8cb2cd]">
                  Healthcare term
                </span>
                <input
                  id="term"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Type NPHIES, EMR, CDSS, or HIS"
                  className="w-full rounded-[1.5rem] border border-white/10 bg-[#081b2a] px-5 py-4 text-base text-white outline-none transition-colors placeholder:text-[#63829d] focus:border-[hsl(var(--primary))] focus:shadow-[0_0_0_1px_hsl(var(--primary))]"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                <div className="text-sm leading-7 text-[#9bb5c8]">
                  Plain-language answers for teams working across clinical,
                  operational, and claims workflows.
                </div>
                <button
                  type="submit"
                  data-magnetic
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#04101a] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {isPending ? "Explaining..." : "Explain term"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            {error ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-[1.5rem] border border-[#fb7185]/20 bg-[#4c1020]/40 p-5 text-sm leading-7 text-[#fecdd3]"
              >
                {error}
              </motion.div>
            ) : null}

            {explanation ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-[1.8rem] border border-[hsl(var(--primary))]/18 bg-[#081b2a] p-6"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[hsl(var(--primary))]" />
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                    Plain-language explanation
                  </p>
                </div>
                <p className="mt-4 text-base leading-8 text-[#d7ebf7]">
                  {explanation}
                </p>
              </motion.div>
            ) : (
              <div className="mt-6 rounded-[1.8rem] border border-dashed border-white/10 p-6 text-sm leading-7 text-[#809ab0]">
                Ask for a term and the response appears here as a clinical command
                note instead of a generic app panel.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section id="consultation" className="relative px-4 py-24 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(7,23,35,0.94)_0%,rgba(9,29,43,0.9)_50%,rgba(11,48,64,0.9)_100%)] p-8 shadow-[0_38px_120px_rgba(0,0,0,0.3)] md:p-10">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <motion.div {...fadeUp} className="space-y-7">
              <SectionLabel>Consultation flow</SectionLabel>
              <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-white md:text-6xl">
                Bring the same command-center thinking into the actual product build.
              </h2>
              <p className="text-lg leading-8 text-[#a2bdd0] md:text-xl">
                We can turn this landing direction into a full product narrative:
                hospital operations, radiology, AI lab governance, claims, and the
                live system language that ties them together.
              </p>

              <div className="grid gap-3">
                {[
                  "Architecture workshop focused on your core system screens.",
                  "Motion rules that scale across real product modules.",
                  "A visual system that feels premium without losing medical trust.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.05] px-5 py-4 text-sm leading-7 text-[#d9edf8]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  data-magnetic
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#04101a] transition-transform hover:-translate-y-0.5"
                >
                  Start the conversation
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#overview"
                  data-magnetic
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5"
                >
                  Review the dashboard
                  <ArrowUpRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                </a>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: CalendarClock,
                  title: "48h kickoff",
                  body: "Fast discovery, screen audit, and initial direction for the command-center language.",
                },
                {
                  icon: BrainCircuit,
                  title: "AI-ready patterns",
                  body: "System cards and telemetry designed to support real inference and approval states.",
                },
                {
                  icon: Workflow,
                  title: "Flow mapping",
                  body: "Doctor, radiology, and claims lanes connected as one product story.",
                },
                {
                  icon: ShieldCheck,
                  title: "Trust-first polish",
                  body: "Motion, density, and hierarchy tuned for healthcare credibility.",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    {...fadeUp}
                    transition={{
                      ...fadeUp.transition,
                      delay: index * 0.06,
                    }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="rounded-[1.7rem] border border-white/10 bg-[rgba(5,18,29,0.84)] p-5"
                  >
                    <div className="rounded-[1.2rem] border border-[hsl(var(--primary))]/18 bg-[hsl(var(--primary))]/10 p-3 text-[hsl(var(--primary))]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-headline text-2xl font-semibold uppercase tracking-[-0.03em] text-white">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#94aec2]">
                      {item.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative px-4 pb-14 pt-8 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl rounded-[2.3rem] border border-white/10 bg-[rgba(7,23,35,0.78)] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.24)] backdrop-blur md:p-10">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
            <motion.div {...fadeUp} className="space-y-6">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-white md:text-6xl">
                Ready to make the whole site feel like a real hospital command screen?
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[#9bb4c7] md:text-xl">
                The new direction is darker, more alive, and more system-driven. It
                gives doctors, AI lab, radiology, and claims the kind of visual
                seriousness their screens deserve.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    {...fadeUp}
                    transition={{
                      ...fadeUp.transition,
                      delay: index * 0.05,
                    }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
                  >
                    <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                    <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#8db3cf]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-medium text-white">{item.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#88a6bc] md:flex-row md:items-center md:justify-between">
            <p>SuperGIT Hospital Command Grid. Built for doctors, AI lab, radiology, and claims.</p>
            <p>Motion by design: floating cards, counters, loop bands, and live telemetry.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
