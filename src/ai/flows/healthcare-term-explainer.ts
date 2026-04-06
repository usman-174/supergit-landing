'use server';
/**
 * @fileOverview A Genkit flow for explaining complex healthcare technology terms.
 *
 * - explainHealthcareTerm - A function that handles the explanation process.
 * - HealthcareTermExplainerInput - The input type for the explainHealthcareTerm function.
 * - HealthcareTermExplainerOutput - The return type for the explainHealthcareTerm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthcareTermExplainerInputSchema = z.object({
  term: z.string().describe('The complex healthcare technology term to explain.'),
});
export type HealthcareTermExplainerInput = z.infer<typeof HealthcareTermExplainerInputSchema>;

const HealthcareTermExplainerOutputSchema = z.object({
  explanation: z.string().describe('A simplified and concise explanation of the healthcare technology term.'),
});
export type HealthcareTermExplainerOutput = z.infer<typeof HealthcareTermExplainerOutputSchema>;

export async function explainHealthcareTerm(
  input: HealthcareTermExplainerInput
): Promise<HealthcareTermExplainerOutput> {
  return healthcareTermExplainerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'healthcareTermExplainerPrompt',
  input: {schema: HealthcareTermExplainerInputSchema},
  output: {schema: HealthcareTermExplainerOutputSchema},
  prompt: `You are an expert in healthcare technology, specializing in making complex concepts easy to understand.
Your task is to provide a simplified, concise, and clear explanation for the given healthcare technology term.
Do not use overly technical jargon. Focus on explaining the core concept and its purpose in a way that a non-expert can quickly grasp.

Term: {{{term}}}`,
});

const healthcareTermExplainerFlow = ai.defineFlow(
  {
    name: 'healthcareTermExplainerFlow',
    inputSchema: HealthcareTermExplainerInputSchema,
    outputSchema: HealthcareTermExplainerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate explanation.');
    }
    return output;
  }
);
