{/* Tracking Dashboard - User's Water Saving's Statistics */}
import { useState, useEffect } from 'react';
import { TrendingDown, Users, Leaf, Droplets, Plus, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface UsageLog {
  date: string;
  chatQueries: number;
  imageGen: number;
  codeAssist: number;
  videoStream: number;
  waterUsed: number; // in ml
}

interface BaselineData {
  dailyChatQueries: number;
  dailyImageGen: number;
  dailyCodeAssist: number;
  dailyVideoStream: number;
  baselineWaterPerDay: number; // in ml
}

export function TrackingDashboard() {
  const [usageLogs, setUsageLogs] = useState<UsageLog[]>([]);
  const [baseline, setBaseline] = useState<BaselineData | null>(null);
  const [showLogDialog, setShowLogDialog] = useState(false);
  const [todayLog, setTodayLog] = useState({
    chatQueries: 0,
    imageGen: 0,
    codeAssist: 0,
    videoStream: 0,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('aiWaterLogs');
    const savedBaseline = localStorage.getItem('aiWaterBaseline');
    
    if (savedLogs) {
      setUsageLogs(JSON.parse(savedLogs));
    }
    if (savedBaseline) {
      setBaseline(JSON.parse(savedBaseline));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (usageLogs.length > 0) {
      localStorage.setItem('aiWaterLogs', JSON.stringify(usageLogs));
    }
  }, [usageLogs]);

  useEffect(() => {
    if (baseline) {
      localStorage.setItem('aiWaterBaseline', JSON.stringify(baseline));
    }
  }, [baseline]);

  const setBaselineFromCalculator = () => {
    const savedCalculation = localStorage.getItem('lastCalculation');
    if (savedCalculation) {
      const calc = JSON.parse(savedCalculation);
      setBaseline({
        dailyChatQueries: calc.chatQueries,
        dailyImageGen: calc.imageGen,
        dailyCodeAssist: calc.codeAssist,
        dailyVideoStream: calc.videoStream,
        baselineWaterPerDay: calc.dailyUsage,
      });
    }
  };

  const calculateWaterUsed = (log: typeof todayLog) => {
    const chatWater = log.chatQueries * 50;
    const imageWater = log.imageGen * 100;
    const codeWater = log.codeAssist * 75;
    const videoWater = log.videoStream * 200;
    return chatWater + imageWater + codeWater + videoWater;
  };

  const logTodayUsage = () => {
    const waterUsed = calculateWaterUsed(todayLog);
    const today = new Date().toISOString().split('T')[0];
    
    const newLog: UsageLog = {
      date: today,
      ...todayLog,
      waterUsed,
    };

    // Remove any existing log for today and add new one
    const filteredLogs = usageLogs.filter(log => log.date !== today);
    setUsageLogs([...filteredLogs, newLog].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));

    setTodayLog({ chatQueries: 0, imageGen: 0, codeAssist: 0, videoStream: 0 });
    setShowLogDialog(false);
  };

  // Calculate total water used
  const totalWaterUsed = usageLogs.reduce((sum, log) => sum + log.waterUsed, 0);

  // Calculate total water that WOULD have been used (baseline)
  const daysTracked = usageLogs.length;
  const baselineTotal = baseline ? baseline.baselineWaterPerDay * daysTracked : 0;

  // Calculate water saved
  const waterSaved = baselineTotal - totalWaterUsed;

  // Calculate environmental impact
  const peopleDaysOfWater = Math.floor(waterSaved / 2000); // Average person needs 2L/day for drinking
  const treesWatered = Math.floor(waterSaved / 150000); // Young tree needs ~150L for establishment
  const co2Offset = Math.floor(waterSaved * 0.0002); // Approximate CO2 from water processing/pumping

  // Calculate net usage (positive means saving, negative means exceeding baseline)
  const netWaterBalance = waterSaved;

  // Achievement level
  const getAchievementLevel = () => {
    if (!baseline || daysTracked === 0) return null;
    const savingsPercentage = (waterSaved / baselineTotal) * 100;
    
    if (savingsPercentage >= 50) return { level: 'Champion', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (savingsPercentage >= 30) return { level: 'Expert', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (savingsPercentage >= 15) return { level: 'Achiever', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (savingsPercentage >= 5) return { level: 'Beginner', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    return { level: 'Starting Out', color: 'text-gray-500', bgColor: 'bg-gray-50' };
  };

  const achievement = getAchievementLevel();
  const savingsPercentage = baseline && baselineTotal > 0 ? (waterSaved / baselineTotal) * 100 : 0;

  if (!baseline) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-50/50 to-cyan-50/50" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="glossy-card p-12 rounded-3xl text-center shadow-2xl aero-shine">
            <div className="relative inline-block mb-6 bubble-float">
              <Droplets className="w-16 h-16 text-cyan-600 drop-shadow-lg" />
              <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-xl" />
            </div>
            <h2 className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">Start Tracking Your Impact</h2>
            <p className="text-cyan-800 mb-8 max-w-2xl mx-auto">
              Use the calculator above to establish your baseline AI water usage. 
              Then start logging your daily usage to see how much water you're saving!
            </p>
            <Button onClick={setBaselineFromCalculator} size="lg" className="glass-button">
              Set Baseline from Calculator
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-blue-600 mb-4">Your Water Savings Dashboard</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your progress and see the real-world impact of your conscious AI usage decisions.
          </p>
        </div>

        {achievement && (
          <div className="mb-8 text-center">
            <Badge className={`${achievement.bgColor} ${achievement.color} px-6 py-2`}>
              <Award className="w-4 h-4 inline mr-2" />
              {achievement.level} Water Saver
            </Badge>
          </div>
        )}

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <p className="text-blue-100">Water Saved</p>
                <p className="text-white">{waterSaved.toLocaleString()} ml</p>
              </div>
            </div>
            <Progress value={Math.min(savingsPercentage, 100)} className="h-2 bg-blue-400" />
            <p className="text-blue-100 mt-2">{savingsPercentage.toFixed(1)}% reduction</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-green-100">People Helped</p>
                <p className="text-white">{peopleDaysOfWater} person-days</p>
              </div>
            </div>
            <p className="text-green-100">of drinking water provided</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <p className="text-cyan-100">Trees Watered</p>
                <p className="text-white">{treesWatered} trees</p>
              </div>
            </div>
            <p className="text-cyan-100">establishment water saved</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <p className="text-purple-100">Net Balance</p>
                <p className={`${netWaterBalance >= 0 ? 'text-white' : 'text-purple-200'}`}>
                  {netWaterBalance >= 0 ? '+' : ''}{netWaterBalance.toLocaleString()} ml
                </p>
              </div>
            </div>
            <p className="text-purple-100">
              {netWaterBalance >= 0 ? 'Saving water!' : 'Still using baseline'}
            </p>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="mb-4">Water Usage Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Your Baseline (before tracking)</span>
                  <span className="text-blue-600">{baseline.baselineWaterPerDay.toLocaleString()} ml/day</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Current Average</span>
                  <span className="text-green-600">
                    {daysTracked > 0 ? Math.round(totalWaterUsed / daysTracked).toLocaleString() : 0} ml/day
                  </span>
                </div>
                <Progress 
                  value={daysTracked > 0 ? (totalWaterUsed / daysTracked / baseline.baselineWaterPerDay) * 100 : 0} 
                  className="h-2" 
                />
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-700">Days Tracked</span>
                  <span className="text-gray-900">{daysTracked} days</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-700">Total Water Used</span>
                  <span className="text-gray-900">{totalWaterUsed.toLocaleString()} ml</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-700">Would Have Used</span>
                  <span className="text-gray-500">{baselineTotal.toLocaleString()} ml</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Environmental Impact</h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-900 mb-1">Drinking Water Provided</p>
                    <p className="text-green-700">
                      Your savings could provide drinking water for {peopleDaysOfWater} person-days. 
                      That's enough for {Math.floor(peopleDaysOfWater / 30)} people for a month!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-400">
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-cyan-900 mb-1">Tree Establishment</p>
                    <p className="text-cyan-700">
                      Enough water to establish {treesWatered} young trees, helping offset carbon and restore ecosystems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-900 mb-1">CO₂ Reduction</p>
                    <p className="text-blue-700">
                      Approximately {co2Offset}g of CO₂ offset from reduced water pumping and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Log Today's Usage */}
        <div className="text-center">
          <Dialog open={showLogDialog} onOpenChange={setShowLogDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Log Today's AI Usage
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Log Today's AI Usage</DialogTitle>
                <DialogDescription>
                  Enter how many AI queries you made today to track your water savings.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="chatLog">Chat queries (ChatGPT, Claude, etc.)</Label>
                  <Input
                    id="chatLog"
                    type="number"
                    value={todayLog.chatQueries}
                    onChange={(e) => setTodayLog({...todayLog, chatQueries: Number(e.target.value)})}
                    min={0}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="imageLog">Image generations</Label>
                  <Input
                    id="imageLog"
                    type="number"
                    value={todayLog.imageGen}
                    onChange={(e) => setTodayLog({...todayLog, imageGen: Number(e.target.value)})}
                    min={0}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="codeLog">Code assistant queries</Label>
                  <Input
                    id="codeLog"
                    type="number"
                    value={todayLog.codeAssist}
                    onChange={(e) => setTodayLog({...todayLog, codeAssist: Number(e.target.value)})}
                    min={0}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="videoLog">AI video/streaming (hours)</Label>
                  <Input
                    id="videoLog"
                    type="number"
                    value={todayLog.videoStream}
                    onChange={(e) => setTodayLog({...todayLog, videoStream: Number(e.target.value)})}
                    min={0}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-900">
                    Today's water usage: <span className="font-semibold">{calculateWaterUsed(todayLog)} ml</span>
                  </p>
                  <p className="text-blue-700 mt-1">
                    Baseline was: <span className="font-semibold">{baseline.baselineWaterPerDay} ml</span>
                  </p>
                </div>
                <Button onClick={logTodayUsage} className="w-full">
                  Save Today's Log
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Recent Logs */}
        {usageLogs.length > 0 && (
          <Card className="p-6 mt-8">
            <h3 className="mb-4">Recent Activity</h3>
            <div className="space-y-2">
              {usageLogs.slice(0, 7).map((log, index) => {
                const savedThatDay = baseline.baselineWaterPerDay - log.waterUsed;
                return (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-gray-600">{new Date(log.date).toLocaleDateString()}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-700">{log.waterUsed} ml used</span>
                      <span className={`${savedThatDay >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {savedThatDay >= 0 ? '+' : ''}{savedThatDay} ml
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}