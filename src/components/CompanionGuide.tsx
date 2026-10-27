import React, { useState } from 'react';
import { CompanionGuide, COMPANION_GUIDES } from '../content/language.ts';
import { audioService, animalSynth } from '../content/audio.ts';
import { Volume2, Sparkles, RefreshCw, X, MessageCircle } from 'lucide-react';

interface CompanionGuideProps {
  currentCompanion: CompanionGuide;
  onSelectCompanion: (c: CompanionGuide) => void;
  bubbleText: string;
  bubblePhonetic?: string;
  isSpeaking: boolean;
}

export const CompanionGuideWidget: React.FC<CompanionGuideProps> = ({
  currentCompanion,
  onSelectCompanion,
  bubbleText,
  bubblePhonetic,
  isSpeaking
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompanionClick = () => {
    // Play animal cry + speak catchphrase
    animalSynth.playAnimalSound(currentCompanion.id);
    setTimeout(() => {
      audioService.speakKurdishWord(
        currentCompanion.catchphrase,
        undefined,
        currentCompanion.voicePitch,
        currentCompanion.voiceRate
      );
    }, 600);
  };

  return (
    <>
      {/* Floating Companion Avatar & Speech Cloud */}
      <div className="fixed bottom-3 right-3 z-40 flex flex-col items-end pointer-events-none max-w-xs sm:max-w-sm">
        {/* Animated Speech Bubble (Ewrê Axaftinê) */}
        {bubbleText && (
          <div className="mb-2 mr-2 bg-white/95 text-slate-900 px-4 py-2.5 rounded-3xl border-4 border-amber-400 shadow-2xl pointer-events-auto relative animate-bounce-soft">
            <div className="flex items-start gap-2">
              <span className="text-amber-500 font-bold text-xs mt-0.5">🗣️</span>
              <div>
                <p className="font-black text-sm sm:text-base font-['Nunito'] text-amber-950 leading-tight">
                  {bubbleText}
                </p>
                {bubblePhonetic && (
                  <p className="text-[11px] font-bold text-amber-700 mt-0.5">
                    [{bubblePhonetic}]
                  </p>
                )}
              </div>
            </div>
            {/* Bubble Tail pointing down to avatar */}
            <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-amber-400" />
          </div>
        )}

        {/* Companion Avatar Button */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Change Avatar Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 p-2 rounded-2xl shadow-md transition-transform hover:scale-110 active:scale-95"
            title="Hevalê xwe biguhere"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Interactive Character */}
          <button
            onClick={handleCompanionClick}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 border-4 border-white shadow-2xl flex items-center justify-center text-4xl sm:text-5xl transition-all transform hover:scale-110 active:scale-95 ${
              isSpeaking ? 'ring-4 ring-amber-400 scale-105 animate-bounce' : ''
            }`}
            title="Ji bo bihîstina dengê hevalê xwe pêl bike"
          >
            <span>{currentCompanion.emoji}</span>
          </button>
        </div>
      </div>

      {/* Modal: Choose Companion Character */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 pointer-events-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border-4 border-amber-400 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-4xl">👑</span>
              <h3 className="text-2xl font-black text-amber-950 font-['Nunito'] mt-1">
                Hevalê Rêwîtiya Xwe Hilbijêre
              </h3>
              <p className="text-xs text-amber-800 font-bold">
                Kîjan heval dê di gund de bi te re bipeyive û rê nîşanî te bide?
              </p>
            </div>

            {/* Companions Grid */}
            <div className="grid grid-cols-2 gap-3">
              {COMPANION_GUIDES.map((comp) => {
                const isSelected = comp.id === currentCompanion.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => {
                      onSelectCompanion(comp);
                      animalSynth.playAnimalSound(comp.id);
                      setTimeout(() => {
                        audioService.speakKurdishWord(
                          comp.greetings,
                          undefined,
                          comp.voicePitch,
                          comp.voiceRate
                        );
                      }, 600);
                      setIsModalOpen(false);
                    }}
                    className={`p-3.5 rounded-2xl border-3 flex flex-col items-center text-center gap-1.5 transition-all transform active:scale-95 ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 scale-102 shadow-md'
                        : 'bg-slate-50 hover:bg-amber-50 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <span className="text-4xl">{comp.emoji}</span>
                    <span className="font-black text-base text-slate-900 font-['Nunito']">
                      {comp.name}
                    </span>
                    <span className="text-[11px] font-bold text-amber-700">
                      [{comp.cryPhonetic}]
                    </span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">
                      {comp.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
