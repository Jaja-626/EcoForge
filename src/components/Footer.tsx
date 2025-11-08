{/* Footer Section - Links and Information */}
import { Droplets, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';


export function Footer() {
 const currentYear = new Date().getFullYear();
 const scrollToCalculator = () => {
   document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
 }
 const scrollToReductionTips = () => {
   document.getElementById('tips')?.scrollIntoView({ behavior: 'smooth' });
 };
 const scrollToDashboard = () => {
   document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
 }
 








 return (
   <footer className="relative overflow-hidden">
     {/* Glossy gradient background */}
     <div className="absolute inset-g0 bg-gradient-to-br from-slate-800 via-cyan-900 to-blue-900">
       <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
     </div>
    
     <div className="relative py-12 px-4 sm:px-6 lg:px-8">
       <div className="max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
           <div className="md:col-span-2">
             <div className="flex items-center gap-3 mb-4">
               <div className="relative">
                 <Droplets className="w-10 h-10 text-cyan-400 drop-shadow-lg" />
                 <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-lg" />
               </div>
               <span className="text-white drop-shadow">Drop Query</span>
             </div>
             <p className="text-cyan-100 mb-4 drop-shadow-sm">
               Raising awareness about the hidden water costs of artificial intelligence.
               Every query counts — use AI mindfully to protect our planet's water resources.
             </p>
             <div className="flex gap-4">
               <a href="#" className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all border border-white/20 hover:border-white/40">
                 <Twitter className="w-5 h-5 text-cyan-200" />
               </a>
               <a href="#" className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all border border-white/20 hover:border-white/40">
                 <Github className="w-5 h-5 text-cyan-200" />
               </a>
               <a href="#" className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all border border-white/20 hover:border-white/40">
                 <Linkedin className="w-5 h-5 text-cyan-200" />
               </a>
             </div>
           </div>


           <div>
             <h4 className="text-white mb-4 drop-shadow">Resources</h4>
             <ul className="space-y-2">
               <li>
                 <Button
                   onClick={scrollToCalculator}
                   variant="link"
                   className="className=p-0 text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm"
                 >
                   Water Calculator
                 </Button>
               </li>


               <li>
                 <Button
                   onClick={scrollToReductionTips}
                   variant="link"
                   className="text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm"
                 >
                   Reduction Tips
                 </Button>
               </li>


               <li>
                 <Button
                   onClick={scrollToDashboard}
                   variant="link"
                   className="text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm"
                 >
                   Dashboard
                 </Button>
               </li>
             </ul>
           </div>


           <div>
             <h4 className="text-white mb-4 drop-shadow"></h4>
             <ul className="space-y-2">
               <li>
                 <a href="#" className="text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm">
                   
                 </a>
               </li>
               <li>
                 <a href="#" className="text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm">
                  
                 </a>
               </li>
               <li>
                 <a href="#" className="text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm">
                   
                 </a>
               </li>
               <li>
                 <a href="#" className="text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm">
                    
                 </a>
               </li>
             </ul>
           </div>
         </div>


         <div className="border-t border-white/20 pt-8 text-center">
           <p className="text-cyan-200 drop-shadow-sm">© {currentYear} Drop Query - Every query counts!</p>
         </div>
       </div>
     </div>
   </footer>
 );
}
