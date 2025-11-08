{/* Top of page: General Overview & Buttons to calculate AI impact, Learn More */}
import { Droplets, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Glossy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1729670704325-bda6df165709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXQlMjBjb25zZXJ2YXRpb258ZW58MXx8fHwxNzYyNDU2ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Water conservation"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
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
          
          <h1 className="text-white mb-6 drop-shadow-lg">
            The Hidden Water Cost of AI
          </h1>
          
          <p className="text-white/95 max-w-3xl mx-auto mb-8 drop-shadow-md text-lg">
            Every AI query you make consumes water. Data centers powering AI models need massive cooling systems. 
            Training GPT-3 alone used an estimated 700,000 liters, and each 20–50 user prompts can consume about 500 mL of water. Discover your AI water footprint and learn how to use artificial intelligence more sustainably.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </div>
      
      {/* Glossy wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(224, 242, 254, 0.9)" />
              <stop offset="100%" stopColor="rgba(224, 242, 254, 1)" />
            </linearGradient>
          </defs>
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="url(#waveGradient)"/>
        </svg>
      </div>
    </div>
  );
}