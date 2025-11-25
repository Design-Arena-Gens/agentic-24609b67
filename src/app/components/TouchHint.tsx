"use client";

import { useEffect, useState } from "react";

const detectTouch = () => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export function TouchHint() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(detectTouch());
  }, []);

  return (
    <div className="fixed bottom-4 right-4 text-xs text-white/40 uppercase tracking-[0.35em]">
      {touch ? "tap to enter the hum" : "click to enter the hum"}
    </div>
  );
}
