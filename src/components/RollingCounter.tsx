// src/components/RollingCounter.tsx
import { useEffect, useState } from "react";
import AnimatedDigit from "./AnimatedDigit";

interface RollingCounterProps {
  start?: number;
  increment?: number;
  intervalMs?: number;
}

export default function RollingCounter({
  start = 200246,
  increment = 1,
  intervalMs = 10000,
}: RollingCounterProps) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((prev) => prev + increment);
    }, intervalMs);

    return () => clearInterval(id);
  }, [increment, intervalMs]);

  const digits = value.toString().split("").map(Number);

  return (
    <div className="flex gap-1">
      {digits.map((digit, i) => (
        <AnimatedDigit key={i} digit={digit} />
      ))}
    </div>
  );
}