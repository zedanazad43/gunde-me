import React, { useState, useEffect } from 'react';
import { PlayerState, Building, WheelReward, CardItem } from './types.ts';
import { INITIAL_BUILDINGS, COMPANION_GUIDES, CompanionGuide, TOUCHABLE_ITEMS } from './content/language.ts';
import { audioService } from './content/audio.ts';
import { Header } from './components/Header.tsx';
import { SpinWheel } from './components/SpinWheel.tsx';
import { VillageView } from './components/VillageView.tsx';
import { Flashcards } from './components/Flashcards.tsx';
import { QuizMode } from './components/QuizMode.tsx';
import { RaidModal } from './components/RaidModal.tsx';
import { CompanionGuideWidget } from './components/CompanionGuide.tsx';
import { JourneyView } from './components/JourneyView.tsx';

const STORAGE_KEY = 'gunde_me_save_v1';

export const App: React.FC = () => {
  // Load saved state or default
  const [player, setPlayer] = useState<PlayerState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return {
      coins: 1000,
      energy: 30,
      maxEnergy: 50,
      shields: 2,
      maxShields: 3,
      villageLevel: 1,
      unlockedCards: ['ser', 'pisik', 'bivir', 'cakuc'],
      lastSpinTime: Date.now()
    };
  });

  const [buildings, setBuildings] = useState<Building[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY + '_buildings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_BUILDINGS;
  });

  const [activeTab, setActiveTab] = useState<'wheel' | 'village' | 'journey' | 'cards' | 'quiz'>('wheel');
  const [isRaidOpen, setIsRaidOpen] = useState(false);

  // Companion state
  const [companion, setCompanion] = useState<CompanionGuide>(COMPANION_GUIDES[0]);
  const [speechBubble, setSpeechBubble] = useState<{ text: string; phonetic?: string }>({
    text: COMPANION_GUIDES[0].greetings,
    phonetic: COMPANION_GUIDES[0].cryPhonetic
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    audioService.setSpeakingListener((_text, speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  // Save on state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
  }, [player]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_buildings', JSON.stringify(buildings));
  }, [buildings]);

  // Touch/Hover-to-Speak handler for any element on screen
  const handleTouchItem = (itemId: string) => {
    const item = TOUCHABLE_ITEMS[itemId];
    if (item) {
      setSpeechBubble({ text: item.name, phonetic: item.phonetic });
      audioService.speakKurdishWord(item.name, item.phonetic, item.wordId);
    }
  };

  // Passive energy regen every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPlayer((prev) => {
        if (prev.energy < prev.maxEnergy) {
          return { ...prev, energy: Math.min(prev.maxEnergy, prev.energy + 1) };
        }
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Handler: deduct energy
  const handleDeductEnergy = (): boolean => {
    if (player.energy <= 0) return false;
    setPlayer(prev => ({ ...prev, energy: prev.energy - 1 }));
    setSpeechBubble({
      text: "Çerx dizivire! Bêhna xwe fireh bike!",
      phonetic: companion.cryPhonetic
    });
    return true;
  };

  // Handler: wheel reward
  const handleWheelReward = (reward: WheelReward, wonCard?: CardItem) => {
    if (reward.type === 'raid') {
      setIsRaidOpen(true);
      setSpeechBubble({
        text: "Êrîşa dostane! Sindoqekê veke!",
        phonetic: "Seen-do-qek vaye-keh"
      });
      return;
    }

    setPlayer(prev => {
      let coins = prev.coins;
      let energy = prev.energy;
      let shields = prev.shields;
      const unlocked = [...prev.unlockedCards];

      if (reward.type === 'coins') {
        coins += reward.amount;
        setSpeechBubble({
          text: `Aferîn! Te ${reward.amount} Dirav qezenc kir!`,
          phonetic: "Dee-rav"
        });
      } else if (reward.type === 'energy') {
        energy = Math.min(prev.maxEnergy, energy + reward.amount);
        setSpeechBubble({
          text: `Pîroz be! Te ${reward.amount} Hêz qezenc kir!`,
          phonetic: "Hayz"
        });
      } else if (reward.type === 'shield') {
        shields = Math.min(prev.maxShields, shields + reward.amount);
        setSpeechBubble({
          text: "Mertalê nû! Gundê me parastî ye!",
          phonetic: "Mehr-tal"
        });
      }

      if (wonCard && !unlocked.includes(wonCard.id)) {
        unlocked.push(wonCard.id);
        setSpeechBubble({
          text: `Karta nû: ${wonCard.name}!`,
          phonetic: wonCard.phonetic
        });
      }

      return {
        ...prev,
        coins,
        energy,
        shields,
        unlockedCards: unlocked
      };
    });
  };

  const handleRaidComplete = (coinsEarned: number) => {
    setIsRaidOpen(false);
    setPlayer(prev => ({
      ...prev,
      coins: prev.coins + coinsEarned
    }));
    setSpeechBubble({
      text: `Xezîneya mezin! +${coinsEarned} Dirav!`,
      phonetic: "Xe-zee-ne"
    });
  };

  // Handler: upgrade building
  const handleUpgradeBuilding = (buildingId: string) => {
    const target = buildings.find(b => b.id === buildingId);
    if (!target) return;
    const cost = target.baseCost * target.level;
    if (player.coins < cost) return;

    setPlayer(prev => ({
      ...prev,
      coins: prev.coins - cost
    }));

    setBuildings(prev =>
      prev.map(b => (b.id === buildingId ? { ...b, level: b.level + 1 } : b))
    );

    setSpeechBubble({
      text: `Avahî hat zêdekirin: ${target.name}!`,
      phonetic: "A-va-hee"
    });

    // Check if all buildings leveled up
    setTimeout(() => {
      const allMaxed = buildings.every(b => (b.id === buildingId ? b.level + 1 : b.level) >= b.maxLevel);
      if (allMaxed) {
        setPlayer(p => ({
          ...p,
          villageLevel: p.villageLevel + 1,
          coins: p.coins + 3000
        }));
        setSpeechBubble({
          text: `Gund qediya! Derbasî Asta ${player.villageLevel + 1} bûyî!`,
          phonetic: "Gund"
        });
        audioService.speakCompanion(`Pîroz be! Te gund qedand û derbasî Asta ${player.villageLevel + 1} bûyî!`, companion, true);
      }
    }, 500);
  };

  // Handler: Quiz reward
  const handleQuizReward = (coinsEarned: number, energyEarned: number, unlockedCardId: string) => {
    setPlayer(prev => {
      const unlocked = prev.unlockedCards.includes(unlockedCardId)
        ? prev.unlockedCards
        : [...prev.unlockedCards, unlockedCardId];

      return {
        ...prev,
        coins: prev.coins + coinsEarned,
        energy: Math.min(prev.maxEnergy, prev.energy + energyEarned),
        unlockedCards: unlocked
      };
    });
    setSpeechBubble({
      text: "Bersiva rast! Tu gelek zîrek î!",
      phonetic: "Rast e"
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-['Fredoka']">
      {/* Top HUD Navigation */}
      <Header
        player={player}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTouchItem={handleTouchItem}
      />

      {/* Main Game Screen */}
      <main className="flex-1 pb-24 pt-4">
        {activeTab === 'wheel' && (
          <SpinWheel
            player={player}
            onReward={handleWheelReward}
            onDeductEnergy={handleDeductEnergy}
          />
        )}

        {activeTab === 'village' && (
          <VillageView
            buildings={buildings}
            player={player}
            onUpgradeBuilding={handleUpgradeBuilding}
          />
        )}

        {activeTab === 'journey' && (
          <JourneyView
            companion={companion}
            setSpeechBubble={setSpeechBubble}
            onRewardCoins={(amount) => {
              setPlayer(prev => ({ ...prev, coins: prev.coins + amount }));
            }}
          />
        )}

        {activeTab === 'cards' && (
          <Flashcards unlockedCardIds={player.unlockedCards} />
        )}

        {activeTab === 'quiz' && (
          <QuizMode onWinReward={handleQuizReward} />
        )}
      </main>

      {/* Interactive Animal Companion Guide & Speech Cloud */}
      <CompanionGuideWidget
        currentCompanion={companion}
        onSelectCompanion={(c) => setCompanion(c)}
        bubbleText={speechBubble.text}
        bubblePhonetic={speechBubble.phonetic}
        isSpeaking={isSpeaking}
      />

      {/* Coin Master Style Raid Modal */}
      <RaidModal
        isOpen={isRaidOpen}
        onComplete={handleRaidComplete}
      />

      {/* Bottom Footer */}
      <footer className="bg-amber-900 text-amber-200 py-3 text-center text-xs border-t-2 border-amber-700 font-sans">
        <p className="font-bold">Gundé me © 2026 — Lîstika Zimanê Kurdî bi Tîpên Latînî ji bo Zarokan</p>
        <p className="opacity-75 text-[11px] mt-0.5">Hemû peyv û tîp bi alfabeya latînî ya Hawarê hatine nivîsandin.</p>
      </footer>
    </div>
  );
};
