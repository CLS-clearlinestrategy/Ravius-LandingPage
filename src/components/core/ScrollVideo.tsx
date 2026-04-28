import { useScrollVideo, type ScrollVideoConfig } from "@/hooks/useScrollVideo";
import { useIsMobile } from "@/hooks/use-mobile";
import { useParallax } from "@/hooks/useParallax";

interface ScrollVideoProps {
  /** Path or URL to the video file (will be fetched into memory as Blob) */
  src: string;
  /**
   * Static image shown on mobile in place of the scroll-scrubbed video.
   * Receives a lightweight parallax effect instead of video decoding.
   * If omitted, the video element is rendered (but not loaded) on mobile.
   */
  mobileFallbackImage?: string;
  /**
   * Content rendered inside the sticky viewport on top of the video.
   * Accepts either static ReactNode or a render-prop `(progress: number) => ReactNode`
   * so consumers can drive overlay animations from scroll progress.
   */
  children?: React.ReactNode | ((progress: number) => React.ReactNode);
  /** Total scroll height as CSS value. Default: "300vh" */
  scrollHeight?: string;
  /**
   * Scroll height used on mobile when rendering the image fallback.
   * Defaults to "100vh" so the mobile user gets a full-screen moment
   * without a 300vh dead-scroll zone.
   */
  mobileScrollHeight?: string;
  /** Additional className for the outer scroll-height container */
  className?: string;
  /** Additional className for the sticky viewport wrapper */
  stickyClassName?: string;
  /** Video opacity (0–1). Default: 0.5 */
  videoOpacity?: number;
  /** Whether to show a gradient overlay on top of the video. Default: true */
  gradientOverlay?: boolean;
  /** Scrubbing smoothing config forwarded to useScrollVideo */
  config?: ScrollVideoConfig;
}

/* ─── Mobile parallax image layer ─── */
const MobileParallaxImage = ({
  src,
  opacity = 0.5,
  gradientOverlay = true,
}: {
  src: string;
  opacity?: number;
  gradientOverlay?: boolean;
}) => {
  const { ref, offset } = useParallax({ speed: 0.6 });

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity,
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
          /* Slight oversizing prevents white edges during parallax travel */
          scale: "1.1",
        }}
        draggable={false}
      />
      {gradientOverlay && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

/**
 * Scroll-controlled video primitive with automatic mobile fallback.
 *
 * **Desktop:** Creates a tall scroll container with a sticky viewport that
 * scrubs through video frames as the user scrolls.
 *
 * **Mobile:** When `mobileFallbackImage` is provided, the video is never
 * loaded. Instead, a GPU-accelerated parallax image replaces it and
 * `mobileScrollHeight` (default `"100vh"`) is used so the section doesn't
 * waste 300vh of dead scroll.
 *
 * Supports render-prop children to expose scroll progress:
 * ```tsx
 * <ScrollVideo src="/my-video.mp4" mobileFallbackImage="/poster.png">
 *   {(progress) => (
 *     <div style={{ opacity: progress > 0.5 ? 1 : 0 }}>
 *       <h1>Appears at 50%</h1>
 *     </div>
 *   )}
 * </ScrollVideo>
 * ```
 */
const ScrollVideo = ({
  src,
  mobileFallbackImage,
  children,
  scrollHeight = "300vh",
  mobileScrollHeight = "100vh",
  className = "",
  stickyClassName = "",
  videoOpacity = 0.5,
  gradientOverlay = true,
  config,
}: ScrollVideoProps) => {
  const isMobile = useIsMobile();

  /* On mobile with a fallback image, disable all video scrubbing machinery */
  const videoDisabled = isMobile && !!mobileFallbackImage;

  const { containerRef, videoRef, isReady, progress } = useScrollVideo(src, {
    ...config,
    disabled: config?.disabled ?? videoDisabled,
  });

  const effectiveScrollHeight = videoDisabled ? mobileScrollHeight : scrollHeight;

  /*
   * On mobile: pass progress=0 to child render-prop so slide 1 is always
   * shown (fully visible at progress=0 per the consumer's fade logic).
   */
  const effectiveProgress = videoDisabled ? 0 : progress;
  const rendered =
    typeof children === "function" ? children(effectiveProgress) : children;

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`relative ${className}`}
      style={{ height: effectiveScrollHeight }}
    >
      <div
        className={`sticky top-0 h-screen overflow-hidden bg-background ${stickyClassName}`}
      >
        {/* ── Mobile: static parallax image ── */}
        {videoDisabled && mobileFallbackImage ? (
          <MobileParallaxImage
            src={mobileFallbackImage}
            opacity={videoOpacity}
            gradientOverlay={gradientOverlay}
          />
        ) : (
          /* ── Desktop: scroll-scrubbed video ── */
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{
              opacity: isReady ? videoOpacity : 0,
              willChange: "contents",
            }}
          />
        )}

        {/* Optional gradient overlay (desktop only — mobile has its own) */}
        {!videoDisabled && gradientOverlay && (
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Slotted content */}
        {rendered}
      </div>
    </div>
  );
};

export default ScrollVideo;
