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
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const scoringSchema = z.object({
  sections: z.object({
    education: z.number().min(0).max(100),
    experience: z.number().min(0).max(100),
    skills: z.number().min(0).max(100),
    achievements: z.number().min(0).max(100),
  }),
  thresholds: z.object({
    minimum: z.number().min(0).max(100),
    target: z.number().min(0).max(100),
  }),
});

type ScoringValues = z.infer<typeof scoringSchema>;

export const ScoringSettings = () => {
  const { toast } = useToast();
  const form = useForm<ScoringValues>({
    resolver: zodResolver(scoringSchema),
    defaultValues: {
      sections: {
        education: 30,
        experience: 30,
        skills: 20,
        achievements: 20,
      },
      thresholds: {
        minimum: 60,
        target: 80,
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

  return (
    <div className="space-y-8" role="region" aria-label="Scoring Settings">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div role="region" aria-label="Section weights">
            <h3 className="text-lg font-medium mb-6">Section Weights</h3>
            <div className="space-y-6">
              {Object.entries(form.getValues().sections).map(([key, value]) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`sections.${key}` as any}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base capitalize">{key}</FormLabel>
                        <span className="text-sm font-medium" aria-live="polite">
                          {field.value}%
                        </span>
                      </div>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          onValueChange={([value]) => field.onChange(value)}
                          max={100}
                          step={5}
                          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                          aria-label={`${key} weight percentage`}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <Separator role="separator" />

          <div role="region" aria-label="Score thresholds">
            <h3 className="text-lg font-medium mb-4">Score Thresholds</h3>
            <div className="space-y-4 rounded-lg border p-4">
              <FormField
                control={form.control}
                name="thresholds.minimum"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between gap-4">
                    <div>
                      <FormLabel className="text-base">Minimum Score</FormLabel>
                      <FormDescription>
                        Minimum score required for eligibility
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-24"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Separator className="my-4" />

              <FormField
                control={form.control}
                name="thresholds.target"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between gap-4">
                    <div>
                      <FormLabel className="text-base">Target Score</FormLabel>
                      <FormDescription>
                        Ideal score for strong candidates
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-24"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Scoring Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
