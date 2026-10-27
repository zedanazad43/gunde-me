import React, { useState, useRef } from 'react';
import { CARTOON_EPISODES, KURDISH_ALPHABET, CompanionGuide } from '../content/language.ts';
import { CartoonEpisode, VillageActionHotspot, AlphabetLetter } from '../types.ts';
import { audioService } from '../content/audio.ts';
import { Volume2, Sparkles, Film, Play, BookOpen, CheckCircle2, Award } from 'lucide-react';

interface JourneyViewProps {
  companion: CompanionGuide;
  setSpeechBubble: (bubble: { text: string; phonetic?: string }) => void;
  onRewardCoins?: (amount: number) => void;
}

export const JourneyView: React.FC<JourneyViewProps> = ({ companion, setSpeechBubble, onRewardCoins }) => {
  const [selectedEpIndex, setSelectedEpIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<VillageActionHotspot | null>(null);
  const [activeLetter, setActiveLetter] = useState<AlphabetLetter | null>(null);
  const [isAlphabetMode, setIsAlphabetMode] = useState(false);
  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  const [storyDialogueIndex, setStoryDialogueIndex] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [visitedItems, setVisitedItems] = useState<string[]>([]);
  const hoverThrottleRef = useRef<number>(0);

  const currentEp: CartoonEpisode = CARTOON_EPISODES[selectedEpIndex] || CARTOON_EPISODES[0];

  // Immediate Hover & Touch speech reader: NO ANIMAL ROARS, DIRECT HUMAN KURDISH PRONUNCIATION
  const handleReadWord = (name: string, phonetic: string, wordId?: string, narration?: string, sfx?: string) => {
    const now = Date.now();
    if (now - hoverThrottleRef.current < 80) return; // tight responsive throttle
    hoverThrottleRef.current = now;

    // Optional physical sound effect if specified (e.g. hammer clang, dough slap)
    if (sfx) {
      audioService.playSFX(sfx);
    }

    // Direct human spoken Kurdish pronunciation
    audioService.speakKurdishWord(name, phonetic, wordId);

    // Update speech bubble cloud with clear Hawar Latin text & phonetic guide
    setSpeechBubble({
      text: narration ? `${name} — ${narration}` : name,
      phonetic: `[${phonetic}]`
    });
  };

  // Select Episode
  const selectEpisode = (idx: number) => {
    setSelectedEpIndex(idx);
    setIsAlphabetMode(false);
    setActiveHotspot(null);
    setIsStoryPlaying(false);
    setStoryDialogueIndex(0);
    setQuizAnswered(null);

    const ep = CARTOON_EPISODES[idx];
    handleReadWord(ep.title, ep.theme, undefined, ep.storyText);
  };

  // Play Cartoon Story narration
  const startStoryNarration = () => {
    setIsStoryPlaying(true);
    setStoryDialogueIndex(0);
    const d = currentEp.dialogueLines[0];
    if (d) {
      handleReadWord(`${d.speaker}: ${d.text}`, d.phonetic);
    }
  };

  const nextStoryLine = () => {
    const nextIdx = storyDialogueIndex + 1;
    if (nextIdx < currentEp.dialogueLines.length) {
      setStoryDialogueIndex(nextIdx);
      const d = currentEp.dialogueLines[nextIdx];
      handleReadWord(`${d.speaker}: ${d.text}`, d.phonetic);
    } else {
      setIsStoryPlaying(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-6">
      {/* Header Cinema Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 rounded-3xl p-5 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-amber-200 text-xs font-black uppercase tracking-wider mb-1">
            <Film className="w-4 h-4 animate-spin-slow" />
            <span>Sînemaya Kartonî ya Gundê Me • Fêrbûna Zimanê Kurdî</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Nunito'] drop-shadow-md">
            Rêze-Fîlmên Kartonî & Alfabeya Hawarê
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-2xl mt-1">
            Destê xwe bide ser her peyv, tîp, karker an amûrekê da ku dengê wê yê resen ê Kurdî bibihîzî.
            Tu dikarî çîroka her xelekê wek fîlmekî kartonî temaşe bikî!
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 text-8xl opacity-20 select-none pointer-events-none">
          🎬
        </div>
      </div>

      {/* Episode & Alphabet Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CARTOON_EPISODES.map((ep, idx) => {
          const isSelected = !isAlphabetMode && idx === selectedEpIndex;
          return (
            <button
              key={ep.id}
              onClick={() => selectEpisode(idx)}
              onMouseEnter={() => handleReadWord(ep.title, ep.theme)}
              className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all transform ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-lg scale-105 border-2 border-amber-300'
                  : 'bg-white text-stone-700 hover:bg-amber-50 border-2 border-stone-200'
              }`}
            >
              <span className="text-xl">{ep.backdropEmoji}</span>
              <div className="text-left">
                <div className="font-black leading-tight">{ep.title.split(':')[0]}</div>
                <div className="text-[11px] opacity-80 font-normal">
                  {ep.season ? `${ep.season} • ` : ''}{ep.character}
                </div>
              </div>
            </button>
          );
        })}

        {/* Tab 7: 31 Letters of Kurdish Hawar Alphabet */}
        <button
          onClick={() => {
            setIsAlphabetMode(true);
            setActiveHotspot(null);
            handleReadWord("Alfabeya Kurdî", "31 Tîpên Zêrîn ên Hawarê");
          }}
          onMouseEnter={() => handleReadWord("Alfabeya Kurdî", "31 Tîpên Zêrîn")}
          className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all transform ${
            isAlphabetMode
              ? 'bg-purple-600 text-white shadow-lg scale-105 border-2 border-purple-300'
              : 'bg-white text-purple-900 hover:bg-purple-50 border-2 border-purple-200'
          }`}
        >
          <span className="text-xl">🔤</span>
          <div className="text-left">
            <div className="font-black leading-tight">Alfabeya Kurdî</div>
            <div className="text-[11px] opacity-80 font-normal">31 Tîpên Hawarê</div>
          </div>
        </button>
      </div>

      {/* VIEW MODE 1: 31 LETTERS ALPHABET EXPLORER */}
      {isAlphabetMode ? (
        <div className="bg-white rounded-3xl p-6 border-4 border-purple-300 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-purple-50 p-4 rounded-2xl border border-purple-200">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-purple-950 flex items-center gap-2">
                <span>🔤</span> Alfabeya Zimanê Kurdî (Hawar)
              </h3>
              <p className="text-xs sm:text-sm text-purple-800 font-semibold mt-0.5">
                Destê xwe deyne ser her tîpekê da ku deng û mînaka wê ya Kurdî bibihîzî!
              </p>
            </div>
            <span className="bg-purple-200 text-purple-900 font-black text-xs px-3 py-1 rounded-full">
              31 Tîpên Latînî
            </span>
          </div>

          {/* Alphabet Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {KURDISH_ALPHABET.map((item) => {
              const isSelected = activeLetter?.letter === item.letter;
              return (
                <div
                  key={item.letter}
                  onClick={() => {
                    setActiveLetter(item);
                    handleReadWord(`${item.name}: ${item.exampleWord}`, item.phonetic, item.wordId, item.exampleMeaning);
                  }}
                  onMouseEnter={() => {
                    setActiveLetter(item);
                    handleReadWord(`${item.name}: ${item.exampleWord}`, item.phonetic, item.wordId, item.exampleMeaning);
                  }}
                  className={`p-3 rounded-2xl border-3 flex flex-col items-center justify-center cursor-pointer transition-all transform hover:scale-110 active:scale-95 shadow-sm ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-200 shadow-xl scale-105'
                      : 'bg-white text-stone-800 border-purple-100 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-black">{item.letter}</span>
                  <span className="text-lg my-0.5">{item.icon}</span>
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-purple-100' : 'text-purple-800'}`}>
                    {item.exampleWord}
                  </span>
                  <span className={`text-[9px] font-mono ${isSelected ? 'text-purple-200' : 'text-stone-400'}`}>
                    [{item.phonetic}]
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Letter Spotlight */}
          {activeLetter && (
            <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-300 flex flex-wrap items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <span className="text-5xl font-black bg-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-md">
                  {activeLetter.letter}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-black text-purple-950">
                      Tîpa {activeLetter.name} — {activeLetter.exampleWord} {activeLetter.icon}
                    </h4>
                    <span className="text-xs font-mono bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full font-bold">
                      [{activeLetter.phonetic}]
                    </span>
                  </div>
                  <p className="text-xs text-purple-800 font-semibold mt-0.5">
                    {activeLetter.exampleMeaning}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleReadWord(`${activeLetter.name}: ${activeLetter.exampleWord}`, activeLetter.phonetic, activeLetter.wordId, activeLetter.exampleMeaning)}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-bold text-sm shadow active:scale-95"
              >
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span>Dengê Tîpê Bibihîze</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* VIEW MODE 2: INTERACTIVE CARTOON FILM EPISODE */
        <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-6">
          {/* Episode Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{currentEp.backdropEmoji}</span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                  {currentEp.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-semibold mt-0.5">
                {currentEp.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={startStoryNarration}
                className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white px-3.5 py-1.5 rounded-xl font-extrabold text-xs shadow-md transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Fîlmê Dest Pê Bike</span>
              </button>
            </div>
          </div>

          {/* Interactive Cartoon Scene Canvas */}
          <div className="relative bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 rounded-3xl p-6 border-4 border-amber-200 shadow-inner overflow-hidden min-h-[360px] flex flex-col justify-between">
            {/* Animated Scenery Layers (Ghibli / Zagros Cartoon Aesthetic) */}
            <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden flex items-center justify-center">
              <div className="absolute top-4 left-6 text-6xl animate-pulse">⛰️</div>
              <div className="absolute top-6 right-10 text-5xl">☀️</div>
              <div className="absolute bottom-4 left-1/4 text-6xl">🏡</div>
              <div className="absolute bottom-6 right-1/4 text-5xl">🌳</div>
              <div className="absolute top-1/3 left-1/2 text-4xl">🦅</div>
            </div>

            {/* Story Text Box */}
            <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-stone-200 shadow-sm">
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                {currentEp.storyText}
              </p>
            </div>

            {/* Cartoon Dialogue Speech Line (When playing story) */}
            {isStoryPlaying && currentEp.dialogueLines[storyDialogueIndex] && (
              <div className="relative z-20 my-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between gap-3 animate-bounce-soft">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-1 bg-white/20 rounded-2xl">
                    {currentEp.dialogueLines[storyDialogueIndex].avatar}
                  </span>
                  <div>
                    <h5 className="text-xs font-black uppercase text-amber-200">
                      {currentEp.dialogueLines[storyDialogueIndex].speaker}
                    </h5>
                    <p className="text-sm sm:text-base font-black">
                      {currentEp.dialogueLines[storyDialogueIndex].text}
                    </p>
                    <span className="text-xs text-amber-100 font-mono">
                      [{currentEp.dialogueLines[storyDialogueIndex].phonetic}]
                    </span>
                  </div>
                </div>
                <button
                  onClick={nextStoryLine}
                  className="bg-white text-amber-900 font-black text-xs px-3.5 py-2 rounded-xl shadow hover:bg-amber-100 active:scale-95"
                >
                  {storyDialogueIndex + 1 < currentEp.dialogueLines.length ? 'Rêza Din ➔' : 'Qediya ✓'}
                </button>
              </div>
            )}

            {/* Interactive Scene Hotspots */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-4">
              {currentEp.hotspots.map((hotspot) => {
                const isSelected = activeHotspot?.id === hotspot.id;
                const isVisited = visitedItems.includes(hotspot.id);

                return (
                  <div
                    key={hotspot.id}
                    onClick={() => {
                      setActiveHotspot(hotspot);
                      if (!visitedItems.includes(hotspot.id)) {
                        setVisitedItems(prev => [...prev, hotspot.id]);
                      }
                      handleReadWord(hotspot.name, hotspot.phonetic, hotspot.wordId, hotspot.narration, hotspot.sfx);
                    }}
                    onMouseEnter={() => {
                      setActiveHotspot(hotspot);
                      if (!visitedItems.includes(hotspot.id)) {
                        setVisitedItems(prev => [...prev, hotspot.id]);
                      }
                      handleReadWord(hotspot.name, hotspot.phonetic, hotspot.wordId, hotspot.narration, hotspot.sfx);
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border-3 transition-all transform hover:-translate-y-1 hover:shadow-xl active:scale-95 ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-200 shadow-xl scale-[1.02]'
                        : isVisited
                        ? 'bg-white/95 text-stone-800 border-emerald-300 shadow'
                        : 'bg-white/90 text-stone-800 border-amber-200 shadow-sm hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                        isSelected ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {hotspot.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-sm font-black truncate">{hotspot.name}</h4>
                          {isVisited && (
                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-amber-100' : 'text-emerald-500'}`} />
                          )}
                        </div>
                        <div className={`text-xs font-bold mt-0.5 inline-block px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-amber-600 text-amber-100' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {hotspot.verb}
                        </div>
                        <div className={`text-[11px] font-mono mt-1 ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                          [{hotspot.phonetic}]
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-black/5 flex items-center justify-between text-xs">
                      <span className="text-[11px] truncate opacity-90">{hotspot.description}</span>
                      <Volume2 className="w-4 h-4 ml-1 flex-shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Hotspot Spotlight */}
            {activeHotspot ? (
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 border-2 border-amber-300 shadow-md flex flex-wrap items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2 bg-amber-100 rounded-2xl border border-amber-200">
                    {activeHotspot.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-black text-stone-900">{activeHotspot.name}</h4>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        Lêker: {activeHotspot.verb}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5 font-medium">{activeHotspot.narration}</p>
                    <p className="text-xs font-mono text-amber-800 font-bold mt-1">
                      Bilêvkirin: [{activeHotspot.phonetic}]
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleReadWord(activeHotspot.name, activeHotspot.phonetic, activeHotspot.wordId, activeHotspot.narration, activeHotspot.sfx)}
                  className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengê Wî Bibihîze</span>
                </button>
              </div>
            ) : (
              <div className="relative z-10 text-center py-2 text-stone-600 text-xs font-semibold bg-white/70 rounded-xl border border-amber-200">
                👆 Destê xwe bide ser her karker, ajal an amûrekê da ku bilêvkirina Kurdî bibihîzî!
              </div>
            )}
          </div>

          {/* Episode Interactive Quiz */}
          {currentEp.quizQuestion && (
            <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h4 className="font-black text-sm text-stone-900">
                    Pirseke Kurt ji Çîrokê: {currentEp.quizQuestion.question}
                  </h4>
                </div>
                <span className="bg-amber-200 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  +{currentEp.quizQuestion.rewardCoins} Dirav 🪙
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                {currentEp.quizQuestion.options.map((opt, oIdx) => {
                  const isAnswered = quizAnswered !== null;
                  const isSelected = quizAnswered === oIdx;
                  let btnBg = 'bg-white hover:bg-amber-100 text-stone-800 border-amber-200';
                  if (isAnswered) {
                    if (opt.correct) btnBg = 'bg-emerald-500 text-white border-emerald-600 font-black';
                    else if (isSelected) btnBg = 'bg-rose-500 text-white border-rose-600';
                    else btnBg = 'bg-slate-100 text-slate-400 opacity-60';
                  }
                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswered}
                      onClick={() => {
                        setQuizAnswered(oIdx);
                        if (opt.correct) {
                          audioService.playSuccessChime();
                          onRewardCoins?.(currentEp.quizQuestion?.rewardCoins || 200);
                          handleReadWord("Aferîn! Bersiva te rast e!", "Aferîn", "aferin");
                        } else {
                          audioService.playErrorSound();
                          handleReadWord("Şaş e! Dîsa biceribîne!", "Şaş e");
                        }
                      }}
                      onMouseEnter={() => !isAnswered && handleReadWord(opt.text, opt.phonetic)}
                      className={`p-2.5 rounded-xl border-2 flex items-center justify-center gap-2 text-xs font-bold transition-all ${btnBg}`}
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cultural Learning Footer */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <span>
            <strong>Kevneşopiya Zimanê Kurdî:</strong> Hemû xelek, çîrok, tîp û lêker bi alfabeya latînî ya Hawarê (Celadet Bedirxan) hatine nivîsandin.
          </span>
        </div>
        <div className="text-right font-mono font-bold text-amber-900 flex-shrink-0">
          {visitedItems.length} Kar & Tîp hatin naskirin
        </div>
      </div>
    </div>
  );
};
