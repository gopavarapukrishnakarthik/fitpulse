import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Flame, Dumbbell, TrendingUp, Activity, Target, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CalorieEntry {
  id: string;
  date: string;
  calories: number;
  activity: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const workouts = JSON.parse(localStorage.getItem("workouts") || "[]");
  const calorieData: CalorieEntry[] = JSON.parse(localStorage.getItem("fitness-calorie-data") || "[]");
  const progress = JSON.parse(localStorage.getItem("progress") || "[]");

  // Get the latest calorie entry
  const latestCalories = calorieData.length > 0 
    ? calorieData[calorieData.length - 1].calories 
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <BlurFade delay={0.1}>
        <div className="flex justify-between items-center">
          <AnimatedGradientText 
            className="text-4xl font-bold"
            colorFrom="#10b981"
            colorTo="#3b82f6"
          >
            Your Fitness Dashboard
          </AnimatedGradientText>

          <Button 
            onClick={() => navigate("/workouts")}
            className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/50"
          >
            <Activity className="mr-2 h-4 w-4" />
            Start Workout
          </Button>
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <BlurFade delay={0.2}>
          <Card className="relative overflow-hidden bg-linear-to-br from-emerald-500/20 via-card to-card border-emerald-500/20">
            <BorderBeam size={200} duration={12} delay={0} colorFrom="#10b981" colorTo="#34d399" />
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-emerald-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Total Workouts</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                <NumberTicker value={workouts.length} />
              </h2>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.3}>
          <Card className="relative overflow-hidden bg-linear-to-br from-orange-500/20 via-card to-card border-orange-500/20">
            <BorderBeam size={200} duration={12} delay={4} colorFrom="#f97316" colorTo="#fb923c" />
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Flame className="h-6 w-6 text-orange-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Latest Calories</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                <NumberTicker value={latestCalories} />
              </h2>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.4}>
          <Card className="relative overflow-hidden bg-linear-to-br from-sky-500/20 via-card to-card border-sky-500/20">
            <BorderBeam size={200} duration={12} delay={8} colorFrom="#0ea5e9" colorTo="#38bdf8" />
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-sky-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Progress Logs</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                <NumberTicker value={progress.length} />
              </h2>
            </CardContent>
          </Card>
        </BlurFade>

              {/* Quick Actions */}
      <BlurFade delay={0.5}>
        <Card className="relative overflow-hidden bg-card/50 border-border">
          <BorderBeam size={150} duration={10} colorFrom="#10b981" colorTo="#3b82f6" />
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-400" />
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button 
                variant="secondary" 
                className="bg-secondary hover:bg-secondary/80"
                onClick={() => navigate("/progress")}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Log Weight
              </Button>
              <Button 
                variant="secondary" 
                className="bg-secondary hover:bg-secondary/80"
                onClick={() => navigate("/calculator")}
              >
                <Activity className="mr-2 h-4 w-4" />
                Calculate BMI
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
      </div>



      {/* Motivation Section */}
      <BlurFade delay={0.6}>
        <Card className="relative overflow-hidden bg-linear-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border-purple-500/20">
          <BorderBeam size={250} duration={15} colorFrom="#a855f7" colorTo="#ec4899" />
          <CardContent className="p-8 text-center space-y-3">
            <Award className="h-12 w-12 text-purple-400 mx-auto" />
            <h3 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Keep pushing your limits!
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every workout brings you closer to your goals. Stay consistent and watch yourself transform.
            </p>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
