import React, { useState } from 'react';
import { audioService } from '../content/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy } from 'lucide-react';

interface RaidModalProps {
  isOpen: boolean;
  onComplete: (coinsEarned: number) => void;
}

export const RaidModal: React.FC<RaidModalProps> = ({ isOpen, onComplete }) => {
  const [selectedChest, setSelectedChest] = useState<number | null>(null);
  const [chestRewards] = useState<number[]>([1200, 2500, 800]);

  if (!isOpen) return null;

  const handlePickChest = (index: number) => {
    if (selectedChest !== null) return;
    setSelectedChest(index);

    audioService.playCelebrationSound();
    audioService.speakKurdishWord("Aferîn! Te xezîne dît!");

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 }
    });

    const reward = chestRewards[index];
    setTimeout(() => {
      onComplete(reward);
      setSelectedChest(null);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 max-w-md w-full border-4 border-amber-400 shadow-2xl text-center animate-bounce-soft">
        <div className="text-4xl mb-2">⚔️</div>
        <h3 className="text-2xl font-black font-['Nunito'] text-amber-300 mb-1">
          Êrîşa Dostane li ser Gundê Cîran!
        </h3>
        <p className="text-xs text-purple-200 mb-6 font-semibold">
          Ji bo dîtina xezîneya zêran li ser sindoqekê pêl bike:
        </p>

        {/* 3 Mystery Chests */}
        <div className="grid grid-cols-3 gap-3 my-4">
          {[0, 1, 2].map((idx) => {
            const isOpened = selectedChest === idx;
            return (
              <button
                key={idx}
                onClick={() => handlePickChest(idx)}
                disabled={selectedChest !== null}
                className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center gap-2 transition-all transform active:scale-95 ${
                  isOpened
                    ? 'bg-amber-400 border-yellow-200 scale-110 shadow-2xl text-amber-950'
                    : 'bg-purple-800/80 hover:bg-purple-700/80 border-purple-400 hover:scale-105'
                }`}
              >
                <span className="text-4xl">{isOpened ? '💎' : '🎁'}</span>
                <span className="text-xs font-black">
                  {isOpened ? `+${chestRewards[idx]} 🪙` : 'Veke'}
                </span>
              </button>
            );
          })}
        </div>

        {selectedChest !== null && (
          <div className="mt-4 bg-amber-400/20 text-amber-300 p-2 rounded-xl text-sm font-bold border border-amber-400/40">
            Te {chestRewards[selectedChest].toLocaleString()} Dirav Qezenc Kir! 🪙
          </div>
        )}
      </div>
    </div>
  );
};
