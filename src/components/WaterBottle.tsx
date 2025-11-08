import { useState } from 'react';
import { motion } from 'motion/react';

export function WaterBottle() {
  const [waterLevel, setWaterLevel] = useState(0);

  const addWater = () => {
    setWaterLevel((prev) => Math.min(prev + 12.5, 100));
  };

  const resetWater = () => {
    setWaterLevel(0);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="relative w-48 h-80">
        <svg
          viewBox="0 0 120 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bottle outline */}
          <path
            d="M 45 20 L 45 10 L 75 10 L 75 20 L 80 25 L 80 185 C 80 190 75 195 70 195 L 50 195 C 45 195 40 190 40 185 L 40 25 Z"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Cap */}
          <rect
            x="42"
            y="5"
            width="36"
            height="10"
            rx="2"
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Water mask - clips the water to bottle shape */}
          <defs>
            <clipPath id="bottle-mask">
              <path d="M 43 27 L 43 185 C 43 188 46 192 50 192 L 70 192 C 74 192 77 188 77 185 L 77 27 Z" />
            </clipPath>
          </defs>

          {/* Water fill */}
          <motion.rect
            x="43"
            y="27"
            width="34"
            height="165"
            clipPath="url(#bottle-mask)"
            fill="url(#water-gradient)"
            initial={{ y: 192 }}
            animate={{ y: 192 - (165 * waterLevel / 100) }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Water gradient */}
          <defs>
            <linearGradient id="water-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Water surface wave effect */}
          {waterLevel > 0 && (
            <motion.ellipse
              cx="60"
              cy={192 - (165 * waterLevel / 100)}
              rx="17"
              ry="2"
              fill="#93c5fd"
              opacity="0.5"
              animate={{
                ry: [2, 2.5, 2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </svg>

        {/* Water level percentage */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-slate-600">
            {waterLevel}%
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={addWater}
          disabled={waterLevel >= 100}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Add Water
        </button>
        <button
          onClick={resetWater}
          className="px-6 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors"
        >
          Empty
        </button>
      </div>
    </div>
  );
}