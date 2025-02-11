
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

type VisaRequirement = {
  education: {
    qualifications: Array<{ label: string; points: number }>;
    fieldBonuses: Array<{ label: string; points: number }>;
    institutionRankings: Array<{ label: string; points: number }>;
  };
  experience: {
    years: Array<{ label: string; points: number }>;
    positions: Array<{ label: string; points: number }>;
  };
  achievements: {
    counts: Array<{ label: string; points: number }>;
    impact: Array<{ label: string; points: number }>;
  };
};

export const visaRequirements: Record<z.infer<typeof visaTypeSchema>, VisaRequirement> = {
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
    education: {
      qualifications: [
        { label: "PhD", points: 100 },
        { label: "Masters", points: 80 },
        { label: "Bachelors", points: 60 },
      ],
      fieldBonuses: [
        { label: "STEM", points: 20 },
        { label: "Business/Economics", points: 15 },
        { label: "Arts/Culture", points: 15 },
      ],
      institutionRankings: [
        { label: "Top 100 Global", points: 20 },
        { label: "Top 500 Global", points: 10 },
        { label: "Other Accredited", points: 0 },
      ],
    },
    experience: {
      years: [
        { label: "10+ years", points: 100 },
        { label: "8-10 years", points: 80 },
        { label: "5-7 years", points: 60 },
      ],
      positions: [
        { label: "Executive", points: 100 },
        { label: "Senior Management", points: 80 },
        { label: "Expert", points: 70 },
      ],
    },
    achievements: {
      counts: [
        { label: "4+ items", points: 100 },
        { label: "3 items", points: 80 },
        { label: "2 items", points: 60 },
      ],
      impact: [
        { label: "International", points: 100 },
        { label: "National", points: 80 },
        { label: "Industry", points: 60 },
      ],
    },
  },
  CANADA_EXPRESS_ENTRY: {
    education: {
      qualifications: [
        { label: "PhD", points: 100 },
        { label: "Masters", points: 80 },
        { label: "Bachelors", points: 60 },
        { label: "3-year Diploma", points: 50 },
        { label: "1-2 year Diploma", points: 40 },
      ],
      fieldBonuses: [
        { label: "In-demand Field", points: 20 },
        { label: "Other Fields", points: 10 },
      ],
      institutionRankings: [
        { label: "Canadian Institution", points: 20 },
        { label: "Other Accredited", points: 10 },
      ],
    },
    experience: {
      years: [
        { label: "6+ years", points: 72 },
        { label: "4-5 years", points: 64 },
        { label: "2-3 years", points: 53 },
        { label: "1 year", points: 40 },
      ],
      positions: [
        { label: "NOC 0, A", points: 20 },
        { label: "NOC B", points: 10 },
      ],
    },
    achievements: {
      counts: [
        { label: "4+ items", points: 100 },
        { label: "3 items", points: 80 },
        { label: "2 items", points: 60 },
      ],
      impact: [
        { label: "Canadian Experience", points: 20 },
        { label: "International", points: 10 },
      ],
    },
  },
  DUBAI_GOLDEN_VISA: {
    education: {
      qualifications: [
        { label: "PhD", points: 100 },
        { label: "Masters", points: 80 },
        { label: "Bachelors", points: 60 },
      ],
      fieldBonuses: [
        { label: "Technology", points: 20 },
        { label: "Business", points: 15 },
        { label: "Other Fields", points: 10 },
      ],
      institutionRankings: [
        { label: "Top 100 Global", points: 20 },
        { label: "Other Accredited", points: 10 },
      ],
    },
    experience: {
      years: [
        { label: "10+ years", points: 100 },
        { label: "5-10 years", points: 80 },
        { label: "3-5 years", points: 60 },
      ],
      positions: [
        { label: "CEO/MD", points: 100 },
        { label: "Senior Management", points: 80 },
        { label: "Department Head", points: 60 },
      ],
    },
    achievements: {
      counts: [
        { label: "AED 10M+ Investment", points: 100 },
        { label: "AED 5-10M Investment", points: 80 },
        { label: "AED 2M+ Property", points: 60 },
      ],
      impact: [
        { label: "International Business", points: 20 },
        { label: "Regional Business", points: 10 },
      ],
    },
  },
};
