
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Document } from "@/types/application";

interface RecentDocumentsProps {
  documents: Document[];
}

export const RecentDocuments = ({ documents }: RecentDocumentsProps) => {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle>Recent Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h4 className="font-medium">{doc.name}</h4>
              <p className="text-sm text-gray-400">{doc.type}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs ${
                doc.status === "Verified" 
                  ? "bg-green-500/20 text-green-500"
                  : doc.status === "Pending"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "bg-red-500/20 text-red-500"
              }`}>
                {doc.status}
              </span>
              <p className="text-sm text-gray-400 mt-1">{doc.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
