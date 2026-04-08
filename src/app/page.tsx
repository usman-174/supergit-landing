"use client";

import {
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
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
  Moon,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sun,
  Workflow,
} from "lucide-react";

import { explainTerm } from "@/app/actions";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const presetTerms = ["NPHIES", "HIS", "CDSS", "ERP", "CCHI", "EMR"];
const heroPulseHeights = [52, 84, 66, 108, 72, 118, 90];

const signalLoops = [
  "HIS integration",
  "NPHIES Connect",
  "CDSS insights",
  "ERP operations",
  "Claims processing",
  "Patient management",
  "Clinical decisions",
  "Revenue cycle",
];

const heroMiniCards = [
  // {
  //   title: "Doctor board",
  //   value: "184 live",
  //   body: "Consultants, theatre slots, and ward rounds synced in one control layer.",
  //   position:
  //     "left-0 top-12 hidden w-64 rounded-[1.5rem] md:block xl:-left-4 xl:top-16",
  // },
  {
    title: "NPHIES Connect",
    value: "99.2% sync",
    body: "Claims processing and CCHI compliance running in real time.",
    position:
      "-right-16 top-0 hidden w-56 rounded-[1.5rem] sm:block lg:-right-24 xl:-right-32",
  },
  {
    title: "CDSS",
    value: "420+ rules",
    body: "AI-powered clinical recommendations reducing rejections and improving care.",
    position:
      "-bottom-12 -right-16 hidden w-64 rounded-[1.5rem] sm:block lg:-bottom-20 xl:-right-24",
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
    label: "Hospitals connected",
    value: 50,
    suffix: "+",
    note: "healthcare facilities powered by SuperGIT across Saudi Arabia",
  },
  {
    label: "CDSS accuracy",
    value: 98.4,
    suffix: "%",
    decimals: 1,
    note: "AI-powered clinical decision support with real-time evidence review",
  },
  {
    label: "Claims processed",
    value: 1240,
    suffix: "+",
    note: "NPHIES-compliant submissions and payer sync events per day",
  },
  {
    label: "Uptime guaranteed",
    value: 99.9,
    suffix: "%",
    decimals: 1,
    note: "24/7 operational reliability for critical healthcare systems",
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
    eyebrow: "Hospital Information System",
    title: "A fully integrated platform to manage every aspect of your healthcare facility.",
    body: "HIS (Hospital Information System) enables efficient and streamlined operations with comprehensive patient management, financial systems, operational efficiency, and enhanced patient experience.",
    statValue: 93,
    statSuffix: "%",
    statLabel: "operational efficiency",
    tracks: ["Patient Management", "Financial Management", "Operational Efficiency", "Enhanced Patient Experience"],
  },
  {
    icon: Gauge,
    eyebrow: "Enterprise Resource Planning",
    title: "Streamline your operations with a comprehensive ERP system that integrates core business functions.",
    body: "Enterprise Resource Planning system designed for healthcare, integrating robust financial accounting, human resource management, supply chain management, and asset management capabilities.",
    statValue: 40,
    statSuffix: "%",
    statLabel: "cost reduction",
    tracks: ["Financial Management", "Human Resource Management", "Supply Chain Management", "Asset Management"],
  },
  {
    icon: Activity,
    eyebrow: "NPHIES Connect",
    title: "Seamlessly integrate with NPHIES for efficient insurance claims processing and ensure compliance with CCHI standards.",
    body: "Fast eligibility checks, accurate claims submission, real-time status updates, and automated claims submission workflows to minimize errors and denials.",
    statValue: 99.2,
    statSuffix: "%",
    statDecimals: 1,
    statLabel: "clean submission rate",
    tracks: ["Fast Eligibility Checks", "Accurate Claims Submission", "Real-time Status Updates", "Automated Claims Submission"],
  },
  {
    icon: BrainCircuit,
    eyebrow: "Clinical Decision Support System",
    title: "Enhance patient care and improve outcomes with our AI-powered decision support system.",
    body: "CDSS reduces rejection rates, ensures high-quality claims, improves patient care with valuable insights, and increases physician satisfaction through streamlined workflows.",
    statValue: 612,
    statSuffix: "+",
    statLabel: "clinical rules active",
    tracks: ["Reduced Rejection Rates", "High-Quality Claims", "Improved Patient Care", "Increased Physician Satisfaction"],
  },
];

const workflowRows = [
  {
    title: "HIS",
    detail: "Integrated healthcare management",
    bullets: [
      "Patient management with inpatient and outpatient care coordination",
      "Financial management with billing and revenue cycle management",
      "Operational efficiency through supply chain and HR management",
    ],
  },
  {
    title: "ERP",
    detail: "Core business functions integrated",
    bullets: [
      "Robust financial accounting, budgeting, and reporting capabilities",
      "Employee onboarding, payroll, and performance management",
      "Efficient procurement, inventory control, and asset tracking",
    ],
  },
  {
    title: "NPHIES",
    detail: "CCHI compliant claims processing",
    bullets: [
      "Fast eligibility checks for insurance coverage verification",
      "Accurate claims submission to minimize errors and denials",
      "Real-time status updates and automated claims submission",
    ],
  },
  {
    title: "CDSS",
    detail: "AI-powered clinical insights",
    bullets: [
      "Reduce rejection rates and improve reimbursement with intelligent recommendations",
      "Ensure high-quality and complete claims through automated support",
      "Improve patient care and physician satisfaction with evidence-based insights",
    ],
  },
];

const contactCards = [
  { icon: PhoneCall, label: "Phone", value: "+966 540 408 433" },
  { icon: Mail, label: "Email", value: "info@super-git.com" },
  { icon: MapPin, label: "Address", value: "Hira Street, Jeddah, KSA" },
  { icon: Clock3, label: "Hours", value: "Open 24/7" },
];

const fadeUp = {
  initial: false,
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
    <p className="inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-slate-600 dark:text-[#79a7c9]">
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

type ContactFormValues = {
  firstName: string;
  lastName: string;
  service: string;
  phone: string;
  date: string;
  time: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialContactForm: ContactFormValues = {
  firstName: "",
  lastName: "",
  service: "",
  phone: "",
  date: "",
  time: "",
  message: "",
};

const serviceOptions = [
  "Neurology",
  "Cardiology",
  "Dental",
  "Ophthalmology",
  "Other service",
];

function AnimatedHeroText() {
  const [textIndex, setTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const texts = [
    "Transforming healthcare with Vision 2030",
    "HIS, ERP, NPHIES, and CDSS in one platform.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="grid">
      {texts.map((text, i) => (
        <span
          key={i}
          className={[
            "col-start-1 row-start-1",
            i === textIndex
              ? `transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`
              : "invisible",
          ].join(" ")}
          aria-hidden={i !== textIndex}
        >
          {text}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const pageRef = useRef<HTMLElement>(null);
  const [term, setTerm] = useState("NPHIES");
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [contactValues, setContactValues] =
    useState<ContactFormValues>(initialContactForm);
  const [contactErrors, setContactErrors] = useState<ContactFormErrors>({});
  const [contactSuccess, setContactSuccess] = useState(false);

  const validateContactForm = (values: ContactFormValues) => {
    const errors: ContactFormErrors = {};
    const phonePattern = /^\+?[0-9\s()-]{8,20}$/;

    if (!values.firstName.trim()) errors.firstName = "First name is required.";
    if (!values.lastName.trim()) errors.lastName = "Last name is required.";
    if (!values.service) errors.service = "Please select a service.";

    if (!values.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!phonePattern.test(values.phone.trim())) {
      errors.phone = "Enter a valid phone number.";
    }

    if (!values.date) {
      errors.date = "Please choose a date.";
    }

    if (!values.time) {
      errors.time = "Please choose a time.";
    }

    if (!values.message.trim()) {
      errors.message = "Message is required.";
    } else if (values.message.trim().length < 15) {
      errors.message = "Message should be at least 15 characters.";
    }

    return errors;
  };

  const handleContactFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setContactValues((prev) => ({ ...prev, [name]: value }));
    setContactSuccess(false);

    if (contactErrors[name as keyof ContactFormValues]) {
      setContactErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateContactForm(contactValues);
    setContactErrors(errors);

    if (Object.keys(errors).length > 0) {
      setContactSuccess(false);
      return;
    }

    setContactSuccess(true);
    setContactValues(initialContactForm);
  };

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
        const yOffset = 4 + index * 2;
        const xOffset = index % 2 === 0 ? 3 : -3;

        gsap.to(card, {
          y: index % 2 === 0 ? -yOffset : yOffset,
          x: xOffset,
          rotation: index % 2 === 0 ? 0.4 : -0.4,
          duration: 5.2 + index * 0.8,
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

      // Ensure all ScrollTriggers recalculate after layout and smooth-scroll transforms settle.
      requestAnimationFrame(() => ScrollTrigger.refresh());
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
      className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-[#04101a] text-slate-700 dark:text-[#d3e7f5]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,185,255,0.2),transparent_32%),radial-gradient(circle_at_82%_10%,rgba(45,211,191,0.14),transparent_28%),linear-gradient(180deg,#f7fcff_0%,#ecf8ff_46%,#e1f2fb_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(74,185,255,0.22),transparent_30%),radial-gradient(circle_at_82%_10%,rgba(45,211,191,0.18),transparent_26%),linear-gradient(180deg,#06131f_0%,#071a27_45%,#04101a_100%)]" />
      <div className="absolute inset-0 opacity-35 dark:opacity-45 [background-image:linear-gradient(rgba(100,164,199,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(100,164,199,0.12)_1px,transparent_1px)] dark:[background-image:linear-gradient(rgba(127,177,214,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(127,177,214,0.08)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:radial-gradient(circle_at_top,black,transparent_82%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(220,241,252,0.42)_0%,rgba(220,241,252,0)_20%,rgba(188,224,242,0.36)_100%)] dark:bg-[linear-gradient(180deg,rgba(4,16,26,0.05)_0%,rgba(4,16,26,0)_18%,rgba(4,16,26,0.24)_100%)]" />

      <div className="fixed inset-x-0 top-4 z-40 px-4 md:px-6">
        <div className="nav-shell mx-auto flex max-w-7xl items-center justify-between rounded-full border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[rgba(5,18,29,0.74)] px-4 py-3 shadow-[0_22px_60px_rgba(7,83,116,0.18)] dark:shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl md:px-6">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--primary))]/18 text-[hsl(var(--primary))] shadow-[0_0_32px_rgba(78,203,255,0.22)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-headline text-sm font-semibold uppercase tracking-[0.22em] text-slate-900 dark:text-white">
                SuperGIT
              </p>
              <p className="text-[0.64rem] uppercase tracking-[0.3em] text-slate-600 dark:text-[#81a8c5]">
                Healthcare Solutions
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 dark:text-[#a8bfd1] lg:flex">
            <a href="#overview" className="transition-colors hover:text-slate-900 dark:text-white">
              Overview
            </a>
            <a href="#systems" className="transition-colors hover:text-slate-900 dark:text-white">
              Systems
            </a>
            <a href="#consultation" className="transition-colors hover:text-slate-900 dark:text-white">
              Consultation
            </a>
            <a href="#explainer" className="transition-colors hover:text-slate-900 dark:text-white">
              Explainer
            </a>
            <a href="#contact" className="transition-colors hover:text-slate-900 dark:text-white">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] transition-transform hover:-translate-y-0.5"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 hidden dark:block" />
              <Moon className="h-4 w-4 block dark:hidden" />
            </button>

            <a
              href="#consultation"
              data-magnetic
              className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/14 px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white transition-transform hover:-translate-y-0.5"
            >
              Book a walkthrough
              <ArrowUpRight className="h-4 w-4 text-[hsl(var(--primary))]" />
            </a>
          </div>
        </div>
      </div>

      <div id="top" />

      <section
        id="overview"
        className="hero-section relative px-4 pb-20 pt-32 md:px-8 md:pb-24 lg:px-12 xl:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="hero-copy relative z-10 space-y-6 pl-0 md:pl-4 lg:pl-0">
            <SectionLabel>Healthcare technology reimagined</SectionLabel>

            <h1 className="max-w-4xl font-headline text-[clamp(2.4rem,6vw,5.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-slate-900 dark:text-white">
              <AnimatedHeroText />
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-[#9bb4c7] md:text-xl">
              SuperGIT delivers cutting-edge healthcare technology solutions for
              Saudi Arabia. From HIS and ERP to NPHIES integration and AI-powered
              CDSS, we digitalize hospital operations to improve efficiency and
              enhance patient care.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Hospital Information System",
                "ERP Integration",
                "NPHIES Connect",
                "AI-powered CDSS",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-[#c2d8e7]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#systems"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-[#04101a] transition-transform duration-300 hover:-translate-y-1"
              >
                Explore services
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#explainer"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 dark:text-white transition-transform duration-300 hover:-translate-y-1"
              >
                Try term decoder
                <ArrowUpRight className="h-4 w-4 text-[hsl(var(--primary))]" />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Vision 2030 aligned",
                  body: "Supporting Saudi Arabia's national strategy for digital transformation in healthcare.",
                },
                {
                  title: "NPHIES certified",
                  body: "Seamless integration for efficient claims processing and CCHI compliance.",
                },
                {
                  title: "AI-powered CDSS",
                  body: "Evidence-based clinical recommendations that reduce claim rejections and improve care.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[rgba(8,23,35,0.74)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(var(--primary))]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-[#8ea6bb]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[32rem] lg:min-h-[42rem]">
            <div className="hero-screen relative overflow-hidden rounded-[2.2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[rgba(7,23,35,0.9)] p-6 shadow-[0_45px_120px_rgba(0,0,0,0.34)] md:p-7">
              <div className="hero-grid-backdrop absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(100,221,255,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_100%)]" />
              <div className="scan-sweep absolute inset-y-0 left-[-18%] w-[36%] bg-[linear-gradient(90deg,transparent,rgba(104,223,255,0.18),transparent)] blur-2xl" />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[hsl(var(--primary))]">
                      SuperGIT command center
                    </p>
                    <p className="mt-3 font-headline text-3xl font-semibold uppercase leading-none text-slate-900 dark:text-white md:text-4xl">
                      Healthcare operations platform
                    </p>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-600 dark:text-[#b7d0e0]">
                    <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
                    Syncing live
                  </div>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
                  <div className="rounded-[1.8rem] border border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-[rgba(5,18,29,0.78)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-600 dark:text-[#87b8d8]">
                          HIS coverage
                        </p>
                        <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                          98% claim accuracy
                        </p>
                      </div>
                      <div className="rounded-2xl border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/10 p-3 text-[hsl(var(--primary))]">
                        <Gauge className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      {heroPulseHeights.map((height, index) => (
                        <div
                          key={`${height}-${index}`}
                          className="relative h-8 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5"
                        >
                          <div
                            className="pulse-bar absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#34d399] via-[hsl(var(--primary))] to-[#9be7ff]"
                            style={{ width: `${(height / 120) * 100}%` }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        {
                          label: "NPHIES sync",
                          value: "99.2%",
                          tone: "Clean claims submission with real-time payer compliance checks.",
                        },
                        {
                          label: "CDSS alerts",
                          value: "420+ rules",
                          tone: "Evidence-based clinical recommendations reducing rejections.",
                        },
                        {
                          label: "ERP modules",
                          value: "12 active",
                          tone: "Finance, HR, procurement, and supply chain running in sync.",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.4rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 overflow-hidden"
                        >
                          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-slate-600 dark:text-[#8cb1cb] truncate">
                            {item.label}
                          </p>
                          <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white truncate">
                            {item.value}
                          </p>
                          <p className="mt-3 text-xs leading-6 text-slate-600 dark:text-[#7d9ab1] line-clamp-3">
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
                        title: "Patient management",
                        value: "1,240+ records",
                        body: "Inpatient, outpatient, appointments, and medical records centralized in one system.",
                      },
                      {
                        icon: Cpu,
                        title: "CDSS confidence",
                        value: "98.4% verified",
                        body: "AI-powered clinical recommendations with evidence-based decision support for clinicians.",
                      },
                      {
                        icon: Workflow,
                        title: "NPHIES compliance",
                        value: "CCHI aligned",
                        body: "Seamless claims processing and data exchange meeting Saudi healthcare standards.",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="rounded-[1.55rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[rgba(5,18,29,0.84)] p-5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-600 dark:text-[#8eb4cf]">
                                {item.title}
                              </p>
                              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                                {item.value}
                              </p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-3 text-[hsl(var(--primary))]">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>
                          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-[#88a4b8]">
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
                className={`hero-float-card absolute z-20 border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[rgba(8,23,35,0.86)] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur ${card.position}`}
              >
                <p className="text-[0.66rem] uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                  {card.title}
                </p>
                <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
                <p className="mt-3 text-xs leading-6 text-slate-600 dark:text-[#86a5be]">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-8 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[rgba(7,23,35,0.74)] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.24)] backdrop-blur md:p-6">
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
                className="reveal-panel rounded-[1.55rem] border border-slate-200 dark:border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-600 dark:text-[#8ab4d0]">
                  {metric.label}
                </p>
                <p className="mt-3 font-headline text-4xl font-semibold uppercase tracking-[-0.03em] text-slate-900 dark:text-white">
                  <CountUp
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                  />
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-[#88a2b7]">{metric.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="space-y-4 border-y border-slate-200 dark:border-white/10 bg-white/[0.02] py-5">
          <div className="overflow-hidden">
            <div className="loop-track flex w-max" data-direction="forward">
              {doubledSignals.map((item, index) => (
                <span
                  key={`${item}-forward-${index}`}
                  className="mx-4 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[rgba(9,28,42,0.8)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700 dark:text-[#d7ebf7]"
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
            <SectionLabel>Our services</SectionLabel>
            <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-slate-900 dark:text-white md:text-6xl">
              Comprehensive healthcare solutions built for Saudi Arabia.
            </h2>
            <p className="text-lg leading-8 text-slate-600 dark:text-[#97b0c3] md:text-xl">
              From HIS and ERP to NPHIES integration and AI-powered clinical decision
              support, every module is designed to improve efficiency and enhance
              patient care across your facility.
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
                  className="reveal-panel relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[rgba(7,23,35,0.82)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.24)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(92,226,255,0.08),transparent_35%)]" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-6">
                      <div className="space-y-4">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[hsl(var(--primary))]">
                          {card.eyebrow}
                        </p>
                        <h3 className="max-w-xl font-headline text-3xl font-semibold uppercase leading-[0.96] tracking-[-0.04em] text-slate-900 dark:text-white">
                          {card.title}
                        </h3>
                      </div>
                      <div className="rounded-[1.4rem] border border-[hsl(var(--primary))]/18 bg-[hsl(var(--primary))]/10 p-4 text-[hsl(var(--primary))]">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <p className="mt-5 text-base leading-8 text-slate-600 dark:text-[#8ca7bc]">
                      {card.body}
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-end">
                      <div className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 bg-white/[0.04] p-5">
                        <p className="text-[0.66rem] uppercase tracking-[0.26em] text-slate-600 dark:text-[#88afcb]">
                          {card.statLabel}
                        </p>
                        <p className="mt-3 font-headline text-4xl font-semibold uppercase text-slate-900 dark:text-white">
                          <CountUp
                            value={card.statValue}
                            suffix={card.statSuffix}
                            decimals={card.statDecimals}
                          />
                        </p>
                      </div>

                      <div className="space-y-4">
                        {card.tracks.map((track) => (
                          <div key={track} className="rounded-[1.3rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#081c2c] p-4">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-medium text-slate-600 dark:text-[#d5e8f4]">
                                {track}
                              </span>
                              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-[hsl(var(--primary))]">
                                Live
                              </span>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/8">
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
            <SectionLabel>About SuperGIT</SectionLabel>
            <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-slate-900 dark:text-white md:text-6xl">
              Transforming healthcare in Saudi Arabia with Vision 2030.
            </h2>
            <p className="text-lg leading-8 text-slate-600 dark:text-[#97b0c3] md:text-xl">
              At SuperGIT, we deliver cutting-edge technology solutions to digitalize
              healthcare operations, improve efficiency, and enhance patient care —
              particularly for acute and critical care in hospital settings.
            </p>

            <div className="grid gap-3">
              {[
                "Healthcare technology expertise tailored to the insurance sector.",
                "Unique CDSS products that reduce claim rejection rates significantly.",
                "Cost-effective operations while enhancing patient satisfaction.",
                "Aligned with Saudi Arabia's Vision 2030 digital transformation strategy.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[rgba(7,23,35,0.7)] px-5 py-4 text-sm leading-7 text-slate-600 dark:text-[#cfe4f1]"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="reveal-panel relative overflow-hidden rounded-[2.2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[rgba(7,23,35,0.84)] p-6 shadow-[0_36px_110px_rgba(0,0,0,0.28)]"
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
                  className="rounded-[1.7rem] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#081b2a] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                        {row.title}
                      </p>
                      <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
                        {row.detail}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-2 text-[0.64rem] uppercase tracking-[0.22em] text-slate-600 dark:text-[#b9d3e4]">
                      Active
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {row.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-[1.2rem] border border-slate-200 dark:border-white/8 bg-white dark:bg-white/[0.03] px-4 py-3 text-sm leading-7 text-slate-700 dark:text-[#8ea7ba]"
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
            <SectionLabel>Healthcare term decoder</SectionLabel>
            <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-slate-900 dark:text-white md:text-6xl">
              Understand healthcare technology terms instantly.
            </h2>
            <p className="text-lg leading-8 text-slate-600 dark:text-[#97b0c3] md:text-xl">
              Get plain-language explanations for clinical, operational, and claims
              terms. Built for teams working across hospital operations and insurance
              workflows in Saudi Arabia.
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
                      ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/14 text-slate-900 dark:text-white"
                      : "border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-[#cde0ed] hover:border-[hsl(var(--primary))]/40"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="rounded-[1.8rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[rgba(7,23,35,0.72)] p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                Knowledge base
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.3rem] border border-slate-200 dark:border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.66rem] uppercase tracking-[0.24em] text-slate-600 dark:text-[#8cb3cf]">
                    Healthcare terms
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                    <CountUp value={420} suffix="+" />
                  </p>
                </div>
                <div className="rounded-[1.3rem] border border-slate-200 dark:border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[0.66rem] uppercase tracking-[0.24em] text-slate-600 dark:text-[#8cb3cf]">
                    Response accuracy
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                    <CountUp value={96} suffix="%" />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="reveal-panel rounded-[2.2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[rgba(7,23,35,0.84)] p-6 shadow-[0_34px_100px_rgba(0,0,0,0.28)] backdrop-blur sm:p-8"
          >
            <form onSubmit={handleExplain} className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[hsl(var(--primary))]">
                    Healthcare term decoder
                  </p>
                  <p className="mt-3 font-headline text-3xl font-semibold uppercase leading-none text-slate-900 dark:text-white">
                    Get instant explanations
                  </p>
                </div>
                <div className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-slate-600 dark:text-[#b8d2e2]">
                  Live AI assist
                </div>
              </div>

              <label className="block">
                <span className="mb-3 block text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-600 dark:text-[#8cb2cd]">
                  Healthcare term
                </span>
                <input
                  id="term"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Type NPHIES, HIS, CDSS, ERP, CCHI, or EMR"
                  className="w-full rounded-[1.5rem] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#081b2a] px-5 py-4 text-base text-slate-900 dark:text-white outline-none transition-colors placeholder:text-slate-500 dark:placeholder:text-[#63829d] focus:border-[hsl(var(--primary))] focus:shadow-[0_0_0_1px_hsl(var(--primary))]"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-slate-200 dark:border-white/10 bg-white/[0.04] px-4 py-4">
                <div className="text-sm leading-7 text-slate-600 dark:text-[#9bb5c8]">
                  Plain-language answers for teams working across clinical,
                  operational, and insurance workflows in Saudi Arabia.
                </div>
                <button
                  type="submit"
                  data-magnetic
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-[#04101a] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
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
                className="mt-6 rounded-[1.5rem] border border-[#fb7185]/20 bg-[#4c1020]/40 p-5 text-sm leading-7 text-slate-600 dark:text-[#fecdd3]"
              >
                {error}
              </motion.div>
            ) : null}

            {explanation ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-[1.8rem] border border-[hsl(var(--primary))]/18 bg-slate-100 dark:bg-[#081b2a] p-6"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[hsl(var(--primary))]" />
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                    Healthcare explanation
                  </p>
                </div>
                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-[#d7ebf7]">
                  {explanation}
                </p>
              </motion.div>
            ) : (
              <div className="mt-6 rounded-[1.8rem] border border-dashed border-slate-200 dark:border-white/10 p-6 text-sm leading-7 text-slate-600 dark:text-[#809ab0]">
                Ask for a healthcare term and get a plain-language explanation instantly.
                
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section id="consultation" className="relative px-4 py-24 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-slate-200 dark:border-white/10 bg-[linear-gradient(135deg,rgba(239,251,255,0.96)_0%,rgba(224,245,255,0.95)_50%,rgba(210,239,252,0.94)_100%)] dark:bg-[linear-gradient(135deg,rgba(7,23,35,0.94)_0%,rgba(9,29,43,0.9)_50%,rgba(11,48,64,0.9)_100%)] p-8 shadow-[0_28px_90px_rgba(7,83,116,0.16)] dark:shadow-[0_38px_120px_rgba(0,0,0,0.3)] md:p-10">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <motion.div {...fadeUp} className="space-y-7">
              <SectionLabel>Get started</SectionLabel>
              <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-slate-900 dark:text-white md:text-6xl">
                Experience healthcare reimagined with SuperGIT.
              </h2>
              <p className="text-lg leading-8 text-slate-600 dark:text-[#a2bdd0] md:text-xl">
                Let us show you how HIS, ERP, NPHIES Connect, and CDSS work together
                to transform your facility's operations and improve patient care.
              </p>

              <div className="grid gap-3">
                {[
                  "Architecture workshop focused on your hospital's core workflows.",
                  "Integration planning for NPHIES, HIS, and CDSS deployment.",
                  "A visual system that feels premium without losing medical trust.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-slate-200 dark:border-white/10 bg-white/[0.05] px-5 py-4 text-sm leading-7 text-slate-600 dark:text-[#d9edf8]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  data-magnetic
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-[#04101a] transition-transform hover:-translate-y-0.5"
                >
                  Start the conversation
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#overview"
                  data-magnetic
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-slate-100 dark:bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 dark:text-white transition-transform hover:-translate-y-0.5"
                >
                  Explore our services
                  <ArrowUpRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                </a>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: CalendarClock,
                  title: "48h kickoff",
                  body: "Fast discovery, system audit, and initial direction for your healthcare platform.",
                },
                {
                  icon: BrainCircuit,
                  title: "AI-powered CDSS",
                  body: "Clinical decision support designed to reduce rejections and improve diagnostics.",
                },
                {
                  icon: Workflow,
                  title: "NPHIES integration",
                  body: "Certified integration for seamless claims processing and CCHI compliance.",
                },
                {
                  icon: ShieldCheck,
                  title: "Vision 2030 ready",
                  body: "Solutions aligned with Saudi Arabia's digital healthcare transformation strategy.",
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
                    className="rounded-[1.7rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[rgba(5,18,29,0.84)] p-5"
                  >
                    <div className="rounded-[1.2rem] border border-[hsl(var(--primary))]/18 bg-[hsl(var(--primary))]/10 p-3 text-[hsl(var(--primary))]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-headline text-2xl font-semibold uppercase tracking-[-0.03em] text-slate-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-[#94aec2]">
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
        <div className="mx-auto max-w-7xl rounded-[2.3rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[rgba(7,23,35,0.78)] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.24)] backdrop-blur md:p-10">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
            <motion.div {...fadeUp} className="space-y-6">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-slate-900 dark:text-white md:text-6xl">
                Ready to transform your healthcare operations?
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-[#9bb4c7] md:text-xl">
                SuperGIT delivers HIS, ERP, NPHIES Connect, and CDSS — the integrated
                solutions your facility needs to thrive in Saudi Arabia's digital
                healthcare future.
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
                    className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 bg-white/[0.04] p-5"
                  >
                    <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                    <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-600 dark:text-[#8db3cf]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-medium text-slate-900 dark:text-white">{item.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.form
            {...fadeUp}
            onSubmit={handleContactSubmit}
            className="mt-8 grid gap-4 rounded-[1.8rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[rgba(5,18,29,0.82)] p-6 md:grid-cols-2"
          >
            <div className="space-y-2">
              <label
                htmlFor="contact-first-name"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-600 dark:text-[#8db3cf]"
              >
                First name
              </label>
              <input
                id="contact-first-name"
                name="firstName"
                type="text"
                value={contactValues.firstName}
                onChange={handleContactFieldChange}
                placeholder="Ahmed"
                className="w-full rounded-2xl border border-slate-200 dark:border-white/12 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-colors placeholder:text-slate-500 dark:placeholder:text-[#7f9ab0] focus:border-[hsl(var(--primary))]/55"
              />
              {contactErrors.firstName ? (
                <p className="text-xs text-slate-600 dark:text-[#fda4af]">{contactErrors.firstName}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-last-name"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-600 dark:text-[#8db3cf]"
              >
                Last name
              </label>
              <input
                id="contact-last-name"
                name="lastName"
                type="text"
                value={contactValues.lastName}
                onChange={handleContactFieldChange}
                placeholder="Alqahtani"
                className="w-full rounded-2xl border border-slate-200 dark:border-white/12 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-colors placeholder:text-slate-500 dark:placeholder:text-[#7f9ab0] focus:border-[hsl(var(--primary))]/55"
              />
              {contactErrors.lastName ? (
                <p className="text-xs text-slate-600 dark:text-[#fda4af]">{contactErrors.lastName}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-service"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-600 dark:text-[#8db3cf]"
              >
                Select service
              </label>
              <select
                id="contact-service"
                name="service"
                value={contactValues.service}
                onChange={handleContactFieldChange}
                className="w-full rounded-2xl border border-slate-200 dark:border-white/12 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-colors placeholder:text-slate-500 dark:placeholder:text-[#7f9ab0] focus:border-[hsl(var(--primary))]/55"
              >
                <option value="" className="bg-white text-slate-600 dark:bg-[#0a1e2e] dark:text-[#9cb7ca]">
                  Select a service
                </option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service} className="bg-white text-slate-900 dark:bg-[#0a1e2e] dark:text-white">
                    {service}
                  </option>
                ))}
              </select>
              {contactErrors.service ? (
                <p className="text-xs text-slate-600 dark:text-[#fda4af]">{contactErrors.service}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-phone"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-600 dark:text-[#8db3cf]"
              >
                Phone
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={contactValues.phone}
                onChange={handleContactFieldChange}
                placeholder="+966 5X XXX XXXX"
                className="w-full rounded-2xl border border-slate-200 dark:border-white/12 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-colors placeholder:text-slate-500 dark:placeholder:text-[#7f9ab0] focus:border-[hsl(var(--primary))]/55"
              />
              {contactErrors.phone ? (
                <p className="text-xs text-slate-600 dark:text-[#fda4af]">{contactErrors.phone}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-date"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-600 dark:text-[#8db3cf]"
              >
                Date
              </label>
              <input
                id="contact-date"
                name="date"
                type="date"
                value={contactValues.date}
                onChange={handleContactFieldChange}
                className="w-full rounded-2xl border border-slate-200 dark:border-white/12 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-colors focus:border-[hsl(var(--primary))]/55"
              />
              {contactErrors.date ? (
                <p className="text-xs text-slate-600 dark:text-[#fda4af]">{contactErrors.date}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-time"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-600 dark:text-[#8db3cf]"
              >
                Time
              </label>
              <input
                id="contact-time"
                name="time"
                type="time"
                value={contactValues.time}
                onChange={handleContactFieldChange}
                className="w-full rounded-2xl border border-slate-200 dark:border-white/12 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-colors focus:border-[hsl(var(--primary))]/55"
              />
              {contactErrors.time ? (
                <p className="text-xs text-slate-600 dark:text-[#fda4af]">{contactErrors.time}</p>
              ) : null}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="contact-message"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-600 dark:text-[#8db3cf]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={contactValues.message}
                onChange={handleContactFieldChange}
                placeholder="Tell us about your requirement."
                className="w-full resize-none rounded-2xl border border-slate-200 dark:border-white/12 bg-white dark:bg-white/5 px-4 py-3 text-sm leading-6 text-slate-900 dark:text-white outline-none transition-colors placeholder:text-slate-500 dark:placeholder:text-[#7f9ab0] focus:border-[hsl(var(--primary))]/55"
              />
              {contactErrors.message ? (
                <p className="text-xs text-slate-600 dark:text-[#fda4af]">{contactErrors.message}</p>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-[#04101a] transition-transform hover:-translate-y-0.5"
              >
                Start conversation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {contactSuccess ? (
              <p className="md:col-span-2 text-sm text-slate-600 dark:text-[#86efac]">
                Your request has been captured. We will contact you shortly.
              </p>
            ) : null}
          </motion.form>

          <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 dark:border-white/10 pt-6 text-sm text-slate-600 dark:text-[#88a6bc] md:flex-row md:items-center md:justify-between">
            <p>Copyright &copy; 2026 SuperGIT. All rights reserved.</p>
            <p>Hira Street, Jeddah, Saudi Arabia &middot; Open 24/7</p>
          </div>
        </div>
      </section>
    </main>
  );
}
