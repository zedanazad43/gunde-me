import React, { useState, useRef } from 'react';
import { WheelReward, PlayerState, CardItem } from '../types';
import { WHEEL_REWARDS, ALL_CARDS, UI_TEXT } from '../content/language';
import { audioService } from '../content/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Zap, Trophy, ShieldCheck, Gift } from 'lucide-react';

interface SpinWheelProps {
  player: PlayerState;
  onReward: (reward: WheelReward, wonCard?: CardItem) => void;
  onDeductEnergy: () => boolean;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({ player, onReward, onDeductEnergy }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastWin, setLastWin] = useState<{ reward: WheelReward; card?: CardItem } | null>(null);
  const currentRotationRef = useRef(0);

  const numSegments = WHEEL_REWARDS.length;
  const segmentAngle = 360 / numSegments;

  const handleSpin = () => {
    if (spinning) return;
    if (player.energy <= 0) {
      alert("Hêza te xelas bûye! Di çend xulekan de dê zêde bibe.");
      return;
    }

    const success = onDeductEnergy();
    if (!success) return;

    setSpinning(true);
    setLastWin(null);

    // Pick random outcome
    const targetIndex = Math.floor(Math.random() * numSegments);
    const targetReward = WHEEL_REWARDS[targetIndex];

    // Play tick sound rhythmically during spin
    let tickInterval: NodeJS.Timeout | null = null;
    let ticks = 0;
    tickInterval = setInterval(() => {
      audioService.playSpinTick();
      ticks++;
      if (ticks > 25) {
        if (tickInterval) clearInterval(tickInterval);
      }
    }, 120);

    // Add 5 to 8 full rotations + align pointer (at 270 degrees / top)
    const extraRounds = 5 + Math.floor(Math.random() * 3);
    // Segments start at 0 deg. Pointer is at 270 deg (top).
    // Segment i center is at i * segmentAngle + segmentAngle / 2
    const targetSegmentAngle = targetIndex * segmentAngle + segmentAngle / 2;
    const finalAngle = extraRounds * 360 + (360 - targetSegmentAngle + 270) % 360;

    const newTotalRotation = currentRotationRef.current + (finalAngle - (currentRotationRef.current % 360)) + 360 * extraRounds;
    currentRotationRef.current = newTotalRotation;
    setRotation(newTotalRotation);

    setTimeout(() => {
      setSpinning(false);
      if (tickInterval) clearInterval(tickInterval);

      let awardedCard: CardItem | undefined;
      if (targetReward.type === 'card') {
        const availableCards = ALL_CARDS.filter(c => !player.unlockedCards.includes(c.id));
        const pool = availableCards.length > 0 ? availableCards : ALL_CARDS;
        awardedCard = pool[Math.floor(Math.random() * pool.length)];
      }

      setLastWin({ reward: targetReward, card: awardedCard });

      // Celebration sound and confetti
      if (targetReward.type === 'coins' || targetReward.type === 'card' || targetReward.type === 'raid') {
        audioService.playCelebrationSound();
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        audioService.playSuccessChime();
      }

      if (awardedCard) {
        audioService.speakKurdishWord(awardedCard.name, awardedCard.phonetic);
      }

      onReward(targetReward, awardedCard);
    }, 3800);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-black text-amber-900 font-['Nunito'] flex items-center justify-center gap-2">
          <span>🎡</span> Çerxa Gundê Me
        </h2>
        <p className="text-amber-700 font-bold text-sm">
          Bizivirîne û dirav, mertal û kartên zimanê qezenc bike!
        </p>
      </div>

      {/* Wheel Container */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* Pointer at the top */}
        <div className="absolute -top-3 z-30 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[30px] border-t-red-600 drop-shadow-md animate-bounce" />
        </div>

        {/* Outer Wheel Rim */}
        <div className="absolute inset-0 rounded-full border-8 border-amber-500 bg-amber-400 shadow-2xl p-2 flex items-center justify-center">
          {/* Wheel Bulb Lights */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            const x = 50 + 47 * Math.cos((angle * Math.PI) / 180);
            const y = 50 + 47 * Math.sin((angle * Math.PI) / 180);
            return (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-yellow-200 border border-amber-600 shadow-sm"
                style={{
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: `pulseGlow 1.5s ease-in-out infinite ${i * 0.1}s`
                }}
              />
            );
          })}

          {/* Rotating Wheel Canvas/SVG */}
          <div
            className="w-full h-full rounded-full overflow-hidden relative shadow-inner border-4 border-amber-600"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 3.8s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {WHEEL_REWARDS.map((item, idx) => {
                const startAngle = (idx * 360) / numSegments;
                const endAngle = ((idx + 1) * 360) / numSegments;

                // SVG Arc Path calculation
                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const midAngle = startAngle + segmentAngle / 2;
                const textX = 50 + 32 * Math.cos((Math.PI * midAngle) / 180);
                const textY = 50 + 32 * Math.sin((Math.PI * midAngle) / 180);

                return (
                  <g key={idx}>
                    <path
                      d={`M50,50 L${x1},${y1} A50,50 0 0,1 ${x2},${y2} Z`}
                      fill={item.color}
                      stroke="#B45309"
                      strokeWidth="0.8"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="#1E293B"
                      fontSize="4.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                    >
                      {item.icon} {item.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Hub */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 border-4 border-white shadow-xl flex items-center justify-center z-20">
            <span className="text-3xl animate-bounce">☀️</span>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <button
          onClick={handleSpin}
          disabled={spinning || player.energy <= 0}
          className={`px-10 py-4 rounded-3xl font-black text-2xl tracking-wider text-white shadow-2xl transition-all transform active:scale-95 font-['Nunito'] flex items-center gap-3 ${
            spinning || player.energy <= 0
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 hover:scale-105 hover:shadow-amber-500/50'
          }`}
        >
          <Zap className="w-7 h-7 fill-white" />
          <span>{spinning ? "DIZIVIRE..." : "BIZIVIRÎNE!"}</span>
        </button>

        <span className="text-amber-900 font-extrabold text-sm flex items-center gap-1 bg-amber-200/80 px-3 py-1 rounded-full">
          Hêz: {player.energy} / {player.maxEnergy} (Her car -1 ⚡)
        </span>
      </div>

      {/* Win Display Modal or Banner */}
      {lastWin && (
        <div className="mt-5 p-4 bg-white/95 rounded-2xl border-4 border-amber-400 shadow-xl max-w-sm w-full text-center animate-bounce-soft">
          <div className="text-3xl mb-1">{lastWin.reward.icon}</div>
          <h3 className="text-lg font-black text-amber-900 font-['Nunito']">
            Te {lastWin.reward.label} qezenc kir!
          </h3>
          {lastWin.card && (
            <div className="mt-2 bg-sky-50 border-2 border-sky-300 p-2 rounded-xl flex items-center justify-center gap-2">
              <span className="text-3xl">{lastWin.card.emoji}</span>
              <div className="text-left">
                <span className="text-xs uppercase font-bold text-sky-600 block">Karta Nû</span>
                <span className="font-black text-sky-950 text-base">{lastWin.card.name}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
