import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Calculator as CalcIcon, Activity } from "lucide-react";

export default function Calculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const bmi =
    weight && height
      ? (Number(weight) / (Number(height) / 100) ** 2).toFixed(1)
      : null;

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (bmi < 25) return { label: "Normal", color: "text-emerald-400" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-400" };
    return { label: "Obese", color: "text-red-400" };
  };

  const category = bmi ? getBMICategory(Number(bmi)) : null;

  return (
    <div className="space-y-6">
      <BlurFade delay={0.1}>
        <div className="flex items-center gap-3">
          <CalcIcon className="h-8 w-8 text-emerald-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Fitness Calculator
          </h1>
        </div>
      </BlurFade>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
        <BlurFade delay={0.2}>
          <Card className="relative overflow-hidden bg-card/50 border-border">
            <BorderBeam size={150} duration={10} />
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-400" />
                BMI Calculator
              </h3>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground font-medium">Weight (kg)</label>
                  <Input
                    type="number"
                    placeholder="e.g., 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground font-medium">Height (cm)</label>
                  <Input
                    type="number"
                    placeholder="e.g., 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              {bmi && (
                <div className="mt-6 p-6 bg-gradient-to-br from-emerald-500/20 to-card border border-emerald-500/20 rounded-lg text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Your BMI</p>
                  <p className="text-5xl font-bold text-emerald-400">{bmi}</p>
                  {category && (
                    <p className={'text-lg font-semibold ' + category.color}>
                      {category.label}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.3}>
          <Card className="relative overflow-hidden bg-card/50 border-border">
            <BorderBeam size={150} duration={12} delay={5} colorFrom="#0ea5e9" colorTo="#38bdf8" />
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">BMI Categories</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-400">Underweight</p>
                  <p className="text-xs text-muted-foreground">BMI less than 18.5</p>
                </div>
                
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-sm font-medium text-emerald-400">Normal Weight</p>
                  <p className="text-xs text-muted-foreground">BMI 18.5 - 24.9</p>
                </div>
                
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <p className="text-sm font-medium text-orange-400">Overweight</p>
                  <p className="text-xs text-muted-foreground">BMI 25 - 29.9</p>
                </div>
                
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm font-medium text-red-400">Obese</p>
                  <p className="text-xs text-muted-foreground">BMI 30 or greater</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>
    </div>
  );
}
