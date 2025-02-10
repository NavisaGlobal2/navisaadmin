
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, Phone, Users } from "lucide-react";

const Consultations = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Consultations</h1>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Consultation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Total Consultations", value: "89", icon: MessageSquare, color: "blue" },
            { title: "Active Experts", value: "12", icon: Users, color: "green" },
            { title: "Upcoming Calls", value: "23", icon: Phone, color: "yellow" },
            { title: "Completed Today", value: "8", icon: Calendar, color: "purple" },
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
              <CardTitle>Upcoming Consultations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  client: "John Doe",
                  expert: "Sarah Wilson",
                  type: "Initial Consultation",
                  time: "Today, 2:00 PM",
                  status: "Confirmed"
                },
                {
                  client: "Jane Smith",
                  expert: "Michael Brown",
                  type: "Document Review",
                  time: "Tomorrow, 10:00 AM",
                  status: "Pending"
                },
                {
                  client: "Mike Johnson",
                  expert: "Emily Davis",
                  type: "Follow-up",
                  time: "Feb 25, 3:30 PM",
                  status: "Confirmed"
                }
              ].map((consultation, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium">{consultation.client}</h4>
                    <p className="text-sm text-gray-400">with {consultation.expert}</p>
                    <p className="text-sm text-gray-400">{consultation.type}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      consultation.status === "Confirmed" 
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}>
                      {consultation.status}
                    </span>
                    <p className="text-sm text-gray-400 mt-1">{consultation.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Expert Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Sarah Wilson",
                  specialization: "Student Visas",
                  availability: "Available",
                  nextSlot: "Today, 2:00 PM"
                },
                {
                  name: "Michael Brown",
                  specialization: "Work Permits",
                  availability: "Busy",
                  nextSlot: "Tomorrow, 9:00 AM"
                },
                {
                  name: "Emily Davis",
                  specialization: "Family Visas",
                  availability: "Available",
                  nextSlot: "Today, 4:30 PM"
                }
              ].map((expert, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium">{expert.name}</h4>
                    <p className="text-sm text-gray-400">{expert.specialization}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      expert.availability === "Available" 
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}>
                      {expert.availability}
                    </span>
                    <p className="text-sm text-gray-400 mt-1">Next: {expert.nextSlot}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Consultations;
