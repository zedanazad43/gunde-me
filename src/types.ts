export type ItemCategory = 'ajalan' | 'amur' | 'avahi';

export interface CardItem {
  id: string;
  name: string;             // Kurdish Latin Name (e.g. Şêr, Hesp, Bivir)
  phonetic: string;         // Pronunciation phonetic guide in Latin (e.g. "Shehr", "Hasp")
  category: ItemCategory;
  emoji: string;
  description: string;      // Kurdish Latin description
  soundEffect?: string;
  rarity?: 'asayî' | 'hêja' | 'zêrîn'; // Common, Rare, Golden
}

export interface Building {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  baseCost: number;
  description: string;
  icon: string;
  perks: string;
}

export interface WheelReward {
  type: 'coins' | 'energy' | 'shield' | 'card' | 'raid';
  amount: number;
  label: string;
  color: string;
  icon: string;
}

export interface PlayerState {
  coins: number;
  energy: number;
  maxEnergy: number;
  shields: number;
  maxShields: number;
  villageLevel: number;
  unlockedCards: string[];
  lastSpinTime: number;
}

export interface VillageActionHotspot {
  id: string;
  name: string;             // Kurdish Latin Name (e.g. "Hevîr Strandin", "Nanê Sêlê", "Çinîna Genim")
  verb: string;             // Kurdish Verb (e.g. "Hevîr strandin", "Nan pêjan", "Genim çinîn")
  phonetic: string;         // Phonetic pronunciation (e.g. "[Heh-vee-ray geh-neem]")
  description: string;      // Kurdish description of the cultural activity
  narration: string;        // Full Kurdish speech line spoken by the companion
  sfx: string;              // Contextual sound effect type (e.g. "dough", "fire", "chickens", "water", "milk", "plow", "sickle", "fruit", "axe")
  wordId?: string;          // Optional linked audio clip
  icon: string;
  position: { x: number; y: number }; // % coordinates on scene card
}

export interface VillageLifeScene {
  id: string;
  title: string;            // e.g. "Spêdeya Dayikê & Xaniyê Gund"
  subtitle: string;         // e.g. "Karên dayikê ji spêdeya zû ve"
  character: string;        // "Dayik" or "Bav"
  season?: string;          // "Bihar", "Havîn", "Payîz", "Zivistan"
  backdropEmoji: string;
  description: string;
  hotspots: VillageActionHotspot[];
}

export interface AlphabetLetter {
  letter: string;           // e.g. "A", "B", "Ç", "Ê", "Ş"
  name: string;             // Kurdish letter name, e.g. "A", "Bê", "Çê", "Ê"
  phonetic: string;         // e.g. "Ah", "Bay", "Chay"
  exampleWord: string;      // Kurdish example word, e.g. "Av", "Bivir", "Çakûç"
  exampleMeaning: string;   // Kurdish explanation
  icon: string;             // Emoji / icon
  wordId?: string;          // Optional audio link
}

export interface CartoonEpisode {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  theme: string;
  season?: string;
  character: string;
  backdropEmoji: string;
  storyText: string;
  dialogueLines: { speaker: string; text: string; phonetic: string; avatar: string }[];
  hotspots: VillageActionHotspot[];
  quizQuestion?: {
    question: string;
    options: { text: string; correct: boolean; phonetic: string; icon: string }[];
    rewardCoins: number;
  };
}
