import { Card, CardContent } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";

export function StatCard({ icon, label, value }: any) {
  return (
    <BlurFade>
      <Card className="bg-linear-to-br from-emerald-500/20 to-card border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              {icon}
            </div>
            <span className="text-sm text-muted-foreground font-medium">{label}</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground">
            <NumberTicker value={value} />
          </h2>
        </CardContent>
      </Card>
    </BlurFade>
  );
}
