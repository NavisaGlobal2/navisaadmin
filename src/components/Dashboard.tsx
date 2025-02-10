
import { Calendar, CheckCircle, Clock, FileCheck, Loader2, Users, ArrowUp, ArrowDown, BookOpen } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Users",
            value: "1,234",
            change: "+12%",
            trend: "up",
            icon: Users,
          },
          {
            title: "Active Applications",
            value: "856",
            change: "+5%",
            trend: "up",
            icon: FileCheck,
          },
          {
            title: "Pending Reviews",
            value: "123",
            change: "-8%",
            trend: "down",
            icon: Clock,
          },
          {
            title: "Consultations",
            value: "45",
            change: "+15%",
            trend: "up",
            icon: BookOpen,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
              </div>
              <div className="p-2 bg-white/5 rounded-lg">
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              {stat.trend === "up" ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={stat.trend === "up" ? "text-green-500" : "text-red-500"}
              >
                {stat.change}
              </span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-6">Recent Applications</h3>
          <div className="space-y-4">
            {[
              {
                name: "John Doe",
                type: "Student Visa",
                status: "In Review",
                date: "2024-02-15",
              },
              {
                name: "Jane Smith",
                type: "Work Permit",
                status: "Pending",
                date: "2024-02-14",
              },
              {
                name: "Mike Johnson",
                type: "Tourist Visa",
                status: "Approved",
                date: "2024-02-13",
              },
            ].map((application, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5"
              >
                <div>
                  <h4 className="font-medium">{application.name}</h4>
                  <p className="text-sm text-gray-400">{application.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{application.status}</span>
                  <p className="text-sm text-gray-400">{application.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            View All Applications
          </button>
        </div>

        {/* Application Status */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-6">System Status</h3>
          
          <div className="space-y-6">
            {[
              {
                icon: CheckCircle,
                title: "AI Assessment System",
                description: "Operating normally",
                status: "operational",
              },
              {
                icon: CheckCircle,
                title: "Document Processing",
                description: "All systems operational",
                status: "operational",
              },
              {
                icon: Loader2,
                title: "Database Sync",
                description: "Syncing latest updates",
                status: "syncing",
              },
              {
                icon: Clock,
                title: "Scheduled Maintenance",
                description: "Upcoming in 2 days",
                status: "pending",
              },
            ].map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === "operational"
                        ? "bg-green-500"
                        : step.status === "syncing"
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
                  <h4 className="font-medium">{step.title}</h4>
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
