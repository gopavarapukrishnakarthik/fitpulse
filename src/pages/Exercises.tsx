import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { getExercises } from "@/services/exercise.api";
import EmptyState from "@/components/common/EmptyState";
import Loader from "@/components/common/Loader";
import { getExerciseImage, resetImageTracking } from "@/utils/exerciseImages";
import { Dumbbell } from "lucide-react";

export default function Exercises() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resetImageTracking(); // Reset image tracking for new load
    getExercises()
      .then((data) => setExercises(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader label="Loading exercises..." />;
  }

  if (exercises.length === 0) {
    return (
      <EmptyState
        title="No exercises found"
        description="Try again later or check your connection."
      />
    );
  }

  return (
    <div className="space-y-6">
      <BlurFade delay={0.1}>
        <div className="flex items-center gap-3">
          <Dumbbell className="h-8 w-8 text-emerald-400" />
          <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Exercise Library
          </h1>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((ex, index) => {
          const translation =
            ex.translations?.find((t: any) => t.language === 2) ||
            ex.translations?.[0];

          const description = translation?.description
            ? translation.description.replace(/<[^>]+>/g, "")
            : "No description available.";

          // Get image based on category and exercise ID
          const imageUrl = getExerciseImage(ex.category?.name, ex.id);

          return (
            <BlurFade key={ex.id} delay={0.1 + index * 0.05}>
              <Card className="relative overflow-hidden bg-card border-border hover:border-emerald-500/40 transition-all duration-300 hover:scale-105 group">
                <BorderBeam size={150} duration={12} delay={index * 2} />
                <CardContent className="p-0 space-y-3">
                  <div className="relative overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={ex.name}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src = '/fitpulse/Images/Cardio/pexels-823sl-2294360.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent" />
                  </div>
                  
                  <div className="px-4 pb-4 space-y-3">
                    <h3 className="font-semibold text-lg text-foreground">{ex.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {description}
                    </p>
                    {ex.category?.name && (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        {ex.category.name}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
