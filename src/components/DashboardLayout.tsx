
import { 
  LayoutDashboard, 
  LogOut, 
  MessageSquare, 
  User, 
  FileText,
  Bell,
  Settings,
  ShieldCheck,
  Brain,
  FileCheck,
  Users
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-nav text-nav-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <h1 className="text-xl font-semibold">Navisa Admin</h1>
        </div>
        
        <nav className="flex-1">
          <div className="mb-4">
            <span className="px-4 text-xs font-semibold text-gray-400 uppercase">Main</span>
          </div>
          <ul className="space-y-1">
            {[
              { icon: LayoutDashboard, label: "Overview", path: "/" },
              { icon: Users, label: "User Management", path: "/users" },
              { icon: FileText, label: "Applications", path: "/applications" },
              { icon: Brain, label: "Eligibility", path: "/eligibility" },
              { icon: FileCheck, label: "Documents", path: "/documents" },
              { icon: MessageSquare, label: "Consultations", path: "/consultations" },
              { icon: Bell, label: "Notifications", path: "/notifications" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 mb-4">
            <span className="px-4 text-xs font-semibold text-gray-400 uppercase">Settings</span>
          </div>
          <ul className="space-y-1">
            {[
              { icon: Settings, label: "General", path: "/settings" },
              { icon: ShieldCheck, label: "Security", path: "/security" },
              { icon: User, label: "My Account", path: "/account" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200">
          <LogOut className="w-5 h-5" />
          <span>Sign out</span>
        </button