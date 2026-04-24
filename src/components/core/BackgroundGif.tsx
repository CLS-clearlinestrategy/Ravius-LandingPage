import { cn } from '@/lib/utils';
import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';

export interface BackgroundGifProps {
  /** WebM (VP9) — primary format: GPU-composited, ~60% smaller than GIF */
  videoWebm?: string;
  /** MP4 (H.264) — Safari / iOS fallback */
  videoMp4?: string;
  /** Legacy GIF — only used if both video sources are absent */
  gifUrl?: string;
  overlayColor?: string;
  blur?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * BackgroundGif — renders a looping, muted background video (WebM/MP4).
 *
 * Why video instead of GIF?
 * - GIFs are CPU-decoded, frame-by-frame, with no GPU compositing.
 * - A looping <video> is hardware-accelerated and can be 10–50× smaller.
 * - Visual output is identical; performance impact is an order of magnitude less.
 *
 * Encoding reference (run once, commit resulting files to /public):
 *   ffmpeg -i input.gif -c:v libvpx-vp9 -b:v 0 -crf 40 -an public/bg-loop.webm
 *   ffmpeg -i input.gif -c:v libx264 -crf 35 -an public/bg-loop.mp4
 */
export function BackgroundGif({
  videoWebm  = siteConfig.backgroundGif.videoWebm,
  videoMp4   = siteConfig.backgroundGif.videoMp4,
  gifUrl     = siteConfig.backgroundGif.gifUrl,
  overlayColor = siteConfig.backgroundGif.overlayColor,
  blur       = siteConfig.backgroundGif.blur,
  className,
  children,
}: BackgroundGifProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = !!(videoWebm || videoMp4);

  // Track whether the video file actually loaded — fall back to GIF if missing
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    // Reset failure state when sources change
    setVideoFailed(false);
  }, [videoWebm, videoMp4]);

  const showVideo = hasVideo && !videoFailed;

  return (
    <>
      <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>

        {showVideo ? (
          /* ─── GPU-composited looping video ─────────────────────────────── */
          <video
            ref={videoRef}
            className={cn('absolute -inset-[10%] w-[120%] h-[120%] object-cover', blur)}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
            style={{ willChange: 'transform' }}
          >
            {videoWebm && <source src={videoWebm} type="video/webm" />}
            {videoMp4  && <source src={videoMp4}  type="video/mp4"  />}
          </video>
        ) : (
          /* ─── GIF fallback (only if no video sources available) ─────────── */
          <div
            className={cn('absolute -inset-[10%] bg-cover bg-center bg-no-repeat', blur)}
            style={{ backgroundImage: `url(${gifUrl})` }}
            aria-hidden="true"
          />
        )}

        <div className={cn('absolute inset-0', overlayColor)} />
      </div>
      {children}
    </>
  );
}
