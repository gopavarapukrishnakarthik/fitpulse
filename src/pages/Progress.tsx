import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TrendingUp, Plus, Flame, Scale } from "lucide-react";
import Loader from "@/components/common/Loader";

interface CalorieEntry {
  id: string;
  date: string;
  calories: number;
  activity: string;
}

interface WeightEntry {
  id: string;
  date: string;
  value: number;
}

const WEIGHT_STORAGE_KEY = "fitness-weight-data";
const CALORIE_STORAGE_KEY = "fitness-calorie-data";

export default function Progress() {
  const [weight, setWeight] = useState("");
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);
  
  const [calories, setCalories] = useState("");
  const [activity, setActivity] = useState("");
  const [calorieData, setCalorieData] = useState<CalorieEntry[]>([]);
  
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    try {
      const storedWeight = localStorage.getItem(WEIGHT_STORAGE_KEY);
      const storedCalories = localStorage.getItem(CALORIE_STORAGE_KEY);
      
      setWeightData(storedWeight ? JSON.parse(storedWeight) : []);
      setCalorieData(storedCalories ? JSON.parse(storedCalories) : []);
    } catch (error) {
      console.error("Error loading data:", error);
      setWeightData([]);
      setCalorieData([]);
    } finally {
      setLoading(false);
    }
  };

  const addWeight = () => {
    if (!weight.trim()) return;
    
    const date = new Date().toLocaleDateString();
    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      date,
      value: Number(weight),
    };
    
    const updatedData = [...weightData, newEntry];
    setWeightData(updatedData);
    localStorage.setItem(WEIGHT_STORAGE_KEY, JSON.stringify(updatedData));
    setWeight("");
  };

  const addCalories = () => {
    if (!calories.trim() || !activity.trim()) return;
    
    const date = new Date().toLocaleDateString();
    const newEntry: CalorieEntry = {
      id: Date.now().toString(),
      date,
      calories: Number(calories),
      activity: activity.trim(),
    };
    
    const updatedData = [...calorieData, newEntry];
    setCalorieData(updatedData);
    localStorage.setItem(CALORIE_STORAGE_KEY, JSON.stringify(updatedData));
    setCalories("");
    setActivity("");
  };

  // Calculate today's total calories
  const getTodayCalories = (): number => {
    const today = new Date().toLocaleDateString();
    return calorieData
      .filter(entry => entry.date === today)
      .reduce((sum, entry) => sum + entry.calories, 0);
  };

  // Get calories by date for chart
  const getCalorieChartData = () => {
    const dateMap = new Map<string, number>();
    
    calorieData.forEach(entry => {
      const current = dateMap.get(entry.date) || 0;
      dateMap.set(entry.date, current + entry.calories);
    });
    
    return Array.from(dateMap.entries())
      .map(([date, calories]) => ({ date, calories }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  if (loading) {
    return <Loader label="Loading progress data..." />;
  }

  const todayCalories = getTodayCalories();
  const calorieChartData = getCalorieChartData();

  return (
    <div className="space-y-6">
      <BlurFade delay={0.1}>
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-emerald-400" />
          <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Progress Tracker
          </h1>
        </div>
      </BlurFade>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BlurFade delay={0.15}>
          <Card className="relative overflow-hidden bg-linear-to-br from-orange-500/20 via-card to-card border-orange-500/20">
            <BorderBeam size={150} duration={10} delay={0} colorFrom="#f97316" colorTo="#fb923c" />
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Flame className="h-6 w-6 text-orange-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Calories Burned Today</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                <NumberTicker value={todayCalories} />
                <span className="text-lg text-muted-foreground ml-2">kcal</span>
              </h2>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.2}>
          <Card className="relative overflow-hidden bg-linear-to-br from-sky-500/20 via-card to-card border-sky-500/20">
            <BorderBeam size={150} duration={10} delay={2} colorFrom="#0ea5e9" colorTo="#38bdf8" />
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-500/20 rounded-lg">
                  <Scale className="h-6 w-6 text-sky-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Current Weight</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                {weightData.length > 0 ? (
                  <>
                    <NumberTicker value={weightData[weightData.length - 1].value} />
                    <span className="text-lg text-muted-foreground ml-2">kg</span>
                  </>
                ) : (
                  <span className="text-2xl text-muted-foreground">No data</span>
                )}
              </h2>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Log Calories Burned */}
      <BlurFade delay={0.25}>
        <Card className="relative overflow-hidden bg-card/50 border-border">
          <BorderBeam size={150} duration={12} delay={1} />
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="h-5 w-5 text-orange-400" />
              <h3 className="font-semibold text-lg">Log Calories Burned</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl">
              <Input
                placeholder="Activity (e.g., Running, Cycling)"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="bg-secondary border-border"
              />
              <Input
                type="number"
                placeholder="Calories burned"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCalories()}
                className="bg-secondary border-border"
              />
              <Button 
                onClick={addCalories}
                className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Calories
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Log Weight */}
      <BlurFade delay={0.3}>
        <Card className="relative overflow-hidden bg-card/50 border-border">
          <BorderBeam size={150} duration={10} delay={3} />
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="h-5 w-5 text-sky-400" />
              <h3 className="font-semibold text-lg">Log Weight</h3>
            </div>
            <div className="flex gap-3 max-w-md">
              <Input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addWeight()}
                className="bg-secondary border-border"
              />
              <Button 
                onClick={addWeight}
                className="bg-linear-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Weight
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Calories Progress Chart */}
      {calorieChartData.length > 0 && (
        <BlurFade delay={0.35}>
          <Card className="relative overflow-hidden bg-card/50 border-border">
            <BorderBeam size={200} duration={15} delay={5} colorFrom="#f97316" colorTo="#fb923c" />
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Calories Burned Progress</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={calorieChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="calories"
                      stroke="#f97316"
                      strokeWidth={3}
                      dot={{ fill: '#f97316', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      )}

      {/* Weight Progress Chart */}
      <BlurFade delay={0.4}>
        <Card className="relative overflow-hidden bg-card/50 border-border">
          <BorderBeam size={200} duration={15} delay={7} colorFrom="#0ea5e9" colorTo="#38bdf8" />
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Weight Progress</h3>
            {weightData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No progress data yet. Start logging your weight!</p>
                </div>
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
