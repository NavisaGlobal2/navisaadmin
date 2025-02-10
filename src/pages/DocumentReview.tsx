
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileCheck, FileText, FileX, Upload } from "lucide-react";

const DocumentReview = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Document Review</h1>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Documents
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Total Documents", value: "234", icon: FileText, color: "blue" },
            { title: "Approved", value: "156", icon: FileCheck, color: "green" },
            { title: "Rejected", value: "45", icon: FileX, color: "red" },
            { title: "Pending Review", value: "33", icon: Eye, color: "yellow" },
          ].map((stat, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Passport.pdf",
                  type: "Identity Document",
                  status: "Approved",
                  uploadedBy: "John Doe",
                  time: "2 hours ago"
                },
                {
                  name: "BankStatement.pdf",
                  type: "Financial Document",
                  status: "Pending",
                  uploadedBy: "Jane Smith",
                  time: "5 hours ago"
                },
                {
                  name: "Degree.pdf",
                  type: "Educational Document",
                  status: "Rejected",
                  uploadedBy: "Mike Johnson",
                  time: "1 day ago"
                }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-gray-400">{doc.type}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      doc.status === "Approved" 
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

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Document Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Identity Documents",
                  required: ["Passport", "National ID", "Birth Certificate"],
                  status: "complete"
                },
                {
                  title: "Financial Documents",
                  required: ["Bank Statements", "Tax Returns", "Pay Stubs"],
                  status: "incomplete"
                },
                {
                  title: "Educational Documents",
                  required: ["Degree Certificates", "Transcripts"],
                  status: "pending"
                }
              ].map((category, index) => (
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentReview;
