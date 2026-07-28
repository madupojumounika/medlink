import React, { useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { ProblemSection, SolutionSection } from './components/ProblemSolutionSections';
import { PlatformOverview } from './components/PlatformOverview';
import { HowItWorksSection } from './components/HowItWorksSection';
import { UserRolesSection } from './components/UserRolesSection';
import { AITechSection } from './components/AITechSection';
import { DashboardShowcase } from './components/DashboardShowcase';
import { ImpactSection, TestimonialsSection, FaqSection, CtaSection } from './components/ImpactTestimonialsFaqCta';

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-gradient-to-b from-[#ecfdf5] via-[#f0fdf4] to-white text-slate-900 selection:bg-emerald-600 selection:text-white font-sans antialiased">
      {/* 1. Hero Section: Light Green UI & Multi-Image Isometric Collage */}
      <HeroSection />

      {/* 2. The Problem We Solve: Legacy Bottleneck Cards with Visual Avatars */}
      <ProblemSection />

      {/* 3. Our Solution: One Intelligent Ecosystem with Overlapping Image Compositions */}
      <SolutionSection />

      {/* 4. Platform Overview: Large Visual Showcase Cards with Real Telemetry Badges */}
      <PlatformOverview />

      {/* 5. How It Works: 5-Step Animated Protocol Timeline with Embedded Step Visuals */}
      <HowItWorksSection />

      {/* 6. User Roles: Built for All 6 Project Roles (Hospital Admin, Doctor, Coordinator, EMS, Admin, Patient) */}
      <UserRolesSection />

      {/* 7. AI Technology Section: Neural Telemetry & Core ML Architectures */}
      <AITechSection />

      {/* 8. Live Dashboard Showcase: 4 Interactive Command & EMS Previews */}
      <DashboardShowcase />

      {/* 9. Impact Section: Measured Clinical Telemetry & Outcomes */}
      <ImpactSection />

      {/* 10. Testimonials: Endorsements with Emerald Ring Avatars */}
      <TestimonialsSection />

      {/* 11. FAQ Section: Interactive Knowledge Accordion */}
      <FaqSection />

      {/* 12. Final CTA Section: Enterprise Onboarding Banner */}
      <CtaSection />
    </div>
  );
}
