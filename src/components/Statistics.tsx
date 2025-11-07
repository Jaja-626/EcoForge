{/* AI's Water Impact in Numbers */}
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Statistics() {
  const stats = [
    {
      value: '700k L',
      label: 'Water to train GPT-3 model',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      value: '500ml',
      label: 'Per ChatGPT conversation',
      color: 'from-sky-400 to-cyan-500'
    },
    {
      value: '1.7B L',
      label: 'Google AI water use (2022)',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      value: '34%',
      label: 'Increase in Microsoft water use',
      color: 'from-emerald-400 to-cyan-500'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glossy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600">
        <div className="absolute inset-0 opacity-15">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1624601362606-7bd725d41cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwbmF0dXJlfGVufDF8fHx8MTc2MjU1MDUwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Clean water"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Glossy top highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4 drop-shadow-lg">
            AI's Water Impact in Numbers
          </h2>
          <p className="text-white/95 max-w-2xl mx-auto drop-shadow-md">
            As AI adoption accelerates globally, so does its hidden environmental cost. These numbers reveal the scale of water consumption.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="glossy-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 aero-shine hover:scale-105">
                <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2 drop-shadow-sm`}>{stat.value}</div>
                <p className="text-cyan-800">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}