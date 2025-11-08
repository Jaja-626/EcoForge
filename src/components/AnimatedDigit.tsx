// src/components/AnimatedDigit.tsx
import { useEffect, useState } from "react";

interface AnimatedDigitProps {
  digit: number;
  height?: number; // optional height of digit in px
}

export default function AnimatedDigit({ digit, height = 80 }: AnimatedDigitProps) {
  const [prevDigit, setPrevDigit] = useState(digit);

  useEffect(() => {
    if (digit !== prevDigit) {
      setPrevDigit(digit);
    }
  }, [digit, prevDigit]);

  return (
    <div className="relative overflow-hidden inline-block" style={{ height, width: height * 0.6 }}>
      <div
  className="absolute transition-transform duration-800 ease-in-out"
  style={{ transform: `translateY(-${digit * height}px)` }}
>
        {[0,1,2,3,4,5,6,7,8,9].map((d) => (
          <div
            key={d}
            className="flex items-center justify-center text-white font-extrabold"
            style={{ height, fontSize: `${height * 0.8}px` }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}