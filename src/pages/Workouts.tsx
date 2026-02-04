import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import EmptyState from "@/components/common/EmptyState";
import { useWorkoutStore } from "@/store/workout.store";
import { Dumbbell, Plus, Trash2, Clock, Zap, Flame, Activity } from "lucide-react";

interface WorkoutSession {
  id: string;
  date: string;
  workoutName: string;
  duration: number; // minutes
  reps: number;
  caloriesBurned: number;
}

export default function Workouts() {
  const [name, setName] = useState("");
  const { workouts, addWorkout, removeWorkout } = useWorkoutStore();

  // Workout session tracking
  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [reps, setReps] = useState("");
  const [calories, setCalories] = useState("");
  
  const [sessions, setSessions] = useState<WorkoutSession[]>(
    JSON.parse(localStorage.getItem("workoutSessions") || "[]")
  );

  const handleAddWorkout = () => {
    if (!name.trim()) return;
    addWorkout(name.trim());
    setName("");
  };

  const addSession = () => {
    if (!workoutName.trim() || !duration || !reps || !calories) return;
    
    const newSession: WorkoutSession = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      workoutName: workoutName.trim(),
      duration: Number(duration),
      reps: Number(reps),
      caloriesBurned: Number(calories),
    };
    
    const updated = [...sessions, newSession];
    setSessions(updated);
    localStorage.setItem("workoutSessions", JSON.stringify(updated));
    
    setWorkoutName("");
    setDuration("");
    setReps("");
    setCalories("");
  };

  const deleteSession = (id: string) => {
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    localStorage.setItem("workoutSessions", JSON.stringify(updated));
  };

  // Calculate today's stats
  const getTodayStats = () => {
    const today = new Date().toLocaleDateString();
    const todaySessions = sessions.filter(s => s.date === today);
    
    return {
      totalWorkouts: todaySessions.length,
      totalTime: todaySessions.reduce((sum, s) => sum + s.duration, 0),
      totalReps: todaySessions.reduce((sum, s) => sum + s.reps, 0),
      totalCalories: todaySessions.reduce((sum, s) => sum + s.caloriesBurned, 0),
    };
  };

  const todayStats = getTodayStats();

  return (
    <div className="space-y-6">
      <BlurFade delay={0.1}>
        <div className="flex items-center gap-3">
          <Dumbbell className="h-8 w-8 text-emerald-400" />
          <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Workout Tracker
          </h1>
        </div>
      </BlurFade>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BlurFade delay={0.15}>
          <Card className="relative overflow-hidden bg-linear-to-br from-emerald-500/20 via-card to-card border-emerald-500/20">
            <BorderBeam size={150} duration={10} delay={0} colorFrom="#10b981" colorTo="#34d399" />
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Dumbbell className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">Sessions Today</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                <NumberTicker value={todayStats.totalWorkouts} />
              </h2>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.2}>
          <Card className="relative overflow-hidden bg-linear-to-br from-sky-500/20 via-card to-card border-sky-500/20">
            <BorderBeam size={150} duration={10} delay={2} colorFrom="#0ea5e9" colorTo="#38bdf8" />
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-500/20 rounded-lg">
                  <Clock className="h-4 w-4 text-sky-400" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">Time Today</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                <NumberTicker value={todayStats.totalTime} />
                <span className="text-sm text-muted-foreground ml-1">min</span>
              </h2>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.25}>
          <Card className="relative overflow-hidden bg-linear-to-br from-purple-500/20 via-card to-card border-purple-500/20">
            <BorderBeam size={150} duration={10} delay={4} colorFrom="#a855f7" colorTo="#c084fc" />
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Zap className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">Reps Today</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                <NumberTicker value={todayStats.totalReps} />
              </h2>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.3}>
          <Card className="relative overflow-hidden bg-linear-to-br from-orange-500/20 via-card to-card border-orange-500/20">
            <BorderBeam size={150} duration={10} delay={6} colorFrom="#f97316" colorTo="#fb923c" />
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Flame className="h-4 w-4 text-orange-400" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">Calories Today</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                <NumberTicker value={todayStats.totalCalories} />
              </h2>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Log Workout Session */}
      <BlurFade delay={0.35}>
        <Card className="relative overflow-hidden bg-card/50 border-border">
          <BorderBeam size={150} duration={12} delay={1} />
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-lg">Log Workout Session</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <Input
                placeholder="Workout name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="bg-secondary border-border"
              />
              <Input
                type="number"
                placeholder="Duration (min)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-secondary border-border"
              />
              <Input
                type="number"
                placeholder="Total reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="bg-secondary border-border"
              />
              <Input
                type="number"
                placeholder="Calories burned"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="bg-secondary border-border"
              />
              <Button 
                onClick={addSession}
                className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <BlurFade delay={0.4}>
          <Card className="relative overflow-hidden bg-card/50 border-border">
            <BorderBeam size={150} duration={15} delay={3} />
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Recent Sessions</h3>
              <div className="space-y-3">
                {sessions.slice().reverse().slice(0, 10).map((session, index) => (
                  <div 
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Dumbbell className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{session.workoutName}</h4>
                        <p className="text-xs text-muted-foreground">{session.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-semibold text-sky-400">{session.duration} min</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Reps</p>
                        <p className="font-semibold text-purple-400">{session.reps}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Calories</p>
                        <p className="font-semibold text-orange-400">{session.caloriesBurned}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSession(session.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      )}

      {/* Create Workout Plan */}
      <BlurFade delay={0.45}>
        <Card className="relative overflow-hidden bg-card/50 border-border">
          <BorderBeam size={150} duration={10} delay={5} />
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Create Workout Plan</h3>
            <div className="flex gap-3 max-w-2xl">
              <Input
                placeholder="Workout plan name (e.g., Push Day, Pull Day, Leg Day)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddWorkout()}
                className="bg-secondary border-border"
              />
              <Button 
                onClick={handleAddWorkout}
                className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Empty State */}
      {workouts.length === 0 && (
        <BlurFade delay={0.5}>
          <EmptyState
            title="No workout plans yet"
            description="Create your first workout plan to organize your exercises."
            actionLabel="Focus on Input Above"
            onAction={() =>
              document.querySelector<HTMLInputElement>("input")?.focus()
            }
          />
        </BlurFade>
      )}

      {/* Workout Plan Cards */}
      {workouts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((w, index) => (
            <BlurFade key={w.id} delay={0.5 + index * 0.1}>
              <Card className="relative overflow-hidden bg-card border-border hover:border-emerald-500/40 transition-all duration-300 hover:scale-105 group">
                <BorderBeam size={150} duration={12} delay={7 + index * 2} />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-xl text-foreground">{w.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {w.exercises.length} {w.exercises.length === 1 ? 'exercise' : 'exercises'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeWorkout(w.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <Button 
                      variant="secondary" 
                      className="w-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      )}
    </div>
  );
}
