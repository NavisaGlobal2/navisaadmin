
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormSettings } from "./FormSettings";
import { ScoringSettings } from "./ScoringSettings";
import { ScrollArea } from "@/components/ui/scroll-area";

export const FrameworkSettings = () => {
  return (
    <Card className="p-6">
      <Tabs defaultValue="form" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Assessment Form</TabsTrigger>
          <TabsTrigger value="scoring">Scoring Framework</TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[70vh] pr-4" aria-label="Settings content">
          <TabsContent value="form" className="mt-6">
            <FormSettings />
          </TabsContent>
          <TabsContent value="scoring" className="mt-6">
            <ScoringSettings />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};
