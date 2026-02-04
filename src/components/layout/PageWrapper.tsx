// components/layout/PageWrapper.tsx
import type  { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageWrapper({ children }: Props) {
  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">{children}</div>
    </main>
  );
}
