{/*Understanding AI's Water Footprint - Impact of Using AI*/}
import { Brain, Droplet, TrendingDown, Zap } from 'lucide-react';
import { Card } from './ui/card';

export function AboutSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI Water Consumption',
      description: 'Training GPT-3 consumed approximately 700,000 liters of water. Every query continues to use water for cooling.',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Droplet,
      title: 'Data Center Impact',
      description: 'AI data centers use water for cooling servers. A single ChatGPT conversation can consume up to 500ml of water.',
      gradient: 'from-sky-400 to-cyan-500'
    },
    {
      icon: TrendingDown,
      title: 'Growing Demand',
      description: 'AI computing demand doubles every 3-4 months, leading to exponential increases in water consumption.',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Zap,
      title: 'Sustainable Solutions',
      description: 'Understanding your AI usage helps make informed decisions about when and how to use AI tools responsibly.',
      gradient: 'from-emerald-400 to-cyan-500'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50/80 to-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Understanding AI's Water Footprint
          </h2>
          <p className="text-cyan-800 max-w-3xl mx-auto">
            Artificial intelligence isn't just virtual — it has a very real environmental impact. 
            The servers powering AI require massive amounts of water for cooling systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="glossy-card p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 aero-shine group">
                <div className={`bg-gradient-to-br ${feature.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white drop-shadow" />
                </div>
                <h3 className="mb-2 text-cyan-900">{feature.title}</h3>
                <p className="text-cyan-700">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}