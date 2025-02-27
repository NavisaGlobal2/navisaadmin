
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { adminApi } from "@/services/api";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function VisaCriteriaList() {
  const [expandedVisa, setExpandedVisa] = useState<string | null>(null);

  const { data: visas = [], isLoading } = useQuery({
    queryKey: ["visas"],
    queryFn: adminApi.getAllVisas,
  });

  const toggleVisa = (visaName: string) => {
    setExpandedVisa(expandedVisa === visaName ? null : visaName);
  };

  const renderScoringCriteria = (criteria: any) => {
    if (!criteria) return null;

    const sections = [
      { title: "Education", data: criteria.education },
      { title: "Experience", data: criteria.experience },
      { title: "Achievements", data: criteria.achievements },
      { title: "Positions", data: criteria.positions },
      { title: "Language Proficiency", data: criteria.languageProficiency },
      { title: "Work Experience", data: criteria.workExperience },
      { title: "Financial Criteria", data: criteria.financialCriteria },
      { title: "Professional Criteria", data: criteria.professionalCriteria },
    ];

    return (
      <div className="space-y-4 mt-4">
        {sections.map(({ title, data }) => {
          if (!data) return null;

          return (
            <div key={title} className="border-t pt-4">
              <h4 className="font-medium mb-2">{title}</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(data).map(([key, value]) => {
                  if (typeof value === "object") {
                    return Object.entries(value as Record<string, number>).map(([subKey, subValue]) => (
                      <div key={`${key}-${subKey}`} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{formatKey(subKey)}:</span>
                        <span className="font-medium">{subValue}</span>
                      </div>
                    ));
                  }

                  return (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{formatKey(key)}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  if (isLoading) {
    return <div>Loading visa criteria...</div>;
  }

  return (
    <div className="space-y-4">
      {visas.map((visa: any) => (
        <Card key={visa.visa_name} className="overflow-hidden">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex justify-between items-center p-4 hover:bg-gray-50",
              expandedVisa === visa.visa_name && "bg-gray-50"
            )}
            onClick={() => toggleVisa(visa.visa_name)}
          >
            <span className="font-medium">{visa.visa_name}</span>
            {expandedVisa === visa.visa_name ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
          {expandedVisa === visa.visa_name && (
            <CardContent>
              {renderScoringCriteria(visa.criteras)}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
