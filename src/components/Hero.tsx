import { Droplets, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import RollingCounter from "./RollingCounter";

export function Hero() {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1729670704325-bda6df165709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXQlMjBjb25zZXJ2YXRpb258ZW58MXx8fHwxNzYyNDU2ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Water conservation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center z-10">
        {/* Header & description */}
        <div className="flex items-center justify-center gap-3 mb-6 bubble-float">
          <div className="relative">
            <Droplets className="w-16 h-16 text-white drop-shadow-lg" />
            <div className="absolute inset-0 w-16 h-16 bg-white/30 rounded-full blur-xl" />
          </div>
          <div className="relative">
            <Sparkles className="w-10 h-10 text-cyan-100 drop-shadow-lg" />
            <div className="absolute inset-0 w-10 h-10 bg-cyan-200/40 rounded-full blur-lg" />
          </div>
        </div>

        <h1 className="text-white mb-6 drop-shadow-lg text-4xl sm:text-5xl font-extrabold">
          The Hidden Water Cost of AI
        </h1>

        <p className="text-white/95 max-w-3xl mx-auto mb-12 drop-shadow-md text-lg sm:text-xl">
          Every AI query you make consumes water. Data centers powering AI models need massive cooling systems. 
          Training GPT-3 alone used an estimated 700,000 liters, and each 20–50 user prompts can consume about 500 mL of water.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            onClick={scrollToCalculator}
            className="glass-button text-white border-white/40 shadow-lg hover:shadow-xl transition-all"
          >
            Calculate Your AI Impact
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white/20 backdrop-blur-md border-white/40 text-white hover:bg-white/30 shadow-lg hover:shadow-xl transition-all"
          >
            Learn More
          </Button>
        </div>

        {/* Rolling Counter Section */}
        <div className="flex flex-col items-center gap-2 mt-8">
        <RollingCounter start={20246} increment={1} intervalMs={1000} />
        <span className="text-3xl sm:text-4xl text-white font-semibold drop-shadow-lg">
        liters of water saved by Query Drop users (estimated)
  </span>
</div>
      </div>
    </div>
  );
}