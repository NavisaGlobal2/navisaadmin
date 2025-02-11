
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, Percent, ThumbsDown } from "lucide-react";

export const StatsOverview = () => {
  const stats = [
    { title: "Success Rate", value: "78%", icon: ThumbsUp, color: "green" },
    { title: "Average Score", value: "82/100", icon: Percent, color: "blue" },
    { title: "Rejection Rate", value: "22%", icon: ThumbsDown, color: "red" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              {stat.title}
            </CardTitle>
            <stat.icon className={`w-4 h-4 text-${stat.color}-500`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
