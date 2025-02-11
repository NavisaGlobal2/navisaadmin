
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DocumentCategory {
  title: string;
  required: string[];
  status: "complete" | "incomplete" | "pending";
}

interface DocumentRequirementsProps {
  categories: DocumentCategory[];
}

export const DocumentRequirements = ({ categories }: DocumentRequirementsProps) => {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle>Document Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{category.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs ${
                category.status === "complete" 
                  ? "bg-green-500/20 text-green-500"
                  : category.status === "incomplete"
                  ? "bg-red-500/20 text-red-500"
                  : "bg-yellow-500/20 text-yellow-500"
              }`}>
                {category.status}
              </span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-400">
              {category.required.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
