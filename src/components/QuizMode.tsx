import React, { useState, useEffect } from 'react';
import { CardItem } from '../types';
import { ALL_CARDS, UI_TEXT } from '../content/language';
import { audioService } from '../content/audio';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, Check, X, RefreshCw, Trophy } from 'lucide-react';

interface QuizModeProps {
  onWinReward: (coins: number, energy: number, unlockedCardId: string) => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({ onWinReward }) => {
  const [currentQuestion, setCurrentQuestion] = useState<{
    target: CardItem;
    options: CardItem[];
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  // Generate new question
  const generateQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);

    const target = ALL_CARDS[Math.floor(Math.random() * ALL_CARDS.length)];
    const otherPool = ALL_CARDS.filter(c => c.id !== target.id);
    // Shuffle and pick 3 wrong options
    const shuffledOthers = [...otherPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());

    setCurrentQuestion({ target, options });

    // Automatically speak the target word after a brief moment
    setTimeout(() => {
      audioService.speakKurdishWord(target.name, target.phonetic);
    }, 400);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSelectOption = (option: CardItem) => {
    if (selectedAnswer !== null || !currentQuestion) return;

    setSelectedAnswer(option.id);
    const correct = option.id === currentQuestion.target.id;
    setIsCorrect(correct);

    if (correct) {
      audioService.playSuccessChime();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
      setScore(s => s + 1);
      onWinReward(150, 1, currentQuestion.target.id);
    } else {
      audioService.playErrorSound();
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col items-center">
      {/* Quiz Card */}
      <div className="w-full bg-white rounded-3xl p-6 border-4 border-purple-300 shadow-2xl text-center relative overflow-hidden">
        {/* Score & Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="bg-purple-100 text-purple-900 font-extrabold text-xs px-3 py-1 rounded-full border border-purple-300">
            Lîstika Zimanê Kurdî
          </span>
          <div className="flex items-center gap-1 bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-300">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Pûan: {score}</span>
          </div>
        </div>

        {/* Audio Prompt */}
        <h3 className="text-xl font-black text-slate-800 font-['Nunito'] mb-2">
          Ev kîjan peyv e? Guh bide dengê!
        </h3>
        <p className="text-xs text-slate-500 mb-4 font-semibold">
          Ji bo bihîstina dengê Kurdî pêl bişkoka mezin bike
        </p>

        {/* Big Audio Play Button */}
        <div className="flex justify-center my-4">
          <button
            onClick={() => audioService.speakKurdishWord(currentQuestion.target.name, currentQuestion.target.phonetic)}
            className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-400 p-1 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform group"
          >
            <div className="w-full h-full rounded-full bg-white/20 flex flex-col items-center justify-center text-white">
              <Volume2 className="w-10 h-10 group-hover:scale-125 transition-transform animate-pulse" />
              <span className="text-[10px] font-black uppercase mt-0.5 tracking-wider">Deng</span>
            </div>
          </button>
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {currentQuestion.options.map((opt) => {
            const isTarget = opt.id === currentQuestion.target.id;
            const isSelected = selectedAnswer === opt.id;

            let btnStyle = "bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-950";
            if (selectedAnswer !== null) {
              if (isTarget) {
                btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-md scale-102";
              } else if (isSelected) {
                btnStyle = "bg-rose-500 text-white border-rose-600";
              } else {
                btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-2xl border-3 font-['Nunito'] flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${btnStyle}`}
              >
                <span className="text-4xl">{opt.emoji}</span>
                <span className="font-black text-lg">{opt.name}</span>
                <span className="text-xs font-semibold opacity-75">[{opt.phonetic}]</span>
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        {selectedAnswer !== null && (
          <div className="mt-6 flex flex-col items-center gap-3 animate-bounce-soft">
            {isCorrect ? (
              <div className="bg-emerald-100 text-emerald-800 font-black px-4 py-2 rounded-2xl border border-emerald-300 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>{UI_TEXT.wellDone} (+150 Dirav, +1 Hêz)</span>
              </div>
            ) : (
              <div className="bg-rose-100 text-rose-800 font-black px-4 py-2 rounded-2xl border border-rose-300 flex items-center gap-2">
                <X className="w-5 h-5 text-rose-600" />
                <span>Şaş e! Ev bû: {currentQuestion.target.name} ({currentQuestion.target.emoji})</span>
              </div>
            )}

            <button
              onClick={generateQuestion}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm shadow-md hover:brightness-110 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Pirsa Din</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
