"use server";

import { explainHealthcareTerm, HealthcareTermExplainerInput } from "@/ai/flows/healthcare-term-explainer";
import { z } from "zod";

const explainerSchema = z.object({
  term: z.string(),
});

type ExplainTermResponse = {
  explanation?: string;
  error?: string;
};

export async function explainTerm(input: HealthcareTermExplainerInput): Promise<ExplainTermResponse> {
  const validatedInput = explainerSchema.safeParse(input);

  if (!validatedInput.success) {
    return { error: "Invalid input." };
  }

  try {
    const result = await explainHealthcareTerm(validatedInput.data);
    return { explanation: result.explanation };
  } catch (e) {
    console.error(e);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
