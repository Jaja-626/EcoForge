import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WaterCalculator } from './components/WaterCalculator';
import { AiTips } from './components/AiTips';
import { Statistics } from './components/Statistics';
import { TrackingDashboard } from './components/TrackingDashboard';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-50 relative overflow-hidden">
      {/* Frutiger Aero bubble decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-2xl bubble-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl bubble-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-300/25 to-cyan-300/25 rounded-full blur-2xl bubble-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-gradient-to-br from-cyan-300/15 to-emerald-300/15 rounded-full blur-3xl bubble-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-10 w-36 h-36 bg-gradient-to-br from-sky-400/20 to-cyan-400/20 rounded-full blur-2xl bubble-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10">
        <Hero />
        <AboutSection />
        <Statistics />
        <WaterCalculator />
        <TrackingDashboard />
        <AiTips />
        <Footer />
      </div>
    </div>
  );
}