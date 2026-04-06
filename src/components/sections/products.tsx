import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: "his",
    name: "HIS",
    title: "Hospital Information System",
    description: "A comprehensive, integrated information system designed to manage all the aspects of a hospital's operation.",
    features: ["Patient Management", "Billing & Invoicing", "Electronic Medical Records"],
  },
  {
    id: "erp",
    name: "ERP",
    title: "Enterprise Resource Planning",
    description: "Streamline your business processes with our integrated management of main business processes, in real-time.",
    features: ["Financial Management", "Supply Chain", "Human Resources"],
  },
  {
    id: "nphies",
    name: "NPHIES Connect",
    title: "NPHIES Connectivity Solution",
    description: "Seamlessly connect to the National Platform for Health and Insurance Exchange (NPHIES) in Saudi Arabia.",
    features: ["Eligibility Checks", "Claim Submissions", "Prior Authorization"],
  },
  {
    id: "cdss",
    name: "CDSS",
    title: "Clinical Decision Support System",
    description: "Enhance clinical performance with a health information technology system that provides prompts and reminders.",
    features: ["Diagnostic Support", "Medication Dosing", "Clinical Guidelines"],
  },
];

export function Products() {
  return (
    <section id="products" className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Our Core Products</h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Scroll horizontally to explore our suite of cutting-edge healthcare technology solutions.
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="flex w-full snap-x snap-mandatory overflow-x-auto pb-8">
          <div className="flex-shrink-0 snap-center w-24" />
          {products.map((product) => {
            const placeholder = PlaceHolderImages.find(p => p.id === product.id);
            return (
              <div key={product.id} className="flex-shrink-0 w-full md:w-3/4 lg:w-2/3 snap-center px-4">
                <Card className="overflow-hidden transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2">
                  <div className="grid md:grid-cols-2">
                    <div className="overflow-hidden">
                      {placeholder && (
                        <Image
                          src={placeholder.imageUrl}
                          alt={product.title}
                          width={600}
                          height={400}
                          data-ai-hint={placeholder.imageHint}
                          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-col p-6">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary">{product.title}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.features.map(feature => (
                            <Badge key={feature} variant="secondary">{feature}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
          <div className="flex-shrink-0 snap-center w-24" />
        </div>
      </div>
    </section>
  );
}
