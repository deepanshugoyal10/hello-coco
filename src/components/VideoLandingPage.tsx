"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function VideoOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(true); // Start with true to avoid flash
  const [hasCheckedNavigation, setHasCheckedNavigation] = useState(false);

  useEffect(() => {
    // Check navigation type immediately
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    const isPageLoad =
      navigation &&
      (navigation.type === "reload" || navigation.type === "navigate");

    // Check if coming from external source (not internal navigation)
    const isFromExternal =
      !document.referrer || !document.referrer.includes(window.location.origin);

    if (isPageLoad || isFromExternal) {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }

    setHasCheckedNavigation(true);
  }, []);

  useEffect(() => {
    if (!showVideo || !hasCheckedNavigation) return;

    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setShowVideo(false);
      // Navigate to current route to stay on same page, or to /order if on root
      if (window.location.pathname === "/") {
        router.push("/order");
      }
    };

    video.addEventListener("ended", handleVideoEnd);

    // Auto-play the video with a small delay to ensure it's ready
    setTimeout(() => {
      video.play().catch(console.error);
    }, 100);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [showVideo, hasCheckedNavigation, router]);

  // Don't render children until we've checked navigation type
  if (!hasCheckedNavigation) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <video
          ref={videoRef}
          className="w-full h-screen object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="/landing-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (showVideo) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <video
          ref={videoRef}
          className="w-full h-screen object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="/landing-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return <>{children}</>;
}
