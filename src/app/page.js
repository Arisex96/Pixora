// TODO:
// Chat & Image filter or Ai Edit feature
// Automatic EXIF data processing
// Real-time Updates: Live notifications and interactions
// Ai powered image search
// Complete personal analytics page

"use client";

import {
  Header,
  HeroSection,
  BenefitsSection,
  FeaturesSection,
  Footer,
} from "@/components";
import LoadingScreen from "@/components/screens/LoadingScreen";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to dashboard
  // The server check happens naturally via AuthContext's verifyUser
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  // Show loading only for authenticated users being redirected
  if (loading && isAuthenticated) {
    return <LoadingScreen />;
  }

  // Show the landing page IMMEDIATELY - no server check needed for new visitors
  return (
    <>
      <Header />
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <Footer />
    </>
  );
}
