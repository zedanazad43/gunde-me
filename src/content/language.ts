import type { CardItem, Building, WheelReward, VillageLifeScene, VillageActionHotspot, AlphabetLetter, CartoonEpisode } from '../types.ts';

export const GAME_TITLE = "Gundé me";
export const GAME_SUBTITLE = "Lîstika Perwerdehiya Zimanê Kurdî bi Tîpên Latînî";

// Companion Animal Guides (Hevalên Rêwîtiyê)
export interface CompanionGuide {
  id: string;
  name: string;             // e.g. "Şêro", "Semend", "Mîşo"
  animalName: string;       // Kurdish Animal Name: Şêr, Hesp, Pisîk...
  title: string;            // e.g. "Şêrê Xurt", "Hespê Çeleng"
  emoji: string;
  phonetic: string;
  voicePitch: number;       // Speech synthesis pitch
  voiceRate: number;        // Speech synthesis rate
  soundCry: string;         // Name of animal acoustic call
  cryPhonetic: string;      // e.g. "Rrrr-Waouh!", "Hnnh-heee!"
  catchphrase: string;      // In Zagrosian Kurdish Hawar
  greetings: string;
}

export const COMPANION_GUIDES: CompanionGuide[] = [
  {
    id: 'ser',
    name: 'Şêro',
    animalName: 'Şêr',
    title: 'Şêrê Xurt ê Zagrosê',
    emoji: '🦁',
    phonetic: 'Shey-ro',
    voicePitch: 0.8,
    voiceRate: 0.85,
    soundCry: 'lion',
    cryPhonetic: 'Rrrr-Waouh!',
    catchphrase: 'Ez Şêro me, qiralê zinarên bilind ên Zagrosê!',
    greetings: 'Silav hevalê min ê zîrek! Were em bi hev re gundê xwe ava bikin!'
  },
  {
    id: 'hesp',
    name: 'Semend',
    animalName: 'Hesp',
    title: 'Hespê Beza Çeleng',
    emoji: '🐴',
    phonetic: 'Sah-mahnd',
    voicePitch: 0.95,
    voiceRate: 0.9,
    soundCry: 'horse',
    cryPhonetic: 'Hnnh-heee-ha-ha!',
    catchphrase: 'Ez Semend im, hevalê rêwîtiyên dûr û bayê lez!',
    greetings: 'Silav! Bireve bi lez da ku em çerxê bizivirînin û xelatan bibînin!'
  },
  {
    id: 'pisik',
    name: 'Mîşo',
    animalName: 'Pisîk',
    title: 'Pisîka Şîrîn a Gund',
    emoji: '🐱',
    phonetic: 'Mee-sho',
    voicePitch: 1.25,
    voiceRate: 0.88,
    soundCry: 'cat',
    cryPhonetic: 'Miyaww-miyaww!',
    catchphrase: 'Ez Mîşo me, çavên min wek stêrkan li nav gund dibirqin!',
    greetings: 'Silav hezkiriyê min! Were em li her derê gund bigerin!'
  },
  {
    id: 'kucik',
    name: 'Beso',
    animalName: 'Kûçik',
    title: 'Kûçikê Dilsoz ê Parêzvan',
    emoji: '🐶',
    phonetic: 'Bah-so',
    voicePitch: 1.1,
    voiceRate: 0.9,
    soundCry: 'dog',
    cryPhonetic: 'Haf-haf-ew!',
    catchphrase: 'Ez Beso me, parêzvanê hevalan û gundê me yê xweşik!',
    greetings: 'Silav hevalê qenc! Mertalên me amade ne ku gund biparêzin!'
  },
  {
    id: 'cucik',
    name: 'Çûço',
    animalName: 'Çûçik',
    title: 'Çûçika Dengxweş a Çiqilan',
    emoji: '🐥',
    phonetic: 'Choo-cho',
    voicePitch: 1.45,
    voiceRate: 0.95,
    soundCry: 'bird',
    cryPhonetic: 'Cîk-cîk-fîûw!',
    catchphrase: 'Ez Çûço me, li ser milê te stranên zimanê şêrîn dibêjim!',
    greetings: 'Cîk-cîk! Çavên min li ser hemû xezîneyên nû ne!'
  },
  {
    id: 'gur',
    name: 'Qert',
    animalName: 'Gur',
    title: 'Gurê Zîrek ê Çiyayan',
    emoji: '🐺',
    phonetic: 'Qahrt',
    voicePitch: 0.85,
    voiceRate: 0.85,
    soundCry: 'wolf',
    cryPhonetic: 'Aûûû-aûûû!',
    catchphrase: 'Ez Qert im, hevalê koman û parêzvanê şevên asê!',
    greetings: 'Silav lehengê gund! Dilê me germ e bo serkeftinê!'
  },
  {
    id: 'dik',
    name: 'Qoqoy',
    animalName: 'Dîk',
    title: 'Dîkê Spêdeya Gund',
    emoji: '🐔',
    phonetic: 'Qo-qoy',
    voicePitch: 1.2,
    voiceRate: 0.9,
    soundCry: 'rooster',
    cryPhonetic: 'Qoqorî-qooo!',
    catchphrase: 'Ez Qoqoy im, her sibeh bi dengê xwe xewê ji çavan direvînim!',
    greetings: 'Spêdeya te bi xêr! Rabe em bi hev re zimanê Kurdî bixwînin!'
  },
  {
    id: 'ker',
    name: 'Kedkar',
    animalName: 'Ker',
    title: 'Kerê Bêdeng û Dilnerm',
    emoji: '🫏',
    phonetic: 'Kahd-kahr',
    voicePitch: 0.9,
    voiceRate: 0.85,
    soundCry: 'donkey',
    cryPhonetic: 'Î-ah-î-ah!',
    catchphrase: 'Ez Kedkar im, hevalê ked û barê giran ê cotkaran!',
    greetings: 'Silav! Hêdî hêdî û bi sebir em ê gundê xwe bikin yê herî mezin!'
  }
];

// Touch-to-Speak Zagrosian Kurdish Object Dictionary
export interface TouchableItem {
  id: string;
  name: string;             // Zagrosian Kurdish Hawar name
  phonetic: string;         // Phonetic reading guide
  description: string;      // Spoken by companion upon touch
  category: 'hud' | 'nature' | 'building' | 'wheel';
}

export const TOUCHABLE_ITEMS: Record<string, TouchableItem> = {
  // HUD Elements
  coins_box: {
    id: 'coins_box',
    name: 'Sindoqa Diravan',
    phonetic: 'Seen-do-qa Dee-ra-van',
    description: 'Ev Sindoqa Diravan e! Diravên zêrîn ên gund li vir in.',
    category: 'hud'
  },
  energy_bolt: {
    id: 'energy_bolt',
    name: 'Hêza Birûskê',
    phonetic: 'Hay-za Bee-roos-kay',
    description: 'Ev Hêza Birûskê ye! Ji bo zivirandina çerxa gund tê bikaranîn.',
    category: 'hud'
  },
  shield_icon: {
    id: 'shield_icon',
    name: 'Mertalê Parastinê',
    phonetic: 'Mehr-tah-lay Pah-rahs-tee-nay',
    description: 'Ev Mertal e! Gundê me ji her êrîşekê diparêze.',
    category: 'hud'
  },
  sun_icon: {
    id: 'sun_icon',
    name: 'Xor û Roj',
    phonetic: 'Xohr oo Rohzh',
    description: 'Ev Xor û Roj e! Tîrêjên xwe yên germ berdide ser çiyayên Zagrosê.',
    category: 'nature'
  },
  village_level: {
    id: 'village_level',
    name: 'Asta Gund',
    phonetic: 'Ahs-tah Goond',
    description: 'Ev Asta Gundê me ye! Her ku em ava bikin asta me bilind dibe.',
    category: 'hud'
  },

  // Nature & Scene Elements
  zagros_mountain: {
    id: 'zagros_mountain',
    name: 'Çiyayên Zagrosê',
    phonetic: 'Chee-yah-yayn Zah-gro-say',
    description: 'Ev Çiyayên asê û bilind ên Zagrosê ne, warê hezkirî yê me!',
    category: 'nature'
  },
  river_water: {
    id: 'river_water',
    name: 'Rûbarê Avê',
    phonetic: 'Roo-bah-ray Ah-vay',
    description: 'Ev Rûbarê avê yê zelal e ku kaniyên çiyayan dighîne gund.',
    category: 'nature'
  },
  oak_tree: {
    id: 'oak_tree',
    name: 'Dara Berûyê',
    phonetic: 'Dah-rah Beh-roo-yay',
    description: 'Ev Dara Berûyê ya kevnar e, hevalê hewaya paqij a gund.',
    category: 'nature'
  },
  green_grass: {
    id: 'green_grass',
    name: 'Giyayê Kesk',
    phonetic: 'Gee-yah-yay Kehsk',
    description: 'Ev Giyayê kesk û geş ê zozanan e, xwarina berx û pezan.',
    category: 'nature'
  },
  white_cloud: {
    id: 'white_cloud',
    name: 'Ewrên Spî',
    phonetic: 'Ew-rayn Spee',
    description: 'Ev Ewrên spî ne ku li asîmanê şîn barana xweş amade dikin.',
    category: 'nature'
  },

  // Wheel Elements
  spin_wheel: {
    id: 'spin_wheel',
    name: 'Çerxa Gund',
    phonetic: 'Chehr-xa Goond',
    description: 'Ev Çerxa Gundê me ye! Bizivirîne da ku xelatên zêrîn bibînî.',
    category: 'wheel'
  },
  wheel_pointer: {
    id: 'wheel_pointer',
    name: 'Tîra Çerxê',
    phonetic: 'Tee-rah Chehr-xay',
    description: 'Ev Tîra sor e, nîşan dide ka te çi xelat qezenc kir!',
    category: 'wheel'
  },
  spin_button: {
    id: 'spin_button',
    name: 'Bişkoka Bizivirîne',
    phonetic: 'Beesh-ko-ka Bee-zee-vee-ree-nay',
    description: 'Li ser vê bişkokê pêl bike da ku çerx bi lez bizivire!',
    category: 'wheel'
  },

  // Buildings
  xani_house: {
    id: 'xani_house',
    name: 'Xaniyê Gund',
    phonetic: 'Xah-nee-yay Goond',
    description: 'Ev Xaniyê me yê germ ê ji kevir û daran e.',
    category: 'building'
  },
  water_mill: {
    id: 'water_mill',
    name: 'Aşê Avê',
    phonetic: 'Ah-shay Ah-vay',
    description: 'Ev Aşê Avê ye! Genimê zeviyan dikoje û dike ardê xweş.',
    category: 'building'
  },
  language_school: {
    id: 'language_school',
    name: 'Dibistana Zimanê',
    phonetic: 'Dee-bees-tah-nah Zee-mah-nay',
    description: 'Ev Dibistana Zimanê ye! Zarokên gund li vir zimanê şêrîn fêr dibin.',
    category: 'building'
  },
  fruit_garden: {
    id: 'fruit_garden',
    name: 'Baxçeyê Fêkiyan',
    phonetic: 'Bax-cheh-yay Fay-kee-yan',
    description: 'Ev Baxçeyê Fêkiyan e! Sêv, tirî û hinarên şîrîn li vir diçinin.',
    category: 'building'
  },
  stone_bridge: {
    id: 'stone_bridge',
    name: 'Pira Kevirî',
    phonetic: 'Pee-rah Keh-vee-ree',
    description: 'Ev Pira Kevirî ya ser çem e, rêya me vedike ber bi cîranan.',
    category: 'building'
  },
  water_spring: {
    id: 'water_spring',
    name: 'Kaniya Avê',
    phonetic: 'Kah-nee-yah Ah-vay',
    description: 'Ev Kaniya Avê ya sar e, ava zelal a çiyayên Zagrosê.',
    category: 'building'
  },
  bazaar: {
    id: 'bazaar',
    name: 'Bazara Gund',
    phonetic: 'Bah-zah-rah Goond',
    description: 'Ev Bazara Gund e, cihê firotin û pevguhertina xêr û bêran.',
    category: 'building'
  }
};

// List of Animals (Ajalan) - 100% Hawar Latin
export const AJALAN_ITEMS: CardItem[] = [
  {
    id: 'ser',
    name: 'Şêr',
    phonetic: 'Sheyr',
    category: 'ajalan',
    emoji: '🦁',
    description: 'Qiralê daristanê û ajalê herî xurt.',
    rarity: 'zêrîn'
  },
  {
    id: 'gur',
    name: 'Gur',
    phonetic: 'Gurr',
    category: 'ajalan',
    emoji: '🐺',
    description: 'Ajalê çiyayan û hevalê koman.',
    rarity: 'hêja'
  },
  {
    id: 'hesp',
    name: 'Hesp',
    phonetic: 'Hasp',
    category: 'ajalan',
    emoji: '🐴',
    description: 'Hevalê beza lez û rêwîtiya dûr.',
    rarity: 'hêja'
  },
  {
    id: 'rovi',
    name: 'Rovî',
    phonetic: 'Rovee',
    category: 'ajalan',
    emoji: '🦊',
    description: 'Ajalekî pir hişmend û zîrek.',
    rarity: 'asayî'
  },
  {
    id: 'kevrusk',
    name: 'Kêvrûşk',
    phonetic: 'Kevrooshk',
    category: 'ajalan',
    emoji: '🐰',
    description: 'Guhdirêjê delal û beza nerm.',
    rarity: 'asayî'
  },
  {
    id: 'celek',
    name: 'Çêlek',
    phonetic: 'Chaylek',
    category: 'ajalan',
    emoji: '🐮',
    description: 'Şîrê spî û xweş ji bo me peyda dike.',
    rarity: 'asayî'
  },
  {
    id: 'berx',
    name: 'Berx',
    phonetic: 'Bahrkh',
    category: 'ajalan',
    emoji: '🐑',
    description: 'Bêçikê pezê yê nerm û spî.',
    rarity: 'asayî'
  },
  {
    id: 'pez',
    name: 'Pez',
    phonetic: 'Paz',
    category: 'ajalan',
    emoji: '🐏',
    description: 'Xwediyê hiriyê ji bo cilên germ.',
    rarity: 'asayî'
  },
  {
    id: 'pisik',
    name: 'Pisîk',
    phonetic: 'Piseek',
    category: 'ajalan',
    emoji: '🐱',
    description: 'Dostê malê yê lîstok û nermik.',
    rarity: 'asayî'
  },
  {
    id: 'kucik',
    name: 'Kûçik',
    phonetic: 'Koochik',
    category: 'ajalan',
    emoji: '🐶',
    description: 'Dostê dilsoz ê parêzvanê gund.',
    rarity: 'asayî'
  },
  {
    id: 'teyr',
    name: 'Teyr',
    phonetic: 'Tayrr',
    category: 'ajalan',
    emoji: '🦅',
    description: 'Qiralê asîman û bilindahiyên çiyan.',
    rarity: 'zêrîn'
  },
  {
    id: 'masi',
    name: 'Masî',
    phonetic: 'Masee',
    category: 'ajalan',
    emoji: '🐟',
    description: 'Ajalê avên kûr û rûbarên zelal.',
    rarity: 'asayî'
  },
  {
    id: 'hirc',
    name: 'Hirç',
    phonetic: 'Heerch',
    category: 'ajalan',
    emoji: '🐻',
    description: 'Ajalê mezin ê çiyayên bilind û hezkerê hingiv.',
    rarity: 'hêja'
  },
  {
    id: 'bizin',
    name: 'Bizin',
    phonetic: 'Bizin',
    category: 'ajalan',
    emoji: '🐐',
    description: 'Ajalekî çeleng ku li ser zinarên asê dimeşe.',
    rarity: 'asayî'
  },
  {
    id: 'kew',
    name: 'Kew',
    phonetic: 'Kaw',
    category: 'ajalan',
    emoji: '🐦',
    description: 'Çûkê bedew ê nav stranan û newalan.',
    rarity: 'hêja'
  },
  {
    id: 'mirisk',
    name: 'Mirîşk',
    phonetic: 'Mireeshk',
    category: 'ajalan',
    emoji: '🐔',
    description: 'Hêkên spî û zer di baxçê de dide.',
    rarity: 'asayî'
  },
  {
    id: 'legleg',
    name: 'Legleg',
    phonetic: 'Laglag',
    category: 'ajalan',
    emoji: '🦩',
    description: 'Çûkê koçber ê bi heybet û stûdirêj.',
    rarity: 'hêja'
  },
  {
    id: 'cucik',
    name: 'Çûçik',
    phonetic: 'Choochik',
    category: 'ajalan',
    emoji: '🐥',
    description: 'Çûçika biçûk û dengxweş a li ser çiqilan.',
    rarity: 'asayî'
  },
  {
    id: 'kusi',
    name: 'Kûsî',
    phonetic: 'Koosee',
    category: 'ajalan',
    emoji: '🐢',
    description: 'Ajalê hêdî yê bi qalikekî kevirî û zexm.',
    rarity: 'asayî'
  },
  {
    id: 'meshingiv',
    name: 'Mêşhingiv',
    phonetic: 'Maysh-heengeev',
    category: 'ajalan',
    emoji: '🐝',
    description: 'Çêkerê hingivê şîrîn û hevalê kulîlkan.',
    rarity: 'hêja'
  },
  {
    id: 'piling',
    name: 'Piling',
    phonetic: 'Peeling',
    category: 'ajalan',
    emoji: '🐅',
    description: 'Xwediyê leza mezin û nexşên bedew.',
    rarity: 'zêrîn'
  },
  {
    id: 'fil',
    name: 'Fîl',
    phonetic: 'Feel',
    category: 'ajalan',
    emoji: '🐘',
    description: 'Ajalê herî mezin ê li ser rûyê erdê.',
    rarity: 'zêrîn'
  },
  {
    id: 'kevok',
    name: 'Kevok',
    phonetic: 'Kawok',
    category: 'ajalan',
    emoji: '🕊️',
    description: 'Sembola aştî û hezkirina li nav gund.',
    rarity: 'asayî'
  }
];

// List of Tools (Amûr) - 100% Hawar Latin
export const AMUR_ITEMS: CardItem[] = [
  {
    id: 'bivir',
    name: 'Bivir',
    phonetic: 'Bivir',
    category: 'amur',
    emoji: '🪓',
    description: 'Amûra birîna daran ji bo agirê germ.',
    rarity: 'asayî'
  },
  {
    id: 'bel',
    name: 'Bêl',
    phonetic: 'Beyl',
    category: 'amur',
    emoji: '⛏️',
    description: 'Amûra kolandina axê û çandina daran.',
    rarity: 'asayî'
  },
  {
    id: 'das',
    name: 'Das',
    phonetic: 'Dahs',
    category: 'amur',
    emoji: '🌾',
    description: 'Amûra berhevkirina genim û gihayê zeviyan.',
    rarity: 'asayî'
  },
  {
    id: 'cakuc',
    name: 'Çakûç',
    phonetic: 'Chakooch',
    category: 'amur',
    emoji: '🔨',
    description: 'Amûra lêxistina bizmaran û avakirina xaniyan.',
    rarity: 'asayî'
  },
  {
    id: 'satil',
    name: 'Satil',
    phonetic: 'Satil',
    category: 'amur',
    emoji: '🪣',
    description: 'Ji bo hildana ava kaniyê ya paqij.',
    rarity: 'asayî'
  },
  {
    id: 'meqes',
    name: 'Meqes',
    phonetic: 'Maqas',
    category: 'amur',
    emoji: '✂️',
    description: 'Amûra birîna qumaş û hiriyê.',
    rarity: 'asayî'
  },
  {
    id: 'kevan',
    name: 'Kevan',
    phonetic: 'Kawan',
    category: 'amur',
    emoji: '🏹',
    description: 'Amûra parastina gund û nêçîrê.',
    rarity: 'hêja'
  },
  {
    id: 'zincir',
    name: 'Zîncîr',
    phonetic: 'Zeenjeer',
    category: 'amur',
    emoji: '⛓️',
    description: 'Zîncîra hesinî ya pir xurt.',
    rarity: 'hêja'
  },
  {
    id: 'sur',
    name: 'Şûr',
    phonetic: 'Shoor',
    category: 'amur',
    emoji: '⚔️',
    description: 'Şûrê hesinî yê lehengên gund ji bo parastinê.',
    rarity: 'zêrîn'
  },
  {
    id: 'tur',
    name: 'Tûr',
    phonetic: 'Toor',
    category: 'amur',
    emoji: '🎒',
    description: 'Tûrê hirî ji bo hilgirtina keresteyan.',
    rarity: 'asayî'
  }
];

export const ALL_CARDS: CardItem[] = [...AJALAN_ITEMS, ...AMUR_ITEMS];

// Initial Village Buildings (Avakirina Gund)
export const INITIAL_BUILDINGS: Building[] = [
  {
    id: 'xani',
    name: 'Xaniyê Gund',
    level: 1,
    maxLevel: 5,
    baseCost: 200,
    description: 'Xaniyê germ ê ji kevir û daran bo zarokên gund.',
    icon: '🏡',
    perks: '+50 Dirav di saetê de'
  },
  {
    id: 'as',
    name: 'Aşê Avê',
    level: 1,
    maxLevel: 5,
    baseCost: 350,
    description: 'Aşê avê yê ku bi ava rûbarê genim dikoje.',
    icon: '⚙️',
    perks: '+1 Hêz di 10 xulekan de'
  },
  {
    id: 'dibistan',
    name: 'Dibistana Zimanê',
    level: 1,
    maxLevel: 5,
    baseCost: 500,
    description: 'Cihê fêrbûna tîpên latînî û peyvên Kurdî.',
    icon: '🏫',
    perks: 'Qerta nû ya zêrîn veke'
  },
  {
    id: 'baxce',
    name: 'Baxçeyê Fêkiyan',
    level: 1,
    maxLevel: 5,
    baseCost: 300,
    description: 'Sêv, hinar û tiriyên şîrîn ên gundê me.',
    icon: '🌳',
    perks: '+200 Dirav ji her çinînê'
  },
  {
    id: 'pir',
    name: 'Pira Kevirî',
    level: 1,
    maxLevel: 5,
    baseCost: 450,
    description: 'Pira kevnar a li ser çemê gund.',
    icon: '🌉',
    perks: 'Gihîştina cîranan û gundên din'
  },
  {
    id: 'kaniya_ave',
    name: 'Kaniya Avê',
    level: 1,
    maxLevel: 5,
    baseCost: 400,
    description: 'Kaniya ava sar û zelal a çiyayê gundê me.',
    icon: '⛲',
    perks: '+80 Dirav di saetê de'
  },
  {
    id: 'bazara_gund',
    name: 'Bazara Gund',
    level: 1,
    maxLevel: 5,
    baseCost: 600,
    description: 'Cihê danûstandin û firotina fêkî û genim.',
    icon: '🏪',
    perks: '+10% xelata çerxê'
  }
];

// Wheel Rewards (Çerxa Gund)
export const WHEEL_REWARDS: WheelReward[] = [
  { type: 'coins', amount: 200, label: '200 Dirav', color: '#FBBF24', icon: '🪙' },
  { type: 'energy', amount: 5, label: '+5 Hêz', color: '#38BDF8', icon: '⚡' },
  { type: 'shield', amount: 1, label: '1 Mertal', color: '#34D399', icon: '🛡️' },
  { type: 'coins', amount: 500, label: '500 Dirav', color: '#F59E0B', icon: '💰' },
  { type: 'card', amount: 1, label: 'Karta Zimanê', color: '#EC4899', icon: '🃏' },
  { type: 'raid', amount: 1, label: 'Êrîşa Dostane', color: '#A855F7', icon: '⚔️' },
  { type: 'coins', amount: 1000, label: '1,000 Dirav!', color: '#EF4444', icon: '👑' },
  { type: 'energy', amount: 10, label: '+10 Hêz', color: '#06B6D4', icon: '⚡⚡' }
];

// UI Phrases and Translations - All 100% Kurdish Latin
export const UI_TEXT = {
  village: "Gund",
  spin: "Bizivirîne",
  spinsLeft: "Hêza Mayî",
  coins: "Dirav",
  shields: "Mertal",
  cards: "Karta Zimanê",
  build: "Avakirin",
  upgrade: "Zêde Bike",
  quiz: "Lîstika Pirsan",
  listen: "Guh Bide Dengê",
  wellDone: "Aferîn! Pir baş!",
  tryAgain: "Careke din biceribîne!",
  correct: "Rast e!",
  wrong: "Şaş e!",
  yourVillage: "Gundê Te",
  level: "Ast",
  allUnlocked: "Te hemû peyv dîtin!",
  animalsSection: "Ajalan (Ajalên Delal)",
  toolsSection: "Amûr (Amûrên Gund)",
  villageSection: "Avahiyên Gundê Me",
  clickToPronounce: "Ji bo bihîstina dengê Kurdî pê lê bike",
  audioGuide: "Dengbêjê Zimanê Kurdî",
  close: "Bigire",
  continue: "Berdewam bike",
  shareTitle: "Gundé me — Lîstika Zimanê Kurdî",
  raidTitle: "Êrîşa Dostane li ser Gundê Cîran!",
  raidSubtitle: "Ji nav sê sindoqan yekê hildibijêre da ku xezîneya veşartî bibînî:",
  chooseCompanion: "Hevalê Rêwîtiya Xwe Hilbijêre",
  companionGuide: "Rêberê Rêwîtiyê",
  speechCloud: "Ewrê Axaftinê",
  tapToLearn: "Destê xwe deyne ser her tiştî da ku navê wî yê Kurdî bibihîzî!",
  journeyTab: "Rêwîtî",
  journeyTitle: "Rêwîtiya Jiyana Gund",
  motherRoutine: "Spêdeya Dayikê",
  fatherRoutine: "Karên Bavê di Werzan de",
  seasons: "Çar Werzên Salê"
};

// Village Life Interactive Exploration Scenes (Rêwîtiya Jiyana Gund)
export const VILLAGE_LIFE_SCENES: VillageLifeScene[] = [
  {
    id: 'spede_dayik',
    title: 'Spêdeya Dayikê & Xaniyê Gund',
    subtitle: 'Kar û xebata dayika Kurd ji spêdeya zû ve',
    character: 'Dayik',
    backdropEmoji: '🏡',
    description: 'Dayika me serê sibehê zû radibe, hevîr distre, nan dipêje, sewalan xwedî dike û kulîlkan av dide.',
    hotspots: [
      {
        id: 'hevir',
        name: 'Hevîr Strandin',
        verb: 'Hevîr strandin',
        phonetic: 'Heh-vee-ray geh-neem dees-treh',
        description: 'Hevîrê nanê genimê spî bi ava kaniyê tê strandin.',
        narration: 'Dayika me serê sibehê zû radibe û hevîrê genimê spî bi hezkirin distre!',
        sfx: 'dough',
        wordId: 'xani',
        icon: '🥣',
        position: { x: 22, y: 55 }
      },
      {
        id: 'sel_tendur',
        name: 'Nanê Sêlê & Tendûr',
        verb: 'Nan pêjan',
        phonetic: 'Nah-nay tehn-oo-ray pee-pay-zheh',
        description: 'Agirê daran di tendûrê de geş e, nanê sêlê yê zirav û nanê germ tê pêjan.',
        narration: 'Li ser sêlê û di tendûrê de nanê germ û bînxweş ji bo zarokên gund tê pêjan!',
        sfx: 'fire',
        wordId: 'xani',
        icon: '🔥',
        position: { x: 50, y: 48 }
      },
      {
        id: 'mirisk_dan',
        name: 'Danê Mirîşkan & Bêçikan',
        verb: 'Dan reşandin',
        phonetic: 'Dahn oo gah-rees boh mee-reesh-kahn',
        description: 'Dayik garisa zer di hewşê de direşîne da ku mirîşk û çûçik têr bibin.',
        narration: 'Dayik garisa zer di hewşê de direşîne bo mirîşk û çûçikên delal!',
        sfx: 'chickens',
        wordId: 'mirisk',
        icon: '🐔',
        position: { x: 78, y: 62 }
      },
      {
        id: 'avdana_sitil',
        name: 'Avdana Şitil & Kulîlkan',
        verb: 'Şitil avdan',
        phonetic: 'Shee-teel oo koo-leel-kahn ahv-dahn',
        description: 'Bi ava kaniya sar û zelal şitilên bacan û kulîlkên sorgul tên avdan.',
        narration: 'Dayik ava kaniya zelal berdide ser şitil û kulîlkên geş ên baxçeyê gund!',
        sfx: 'water',
        wordId: 'kani',
        icon: '🌱',
        position: { x: 82, y: 32 }
      },
      {
        id: 'celek_sir',
        name: 'Dotina Çêlekê & Penêr',
        verb: 'Şîr dotin',
        phonetic: 'Shee-ray chay-leh-kay yay teh-zeh',
        description: 'Şîrê çêlekê tê dotin bo çêkirina dew, mast, nivîşk û penêrê kurdî.',
        narration: 'Şîrê spî yê çêlekê tê dotin bo çêkirina mast, penêr û dewa sar!',
        sfx: 'milk',
        wordId: 'celek',
        icon: '🥛',
        position: { x: 15, y: 35 }
      }
    ]
  },
  {
    id: 'bav_bihar',
    title: 'Bihara Gund — Cotkirin & Tovçandin',
    subtitle: 'Vejîna xwezayê û xebata cotkariyê li nav zeviyan',
    character: 'Bav',
    season: 'Bihar',
    backdropEmoji: '🌱',
    description: 'Di biharê de berf dihele, zevî şiyar dibin, bavê me axê cot dike û tova zêrîn diçîne.',
    hotspots: [
      {
        id: 'cotkari',
        name: 'Cotkirina Zeviyê bi Ga û Hespan',
        verb: 'Zevî cot kirin',
        phonetic: 'Zehr-vee jot kee-reen',
        description: 'Cotkar axa comerd a Zagrosê cot dike da ku nerm bibe.',
        narration: 'Di biharê de ax şiyar dibe! Bavê me zeviyan cot dike da ku ax amade bibe.',
        sfx: 'plow',
        wordId: 'hesp',
        icon: '🐂',
        position: { x: 28, y: 55 }
      },
      {
        id: 'tov_rehsandin',
        name: 'Tovreşandina Genim û Ceh',
        verb: 'Tov reşandin',
        phonetic: 'Tohv reh-shahn-deen',
        description: 'Tova genim bi destên kedkar di nav hewşên axê de tê reşandin.',
        narration: 'Bav tova zêrîn a genim û ceh li ser axa nerm direşîne bo debara gund!',
        sfx: 'running',
        wordId: 'hez',
        icon: '🌾',
        position: { x: 62, y: 50 }
      },
      {
        id: 'kaniya_bihare',
        name: 'Kaniya Ava Berfê',
        verb: 'Av kişandin',
        phonetic: 'Kah-nee-yah ah-vay',
        description: 'Ava zelal a ji berfa çiyayan diherike nav cobaran.',
        narration: 'Ava berfê di çem û cobaran de diherike û giyayê kesk şîn dike!',
        sfx: 'water',
        wordId: 'kani',
        icon: '⛲',
        position: { x: 80, y: 68 }
      }
    ]
  },
  {
    id: 'bav_havin',
    title: 'Havîna Gund — Çinîna Genim bi Dasê',
    subtitle: 'Zêrîna simbilan û xebata bêmol a cotkaran',
    character: 'Bav',
    season: 'Havîn',
    backdropEmoji: '☀️',
    description: 'Di bin tava germ a havînê de simbilên genim zer dibin, bav bi dasa tûj genim diçine.',
    hotspots: [
      {
        id: 'das_genim',
        name: 'Çinîna Genim bi Dasê',
        verb: 'Genim çinîn',
        phonetic: 'Chee-nee-nah geh-neem bee dah-sah toozh',
        description: 'Dasa hesinî simbilên zêrîn ên genim dibire.',
        narration: 'Di havînê de genimê zêrîn gihiştiye! Bav bi dasa tûj simbilan diçine!',
        sfx: 'sickle',
        wordId: 'das',
        icon: '🌾',
        position: { x: 30, y: 52 }
      },
      {
        id: 'cencer_bare',
        name: 'Komkirin & Bager',
        verb: 'Bager gêran',
        phonetic: 'Bah-gehr gay-rahn',
        description: 'Pûş û genim tên veqetandin û danê zêrîn tê berhevkirin.',
        narration: 'Genim tê bagerkirin da ku danê paqij û kayê bo ajalan amade bikin!',
        sfx: 'running',
        wordId: 'hez',
        icon: '🧺',
        position: { x: 58, y: 56 }
      },
      {
        id: 'ase_ave_havin',
        name: 'Aşê Avê yê Gund',
        verb: 'Genim hêrandin',
        phonetic: 'Ah-shay ah-vay yay goond',
        description: 'Kevirê aşê avê genim dihêre û dike arê spî yê nan.',
        narration: 'Genimê nû diçe aşê avê û dibe arê xweş ji bo nanê sêlê û tendûrê!',
        sfx: 'water',
        wordId: 'pir',
        icon: '⚙️',
        position: { x: 82, y: 44 }
      }
    ]
  },
  {
    id: 'bav_payiz',
    title: 'Payîza Gund — Baxçeyê Fêkiyên Zagrosê',
    subtitle: 'Çinîna sêv, hinar, tîrî, hêjîr û gûzan',
    character: 'Bav',
    season: 'Payîz',
    backdropEmoji: '🍎',
    description: 'Di payîzê de çiyayên Zagrosê dibin mîna kaniya fêkiyan; dar bi barên xweş dilerizin.',
    hotspots: [
      {
        id: 'seva_sor',
        name: 'Dara Sêvan — Sêvên Sor',
        verb: 'Sêv çinîn',
        phonetic: 'Say-vahn chee-neen',
        description: 'Sêvên sor û şêrîn ji bo zivistanê tên komkirin.',
        narration: 'Ev dara sêvan e! Sêvên sor ên şîrîn bi destên zarok û dêûbavan tên çinîn!',
        sfx: 'fruit',
        wordId: 'baxce',
        icon: '🍎',
        position: { x: 18, y: 42 }
      },
      {
        id: 'hinara_yaquti',
        name: 'Dara Hinaran — Hinarên Yaqûtî',
        verb: 'Hinar jêkirin',
        phonetic: 'Hee-nah-rahn zheh-kee-reen',
        description: 'Hinarên yaqûtî yên tijî tovên sor û şirîn.',
        narration: 'Hinara bedew a Zagrosê! Tiliyên sor ên yaqûtî dilê mirovan şa dikin!',
        sfx: 'fruit',
        wordId: 'baxce',
        icon: '🪴',
        position: { x: 42, y: 38 }
      },
      {
        id: 'rez_tiri',
        name: 'Reza Tîriyan — Tîriyê Şîrîn',
        verb: 'Tîrî doşav kirin',
        phonetic: 'Tee-ree doh-shahv kee-reen',
        description: 'Tîriyê şîrîn ji bo doşav, bastêq û mewîjên zivistanê tê çinîn.',
        narration: 'Tîriyê rezên gundê me! Ji bo çêkirina doşava germ û şîrîn tê berhevkirin!',
        sfx: 'fruit',
        wordId: 'baxce',
        icon: '🍇',
        position: { x: 65, y: 45 }
      },
      {
        id: 'guz_beru',
        name: 'Dara Gûz û Berûyan',
        verb: 'Gûz weşandin',
        phonetic: 'Gooz oo beh-roo weh-shahn-deen',
        description: 'Gûzên qalik-hişk û berûyên xurt ên dara şahane tên weşandin.',
        narration: 'Gûzên zexm û berûyên daristanê ji ser daran tên weşandin bo şevên zivistanê!',
        sfx: 'nut',
        wordId: 'bivir',
        icon: '🌰',
        position: { x: 86, y: 40 }
      }
    ]
  },
  {
    id: 'bav_zivistan',
    title: 'Zivistana Gund — Darvedan & Êzingên Germ',
    subtitle: 'Parastina daran û germkirina xaniyan di sermaya zivistanê de',
    character: 'Bav',
    season: 'Zivistan',
    backdropEmoji: '❄️',
    description: 'Di zivistanê de berf li ser çiyayên Zagrosê dibare; cotkar çiqilên daran diweribîne û agirê germ dadide.',
    hotspots: [
      {
        id: 'darvedan',
        name: 'Darvedan & Birîna Çiqilan',
        verb: 'Darvedan kirin',
        phonetic: 'Dahr-veh-dahn kee-reen',
        description: 'Çiqilên hişk ên daran tên birîn da ku dar di biharê de xurt bibin.',
        narration: 'Bavê me darvedanê dike! Çiqilên daran dipelixîne da ku di biharê de şên bibin!',
        sfx: 'axe',
        wordId: 'bivir',
        icon: '🪓',
        position: { x: 26, y: 48 }
      },
      {
        id: 'ezing_komkirin',
        name: 'Komkirina Êzingan bo Zivistanê',
        verb: 'Êzing şikandin',
        phonetic: 'Ay-zeeng shee-kahn-deen',
        description: 'Êzing bi bivirê têne şikandin ji bo sobe û argûnên germ.',
        narration: 'Êzingên zexm bi bivirê tên qelaştin bo germkirina odeya zarokan!',
        sfx: 'axe',
        wordId: 'bivir',
        icon: '🪵',
        position: { x: 54, y: 58 }
      },
      {
        id: 'arguna_germ',
        name: 'Argûna Germ a Nav Xênî',
        verb: 'Agir geş kirin',
        phonetic: 'Ah-geer gehsh kee-reen',
        description: 'Agirê sobe û argûnê germiyekê dide hemû malbatê.',
        narration: 'Agirê germ ê argûnê di şevên zivistanê de çîrokên xweş tîne bîra me!',
        sfx: 'fire',
        wordId: 'xani',
        icon: '🔥',
        position: { x: 78, y: 50 }
      }
    ]
  }
];

// -------------------------------------------------------------------------
// 31 Letters of the Kurdish Hawar Latin Alphabet (Alfabeya Zimanê Kurdî)
// -------------------------------------------------------------------------
export const KURDISH_ALPHABET: AlphabetLetter[] = [
  { letter: "A", name: "A", phonetic: "Ah", exampleWord: "Av", exampleMeaning: "Ava zelal a kaniyên Zagrosê", icon: "💧", wordId: "av" },
  { letter: "B", name: "Bê", phonetic: "Bay", exampleWord: "Bivir", exampleMeaning: "Amûra birîna daran bo zivistanê", icon: "🪓", wordId: "bivir" },
  { letter: "C", name: "Cê", phonetic: "Jay", exampleWord: "Cencer", exampleMeaning: "Amûra bagerê bo veqetandina genim", icon: "🧺", wordId: "hez" },
  { letter: "Ç", name: "Çê", phonetic: "Chay", exampleWord: "Çakûç", exampleMeaning: "Amûra hesinî ya lêxistina bizmaran", icon: "🔨", wordId: "cakuc" },
  { letter: "D", name: "Dê", phonetic: "Day", exampleWord: "Das", exampleMeaning: "Dasa tûj a çinîna genimê zêrîn", icon: "🌾", wordId: "das" },
  { letter: "E", name: "E", phonetic: "Eh", exampleWord: "Erd", exampleMeaning: "Axa comerd a zeviyên çandiniyê", icon: "🌍", wordId: "hez" },
  { letter: "Ê", name: "Ê", phonetic: "Ay", exampleWord: "Êzing", exampleMeaning: "Êzingên hişk ên argûn û sobeyê", icon: "🪵", wordId: "bivir" },
  { letter: "F", name: "Fê", phonetic: "Fay", exampleWord: "Fîl", exampleMeaning: "Ajalê xurt û mezin ê cîhanê", icon: "🐘", wordId: "fil" },
  { letter: "G", name: "Gê", phonetic: "Gay", exampleWord: "Genim", exampleMeaning: "Genimê zêrîn ê nanê sêlê û tendûrê", icon: "🌾", wordId: "genim" },
  { letter: "H", name: "Hê", phonetic: "Hay", exampleWord: "Hesp", exampleMeaning: "Hespê beza çeleng ê rêwîtiyên dûr", icon: "🐴", wordId: "hesp" },
  { letter: "I", name: "I", phonetic: "Ih", exampleWord: "Satil", exampleMeaning: "Satila hildana ava kaniyê", icon: "🪣", wordId: "kani" },
  { letter: "Î", name: "Î", phonetic: "Ee", exampleWord: "Îsot", exampleMeaning: "Îsota tûj a baxçeyên gund", icon: "🌶️", wordId: "baxce" },
  { letter: "J", name: "Jê", phonetic: "Zhay", exampleWord: "Jiyan", exampleMeaning: "Jiyana xweş û aram a li nav xwezayê", icon: "🏡", wordId: "xani" },
  { letter: "K", name: "Kê", phonetic: "Kay", exampleWord: "Kûçik", exampleMeaning: "Hevalê dilsoz û parêzvanê gund", icon: "🐶", wordId: "kucik" },
  { letter: "L", name: "Lê", phonetic: "Lay", exampleWord: "Legleg", exampleMeaning: "Çûkê koçber ê ser baniyên bilind", icon: "🦩", wordId: "cucik" },
  { letter: "M", name: "Mê", phonetic: "May", exampleWord: "Mirîşk", exampleMeaning: "Mirîşka hewşê ya hêkên spî û zer", icon: "🐔", wordId: "mirisk" },
  { letter: "N", name: "Nê", phonetic: "Nay", exampleWord: "Nan", exampleMeaning: "Nanê germ ê sêlê û tendûra kurdî", icon: "🫓", wordId: "nan" },
  { letter: "O", name: "O", phonetic: "Oh", exampleWord: "Ode", exampleMeaning: "Odeya germ a şevbuhêrk û mêvanan", icon: "🛋️", wordId: "xani" },
  { letter: "P", name: "Pê", phonetic: "Pay", exampleWord: "Pisîk", exampleMeaning: "Pisîka şîrîn a nermik a li ber sobe", icon: "🐱", wordId: "pisik" },
  { letter: "Q", name: "Qê", phonetic: "Qay", exampleWord: "Qert", exampleMeaning: "Gurê zîrek ê çiyayên asê", icon: "🐺", wordId: "gur" },
  { letter: "R", name: "Rê", phonetic: "Ray", exampleWord: "Rovî", exampleMeaning: "Roviyê hişmend û fêlbaz ê newalan", icon: "🦊", wordId: "rovi" },
  { letter: "S", name: "Sê", phonetic: "Say", exampleWord: "Sêv", exampleMeaning: "Sêva sor a şîrîn a baxçeyên Zagrosê", icon: "🍎", wordId: "sev" },
  { letter: "Ş", name: "Şê", phonetic: "Shay", exampleWord: "Şêr", exampleMeaning: "Şêrê xurt ê zinarên bilind", icon: "🦁", wordId: "ser" },
  { letter: "T", name: "Tê", phonetic: "Tay", exampleWord: "Teyr", exampleMeaning: "Teyrê baz ê azad ê asîmanan", icon: "🦅", wordId: "teyr" },
  { letter: "U", name: "U", phonetic: "Oo", exampleWord: "Gund", exampleMeaning: "Gundê me yê xweşik û aram", icon: "🏘️", wordId: "xani" },
  { letter: "Û", name: "Û", phonetic: "Ooo", exampleWord: "Şûr", exampleMeaning: "Şûrê hesinî yê parêzvanên gund", icon: "⚔️", wordId: "sur" },
  { letter: "V", name: "Vê", phonetic: "Vay", exampleWord: "Vexwarin", exampleMeaning: "Vexwarina çaya germ a di piyalan de", icon: "🍵", wordId: "kani" },
  { letter: "W", name: "Wê", phonetic: "Way", exampleWord: "Werz", exampleMeaning: "Çar werzên salê: bihar, havîn, payîz, zivistan", icon: "🍁", wordId: "roj" },
  { letter: "X", name: "Xê", phonetic: "Xay", exampleWord: "Xanî", exampleMeaning: "Xaniyê ji kevir û daran ê gund", icon: "🏠", wordId: "xani" },
  { letter: "Y", name: "Yê", phonetic: "Yay", exampleWord: "Yaqût", exampleMeaning: "Hinarên yaqûtî yên tijî tovên şîrîn", icon: "💎", wordId: "hinar" },
  { letter: "Z", name: "Zê", phonetic: "Zay", exampleWord: "Zozan", exampleMeaning: "Zozanên kesk û bilind ên havînê", icon: "⛰️", wordId: "hez" }
];

// -------------------------------------------------------------------------
// Interactive Cartoon Film Series (Sînemaya Kartonî ya Gundê Me)
// -------------------------------------------------------------------------
export const CARTOON_EPISODES: CartoonEpisode[] = [
  {
    id: "ep_spede_dayik",
    number: 1,
    title: "Xelek 1: Spêdeya Gund & Mala Dayikê",
    subtitle: "Rojbaşî ji jiyana rojane ya dayika Kurd",
    theme: "Spêdeya Zû & Xebata Malê",
    character: "Dayik",
    backdropEmoji: "🏡",
    storyText: "Dema ku tav li ser lûtkeyên Zagrosê hiltê, dîk bi dengê xwe yê bilind gund şiyar dike. Dayika me serê sibehê zû radibe, destûçavên xwe bi ava kaniya sar dişo, hevîr distre û agirê tendûrê pê dixe. Bêhna nanê germ ê sêlê li seranserê kuçeyên gund belav dibe.",
    dialogueLines: [
      { speaker: "Dayik", text: "Rojbaş zarokên min! Were em nanê germ ê sêlê û dewa teze amade bikin!", phonetic: "Rohzh-bahsh zah-roh-kayn meen", avatar: "👩" },
      { speaker: "Heval", text: "Nanê sêlê û penêrê kurdî çiqas bînxweş û şîrîn e!", phonetic: "Nah-nay say-lay oo pah-nayr", avatar: "🦁" }
    ],
    hotspots: [
      {
        id: "hevir_strandin",
        name: "Hevîr Strandin",
        verb: "Hevîr strandin",
        phonetic: "Heh-vee-ray geh-neem dees-treh",
        description: "Hevîrê nanê genimê spî bi ava kaniyê tê strandin.",
        narration: "Dayik hevîrê genim distre da ku bo zarokan nanê bînxweş çêbike!",
        sfx: "dough",
        wordId: "genim",
        icon: "🥣",
        position: { x: 20, y: 55 }
      },
      {
        id: "nane_sele_tendur",
        name: "Nanê Sêlê & Tendûr",
        verb: "Nan pêjan",
        phonetic: "Nah-nay say-lay oo tehn-oo-ray pee-pay-zheh",
        description: "Nanê zirav ê sêlê û nanê tîr ê tendûrê bi agirê daran tê pêjan.",
        narration: "Li ser sêla hesinî û nav tendûrê nanê zêrîn dipêje!",
        sfx: "fire",
        wordId: "nan",
        icon: "🫓",
        position: { x: 45, y: 48 }
      },
      {
        id: "mesk_hejandin",
        name: "Meşk Hejandin",
        verb: "Meşk hejandin",
        phonetic: "Mehshk heh-zhahn-deen",
        description: "Meşka darîn tê hejandin da ku nivîşkê zer û dewa sar jê derkeve.",
        narration: "Dayik meşkê dihejîne bo amadekirina nivîşkê teze û dewa sar!",
        sfx: "milk",
        wordId: "sir",
        icon: "🥛",
        position: { x: 68, y: 52 }
      },
      {
        id: "dane_miriskan",
        name: "Danê Mirîşkan & Çûçikan",
        verb: "Dan reşandin",
        phonetic: "Dahn oo gah-rees boh mee-reesh-kahn",
        description: "Danê garisê zer di hewşê de tê reşandin da ku mirîşk têr bibin.",
        narration: "Mirîşk û çûçikên hewşê bi beza xwe tên da ku danê garis bixwin!",
        sfx: "chickens",
        wordId: "mirisk",
        icon: "🐔",
        position: { x: 85, y: 65 }
      }
    ],
    quizQuestion: {
      question: "Dayik serê sibehê çi dipêje?",
      options: [
        { text: "Nanê Sêlê & Tendûrê", correct: true, phonetic: "Nah-nay say-lay", icon: "🫓" },
        { text: "Sêva Sor", correct: false, phonetic: "Say-vah sohr", icon: "🍎" },
        { text: "Bivirê Hesinî", correct: false, phonetic: "Bee-veer", icon: "🪓" }
      ],
      rewardCoins: 200
    }
  },
  {
    id: "ep_bihar_cotkar",
    number: 2,
    title: "Xelek 2: Bihara Şên & Karên Zeviyê",
    subtitle: "Vejîna çiyayan, cotkirina axê û çûyîna zozanan",
    theme: "Bihara Rengîn & Çandinî",
    season: "Bihar",
    character: "Bav & Dayik",
    backdropEmoji: "🌱",
    storyText: "Berfa li ser lûtkeyên Zagrosê dihele û dibe cobarên zîvîn. Çiya bi kulîlkên sor û binefşî dixemilin. Jin û zarok diçin binarên çiyayan bo berhevkirina kenger, rîvas û sîrikên xweş. Bavê me cotek gayên xurt û hespan bi hevsar dike û axa nerm cot dike bo çandina genim.",
    dialogueLines: [
      { speaker: "Bav", text: "Bi xêr hatî bihara kesk! Em ê axa gund cot bikin da ku zevî tijî genim bibin!", phonetic: "Bee xayr hah-tee bee-hah-rah kahsk", avatar: "👨" },
      { speaker: "Dayik", text: "Me selikên xwe tijî rîvas û kengerên nû yên çiyayê Zagrosê kirin!", phonetic: "Ree-vahs oo kahn-gehr", avatar: "👩" }
    ],
    hotspots: [
      {
        id: "cotkari_ga",
        name: "Cotkirina Zeviyê bi Ga û Hespan",
        verb: "Zevî cot kirin",
        phonetic: "Zehr-vee jot kee-reen",
        description: "Cotkar axa nerm a Zagrosê bi hesinê cotê vedike bo tovçandinê.",
        narration: "Bav zeviyan cot dike da ku ax amade bibe ji bo tova genim û ceh!",
        sfx: "plow",
        wordId: "hesp",
        icon: "🐂",
        position: { x: 25, y: 55 }
      },
      {
        id: "tovresandin_genim",
        name: "Tovreşandina Genim",
        verb: "Tov reşandin",
        phonetic: "Tohv reh-shahn-deen",
        description: "Tova genim bi destên cotkar li ser axa nerm tê reşandin.",
        narration: "Bav tova zêrîn a genim li nav xetên axê direşîne bo keda gund!",
        sfx: "running",
        wordId: "genim",
        icon: "🌾",
        position: { x: 55, y: 50 }
      },
      {
        id: "berhevkirina_rivas",
        name: "Kenger & Rîvasên Çiyayê Zagrosê",
        verb: "Rîvas çinîn",
        phonetic: "Ree-vahs oo kahn-gehr chee-neen",
        description: "Giyayên xwerû yên şîrîn û tirş li binarê çiyayan tên komkirin.",
        narration: "Rîvasên tirş û kengerên kêvî bi kêfxweşî ji nav zinaran tên berhevkirin!",
        sfx: "fruit",
        wordId: "av",
        icon: "🌿",
        position: { x: 80, y: 45 }
      }
    ],
    quizQuestion: {
      question: "Di biharê de li çiyayan kîjan giyayê xweş tê çinîn?",
      options: [
        { text: "Rîvas û Kenger", correct: true, phonetic: "Ree-vahs oo kahn-gehr", icon: "🌿" },
        { text: "Êzingên Sobe", correct: false, phonetic: "Ay-zeeng", icon: "🪵" },
        { text: "Berfa Sar", correct: false, phonetic: "Bahrf", icon: "❄️" }
      ],
      rewardCoins: 250
    }
  },
  {
    id: "ep_havin_cinin",
    number: 3,
    title: "Xelek 3: Havîna Zêrîn & Çinîna Genim",
    subtitle: "Keda giran a cotkaran û çerxa aşê avê",
    theme: "Havîna Germ & Zêrîna Genim",
    season: "Havîn",
    character: "Bav",
    backdropEmoji: "☀️",
    storyText: "Di tîrêjên germ ên tava havînê de, simbilên genim li deştê wek zêr dibirqin. Cotkarên gund bi dasên tûj dikevin nav zeviyan. Dengê birîna simbilan û stranên çinînê bilind dibin. Piştî bagerê, genimê paqij tê barkirin bo aşê avê da ku bibe arê spî yê nan.",
    dialogueLines: [
      { speaker: "Bav", text: "Dasa min tûj e, genimê me gihiştiye! Were em simbilan berhev bikin!", phonetic: "Dah-sah meen toozh eh", avatar: "👨" },
      { speaker: "Heval", text: "Aşê avê bi ava rûbarê dizivire û genim dihêre!", phonetic: "Ah-shay ah-vay", avatar: "🐴" }
    ],
    hotspots: [
      {
        id: "das_cinina_genim",
        name: "Çinîna Genim bi Dasê",
        verb: "Genim çinîn",
        phonetic: "Chee-nee-nah geh-neem bee dah-sah toozh",
        description: "Dasa hesinî ya tûj simbilên genim ji koka wan dibire.",
        narration: "Bav bi dasa tûj genim diçine û simbilên zêrîn dike baqên mezin!",
        sfx: "sickle",
        wordId: "das",
        icon: "🌾",
        position: { x: 28, y: 52 }
      },
      {
        id: "cencer_bagera_genim",
        name: "Gerandina Cencer & Bagerê",
        verb: "Bager gêran",
        phonetic: "Bah-gehr gay-rahn",
        description: "Pûş û kayê ji genimê paqij cuda dikin bi baweşandinê.",
        narration: "Genim li ser bagerê tê baweşandin da ku danê paqij were komkirin!",
        sfx: "running",
        wordId: "genim",
        icon: "🧺",
        position: { x: 58, y: 56 }
      },
      {
        id: "ase_ave_havin",
        name: "Aşê Avê yê Gund",
        verb: "Genim hêrandin",
        phonetic: "Ah-shay ah-vay yay goond",
        description: "Kevirê girankêş ê aş bi herikîna avê dizivire û genim dike ar.",
        narration: "Aşê avê yê gund genimê havînê dike arê spî ji bo nanê malê!",
        sfx: "water",
        wordId: "pir",
        icon: "⚙️",
        position: { x: 82, y: 45 }
      }
    ],
    quizQuestion: {
      question: "Genim di havînê de bi kîjan amûrê tê çinîn?",
      options: [
        { text: "Bi Dasê", correct: true, phonetic: "Bee dah-say", icon: "🌾" },
        { text: "Bi Meqesê", correct: false, phonetic: "Bee mah-qah-say", icon: "✂️" },
        { text: "Bi Bêlê", correct: false, phonetic: "Bee bay-lay", icon: "⛏️" }
      ],
      rewardCoins: 250
    }
  },
  {
    id: "ep_payiz_dosav",
    number: 4,
    title: "Xelek 4: Payîza Comerd & Baxçeyên Fêkiyan",
    subtitle: "Çinîna sêv, hinar û kelandina doşava tîrî",
    theme: "Payîza Zêrîn & Xwarinên Zivistanê",
    season: "Payîz",
    character: "Dayik & Bav",
    backdropEmoji: "🍎",
    storyText: "Baweşîna bayê payîzê pelên daran zêrîn dike. Baxçeyên Zagrosê tijî bereket in; sêvên sor, hinarên yaqûtî û guşiyên tîriyê şîrîn tên çinîn. Dayik di qazanên mezin de doşava tîrî dikele, bastêq li ber tavê radixe û bav gûzên darên mezin diweşîne.",
    dialogueLines: [
      { speaker: "Dayik", text: "Bêhna doşav û bastêqa nû pir xweş e! Zivistana me dê bi van şîrînahiyan germ bibe!", phonetic: "Doh-shahv oo bahs-tayq", avatar: "👩" },
      { speaker: "Bav", text: "Min gûzên darê weşandin, kîsikên me bo zivistanê amade ne!", phonetic: "Gooz oo kahn-gehr", avatar: "👨" }
    ],
    hotspots: [
      {
        id: "seva_sor_payiz",
        name: "Dara Sêvan — Sêvên Sor",
        verb: "Sêv çinîn",
        phonetic: "Say-vahn chee-neen",
        description: "Sêvên sor û avdar ên baxçeyên Zagrosê tên çinîn.",
        narration: "Ev dara sêvan e! Sêvên sor ên şîrîn bi hezkirin tên çinîn!",
        sfx: "fruit",
        wordId: "sev",
        icon: "🍎",
        position: { x: 22, y: 42 }
      },
      {
        id: "hinara_yaquti_payiz",
        name: "Dara Hinaran — Hinarên Yaqûtî",
        verb: "Hinar jêkirin",
        phonetic: "Hee-nah-rahn zheh-kee-reen",
        description: "Hinarên sor ên tijî libên yaqûtî ji çiqilan tên veqetandin.",
        narration: "Hinarên yaqûtî yên delal dilê her zarokî şa dikin!",
        sfx: "fruit",
        wordId: "hinar",
        icon: "🪴",
        position: { x: 48, y: 38 }
      },
      {
        id: "dosav_kelandin",
        name: "Kelandina Doşavê & Bastêq",
        verb: "Doşav kelandin",
        phonetic: "Doh-shahv keh-lahn-deen",
        description: "Ava tîriyê şîrîn di beroşan de dikele û dibe doşav û bastêq.",
        narration: "Ava tîriyê li ser agir dikele da ku bibe doşav û bastêqa zivistanê!",
        sfx: "fire",
        wordId: "agir",
        icon: "🍇",
        position: { x: 72, y: 46 }
      },
      {
        id: "guz_wesandin",
        name: "Dara Gûzan — Gûz Weşandin",
        verb: "Gûz weşandin",
        phonetic: "Gooz weh-shahn-deen",
        description: "Gûzên qalik-hişk bi daran tên weşandin bo şevên zivistanê.",
        narration: "Gûzên zexm ji ser daran tên weşandin bo şevbuhêrkên sar!",
        sfx: "nut",
        wordId: "bivir",
        icon: "🌰",
        position: { x: 90, y: 40 }
      }
    ],
    quizQuestion: {
      question: "Ji ava tîriyê ya şîrîn çi tê çêkirin?",
      options: [
        { text: "Doşav & Bastêq", correct: true, phonetic: "Doh-shahv oo bahs-tayq", icon: "🍇" },
        { text: "Hevîrê Nan", correct: false, phonetic: "Heh-vee-ray nahn", icon: "🥣" },
        { text: "Dasa Tûj", correct: false, phonetic: "Dah-sah toozh", icon: "🌾" }
      ],
      rewardCoins: 250
    }
  },
  {
    id: "ep_zivistan_banesk",
    number: 5,
    title: "Xelek 5: Zivistana Berfîn & Malbatên Kurd",
    subtitle: "Baneşk kirina serbaniyê, şikandina êzingan û aramiya malê",
    theme: "Zivistana Spî & Malbata Germ",
    season: "Zivistan",
    character: "Bav",
    backdropEmoji: "❄️",
    storyText: "Lûtkeyên serbilind ên Zagrosê kirasê spî yê berfê li xwe dikin. Berf li ser baniyên xaniyan kom dibe. Bav bi kevirê giran ê baneşkê serbaniyê nerm û zexm dike da ku av neherike. Li hewşê bi bivirê êzingên hişk dişikîne bo geşkirina sobe û argûna germ a odeya zarokan.",
    dialogueLines: [
      { speaker: "Bav", text: "Berf zêde bariya! Divê em baneşkê li serbaniyê bigerînin û êzingan bişkînin!", phonetic: "Bah-neshk oo ay-zeeng", avatar: "👨" },
      { speaker: "Heval", text: "Agirê sobe û argûnê odeyê germ û xweş dike!", phonetic: "Ah-geer yay soh-beh", avatar: "🐱" }
    ],
    hotspots: [
      {
        id: "banesk_kirin",
        name: "Baneşk Kirina Serbaniyê",
        verb: "Baneşk kirin",
        phonetic: "Bah-neshk kee-reen",
        description: "Kevirê gilover ê baneşkê li ser axa banê tê gerandin da ku berf neherike.",
        narration: "Bav kevirê baneşkê li ser banê digerîne da ku xanî zexm û germ bimîne!",
        sfx: "running",
        wordId: "xani",
        icon: "🪨",
        position: { x: 25, y: 50 }
      },
      {
        id: "ezing_sikandin",
        name: "Şikandina Êzingan bi Bivirê",
        verb: "Êzing şikandin",
        phonetic: "Ay-zeeng shee-kahn-deen bee bee-veer",
        description: "Qurmên daran bi bivirê têne qelaştin ji bo sobeyê.",
        narration: "Bav bi bivirê êzingên daran parçe dike bo germkirina odeya me!",
        sfx: "axe",
        wordId: "bivir",
        icon: "🪓",
        position: { x: 55, y: 58 }
      },
      {
        id: "alifdana_kadine",
        name: "Alifdana Dewaran di Kadînê de",
        verb: "Alif dan",
        phonetic: "Ah-leef dahn boh deh-wah-rahn",
        description: "Kayê hişk û gihayê havînê didin ber pez û dewaran di sermayê de.",
        narration: "Dewar û pez di kadîna germ de gihayê havînê yê zêrîn dixwin!",
        sfx: "running",
        wordId: "pez",
        icon: "🐑",
        position: { x: 80, y: 52 }
      }
    ],
    quizQuestion: {
      question: "Bav bi kîjan kevirê giran serbaniya xênî zexm dike?",
      options: [
        { text: "Kevirê Baneşkê", correct: true, phonetic: "Kah-vee-ray bah-nesh-kay", icon: "🪨" },
        { text: "Dasa Tûj", correct: false, phonetic: "Dahs", icon: "🌾" },
        { text: "Satila Avê", correct: false, phonetic: "Sah-teel", icon: "🪣" }
      ],
      rewardCoins: 250
    }
  },
  {
    id: "ep_sevbuherk_dengbej",
    number: 6,
    title: "Xelek 6: Şevbuhêrka Kurdî & Civata Dengbêj",
    subtitle: "Civata germ a dora kûrsiyê, çaya germ, kilam û çîrokên kevnar",
    theme: "Şevbuhêrk & Hunerê Dengbêjiyê",
    character: "Kalo & Dengbêj",
    backdropEmoji: "🌙",
    storyText: "Di şevên dirêj ên zivistanê de, malbat û cîran li dora kûrsî û sobeya germ a darîn kom dibin. Dayik çaya germ a di fîncanên kember-zirav de pêşkêş dike. Zarok gûzên qelandî, bastêq û mewîjan dixwin. Kalê çîrokbêj serpêhatiyên Mem û Zîn vedibêje, Dengbêj bi dengê xwe yê kûr û zelal kilamên lehengiyê dibêje û zarok bi mamikan aqilê xwe diceribînin.",
    dialogueLines: [
      { speaker: "Kalo", text: "Kerem bikin dora kûrsiya germ! Werin guh bidin çîroka Mîr û Hespan!", phonetic: "Kah-rahm bee-keen doh-rah koor-see-yah geh-rm", avatar: "👴" },
      { speaker: "Dengbêj", text: "Dengê min dengê çiyayên Zagrosê ye! Kilamên şahî û bîranînê dibêjim!", phonetic: "Dahn-gay meen dahn-gay chee-yah-yayn Zah-grohs eh", avatar: "🎙️" }
    ],
    hotspots: [
      {
        id: "kursiya_germ",
        name: "Kûrsî & Sobeya Germ",
        verb: "Civat gerandin",
        phonetic: "Koor-see oo soh-beh",
        description: "Cihê komkirina germ a malbatê di şevên sar ên zivistanê de.",
        narration: "Li dora kûrsiya germ malbat û heval çîrokên xweş parve dikin!",
        sfx: "fire",
        wordId: "agir",
        icon: "🔥",
        position: { x: 20, y: 52 }
      },
      {
        id: "chaya_germ",
        name: "Çaya Germ a di Piyalan de",
        verb: "Çay vexwarin",
        phonetic: "Chah-yah geh-rm vah-xwah-reen",
        description: "Çaya rengîn a li ser komirê amade bûye bi bînxweşî tê vexwarin.",
        narration: "Çaya germ a di piyalên zelal de dilê her mêvanekî germ dike!",
        sfx: "water",
        wordId: "kani",
        icon: "🍵",
        position: { x: 42, y: 55 }
      },
      {
        id: "mewij_guz_basteq",
        name: "Mewîj, Bastêq & Gûzên Şevbuhêrkê",
        verb: "Gûz şikandin",
        phonetic: "Meh-weezh, bahs-tayq oo gooz",
        description: "Şîrînahiyên bereketa payîzê ji bo şevbuhêrka dirêj a zivistanê.",
        narration: "Gûzên qelandî, bastêqên şîrîn û mewîjên zer tên xwarin!",
        sfx: "nut",
        wordId: "bivir",
        icon: "🌰",
        position: { x: 65, y: 50 }
      },
      {
        id: "dengbej_stran",
        name: "Dengbêj & Kilamên Kurdî",
        verb: "Kilam gotin",
        phonetic: "Dahn-gbayzh oo kee-lahm",
        description: "Dengbêjê Kurd bê amûr bi dengê xwe yê resen dîrok û destanan dibêje.",
        narration: "Dengbêj bi dengekî bilind destanên çiyayan û lehengiyê dixwîne!",
        sfx: "running",
        wordId: "cirok",
        icon: "🎙️",
        position: { x: 86, y: 45 }
      }
    ],
    quizQuestion: {
      question: "Dengbêj di şevbuhêrkê de çi dibêje?",
      options: [
        { text: "Kilam & Destanên Kurdî", correct: true, phonetic: "Kee-lahm oo dehs-tahn", icon: "🎙️" },
        { text: "Nanê Sêlê", correct: false, phonetic: "Nahn", icon: "🫓" },
        { text: "Bivirê Hesinî", correct: false, phonetic: "Bee-veer", icon: "🪓" }
      ],
      rewardCoins: 300
    }
  }
];
