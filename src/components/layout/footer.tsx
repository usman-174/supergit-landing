import { Mail, MapPin, Phone, Stethoscope, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t bg-background">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">SuperGIT Motion</span>
            </div>
            <p className="text-muted-foreground">
              Experience Healthcare Reimagined
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Contact Us</h4>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+966 12 345 6789</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>info@supergit.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Hira Street, Jeddah, KSA</span>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Opening Hours</h4>
            <p className="text-muted-foreground">
              Sunday - Thursday
              <br />
              9:00 AM - 6:00 PM
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Placeholder for social links */}
              <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SuperGIT Motion. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
