
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormSettings } from "./FormSettings";
import { ScoringSettings } from "./ScoringSettings";

export const FrameworkSettings = () => {
  return (
    <Card className="p-6">
      <Tabs defaultValue="form" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Assessment Form</TabsTrigger>
          <TabsTrigger value="scoring">Scoring Framework</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="mt-6">
          <FormSettings />
        </TabsContent>
        <TabsContent value="scoring" className="mt-6">
          <ScoringSettings />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
