
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Section Weights</h3>
            <div className="space-y-4">
              {Object.entries(form.getValues().sections).map(([key, value]) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`sections.${key}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between mb-2">
                        <FormLabel className="capitalize">{key}</FormLabel>
                        <span className="text-sm text-gray-400">
                          {field.value}%
                        </span>
                      </div>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          onValueChange={([value]) => field.onChange(value)}
                          max={100}
                          step={5}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Score Thresholds</h3>
            <Card className="bg-white/5">
              <CardContent className="pt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="thresholds.minimum"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div>
                        <FormLabel>Minimum Score</FormLabel>
                        <FormDescription>
                          Minimum score required for eligibility
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thresholds.target"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div>
                        <FormLabel>Target Score</FormLabel>
                        <FormDescription>
                          Ideal score for strong candidates
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Button type="submit" className="w-full">
            Save Scoring Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
