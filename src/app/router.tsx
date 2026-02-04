import { createBrowserRouter, Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";

import Dashboard from "@/pages/Dashboard";
import Exercises from "@/pages/Exercises";
import Workouts from "@/pages/Workouts";
import Nutrition from "@/pages/Nutrition";
import Progress from "@/pages/Progress";
import Calculator from "@/pages/Calculator";
import Settings from "@/pages/Settings";

function RootLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/exercises", element: <Exercises /> },
      { path: "/workouts", element: <Workouts /> },
      { path: "/nutrition", element: <Nutrition /> },
      { path: "/progress", element: <Progress /> },
      { path: "/calculator", element: <Calculator /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);
