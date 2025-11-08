{/* AI Tips - Best Practices for Reducing Water Usage */}
import { useState } from 'react';
import { Sparkles, Lightbulb, Code, Image, MessageSquare, RefreshCw } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Tip {
  category: string;
  icon: typeof Lightbulb;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  savings: string;
}

export function AiTips() {
  const allTips: Tip[] = [
    {
      category: 'Query Optimization',
      icon: MessageSquare,
      title: 'Be Specific in First Query',
      description: 'Craft detailed, specific prompts to get better answers on the first try. Vague queries lead to multiple follow-ups, multiplying water usage.',
      impact: 'High',
      savings: '30-40% reduction'
    },
    {
      category: 'Model Selection',
      icon: Sparkles,
      title: 'Use Lighter Models When Possible',
      description: 'For simple tasks like grammar checking or basic questions, use GPT-3.5 instead of GPT-4. Smaller models consume significantly less water.',
      impact: 'High',
      savings: '50-70% reduction'
    },
    {
      category: 'Image Generation',
      icon: Image,
      title: 'Limit AI Image Generation',
      description: 'AI image generation is particularly water-intensive. Use stock photos when possible, and generate images only for final outputs.',
      impact: 'High',
      savings: '100ml per image saved'
    },
    {
      category: 'Alternatives',
      icon: Lightbulb,
      title: 'Use Traditional Search First',
      description: 'For factual information, try traditional search engines before AI. AI should be reserved for tasks requiring reasoning or creativity.',
      impact: 'Medium',
      savings: '20-30% reduction'
    },
    {
      category: 'Coding',
      icon: Code,
      title: 'Batch Code Assistance Requests',
      description: 'Instead of asking AI to debug line-by-line, batch multiple questions. Review documentation first before turning to AI.',
      impact: 'Medium',
      savings: '25-35% reduction'
    },
    {
      category: 'Best Practice',
      icon: MessageSquare,
      title: 'Save and Reuse Responses',
      description: 'Keep a local repository of useful AI responses. Reuse solutions to similar problems instead of re-querying AI.',
      impact: 'Medium',
      savings: '15-25% reduction'
    },
    {
      category: 'Awareness',
      icon: Lightbulb,
      title: 'Ask "Do I Need AI?"',
      description: 'Before each AI query, pause and ask if the task truly requires AI or if a simpler tool would work. Build conscious usage habits.',
      impact: 'High',
      savings: '40-60% reduction'
    },
    {
      category: 'Efficiency',
      icon: Code,
      title: 'Use Local AI Tools',
      description: 'For repetitive tasks, consider running smaller AI models locally. This eliminates data center water consumption entirely.',
      impact: 'High',
      savings: '100% for local tasks'
    },
    {
      category: 'Education',
      icon: Sparkles,
      title: 'Share AI Water Knowledge',
      description: 'Educate others about AI\'s water footprint. Collective awareness leads to systemic change in how we approach AI usage.',
      impact: 'High',
      savings: 'Community-wide impact'
    }
  ];

  const [displayedTips, setDisplayedTips] = useState(allTips.slice(0, 3));

  const refreshTips = () => {
    const shuffled = [...allTips].sort(() => Math.random() - 0.5);
    setDisplayedTips(shuffled.slice(0, 3));
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/60 via-cyan-50/60 to-emerald-50/60" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4 bubble-float">
            <div className="relative">
              <Sparkles className="w-10 h-10 text-cyan-600 drop-shadow" />
              <div className="absolute inset-0 bg-cyan-300/40 rounded-full blur-lg" />
            </div>
          </div>
          <h2 className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            How to Reduce Your AI Water Footprint
          </h2>
          <p className="text-cyan-800 max-w-2xl mx-auto mb-6">
            Small changes in how you use AI can significantly reduce water consumption. Here are evidence-based strategies 
            to maintain productivity while minimizing environmental impact.
          </p>
          <Button onClick={refreshTips} variant="outline" className="gap-2 bg-white/60 backdrop-blur-sm border-cyan-300 hover:bg-white/80 hover:border-cyan-400 transition-all">
            <RefreshCw className="w-4 h-4" />
            Get More Tips
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="glossy-card p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 aero-shine group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${
                    tip.impact === 'High' ? 'from-emerald-400 to-green-500' :
                    tip.impact === 'Medium' ? 'from-cyan-400 to-blue-500' :
                    'from-sky-400 to-indigo-500'
                  } w-12 h-12 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white drop-shadow" />
                  </div>
                  <Badge className={getImpactColor(tip.impact)}>
                    {tip.impact} Impact
                  </Badge>
                </div>
                
                <h3 className="mb-2 text-cyan-900">{tip.title}</h3>
                <p className="text-cyan-700 mb-4">{tip.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-cyan-200">
                  <span className="text-cyan-600">Potential Reduction</span>
                  <span className="text-blue-600">{tip.savings}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}