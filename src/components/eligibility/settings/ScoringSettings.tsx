
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { scoringSchema, type ScoringValues, visaRequirements, visaTypeSchema } from "./scoring-schema";

type VisaType = z.infer<typeof visaTypeSchema>;

export const ScoringSettings = () => {
  const { toast } = useToast();
  const [selectedVisa, setSelectedVisa] = useState<VisaType>("UK_GLOBAL_TALENT");
  const [editedRequirements, setEditedRequirements] = useState(visaRequirements);
  
  const form = useForm<ScoringValues>({
    resolver: zodResolver(scoringSchema),
    defaultValues: {
      selectedVisa: selectedVisa,
      education: {
        qualification: 100,
        fieldBonus: 20,
        institutionRanking: 20,
      },
      experience: {
        years: 100,
        positionLevel: 20,
      },
      achievements: {
        count: 100,
        impactBonus: 20,
      },
      additionalCriteria: {
        language: 100,
        financials: 100,
      },
    },
  });

  const onSubmit = (data: ScoringValues) => {
    console.log(data);
    toast({
      title: "Settings Updated",
      description: "Scoring framework has been successfully updated.",
    });
  };

  const handlePointsChange = (
    section: 'education' | 'experience' | 'achievements',
    subSection: string,
    index: number,
    newPoints: number
  ) => {
    setEditedRequirements(prev => ({
      ...prev,
      [selectedVisa]: {
        ...prev[selectedVisa],
        [section]: {
          ...prev[selectedVisa][section],
          [subSection]: prev[selectedVisa][section][subSection].map((item, i) =>
            i === index ? { ...item, points: newPoints } : item
          ),
        },
      },
    }));
  };

  const currentRequirements = editedRequirements[selectedVisa];

  return (
    <div className="space-y-8" role="region" aria-label="Scoring Settings">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="selectedVisa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visa Type</FormLabel>
                <Select
                  onValueChange={(value: VisaType) => {
                    field.onChange(value);
                    setSelectedVisa(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UK_GLOBAL_TALENT">UK Global Talent Visa</SelectItem>
                    <SelectItem value="US_EB1_EB2">US EB-1/EB-2 Visa</SelectItem>
                    <SelectItem value="CANADA_EXPRESS_ENTRY">Canada Express Entry</SelectItem>
                    <SelectItem value="DUBAI_GOLDEN_VISA">Dubai Golden Visa</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Education Requirements</h3>
                  <div className="grid gap-4">
                    {currentRequirements.education.qualifications.map((qual, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <span>{qual.label}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={qual.points}
                            onChange={(e) => handlePointsChange('education', 'qualifications', index, parseInt(e.target.value) || 0)}
                            className="w-24"
                            min="0"
                            max="100"
                          />
                          <span className="text-sm text-gray-500 w-12">points</span>
                        </div>
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <h4 className="font-medium">Field Bonuses</h4>
                    {currentRequirements.education.fieldBonuses.map((bonus, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <span>{bonus.label}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={bonus.points}
                            onChange={(e) => handlePointsChange('education', 'fieldBonuses', index, parseInt(e.target.value) || 0)}
                            className="w-24"
                            min="0"
                            max="100"
                          />
                          <span className="text-sm text-gray-500 w-12">points</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Experience Requirements</h3>
                  <div className="grid gap-4">
                    {currentRequirements.experience.years.map((exp, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <span>{exp.label}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={exp.points}
                            onChange={(e) => handlePointsChange('experience', 'years', index, parseInt(e.target.value) || 0)}
                            className="w-24"
                            min="0"
                            max="100"
                          />
                          <span className="text-sm text-gray-500 w-12">points</span>
                        </div>
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <h4 className="font-medium">Position Bonuses</h4>
                    {currentRequirements.experience.positions.map((pos, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <span>{pos.label}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={pos.points}
                            onChange={(e) => handlePointsChange('experience', 'positions', index, parseInt(e.target.value) || 0)}
                            className="w-24"
                            min="0"
                            max="100"
                          />
                          <span className="text-sm text-gray-500 w-12">points</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Achievement Requirements</h3>
                  <div className="grid gap-4">
                    {currentRequirements.achievements.counts.map((ach, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <span>{ach.label}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={ach.points}
                            onChange={(e) => handlePointsChange('achievements', 'counts', index, parseInt(e.target.value) || 0)}
                            className="w-24"
                            min="0"
                            max="100"
                          />
                          <span className="text-sm text-gray-500 w-12">points</span>
                        </div>
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <h4 className="font-medium">Impact Bonuses</h4>
                    {currentRequirements.achievements.impact.map((imp, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <span>{imp.label}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={imp.points}
                            onChange={(e) => handlePointsChange('achievements', 'impact', index, parseInt(e.target.value) || 0)}
                            className="w-24"
                            min="0"
                            max="100"
                          />
                          <span className="text-sm text-gray-500 w-12">points</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">
            Save Scoring Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
