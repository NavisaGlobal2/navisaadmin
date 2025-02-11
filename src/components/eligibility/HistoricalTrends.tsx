
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const HistoricalTrends = () => {
  const trends = [
    { date: "Mar 2024", score: 85, changes: "+5", notes: "Improved work experience" },
    { date: "Feb 2024", score: 80, changes: "+10", notes: "Added new qualifications" },
    { date: "Jan 2024", score: 70, changes: "-5", notes: "Policy changes affected score" }
  ];

  return (
    <Card className="bg-white/5 border-white/10 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Historical Assessment Trends</CardTitle>
        <Button variant="outline" size="sm">
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort by Date
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trends.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{record.date}</div>
                <p className="text-sm text-gray-400">{record.notes}</p>
              </div>
              <div className="text-right">
                <div className="font-medium">{record.score}/100</div>
                <span className={`text-sm ${
                  record.changes.startsWith("+") ? "text-green-500" : "text-red-500"
                }`}>
                  {record.changes} points
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
