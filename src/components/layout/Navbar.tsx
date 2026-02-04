import { Dumbbell, Github, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-border bg-background backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-linear-to-br from-emerald-500 to-sky-500 rounded-md">
            <Dumbbell className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-lg">FitPulse</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <Sparkles className="h-3 w-3 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">Enhanced with Magic UI</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Keep track of your progress
        </span>
        <ThemeToggle />
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
        </a>
      </div>
    </header>
  );
}
