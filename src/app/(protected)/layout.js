"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Sidebar, FooterCompact, LoggedInHeader } from "@/components";
import LoadingScreen from "@/components/screens/LoadingScreen";

function AuthLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { status } = useSession();

  // Wait for session to be loaded before rendering protected content
  // This ensures API calls have the auth token available
  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
      <div className="flex-1 pt-16 lg:ml-20 xl:ml-64">
        <LoggedInHeader mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
        {children}
        <FooterCompact />
      </div>
    </div>
  );
}

export default AuthLayout;