{/* Water Calculator - Estimate Your AI's Water Usage */}
import { useState } from 'react';
import { Calculator, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function WaterCalculator() {
  const [chatQueries, setChatQueries] = useState([10]);
  const [imageGen, setImageGen] = useState(0);
  const [codeAssist, setCodeAssist] = useState(0);
  const [videoStream, setVideoStream] = useState(0);
  const [aiModel, setAiModel] = useState('medium');
  const [result, setResult] = useState<{
    daily: number;
    monthly: number;
    yearly: number;
    equivalent: string;
    recommendation: string;
  } | null>(null);

  const calculateWaterUsage = () => {
    // Water consumption estimates per query (in ml)
    // Based on research: ChatGPT conversation ~500ml, image generation ~1000ml
    const modelMultipliers: { [key: string]: number } = {
      'light': 0.7,  // Smaller models like GPT-3.5
      'medium': 1.0, // GPT-4 level
      'heavy': 1.5   // Large multimodal models
    };

    const multiplier = modelMultipliers[aiModel];
    
    const chatWater = chatQueries[0] * 20 * multiplier; // ~20ml per query
    const imageWater = imageGen * 50 * multiplier; // ~50ml per image
    const codeWater = codeAssist * 150 * multiplier; // ~150ml per code query
    const videoWater = videoStream * 500 * multiplier; // ~500ml per hour

    const dailyUsage = chatWater + imageWater + codeWater + videoWater;
    const monthlyUsage = dailyUsage * 30;
    const yearlyUsage = dailyUsage * 365;

    // Calculate water bottle equivalent (500ml bottles)
    const bottlesPerMonth = Math.round(monthlyUsage / 500);
    
    let equivalent = '';
    if (bottlesPerMonth < 1) {
      equivalent = 'Less than one water bottle per month';
    } else if (bottlesPerMonth < 10) {
      equivalent = `${bottlesPerMonth} water bottles per month`;
    } else if (bottlesPerMonth < 100) {
      equivalent = `${bottlesPerMonth} water bottles (${Math.round(bottlesPerMonth / 4)} per week)`;
    } else {
      const gallons = Math.round(monthlyUsage / 3785);
      equivalent = `${gallons} gallons - equivalent to ${Math.round(gallons / 100)} bathtubs per month`;
    }

    // Generate recommendations
    let recommendation = '';
    const totalQueries = chatQueries[0] + imageGen + codeAssist + (videoStream * 12);
    
    if (totalQueries < 20) {
      recommendation = '✓ Excellent! Your AI usage is minimal. Continue being mindful of when AI is truly necessary.';
    } else if (totalQueries < 50) {
      recommendation = 'Moderate usage. Consider batching queries and being more specific to reduce follow-up questions.';
    } else if (totalQueries < 100) {
      recommendation = 'High usage detected. Try to: 1) Use lighter AI models when possible, 2) Cache common responses, 3) Limit image generation to essentials.';
    } else {
      recommendation = 'Very high usage. Significant water impact. Consider alternatives like traditional search, offline tools, and only using AI for complex tasks that truly benefit from it.';
    }

    const resultData = {
      daily: Math.round(dailyUsage),
      monthly: Math.round(monthlyUsage),
      yearly: Math.round(yearlyUsage / 1000), // Convert to liters
      equivalent,
      recommendation
    };

    setResult(resultData);

    // Save to localStorage for tracking dashboard
    localStorage.setItem('lastCalculation', JSON.stringify({
      chatQueries: chatQueries[0],
      imageGen,
      codeAssist,
      videoStream,
      dailyUsage: Math.round(dailyUsage)
    }));
  };

  return (
    <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Aero background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-sky-50/50 to-blue-50/50" />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4 bubble-float">
            <div className="relative">
              <Calculator className="w-10 h-10 text-cyan-600 drop-shadow" />
              <div className="absolute inset-0 bg-cyan-300/30 rounded-full blur-lg" />
            </div>
            <div className="relative">
              <Sparkles className="w-8 h-8 text-blue-600 drop-shadow" />
              <div className="absolute inset-0 bg-blue-300/30 rounded-full blur-lg" />
            </div>
          </div>
          <h2 className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI Water Footprint Calculator
          </h2>
          <p className="text-cyan-800 max-w-2xl mx-auto">
            Calculate how much water your daily AI usage consumes. Data centers require water for cooling the servers that power AI models.
          </p>
        </div>

        <div className="glossy-card p-8 rounded-3xl shadow-2xl aero-shine">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Daily AI chat queries (ChatGPT, Claude, etc.)</Label>
                <span className="text-blue-600">{chatQueries[0]} queries</span>
              </div>
              <Slider
                value={chatQueries}
                onValueChange={setChatQueries}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-gray-500 mt-1">~20ml water per query</p>
            </div>

            <div>
              <Label htmlFor="imageGen">AI image generations per day (DALL-E, Midjourney, etc.)</Label>
              <Input
                id="imageGen"
                type="number"
                value={imageGen}
                onChange={(e) => setImageGen(Number(e.target.value))}
                min={0}
                max={100}
                className="mt-2"
              />
              <p className="text-gray-500 mt-1">~50ml water per image</p>
            </div>

            <div>
              <Label htmlFor="codeAssist">Active chat sessions </Label>
              <Input
                id="codeAssist"
                type="number"
                value={codeAssist}
                onChange={(e) => setCodeAssist(Number(e.target.value))}
                min={0}
                max={200}
                className="mt-2"
              />
              <p className="text-gray-500 mt-1">~150mL water per query</p>
            </div>

            <div>
              <Label htmlFor="videoStream">Training Small Custom Models (fine-tuning 1 h on cloud GPU)</Label>
              <Input
                id="videoStream"
                type="number"
                value={videoStream}
                onChange={(e) => setVideoStream(Number(e.target.value))}
                min={0}
                max={24}
                step={0.5}
                className="mt-2"
              />
              <p className="text-gray-500 mt-1">~500ml water per hour</p>
            </div>

            <div>
              <Label htmlFor="aiModel">Typical AI model size you use</Label>
              <Select value={aiModel} onValueChange={setAiModel}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light (GPT-3.5, smaller models)</SelectItem>
                  <SelectItem value="medium">Medium (GPT-4, standard models)</SelectItem>
                  <SelectItem value="heavy">Heavy (GPT-4 Vision, large multimodal)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateWaterUsage} className="w-full">
              Calculate My AI Water Footprint
            </Button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h3 className="text-blue-600 mb-4">Your AI Water Impact</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-600 mb-1">Daily Usage</p>
                  <p className="text-blue-600">{result.daily} ml</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-600 mb-1">Monthly Usage</p>
                  <p className="text-blue-600">{result.monthly} ml</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-600 mb-1">Yearly Usage</p>
                  <p className="text-cyan-600">{result.yearly} L</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-gray-600 mb-2">Water Equivalent</p>
                <p className="text-gray-800">{result.equivalent}</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-600 mb-2">Sustainability Recommendation</p>
                    <p className="text-gray-800">{result.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-6 bg-cyan-50 rounded-lg border border-cyan-200">
          <h4 className="text-cyan-900 mb-3">Why does AI use water?</h4>
          <p className="text-cyan-800 mb-3">
            AI models run on massive data centers with thousands of servers. These servers generate enormous heat and require 
            sophisticated cooling systems. Many data centers use water-based cooling (evaporative cooling) which consumes 
            significant amounts of freshwater that evaporates and cannot be reused.
          </p>
          <p className="text-cyan-800">
            A single data center can consume millions of gallons of water daily — equivalent to the water usage of a small city.
          </p>
        </div>
      </div>
    </section>
  );
  return <div>Calculator</div>
}