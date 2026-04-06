"use client";

import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarClock, CheckCircle2, Sparkles } from "lucide-react";

import { gsap } from "@/lib/gsap";
import { toast } from "@/hooks/use-toast";

type ConsultationForm = {
  name: string;
  email: string;
  company: string;
  phone: string;
  goals: string;
};

const initialForm: ConsultationForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  goals: "",
};

export function FreeConsultationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<ConsultationForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".consultation-copy, .consultation-card", {
        y: 54,
        opacity: 0,
        duration: 1.1,
        stagger: 0.16,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.from(".consultation-field", {
        y: 28,
        opacity: 0,
        duration: 0.72,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.goals) {
      toast({
        title: "Complete the essentials",
        description: "Add your name, email, and project goals to request a consultation.",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: "Free consultation requested",
      description: "Your consultation request has been staged. We will reach out within 24 hours.",
    });
    setForm(initialForm);
  };

  return (
    <section
      id="consultation"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 md:px-10 lg:px-16"
    >
      <div className="absolute inset-x-6 inset-y-0 rounded-[2.8rem] bg-[linear-gradient(135deg,rgba(255,250,242,0.72)_0%,rgba(244,226,199,0.64)_55%,rgba(29,22,16,0.08)_100%)] md:inset-x-10 lg:inset-x-16" />
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,153,0,0.18)_0%,rgba(255,153,0,0.04)_55%,transparent_76%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="consultation-copy space-y-8" data-speed="0.92">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-[#8c6f57]">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
            Free consultation
          </p>

          <h2 className="font-headline text-4xl font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-[#18120d] md:text-6xl">
            Turn the interest into a proper conversation.
          </h2>

          <p className="max-w-xl text-lg leading-8 text-[#59493c] md:text-xl">
            This form is designed as another premium chapter, not a dead-end lead
            box. It should feel tactile, calm, and intentional from first focus to
            confirmation.
          </p>

          <div className="grid gap-4">
            {[
              "A 30-minute discovery call focused on workflow pain points and product fit.",
              "Fast triage on operations, claims, finance, or clinical intelligence needs.",
              "A response window that feels immediate enough to support momentum.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-black/10 bg-[rgba(255,252,247,0.68)] px-5 py-4 text-sm leading-7 text-[#3f3026] shadow-[0_24px_60px_rgba(17,12,8,0.08)] backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7e6653]">
            <span className="rounded-full border border-black/10 bg-white/60 px-4 py-2">
              30 min session
            </span>
            <span className="rounded-full border border-black/10 bg-white/60 px-4 py-2">
              No-pressure intro
            </span>
            <span className="rounded-full border border-black/10 bg-white/60 px-4 py-2">
              Reply within 24h
            </span>
          </div>
        </div>

        <div
          className="consultation-card rounded-[2.3rem] border border-[rgba(24,18,13,0.08)] bg-[rgba(20,15,11,0.92)] p-6 text-[#fff7eb] shadow-[0_38px_120px_rgba(17,12,8,0.22)] backdrop-blur sm:p-8"
          data-speed="1.02"
          data-lag="0.18"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#ffcb79]">
                Consultation intake
              </p>
              <p className="mt-4 font-headline text-3xl font-semibold uppercase leading-none">
                Book your free consultation
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/6 p-3 text-[#ffcb79]">
              <CalendarClock className="h-5 w-5" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="consultation-field block">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-[#cdb89b]">
                  Full name
                </span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Aisha Rahman"
                  className="w-full rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-4 text-base text-[#fff7eb] outline-none transition-all placeholder:text-[#b89f84] focus:border-[hsl(var(--primary))] focus:bg-white/10 focus:shadow-[0_0_0_1px_hsl(var(--primary)),0_0_30px_rgba(255,153,0,0.18)]"
                />
              </label>

              <label className="consultation-field block">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-[#cdb89b]">
                  Work email
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="aisha@hospital.com"
                  className="w-full rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-4 text-base text-[#fff7eb] outline-none transition-all placeholder:text-[#b89f84] focus:border-[hsl(var(--primary))] focus:bg-white/10 focus:shadow-[0_0_0_1px_hsl(var(--primary)),0_0_30px_rgba(255,153,0,0.18)]"
                />
              </label>

              <label className="consultation-field block">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-[#cdb89b]">
                  Company
                </span>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="SuperGIT Partner Group"
                  className="w-full rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-4 text-base text-[#fff7eb] outline-none transition-all placeholder:text-[#b89f84] focus:border-[hsl(var(--primary))] focus:bg-white/10 focus:shadow-[0_0_0_1px_hsl(var(--primary)),0_0_30px_rgba(255,153,0,0.18)]"
                />
              </label>

              <label className="consultation-field block">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-[#cdb89b]">
                  Phone
                </span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+966 5X XXX XXXX"
                  className="w-full rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-4 text-base text-[#fff7eb] outline-none transition-all placeholder:text-[#b89f84] focus:border-[hsl(var(--primary))] focus:bg-white/10 focus:shadow-[0_0_0_1px_hsl(var(--primary)),0_0_30px_rgba(255,153,0,0.18)]"
                />
              </label>
            </div>

            <label className="consultation-field block">
              <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-[#cdb89b]">
                What do you want help with?
              </span>
              <textarea
                name="goals"
                value={form.goals}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us what you want to improve: operations flow, claims visibility, ERP rollout, CDSS adoption, or the whole digital experience."
                className="w-full resize-none rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 text-base leading-7 text-[#fff7eb] outline-none transition-all placeholder:text-[#b89f84] focus:border-[hsl(var(--primary))] focus:bg-white/10 focus:shadow-[0_0_0_1px_hsl(var(--primary)),0_0_30px_rgba(255,153,0,0.18)]"
              />
            </label>

            <div className="consultation-field flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-4">
              <div className="flex items-center gap-3 text-sm text-[#e8d6bb]">
                <Sparkles className="h-4 w-4 text-[#ffcb79]" />
                Free consultation requests are reviewed by the team directly.
              </div>

              <button
                type="submit"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#16110b] transition-transform hover:-translate-y-0.5"
              >
                Send request
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <AnimatePresence>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 rounded-[1.7rem] border border-[#ffcb79]/20 bg-[rgba(255,203,121,0.08)] p-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#ffcb79]" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffcb79]">
                      Request received
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#ecd9bc]">
                      Your free consultation request is staged. Expect a reply within
                      24 hours with next-step options and a scheduling window.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
