import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  Laptop, 
  Gamepad2, 
  Briefcase, 
  Palette, 
  Sparkles, 
  Layers
} from 'lucide-react';

export const CategoryRail: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setCurrentView } = useCart();

  const categories = [
    {
      id: 'all',
      name: 'All Categories',
      subtitle: 'Complete 2026 Fleet',
      icon: Layers,
      count: '9 Models'
    },
    {
      id: 'Ultrabook',
      name: 'Ultrabooks & Slim',
      subtitle: 'Featherlight & Fast',
      icon: Laptop,
      count: '3 Models'
    },
    {
      id: 'Business',
      name: 'Enterprise & Business',
      subtitle: 'vPro & dTPM Security',
      icon: Briefcase,
      count: '2 Models'
    },
    {
      id: 'Creator',
      name: 'Creator & Studio',
      subtitle: 'Liquid XDR & OLED',
      icon: Palette,
      count: '2 Models'
    },
    {
      id: 'Gaming',
      name: 'Gaming & GPU Beast',
      subtitle: 'RTX 4070 & 240Hz',
      icon: Gamepad2,
      count: '1 Model'
    },
    {
      id: '2-in-1 Touch',
      name: '2-in-1 Convertibles',
      subtitle: '360° Stylus Touch',
      icon: Sparkles,
      count: '1 Model'
    }
  ];

  return (
    <section className="bg-gray-100 border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Our Product Categories
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Filter by your workflow: ultra-mobility, heavy rendering, or business travel
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('shop');
            }}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer hidden sm:block"
          >
            Explore Full Inventory →
          </button>
        </div>

        {/* Category Cards: White & Ash with Blue accents */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentView('shop');
                }}
                className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer group relative overflow-hidden ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 shadow-md ring-1 ring-blue-600'
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block truncate w-full">
                  {cat.name}
                </span>
                <span className="text-[11px] text-gray-500 block truncate w-full mt-0.5">
                  {cat.subtitle}
                </span>
                <span className="text-[10px] font-bold text-blue-600 mt-2 block">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
