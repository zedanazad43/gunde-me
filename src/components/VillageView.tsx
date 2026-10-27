import React from 'react';
import { Building, PlayerState } from '../types';
import { audioService } from '../content/audio';
import confetti from 'canvas-confetti';
import { Hammer, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface VillageViewProps {
  buildings: Building[];
  player: PlayerState;
  onUpgradeBuilding: (buildingId: string) => void;
}

export const VillageView: React.FC<VillageViewProps> = ({
  buildings,
  player,
  onUpgradeBuilding,
}) => {
  const handleUpgrade = (b: Building) => {
    const cost = b.baseCost * b.level;
    if (player.coins < cost) {
      audioService.playErrorSound();
      alert(`Diravên te têrê nake! Pêdiviya te bi ${cost.toLocaleString()} diravan heye.`);
      return;
    }

    audioService.playCelebrationSound();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 }
    });
    onUpgradeBuilding(b.id);
  };

  const totalLevels = buildings.reduce((acc, b) => acc + b.level, 0);
  const maxPossibleLevels = buildings.reduce((acc, b) => acc + b.maxLevel, 0);
  const villageProgress = Math.round((totalLevels / maxPossibleLevels) * 100);

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
      {/* Village Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white rounded-3xl p-6 shadow-xl border-4 border-emerald-400 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">🏡</span>
              <h2 className="text-3xl font-black font-['Nunito']">Gundê Me — Ast {player.villageLevel}</h2>
            </div>
            <p className="text-emerald-100 text-sm font-semibold max-w-lg">
              Avahiyên gundê xwe bi diravan mezin bike da ku gundê we geş û xweş bibe!
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full md:w-64 bg-emerald-950/40 p-3 rounded-2xl border border-emerald-300/30">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Pêşketina Gund</span>
              <span>{villageProgress}%</span>
            </div>
            <div className="w-full h-4 bg-emerald-950 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-500"
                style={{ width: `${villageProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Decorative background sun / clouds */}
        <div className="absolute -right-10 -bottom-10 opacity-20 text-9xl">🌄</div>
      </div>

      {/* Village Buildings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {buildings.map((b) => {
          const cost = b.baseCost * b.level;
          const isMax = b.level >= b.maxLevel;
          const canAfford = player.coins >= cost;

          return (
            <div
              key={b.id}
              onClick={() => audioService.speakKurdishWord(b.name, undefined, b.id)}
              onMouseEnter={() => audioService.speakKurdishWord(b.name, undefined, b.id)}
              className="bg-white rounded-3xl p-5 border-4 border-amber-200 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between relative group overflow-hidden cursor-pointer"
            >
              {/* Level Badge */}
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                  {b.icon}
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-2.5 py-1 rounded-full border border-amber-300">
                    Ast {b.level}/{b.maxLevel}
                  </span>
                  {isMax && (
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Qediyaye
                    </span>
                  )}
                </div>
              </div>

              {/* Building Info */}
              <div className="my-4">
                <h3 className="text-xl font-black text-slate-800 font-['Nunito'] mb-1">
                  {b.name}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-2 font-medium">
                  {b.description}
                </p>
                <div className="bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1 rounded-xl font-bold inline-block border border-emerald-200">
                  ✨ {b.perks}
                </div>
              </div>

              {/* Upgrade Button */}
              <div>
                {isMax ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-2xl bg-slate-100 text-slate-400 font-bold text-sm cursor-not-allowed"
                  >
                    Asta Herî Bilind e
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(b)}
                    className={`w-full py-3 rounded-2xl font-black text-sm tracking-wide text-white shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      canAfford
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105'
                        : 'bg-slate-300 text-slate-600 hover:bg-slate-400'
                    }`}
                  >
                    <Hammer className="w-4 h-4" />
                    <span>Zêde Bike: {cost.toLocaleString()} 🪙</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
