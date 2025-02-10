
import { 
  Calendar, 
  LayoutDashboard, 
  LogOut, 
  MessageSquare, 
  User, 
  BookOpen, 
  Users,
  FileText,
  Bell,
  Settings,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
              { icon: MessageSquare, label: "Consultations", path: "/consultations" },
              { icon: Bell, label: "Notifications", path: "/notifications" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
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
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
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
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b border-white/10 p-6 flex justify-between items-center backdrop-blur-sm bg-nav/50">
          <div>
            <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
            <p className="text-sm text-gray-400">Manage applications, users, and system settings</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <User className="w-5 h-5" />
              <span>Admin</span>
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
