
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { VisaFormData } from "@/types/visa";

interface ScoreInputProps {
  form: UseFormReturn<VisaFormData>;
  label: string;
  path: string;
}

export function ScoreInput({ form, label, path }: ScoreInputProps) {
  return (
    <FormField
      control={form.control}
      name={path as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              min="0"
              max="100"
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
