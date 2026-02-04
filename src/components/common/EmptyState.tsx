import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  return (
    <BlurFade delay={0.2}>
      <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
        <div className="p-4 bg-zinc-800/50 rounded-full">
          <Inbox className="h-12 w-12 text-zinc-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-zinc-400 max-w-sm">{description}</p>
        </div>

        {actionLabel && (
          <Button 
            onClick={onAction} 
            className="mt-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </BlurFade>
  );
}
