
import * as z from "zod";

export const visaTypeSchema = z.enum([
  "UK_GLOBAL_TALENT",
  "US_EB1_EB2",
  "CANADA_EXPRESS_ENTRY",
  "DUBAI_GOLDEN_VISA"
]);

export const scoringSchema = z.object({
  selectedVisa: visaTypeSchema,
  education: z.object({
    qualification: z.number().min(0).max(100),
    fieldBonus: z.number().min(0).max(20),
    institutionRanking: z.number().min(0).max(20),
  }),
  experience: z.object({
    years: z.number().min(0).max(100),
    positionLevel: z.number().min(0).max(20),
  }),
  achievements: z.object({
    count: z.number().min(0).max(100),
    impactBonus: z.number().min(0).max(20),
  }),
  additionalCriteria: z.object({
    language: z.number().min(0).max(100).optional(),
    financials: z.number().min(0).max(100).optional(),
  }),
});

export type ScoringValues = z.infer<typeof scoringSchema>;

export const visaRequirements = {
  UK_GLOBAL_TALENT: {
    education: {
      qualifications: [
        { label: "PhD", points: 100 },
        { label: "Masters", points: 80 },
        { label: "Bachelors", points: 60 },
        { label: "Diploma", points: 40 },
        { label: "Other", points: 20 },
      ],
      fieldBonuses: [
        { label: "STEM/Digital/Arts", points: 20 },
        { label: "Business/Economics", points: 15 },
        { label: "Other Fields", points: 10 },
      ],
      institutionRankings: [
        { label: "Top 100 Global", points: 20 },
        { label: "Top 500 Global", points: 10 },
        { label: "Other Accredited", points: 0 },
      ],
    },
    experience: {
      years: [
        { label: "8+ years", points: 100 },
        { label: "5-8 years", points: 80 },
        { label: "3-5 years", points: 60 },
      ],
      positions: [
        { label: "Senior Level", points: 20 },
        { label: "Mid Level", points: 10 },
        { label: "Junior Level", points: 5 },
      ],
    },
    achievements: {
      counts: [
        { label: "4+ items", points: 100 },
        { label: "3 items", points: 80 },
        { label: "2 items", points: 60 },
      ],
      impact: [
        { label: "International", points: 20 },
        { label: "National", points: 10 },
        { label: "Regional", points: 5 },
      ],
    },
  },
  US_EB1_EB2: {
    // ... similar structure for US visa
  },
  CANADA_EXPRESS_ENTRY: {
    // ... similar structure for Canada visa
  },
  DUBAI_GOLDEN_VISA: {
    // ... similar structure for Dubai visa
  },
} as const;
