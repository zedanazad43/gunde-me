import React, { useState } from 'react';
import { CardItem, ItemCategory } from '../types';
import { ALL_CARDS, UI_TEXT } from '../content/language';
import { audioService } from '../content/audio';
import { Volume2, Lock, Sparkles, Star } from 'lucide-react';

interface FlashcardsProps {
  unlockedCardIds: string[];
}

export const Flashcards: React.FC<FlashcardsProps> = ({ unlockedCardIds }) => {
  const [filter, setFilter] = useState<'hemû' | ItemCategory>('hemû');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const filteredCards = ALL_CARDS.filter((card) => {
    if (filter === 'hemû') return true;
    return card.category === filter;
  });

  const handleSpeak = (card: CardItem) => {
    setActiveCardId(card.id);

    // Speak the Kurdish word directly with zero delay and no animal roar
    audioService.speakKurdishWord(card.name, card.phonetic, card.id);

    setTimeout(() => {
      setActiveCardId(null);
    }, 1200);
  };

  const unlockedCount = ALL_CARDS.filter(c => unlockedCardIds.includes(c.id)).length;

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col gap-6">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-5 rounded-3xl border-3 border-amber-300 shadow-md">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-['Nunito'] flex items-center gap-2">
            <span>📚</span> {UI_TEXT.cards}
          </h2>
          <p className="text-amber-800 text-xs sm:text-sm font-semibold">
            Li ser her qertê pêl bike da ku dengê wê yê Kurdî bibihîzî ({unlockedCount}/{ALL_CARDS.length} vekirî ne)
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 bg-amber-100 p-1.5 rounded-2xl border border-amber-200">
          <button
            onClick={() => setFilter('hemû')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'hemû'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-900 hover:bg-amber-200'
            }`}
          >
            Hemû ({ALL_CARDS.length})
          </button>
          <button
            onClick={() => setFilter('ajalan')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'ajalan'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-900 hover:bg-amber-200'
            }`}
          >
            Ajalan 🦁
          </button>
          <button
            onClick={() => setFilter('amur')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'amur'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-900 hover:bg-amber-200'
            }`}
          >
            Amûr 🪓
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredCards.map((card) => {
          const isUnlocked = unlockedCardIds.includes(card.id);
          const isPlaying = activeCardId === card.id;

          return (
            <div
              key={card.id}
              onClick={() => isUnlocked && handleSpeak(card)}
              onMouseEnter={() => isUnlocked && handleSpeak(card)}
              className={`rounded-3xl p-4 flex flex-col items-center justify-between transition-all duration-300 relative border-4 cursor-pointer select-none ${
                isUnlocked
                  ? 'bg-white border-amber-300 hover:border-amber-500 hover:scale-105 shadow-lg hover:shadow-xl'
                  : 'bg-slate-100/80 border-slate-300 opacity-60'
              } ${isPlaying ? 'ring-4 ring-amber-400 scale-105' : ''}`}
            >
              {/* Rarity & Status Icon */}
              <div className="w-full flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                    card.rarity === 'zêrîn'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : card.rarity === 'hêja'
                      ? 'bg-purple-100 text-purple-800 border border-purple-300'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {card.rarity}
                </span>

                {isUnlocked ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(card);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isPlaying
                        ? 'bg-amber-500 text-white scale-110 animate-bounce'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                    title="Guh bide dengê"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Big Emoji / Cartoon Representation */}
              <div className="w-24 h-24 my-2 rounded-2xl bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-center text-6xl shadow-inner">
                {isUnlocked ? card.emoji : '❓'}
              </div>

              {/* Kurdish Name and Details */}
              <div className="text-center w-full mt-2">
                <h3 className="text-lg font-black text-slate-900 font-['Nunito']">
                  {isUnlocked ? card.name : 'Nenas'}
                </h3>
                {isUnlocked && (
                  <>
                    <p className="text-xs text-amber-700 font-bold mb-1">
                      [{card.phonetic}]
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                      {card.description}
                    </p>
                  </>
                )}
              </div>

              {/* Unlock hint if locked */}
              {!isUnlocked && (
                <div className="mt-2 text-[10px] font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-full">
                  Di çerxê de veke
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
