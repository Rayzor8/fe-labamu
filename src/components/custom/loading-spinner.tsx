"use client";
import { useEffect } from "react";

export default function LoadingSpinner() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed  inset-0 top-16  z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="h-20 w-20 rounded-full border-4 border-muted animate-pulse"></div>

          {/* Spinning ring */}
          <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>

          {/* Inner dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-primary animate-ping"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold text-foreground">
            Loading please wait
          </p>
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 rounded-full bg-primary animate-bounce"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
