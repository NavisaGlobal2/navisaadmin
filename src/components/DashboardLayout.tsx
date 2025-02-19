
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
  Users,
  Menu
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import { NotificationCenter } from "./notifications/NotificationCenter";
import { useAuth } from "@/context/AuthContext"; // Add this import

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth(); // Add this line

  return (
    <div className="min-h-screen bg-nav text-nav-foreground flex">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-200 ease-in-out
        border-r border-white/10 p-6 flex flex-col bg-nav
      `}>
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
                  onClick={() => setSidebarOpen(false)}
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
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign out</span>
        </button>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 w-full overflow-auto">
        {/* Top bar with notifications */}
        <div className="flex justify-end mb-6">
          <NotificationCenter />
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
