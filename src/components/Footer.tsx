import { Droplets, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Glossy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-cyan-900 to-blue-900">
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
                Every Query Counts!
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
                  <a href="#" className="text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm">
                    Water Calculator
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm">
                    Reduction Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm">
                    Research & Data
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cyan-200 hover:text-cyan-100 transition-colors drop-shadow-sm">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-cyan-200 drop-shadow-sm">© {currentYear} Drop Query. Making conscious choices about technology and water. Every query counts.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}