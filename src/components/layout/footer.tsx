import { ArrowUpRight, Mail, MapPin, PhoneCall, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-black/10 bg-[#120f0c] text-[#f7ead4]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffb44a] text-[#16110b]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-headline text-lg font-semibold uppercase tracking-[0.18em]">
                  SuperGIT
                </p>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#cbb394]">
                  Editorial Motion
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#d9c3a7]">
              Warm luxury healthcare presentation with deliberate motion,
              editorial pacing, and product storytelling that feels high-end.
            </p>
            <a
              href="#consultation"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#fff4e0] transition-transform hover:-translate-y-0.5"
            >
              Free consultation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#ffcb79]">
              Explore
            </h4>
            <div className="flex flex-col gap-3 text-sm text-[#ead7bc]">
              <a href="#story" className="transition-colors hover:text-white">
                Story
              </a>
              <a href="#products" className="transition-colors hover:text-white">
                Products
              </a>
              <a href="#consultation" className="transition-colors hover:text-white">
                Consultation
              </a>
              <a href="#explainer" className="transition-colors hover:text-white">
                AI Explainer
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#ffcb79]">
              Products
            </h4>
            <div className="flex flex-col gap-3 text-sm text-[#ead7bc]">
              <span>HIS</span>
              <span>ERP</span>
              <span>NPHIES Connect</span>
              <span>CDSS</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#ffcb79]">
              Contact
            </h4>
            <div className="space-y-4 text-sm text-[#ead7bc]">
              <div className="flex items-start gap-3">
                <PhoneCall className="mt-0.5 h-4 w-4 text-[#ffcb79]" />
                <span>+966 12 345 6789</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[#ffcb79]" />
                <span>info@supergit.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[#ffcb79]" />
                <span>Hira Street, Jeddah, KSA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#cbb394] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SuperGIT Motion. All rights reserved.</p>
          <p>Built with lighter motion, calmer scroll, and a smoother cursor layer.</p>
        </div>
      </div>
    </footer>
  );
}
