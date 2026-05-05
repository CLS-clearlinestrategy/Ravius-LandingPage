import { siteConfig } from "@/config/siteConfig";
import ScrollVideo from "@/components/core/ScrollVideo";
import RevealBlock from "@/components/core/RevealBlock";
import { ArrowRight, ChevronDown } from "lucide-react";
import { globalLenis } from "@/hooks/useSmoothScroll";

const ScrollVideoSection = () => {
  const { scrollVideo } = siteConfig;

  const scrollToSecondSlide = (e: React.MouseEvent) => {
    e.preventDefault();

    if (window.innerWidth < 768) {
      const targetSection = document.getElementById("differentials");
      if (targetSection) {
        if (globalLenis) {
          globalLenis.scrollTo(targetSection, { duration: 1.5 });
        } else {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }
      return;
    }

    const section = document.getElementById("scroll-video");
    if (section) {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      const targetScroll = top + scrollableHeight * 0.7;

      if (globalLenis) {
        globalLenis.scrollTo(targetScroll, { duration: 1.5 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="scroll-video">
      <ScrollVideo
        introLoopSrc={scrollVideo.introLoopSrc}
        src={scrollVideo.src}
        scrollHeight={scrollVideo.scrollHeight}
        videoOpacity={scrollVideo.videoOpacity}
        mobileFallbackImage={scrollVideo.mobileFallbackImage}
      >
        {(progress) => {
          /* First slide: visible 0–30%, fades out 30–50% */
          const firstOpacity =
            progress < 0.3 ? 1 : progress > 0.5 ? 0 : 1 - (progress - 0.3) / 0.2;
          const firstY = progress < 0.3 ? 0 : -(progress - 0.3) * 250;

          /* Second slide: fades in 50–70%, stays 70–100% */
          const secondOpacity =
            progress < 0.5 ? 0 : progress > 0.7 ? 1 : (progress - 0.5) / 0.2;
          const secondY =
            progress < 0.5 ? 60 : progress > 0.7 ? 0 : 60 * (1 - (progress - 0.5) / 0.2);

          return (
            <>
              {/* ── Slide 1 ── */}
              {scrollVideo.slides[0] && (
                <div
                  className="absolute inset-0 z-10 flex items-center pointer-events-none"
                  style={{
                    opacity: firstOpacity,
                    transform: `translateY(${firstY}px)`,
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-12 w-full">
                      <div className="flex flex-col gap-6">
                        <RevealBlock>
                          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-foreground">
                            {scrollVideo.slides[0].title}{" "}
                            {scrollVideo.slides[0].highlight && (
                              <span className="text-primary">
                                {scrollVideo.slides[0].highlight}
                              </span>
                            )}
                          </h2>
                        </RevealBlock>

                        {scrollVideo.slides[0].description && (
                          <RevealBlock delay={150}>
                            <p className="text-lg text-muted-foreground max-w-[45ch]">
                              {scrollVideo.slides[0].description}
                            </p>
                          </RevealBlock>
                        )}

                        <div className="flex gap-4 pt-4 pointer-events-auto">
                          <button
                            onClick={scrollToSecondSlide}
                            className="px-6 py-3 bg-white text-zinc-950 rounded-full flex items-center justify-center gap-2 font-semibold hover:bg-white/90 transition-colors"
                          >
                            Comece agora <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle scroll indicator */}
                  <button
                    onClick={scrollToSecondSlide}
                    className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity pointer-events-auto group"
                  >
                    <span className="text-xs uppercase tracking-widest font-medium"></span>
                    <ChevronDown className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* ── Slide 2 ── */}
              {scrollVideo.slides[1] && (
                <div
                  className="absolute inset-0 z-10 flex items-center pointer-events-none"
                  style={{
                    opacity: secondOpacity,
                    transform: `translateY(${secondY}px)`,
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                    <div className="flex flex-col gap-6 max-w-3xl">
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-foreground">
                        {scrollVideo.slides[1].title}
                        {scrollVideo.slides[1].highlight && (
                          <span className="text-primary">
                            {" "}{scrollVideo.slides[1].highlight}
                          </span>
                        )}
                      </h2>

                      {scrollVideo.slides[1].description && (
                        <p className="text-lg text-muted-foreground max-w-[45ch]">
                          {scrollVideo.slides[1].description}
                        </p>
                      )}

                    </div>
                  </div>
                </div>
              )}
            </>
          );
        }}
      </ScrollVideo>
    </section>
  );
};

export default ScrollVideoSection;
