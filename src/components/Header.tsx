import React from 'react';
import { PlayerState } from '../types.ts';
import { Coins, Zap, Shield, Home, Disc, BookOpen, HelpCircle, Compass } from 'lucide-react';

interface HeaderProps {
  player: PlayerState;
  activeTab: 'wheel' | 'village' | 'journey' | 'cards' | 'quiz';
  setActiveTab: (tab: 'wheel' | 'village' | 'journey' | 'cards' | 'quiz') => void;
  onTouchItem?: (itemId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ player, activeTab, setActiveTab, onTouchItem }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-amber-300 shadow-lg px-4 py-3">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo and Level */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onTouchItem?.('sun_icon')}
            onMouseEnter={() => onTouchItem?.('sun_icon')}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-red-500 to-emerald-500 p-1 flex items-center justify-center shadow-md animate-pulse-glow cursor-pointer transition-transform hover:scale-110 active:scale-95"
            title="Xor û Roj"
          >
            <span className="text-2xl">☀️</span>
          </div>
          <div
            onClick={() => onTouchItem?.('village_level')}
            onMouseEnter={() => onTouchItem?.('village_level')}
            className="cursor-pointer"
            title="Asta Gund"
          >
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-wide text-amber-900 font-['Nunito']">
                Gundé me
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                Ast {player.villageLevel}
              </span>
            </div>
            <p className="text-xs text-amber-700 font-semibold">Zimanê Kurdî bi Tîpên Latînî</p>
          </div>
        </div>

        {/* Resources HUD (Coins, Energy, Shields) */}
        <div className="flex items-center gap-2 sm:gap-4 bg-amber-50 px-3 py-1.5 rounded-2xl border-2 border-amber-200 shadow-inner">
          {/* Coins */}
          <div
            onClick={() => onTouchItem?.('coins_box')}
            onMouseEnter={() => onTouchItem?.('coins_box')}
            className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl shadow-sm border border-amber-200 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            title="Sindoqa Diravan"
          >
            <Coins className="w-5 h-5 text-amber-500 animate-bounce" />
            <span className="font-extrabold text-amber-900 text-sm sm:text-base">
              {player.coins.toLocaleString()}
            </span>
          </div>

          {/* Energy */}
          <div
            onClick={() => onTouchItem?.('energy_bolt')}
            onMouseEnter={() => onTouchItem?.('energy_bolt')}
            className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl shadow-sm border border-sky-200 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            title="Hêza Birûskê"
          >
            <Zap className="w-5 h-5 text-sky-500 fill-sky-400" />
            <span className="font-extrabold text-sky-900 text-sm sm:text-base">
              {player.energy}/{player.maxEnergy}
            </span>
          </div>

          {/* Shields */}
          <div
            onClick={() => onTouchItem?.('shield_icon')}
            onMouseEnter={() => onTouchItem?.('shield_icon')}
            className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl shadow-sm border border-emerald-200 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            title="Mertalê Parastinê"
          >
            <Shield className="w-5 h-5 text-emerald-600 fill-emerald-500" />
            <div className="flex gap-0.5">
              {Array.from({ length: player.maxShields }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-3.5 rounded-sm ${
                    i < player.shields ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-amber-100/80 p-1 rounded-2xl border border-amber-200">
          <button
            onClick={() => setActiveTab('wheel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'wheel'
                ? 'bg-amber-500 text-white shadow-md scale-105'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Disc className="w-4 h-4" />
            <span>Çerx</span>
          </button>

          <button
            onClick={() => setActiveTab('village')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'village'
                ? 'bg-emerald-500 text-white shadow-md scale-105'
                : 'text-emerald-900 hover:bg-emerald-200/60'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Gund</span>
          </button>

          <button
            onClick={() => setActiveTab('journey')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'journey'
                ? 'bg-amber-600 text-white shadow-md scale-105'
                : 'text-amber-950 hover:bg-amber-200/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Rêwîtî</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'cards'
                ? 'bg-sky-500 text-white shadow-md scale-105'
                : 'text-sky-900 hover:bg-sky-200/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Karta Zimanê</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-purple-500 text-white shadow-md scale-105'
                : 'text-purple-900 hover:bg-purple-200/60'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Pirs</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
