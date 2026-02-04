import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Settings as SettingsIcon, Trash2, AlertTriangle } from "lucide-react";

export default function Settings() {
  const reset = () => {
    if (confirm("Are you sure you want to reset all data? This action cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <BlurFade delay={0.1}>
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-8 w-8 text-emerald-400" />
          <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>
      </BlurFade>

      <BlurFade delay={0.2}>
        <Card className="relative overflow-hidden bg-card/50 border-border max-w-2xl">
          <BorderBeam size={150} duration={10} colorFrom="#ef4444" colorTo="#f97316" />
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-lg">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">
                  Resetting will permanently delete all your workouts, progress logs, and data. This action cannot be undone.
                </p>
                <Button 
                  variant="destructive" 
                  onClick={reset}
                  className="mt-3 bg-red-500 hover:bg-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset All Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      <BlurFade delay={0.3}>
        <Card className="relative overflow-hidden bg-card/50 border-border max-w-2xl">
          <BorderBeam size={150} duration={12} delay={5} />
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">About FitPulse</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Version:</strong> 1.0.0
              </p>
              <p>
                <strong className="text-foreground">Purpose:</strong>   Helping you plan, track, and improve your fitness—every day.

              </p>
              <p>
                <strong className="text-foreground">Technologies:</strong> React, TypeScript, Tailwind CSS, Zustand, Magic UI
              </p>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
