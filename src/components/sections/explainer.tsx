"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { explainTerm } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { LoadingDots } from "@/components/ui/loading-dots";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const explainerSchema = z.object({
  term: z.string().min(2, "Please enter a term to explain.").max(50),
});

type ExplainerFormValues = z.infer<typeof explainerSchema>;

export function Explainer() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ExplainerFormValues>({
    resolver: zodResolver(explainerSchema),
    defaultValues: {
      term: "",
    },
  });

  const onSubmit = (values: ExplainerFormValues) => {
    startTransition(async () => {
      setError(null);
      setResult(null);
      const response = await explainTerm(values);
      if (response.error) {
        setError(response.error);
      } else {
        setResult(response.explanation || null);
      }
    });
  };

  const setPresetTerm = (term: string) => {
    form.setValue('term', term);
    form.handleSubmit(onSubmit)();
  }

  return (
    <section id="explainer" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-6 w-6 text-primary" />
              AI Healthcare Term Explainer
            </CardTitle>
            <CardDescription>
              Confused by jargon? Enter a healthcare technology term like NPHIES, EMR, or CDSS, and our AI will provide a simple explanation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Healthcare Term</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CDSS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => setPresetTerm('NPHIES')}>NPHIES</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => setPresetTerm('EMR')}>EMR</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => setPresetTerm('CDSS')}>CDSS</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => setPresetTerm('HIS')}>HIS</Button>
                </div>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? <LoadingDots color="white" /> : "Explain Term"}
                </Button>
              </form>
            </Form>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {result && (
              <div className="mt-6 space-y-2">
                 <h3 className="font-semibold">Explanation:</h3>
                 <div className="p-4 bg-muted rounded-lg border">
                  <p className="text-muted-foreground">{result}</p>
                 </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
