import { Loader2 } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Loader({ label = "Loading..." }) {
  return (
    <BlurFade delay={0.1}>
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>
          <Loader2 className="h-12 w-12 animate-spin text-emerald-400 relative" />
        </div>
        <p className="text-sm text-zinc-400 font-medium">{label}</p>
      </div>
    </BlurFade>
  );
}
