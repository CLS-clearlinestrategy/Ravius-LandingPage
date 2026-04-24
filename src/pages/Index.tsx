import { lazy, Suspense, useEffect } from "react";
import { siteConfig, ContentBlockConfig } from "@/config/siteConfig";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useHeroVisibility } from "@/hooks/useHeroVisibility";

// ─── Above the fold: static imports — these MUST be ready before first paint ──
import Navbar from "@/components/layout/Navbar";
import ScrollVideoSection from "@/sections/ScrollVideoSection";

// ─── Below the fold: lazy imports — downloaded in the background, zero pop-in ─
// Defining these at module scope (not inside the component) ensures React keeps
// a stable reference across re-renders, preventing accidental double-fetches.
const ContentBlock            = lazy(() => import("@/sections/ContentBlock"));
const VideoContentBlock       = lazy(() => import("@/sections/VideoContentBlock"));
const FeaturesContentBlock    = lazy(() => import("@/sections/FeaturesContentBlock"));
const FAQContentBlock         = lazy(() => import("@/sections/FAQContentBlock"));
const TestimonialsContentBlock = lazy(() => import("@/sections/TestimonialsContentBlock"));
const LogoBarContentBlock     = lazy(() => import("@/sections/LogoBarContentBlock"));
const ProcessContentBlock     = lazy(() => import("@/sections/ProcessContentBlock"));
const TeamContentBlock        = lazy(() => import("@/sections/TeamContentBlock"));
const StatsContentBlock       = lazy(() => import("@/sections/StatsContentBlock"));
const ExperiencesGrid         = lazy(() => import("@/sections/ExperiencesGrid"));
const ContactForm             = lazy(() => import("@/sections/ContactForm"));
const Footer                  = lazy(() => import("@/components/layout/Footer"));

// ─── Height-preserving Suspense skeleton ────────────────────────────────────
// Prevents layout shift while a lazy chunk loads. The height estimate ensures
// Lenis scroll positions remain accurate even before sections are hydrated.
function SectionSkeleton({ minHeight = "500px" }: { minHeight?: string }) {
  return <div style={{ minHeight }} aria-hidden="true" />;
}

const renderBlock = (block: ContentBlockConfig) => {
  switch (block.type) {
    case "image":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="700px" />}>
          <ContentBlock data={block} />
        </Suspense>
      );
    case "video":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="600px" />}>
          <VideoContentBlock data={block} />
        </Suspense>
      );
    case "features":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="700px" />}>
          <FeaturesContentBlock data={block} />
        </Suspense>
      );
    case "faq":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="500px" />}>
          <FAQContentBlock data={block} />
        </Suspense>
      );
    case "testimonials":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="500px" />}>
          <TestimonialsContentBlock data={block} />
        </Suspense>
      );
    case "logobar":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="200px" />}>
          <LogoBarContentBlock data={block} />
        </Suspense>
      );
    case "process":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="600px" />}>
          <ProcessContentBlock data={block} />
        </Suspense>
      );
    case "team":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="500px" />}>
          <TeamContentBlock data={block} />
        </Suspense>
      );
    case "stats":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="300px" />}>
          <StatsContentBlock data={block} />
        </Suspense>
      );
    case "contact":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="500px" />}>
          <ContactForm />
        </Suspense>
      );
    case "experiences":
      return (
        <Suspense key={block.id} fallback={<SectionSkeleton minHeight="600px" />}>
          <ExperiencesGrid />
        </Suspense>
      );
  }
};

const Index = () => {
  useSmoothScroll();
  const { heroRef, isHeroVisible } = useHeroVisibility();

  // ─── Progressive prefetch via requestIdleCallback ─────────────────────────
  // Triggers chunk downloads during the browser's idle time, immediately after
  // the hero paints. By the time the user scrolls to section 2, the code is
  // already parsed — eliminating any pop-in risk from lazy loading.
  useEffect(() => {
    const prefetch = () => {
      import("@/sections/ContentBlock");
      import("@/sections/VideoContentBlock");
      import("@/sections/FeaturesContentBlock");
      import("@/sections/FAQContentBlock");
      import("@/sections/TestimonialsContentBlock");
      import("@/sections/LogoBarContentBlock");
      import("@/sections/ProcessContentBlock");
      import("@/sections/TeamContentBlock");
      import("@/sections/StatsContentBlock");
      import("@/sections/ExperiencesGrid");
      import("@/sections/ContactForm");
      import("@/components/layout/Footer");
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(prefetch, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      // Fallback for Safari < 16 which lacks requestIdleCallback
      const id = setTimeout(prefetch, 1500);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isHeroVisible={isHeroVisible} />

      <div ref={heroRef as React.RefObject<HTMLDivElement>}>
        <ScrollVideoSection />
      </div>

      {siteConfig.contentBlocks.map(renderBlock)}

      <Suspense fallback={<SectionSkeleton minHeight="300px" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
