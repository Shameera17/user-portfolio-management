"use client";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  initialValue?: number;
  targetValue?: number;
  duration?: number; // Duration in milliseconds to reach the target
  fillToFull?: boolean; // If true, animates to 100% after the target
  fullFillDelay?: number; // Delay before animating to 100% in milliseconds
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  initialValue = 0,
  targetValue = 100,
  duration = 500,
  fillToFull = false,
  fullFillDelay = 1000, // Default delay before going to 100%
}) => {
  const [progress, setProgress] = useState(initialValue);

  useEffect(() => {
    // Animate to the target value
    const timer = setTimeout(() => setProgress(targetValue), duration);

    // Optionally animate to full (100%) after the target is reached
    let fullFillTimer: NodeJS.Timeout | undefined;
    if (fillToFull) {
      fullFillTimer = setTimeout(
        () => setProgress(100),
        duration + fullFillDelay
      );
    }

    return () => {
      clearTimeout(timer);
      if (fullFillTimer) clearTimeout(fullFillTimer);
    };
  }, [targetValue, duration, fillToFull, fullFillDelay]);

  return <Progress value={progress} className="w-[60%]" />;
};
