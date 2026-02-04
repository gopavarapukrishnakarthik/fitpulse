import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  TrendingUp,
  Calculator,
  Settings,
  ListTodo,
} from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/exercises", label: "Exercises", icon: Dumbbell },
  { to: "/workouts", label: "Workouts", icon: ListTodo },
  { to: "/nutrition", label: "Nutrition", icon: Apple },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/calculator", label: "Calculator", icon: Calculator },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-background border-r border-border min-h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-8 px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-linear-to-br from-emerald-500 to-sky-500 rounded-lg">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              FitPulse
            </h1>
            <p className="text-xs text-muted-foreground">
              Your Fitness Companion
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 " +
              (isActive
                ? "bg-linear-to-r from-emerald-500/20 to-sky-500/20 text-emerald-400 border border-emerald-500/20"
                : "text-muted-foreground hover:bg-accent hover:text-foreground")
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom card — moves to end naturally */}
      <div className="mt-auto pt-4">
        <div className="p-4 bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Built with ❤️ for your fitness journey
          </p>
        </div>
      </div>
    </aside>
  );
}

