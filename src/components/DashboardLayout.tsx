
import { Calendar, LayoutDashboard, LogOut, MessageSquare, User, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-nav text-nav-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <h1 className="text-xl font-semibold">Navisa</h1>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {[
              { icon: LayoutDashboard, label: "Dashboard", path: "/" },
              { icon: MessageSquare, label: "Consultations", path: "/consultations" },
              { icon: BookOpen, label: "Resources", path: "/resources" },
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
            <h2 className="text-2xl font-semibold">Manage your visa application process and track your progress</h2>
          </div>
          <nav className="flex items-center gap-8">
            {["Home", "Pathways", "How it works", "Check your eligibility"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-200">
              Sign out
            </button>
          </nav>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
