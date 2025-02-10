
import { Calendar, CheckCircle, Clock, FileCheck, Loader2 } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 bg-white/10 hover:bg-white/15 rounded-lg transition-all duration-200 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Book Consultation
        </button>
        <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
          <FileCheck className="w-5 h-5" />
          Start Application
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assessment Results */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-2">Assessment Results</h3>
          <p className="text-gray-400 mb-6">Based on your latest eligibility assessment</p>
          
          <div className="text-center py-8">
            <p className="text-gray-300 mb-4">
              No assessment results available. Complete an eligibility assessment to see your results.
            </p>
            <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200">
              Check Your Eligibility
            </button>
          </div>
        </div>

        {/* Application Status */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-6">Application Status</h3>
          
          <div className="space-y-6">
            {[
              {
                icon: CheckCircle,
                title: "Documents Uploaded",
                date: "1/25/2025",
                description: "All required documents have been successfully uploaded",
                status: "complete",
              },
              {
                icon: Loader2,
                title: "Expert Review",
                description: "Documents currently under review by our team",
                status: "current",
              },
              {
                icon: Clock,
                title: "Application Submitted",
                description: "Review completion status",
                status: "pending",
              },
              {
                icon: Clock,
                title: "Final Result",
                description: "Awaiting final visa decision",
                status: "pending",
              },
            ].map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === "complete"
                        ? "bg-green-500"
                        : step.status === "current"
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  {index < 3 && (
                    <div className="absolute top-8 left-1/2 w-px h-10 bg-gray-700 -translate-x-1/2" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{step.title}</h4>
                    {step.date && (
                      <span className="text-sm text-gray-400">{step.date}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
