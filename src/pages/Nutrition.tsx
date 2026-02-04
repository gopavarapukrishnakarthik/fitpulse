import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Apple, Pizza, Salad } from "lucide-react";

export default function Nutrition() {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState<number | null>(null);

  const calculateCalories = () => {
    // demo logic for portfolio
    setCalories(food.length * 25);
  };

  return (
    <div className="space-y-6">
      <BlurFade delay={0.1}>
        <div className="flex items-center gap-3">
          <Apple className="h-8 w-8 text-emerald-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Nutrition Tracker
          </h1>
        </div>
      </BlurFade>

      <div className="grid md:grid-cols-2 gap-6">
        <BlurFade delay={0.2}>
          <Card className="relative overflow-hidden bg-card/50 border-border">
            <BorderBeam size={150} duration={10} />
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground font-medium">Food Item</label>
                <Input
                  placeholder="e.g., Chicken breast, Brown rice"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                  className="bg-secondary border-border"
                  onKeyPress={(e) => e.key === "Enter" && calculateCalories()}
                />
              </div>
              
              <Button 
                onClick={calculateCalories} 
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
              >
                Calculate Calories
              </Button>

              {calories !== null && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center space-y-1">
                  <p className="text-sm text-muted-foreground">Estimated Calories</p>
                  <p className="text-3xl font-bold text-emerald-400">
                    {calories} <span className="text-lg">kcal</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.3}>
          <Card className="relative overflow-hidden bg-card/50 border-border">
            <BorderBeam size={150} duration={12} delay={5} colorFrom="#f97316" colorTo="#fb923c" />
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Quick Tips</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Salad className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Eat More Vegetables</p>
                    <p className="text-xs text-muted-foreground">Fill half your plate with colorful veggies</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Pizza className="h-5 w-5 text-orange-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Balance Your Macros</p>
                    <p className="text-xs text-muted-foreground">Aim for protein, carbs, and healthy fats</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Apple className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Stay Hydrated</p>
                    <p className="text-xs text-muted-foreground">Drink at least 8 glasses of water daily</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>
    </div>
  );
}
