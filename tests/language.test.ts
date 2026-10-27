// Comprehensive Language & Linguistic Governance Tests
// Verifies 100% absence of Arabic characters, validates Hawar Latin alphabet, and checks data completeness

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import {
  AJALAN_ITEMS,
  AMUR_ITEMS,
  ALL_CARDS,
  INITIAL_BUILDINGS,
  WHEEL_REWARDS,
  UI_TEXT,
  GAME_TITLE,
  COMPANION_GUIDES,
  TOUCHABLE_ITEMS,
  VILLAGE_LIFE_SCENES,
  KURDISH_ALPHABET,
  CARTOON_EPISODES
} from '../src/content/language.ts';

let testCount = 0;
let passedCount = 0;

function assert(condition: boolean, testName: string) {
  testCount++;
  if (condition) {
    passedCount++;
    console.log(`  ✓ [TEST ${testCount}] ${testName}`);
  } else {
    console.error(`  ✗ [FAIL ${testCount}] ${testName}`);
    process.exitCode = 1;
  }
}

console.log("==================================================");
console.log("  Gundé me: Trawşa Rêgezên Zimanî (Language Tests)");
console.log("==================================================");

// Arabic character regex range
const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

// SECTION 1: Zero Arabic Characters in Game Data
console.log("\n--- Beş 1: Qedexekirina Tîpên Erebî (Zero Arabic Script) ---");

assert(!ARABIC_REGEX.test(GAME_TITLE), "Game Title must contain zero Arabic characters");

ALL_CARDS.forEach((card) => {
  assert(!ARABIC_REGEX.test(card.name), `Card name '${card.name}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(card.phonetic), `Card phonetic '[${card.phonetic}]' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(card.description), `Card description for '${card.name}' has no Arabic characters`);
});

INITIAL_BUILDINGS.forEach((b) => {
  assert(!ARABIC_REGEX.test(b.name), `Building '${b.name}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(b.description), `Building description for '${b.name}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(b.perks), `Building perks for '${b.name}' has no Arabic characters`);
});

WHEEL_REWARDS.forEach((w) => {
  assert(!ARABIC_REGEX.test(w.label), `Wheel label '${w.label}' has no Arabic characters`);
});

Object.entries(UI_TEXT).forEach(([key, text]) => {
  assert(!ARABIC_REGEX.test(text), `UI text '${key}' has no Arabic characters`);
});

// Companions Check
COMPANION_GUIDES.forEach((comp) => {
  assert(!ARABIC_REGEX.test(comp.name), `Companion name '${comp.name}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(comp.title), `Companion title '${comp.title}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(comp.catchphrase), `Companion catchphrase '${comp.name}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(comp.greetings), `Companion greetings '${comp.name}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(comp.cryPhonetic), `Companion cry '${comp.cryPhonetic}' has no Arabic characters`);
});

// Touchable Items Check
Object.values(TOUCHABLE_ITEMS).forEach((item) => {
  assert(!ARABIC_REGEX.test(item.name), `Touch item '${item.name}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(item.phonetic), `Touch item phonetic '${item.phonetic}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(item.description), `Touch item desc for '${item.name}' has no Arabic characters`);
});

// Village Life Journey Scenes Check
VILLAGE_LIFE_SCENES.forEach((scene) => {
  assert(!ARABIC_REGEX.test(scene.title), `Scene title '${scene.title}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(scene.subtitle), `Scene subtitle for '${scene.title}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(scene.description), `Scene description for '${scene.title}' has no Arabic characters`);
  if (scene.season) assert(!ARABIC_REGEX.test(scene.season), `Scene season '${scene.season}' has no Arabic characters`);

  scene.hotspots.forEach((h) => {
    assert(!ARABIC_REGEX.test(h.name), `Hotspot '${h.name}' has no Arabic characters`);
    assert(!ARABIC_REGEX.test(h.verb), `Hotspot verb '${h.verb}' has no Arabic characters`);
    assert(!ARABIC_REGEX.test(h.phonetic), `Hotspot phonetic '[${h.phonetic}]' has no Arabic characters`);
    assert(!ARABIC_REGEX.test(h.description), `Hotspot description for '${h.name}' has no Arabic characters`);
    assert(!ARABIC_REGEX.test(h.narration), `Hotspot narration for '${h.name}' has no Arabic characters`);
  });
});

// Kurdish Alphabet 31 Letters Check
KURDISH_ALPHABET.forEach((item) => {
  assert(!ARABIC_REGEX.test(item.letter), `Letter '${item.letter}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(item.name), `Letter name '${item.name}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(item.phonetic), `Letter phonetic '${item.phonetic}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(item.exampleWord), `Letter word '${item.exampleWord}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(item.exampleMeaning), `Letter meaning '${item.exampleMeaning}' has no Arabic characters`);
});

// Cartoon Film Series Check
CARTOON_EPISODES.forEach((ep) => {
  assert(!ARABIC_REGEX.test(ep.title), `Episode title '${ep.title}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(ep.subtitle), `Episode subtitle '${ep.subtitle}' has no Arabic characters`);
  assert(!ARABIC_REGEX.test(ep.storyText), `Episode story text for '${ep.title}' has no Arabic characters`);
  ep.dialogueLines.forEach((d) => {
    assert(!ARABIC_REGEX.test(d.speaker), `Dialogue speaker '${d.speaker}' has no Arabic characters`);
    assert(!ARABIC_REGEX.test(d.text), `Dialogue text '${d.text}' has no Arabic characters`);
    assert(!ARABIC_REGEX.test(d.phonetic), `Dialogue phonetic '${d.phonetic}' has no Arabic characters`);
  });
  ep.hotspots.forEach((h) => {
    assert(!ARABIC_REGEX.test(h.name), `Cartoon hotspot '${h.name}' has no Arabic characters`);
    assert(!ARABIC_REGEX.test(h.verb), `Cartoon verb '${h.verb}' has no Arabic characters`);
    assert(!ARABIC_REGEX.test(h.description), `Cartoon desc '${h.description}' has no Arabic characters`);
    assert(!ARABIC_REGEX.test(h.narration), `Cartoon narration '${h.narration}' has no Arabic characters`);
  });
  assert(!ARABIC_REGEX.test(ep.quizQuestion.question), `Cartoon quiz question for '${ep.title}' has no Arabic characters`);
  ep.quizQuestion.options.forEach((o) => {
    assert(!ARABIC_REGEX.test(o.text), `Cartoon quiz option '${o.text}' has no Arabic characters`);
    assert(!ARABIC_REGEX.test(o.phonetic), `Cartoon quiz option phonetic '${o.phonetic}' has no Arabic characters`);
  });
});

// Also scan standalone.html directly
const standaloneContent = readFileSync(join(process.cwd(), 'standalone.html'), 'utf-8');
assert(!ARABIC_REGEX.test(standaloneContent), "File 'standalone.html' contains strictly zero Arabic script characters");

// SECTION 2: Codebase Scan for Arabic Characters
console.log("\n--- Beş 2: Sehskirina Pelan (Codebase Scan for Arabic) ---");

function scanDirectory(dir: string) {
  const files = readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'build') continue;
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.html') || file.endsWith('.json') || file.endsWith('.java') || file.endsWith('.xml')) {
      const content = readFileSync(fullPath, 'utf-8');
      if (file !== 'language.test.ts') {
        assert(!ARABIC_REGEX.test(content), `File '${file}' contains strictly zero Arabic script characters`);
      }
    }
  }
}

scanDirectory(join(process.cwd(), 'src'));
scanDirectory(join(process.cwd(), 'android'));

// SECTION 3: Vocabulary and Linguistic Completeness
console.log("\n--- Beş 3: Temambûna Peyvan (Vocabulary Completeness) ---");

assert(AJALAN_ITEMS.length >= 15, `At least 15 animals (Ajalan) defined (found: ${AJALAN_ITEMS.length})`);
assert(AMUR_ITEMS.length >= 8, `At least 8 tools (Amûr) defined (found: ${AMUR_ITEMS.length})`);
assert(INITIAL_BUILDINGS.length >= 5, `At least 5 village buildings defined (found: ${INITIAL_BUILDINGS.length})`);
assert(WHEEL_REWARDS.length === 8, `Spin wheel has 8 balanced rewards (found: ${WHEEL_REWARDS.length})`);
assert(COMPANION_GUIDES.length >= 6, `At least 6 animal companion guides defined (found: ${COMPANION_GUIDES.length})`);
assert(Object.keys(TOUCHABLE_ITEMS).length >= 10, `At least 10 touchable dictionary items defined (found: ${Object.keys(TOUCHABLE_ITEMS).length})`);
assert(VILLAGE_LIFE_SCENES.length === 5, `All 5 village life scenes defined (found: ${VILLAGE_LIFE_SCENES.length})`);
assert(KURDISH_ALPHABET.length === 31, `All 31 letters of the Kurdish Hawar alphabet defined (found: ${KURDISH_ALPHABET.length})`);
assert(CARTOON_EPISODES.length === 6, `All 6 Cartoon episodes defined (found: ${CARTOON_EPISODES.length})`);
const totalHotspots = VILLAGE_LIFE_SCENES.reduce((acc, s) => acc + s.hotspots.length, 0);
assert(totalHotspots >= 18, `At least 18 interactive action hotspots defined (found: ${totalHotspots})`);

// Check uniqueness of card IDs
const ids = new Set<string>();
let allUnique = true;
ALL_CARDS.forEach(c => {
  if (ids.has(c.id)) allUnique = false;
  ids.add(c.id);
});
assert(allUnique, "All card IDs are unique");

console.log("\n==================================================");
console.log(`Encam: ${passedCount} ji ${testCount} ceribandin bi ser ketin!`);
if (passedCount === testCount) {
  console.log("HEMÛ TEST BI SER KETIN! (ALL TESTS PASSED)");
} else {
  console.error("HINEK TEST BI SER NEKETIN!");
}
console.log("==================================================\n");
