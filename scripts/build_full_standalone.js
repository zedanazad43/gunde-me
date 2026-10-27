import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\azadz\\.gemini\\antigravity\\scratch\\gunde-me';
const standalonePath = path.join(projectDir, 'standalone.html');
let content = fs.readFileSync(standalonePath, 'utf8');

// Replace App function
const appCode = `    // --- MAIN REACT COMPONENT ---
    function App() {
      const [tab, setTab] = useState('journey');
      const [coins, setCoins] = useState(1000);
      const [energy, setEnergy] = useState(30);
      const [shields, setShields] = useState(2);
      const [level, setLevel] = useState(1);
      const [bState, setBState] = useState(BUILDINGS);
      const [unlocked, setUnlocked] = useState(['ser', 'pisik', 'bivir', 'cakuc', 'nan', 'av', 'genim', 'sev', 'hinar', 'dayik', 'bav', 'agir']);
      
      // Companion state
      const [companion, setCompanion] = useState(COMPANIONS[0]);
      const [bubble, setBubble] = useState({ text: COMPANIONS[0].catchphrase, phonetic: COMPANIONS[0].cry });
      const [isSpeaking, setIsSpeaking] = useState(false);
      const [showCompanionPicker, setShowCompanionPicker] = useState(false);

      // Journey & Cartoon Series state
      const [journeySceneIdx, setJourneySceneIdx] = useState(0);
      const [journeyHotspot, setJourneyHotspot] = useState(null);
      const [visitedHotspots, setVisitedHotspots] = useState([]);
      const [isAlphabetMode, setIsAlphabetMode] = useState(false);
      const [selectedLetter, setSelectedLetter] = useState(KURDISH_ALPHABET[0]);
      const [playingEpisode, setPlayingEpisode] = useState(false);
      const [dialogueIdx, setDialogueIdx] = useState(0);
      const [episodeQuizAnswer, setEpisodeQuizAnswer] = useState(null);
      const [episodeQuizPassed, setEpisodeQuizPassed] = useState(false);

      // Wheel state
      const [spinning, setSpinning] = useState(false);
      const [rotation, setRotation] = useState(0);
      const [winBanner, setWinBanner] = useState(null);
      const [isRaidOpen, setIsRaidOpen] = useState(false);
      const [selectedChest, setSelectedChest] = useState(null);
      const rotRef = useRef(0);

      // Quiz state
      const [quizTarget, setQuizTarget] = useState(null);
      const [quizOptions, setQuizOptions] = useState([]);
      const [selectedQuiz, setSelectedQuiz] = useState(null);
      const [quizScore, setQuizScore] = useState(0);

      // Instant Kurdish Speech Reader with ZERO animal cries
      const speakGuide = (text, phonetic, animalId = null, wordId = null) => {
        setBubble({ text, phonetic });
        setIsSpeaking(true);
        sound.stopAudio();
        if (wordId && AUDIO_FILES.words[wordId]) {
          sound.playWord(wordId, () => setIsSpeaking(false));
        } else if (animalId && AUDIO_FILES.animals[animalId]) {
          sound.playAnimal(animalId, () => setIsSpeaking(false));
        } else {
          sound.playTone(520, 'sine', 0.12);
          setTimeout(() => setIsSpeaking(false), 1400);
        }
      };

      const handleTouchItem = (itemId) => {
        const item = TOUCH_DICT[itemId];
        if (item) {
          speakGuide(item.desc, item.phonetic, null, item.wordId);
        }
      };

      const playEpisodeDialogue = (ep) => {
        if (playingEpisode) return;
        setPlayingEpisode(true);
        setDialogueIdx(0);
        let idx = 0;
        const playNext = () => {
          if (idx >= ep.dialogueLines.length) {
            setPlayingEpisode(false);
            speakGuide("Xelek qediya! Aferîn ji bo guhdarîkirina çîrokê!", "A-fe-reen", null, 'aferin');
            return;
          }
          const d = ep.dialogueLines[idx];
          setDialogueIdx(idx);
          speakGuide(\`\${d.speaker}: \${d.text}\`, d.phonetic, null, null);
          idx++;
          setTimeout(playNext, 3800);
        };
        playNext();
      };

      const handleEpisodeQuiz = (opt, ep) => {
        if (episodeQuizAnswer !== null) return;
        setEpisodeQuizAnswer(opt.text);
        if (opt.correct) {
          setEpisodeQuizPassed(true);
          sound.playSuccess();
          sound.playWord('aferin');
          setCoins(c => c + ep.quizQuestion.rewardCoins);
          speakGuide(\`Aferîn! Bersiva te rast e! Te +\${ep.quizQuestion.rewardCoins} Dirav qezenc kir!\`, "A-fe-reen", null, 'aferin');
          if (window.confetti) window.confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        } else {
          setEpisodeQuizPassed(false);
          sound.playError();
          speakGuide("Şaş e! Dîsa biceribîne!", "", null, null);
        }
      };

      const nextQuiz = () => {
        setSelectedQuiz(null);
        const target = ALL_ITEMS[Math.floor(Math.random() * ALL_ITEMS.length)];
        const pool = ALL_ITEMS.filter(x => x.id !== target.id).sort(() => 0.5 - Math.random()).slice(0, 3);
        const opts = [target, ...pool].sort(() => 0.5 - Math.random());
        setQuizTarget(target);
        setQuizOptions(opts);
        speakGuide(\`Ev kîjan e? Guh bide dengê: \${target.name}!\`, target.phonetic, null, AUDIO_FILES.words[target.id] ? target.id : null);
      };

      useEffect(() => {
        nextQuiz();
      }, []);

      const spin = () => {
        if (spinning || energy <= 0) return;
        setEnergy(e => e - 1);
        setSpinning(true);
        setWinBanner(null);
        speakGuide("Çerx dizivire! Bêhna xwe fireh bike!", "", null, null);

        const targetIdx = Math.floor(Math.random() * REWARDS.length);
        const targetReward = REWARDS[targetIdx];
        const segAngle = 360 / REWARDS.length;
        const targetSeg = targetIdx * segAngle + segAngle / 2;
        const extra = 6 * 360;
        const finalDeg = extra + (360 - targetSeg + 270) % 360;

        const newRot = rotRef.current + (finalDeg - (rotRef.current % 360)) + extra;
        rotRef.current = newRot;
        setRotation(newRot);

        let tickCount = 0;
        const tickTimer = setInterval(() => {
          sound.playTick();
          if (++tickCount > 24) clearInterval(tickTimer);
        }, 130);

        setTimeout(() => {
          setSpinning(false);
          let wonCard = null;
          if (targetReward.type === 'coins') {
            setCoins(c => c + targetReward.amount);
            sound.playCoin();
            speakGuide(\`Aferîn! Te \${targetReward.amount} Dirav qezenc kir!\`, "Dee-rav", null, 'dirav');
          } else if (targetReward.type === 'energy') {
            setEnergy(e => Math.min(50, e + targetReward.amount));
            sound.playSuccess();
            speakGuide(\`Pîroz be! Te \${targetReward.amount} Hêz qezenc kir!\`, "Hayz", null, 'hez');
          } else if (targetReward.type === 'shield') {
            setShields(s => Math.min(3, s + targetReward.amount));
            sound.playSuccess();
            speakGuide("Mertalê nû! Gundê me parastî ye!", "Mehr-tal", null, null);
          } else if (targetReward.type === 'raid') {
            sound.playFanfare();
            setIsRaidOpen(true);
            speakGuide("Êrîşa dostane! Sindoqekê veke!", "Seen-doq", null, 'dirav');
          } else if (targetReward.type === 'card') {
            const avail = ALL_ITEMS.filter(c => !unlocked.includes(c.id));
            wonCard = (avail.length ? avail : ALL_ITEMS)[Math.floor(Math.random() * (avail.length || ALL_ITEMS.length))];
            if (!unlocked.includes(wonCard.id)) setUnlocked(u => [...u, wonCard.id]);
            sound.playFanfare();
            speakGuide(\`Karta nû: \${wonCard.name}! [\${wonCard.phonetic}]\`, wonCard.phonetic, null, AUDIO_FILES.words[wonCard.id] ? wonCard.id : null);
          }
          if (window.confetti) {
            window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
          }
          setWinBanner({ reward: targetReward, card: wonCard });
        }, 3600);
      };

      const handlePickChest = (idx) => {
        if (selectedChest !== null) return;
        setSelectedChest(idx);
        const rewards = [1500, 2500, 1000];
        const won = rewards[idx];
        sound.playFanfare();
        speakGuide(\`Aferîn! Te xezîne dît! +\${won} Dirav!\`, "Xe-zee-ne", null, 'dirav');
        if (window.confetti) window.confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
        setCoins(c => c + won);
        setTimeout(() => {
          setIsRaidOpen(false);
          setSelectedChest(null);
        }, 2200);
      };

      const upgradeBuilding = (id) => {
        const b = bState.find(x => x.id === id);
        if (!b) return;
        const cost = b.baseCost * b.level;
        if (coins < cost) {
          sound.playError();
          speakGuide("Diravên te têrê nake! Çerxê bizivirîne!", "Dee-rav", null, 'dirav');
          return;
        }
        setCoins(c => c - cost);
        setBState(prev => prev.map(x => x.id === id ? { ...x, level: x.level + 1 } : x));
        sound.playFanfare();
        speakGuide(\`Pîroz be! \${b.name} hat zêdekirin!\`, "A-va-hee", null, b.wordId);
        if (window.confetti) window.confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      };

      return h('div', { className: 'min-h-screen flex flex-col' },
        // Top Header with Instant Hover & Touch Reader
        h('header', { className: 'sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-4 border-amber-300 shadow-md p-3' },
          h('div', { className: 'max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3' },
            h('div', {
              className: 'flex items-center gap-2 cursor-pointer',
              onClick: () => handleTouchItem('sun_icon'),
              onMouseEnter: () => handleTouchItem('sun_icon')
            },
              h('div', { className: 'w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-2xl shadow animate-pulse-glow' }, '☀️'),
              h('div', null,
                h('h1', { className: 'text-2xl font-black text-amber-950 font-bold tracking-tight' }, 'Gundé me'),
                h('span', { className: 'text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full' }, 'Ast ' + level)
              )
            ),
            h('div', { className: 'flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-2xl border-2 border-amber-200' },
              h('div', {
                onClick: () => handleTouchItem('coins_box'),
                onMouseEnter: () => handleTouchItem('coins_box'),
                className: 'flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl shadow-sm text-sm font-extrabold text-amber-900 cursor-pointer hover:scale-105 active:scale-95 transition-transform'
              }, '🪙 ' + coins.toLocaleString()),
              h('div', {
                onClick: () => handleTouchItem('energy_bolt'),
                onMouseEnter: () => handleTouchItem('energy_bolt'),
                className: 'flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl shadow-sm text-sm font-extrabold text-sky-900 cursor-pointer hover:scale-105 active:scale-95 transition-transform'
              }, '⚡ ' + energy + '/50'),
              h('div', {
                onClick: () => handleTouchItem('shield_icon'),
                onMouseEnter: () => handleTouchItem('shield_icon'),
                className: 'flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl shadow-sm text-sm font-extrabold text-emerald-900 cursor-pointer hover:scale-105 active:scale-95 transition-transform'
              }, '🛡️ ' + shields + '/3')
            ),
            h('nav', { className: 'flex items-center gap-1 bg-amber-100 p-1 rounded-2xl flex-wrap' },
              ['journey:🎬 Karton & Ziman', 'wheel:🎡 Çerx', 'village:🏡 Gund', 'cards:📚 Karta Zimanê', 'quiz:❓ Pirs'].map(item => {
                const [key, label] = item.split(':');
                const active = tab === key;
                return h('button', {
                  key,
                  onClick: () => {
                    setTab(key);
                    speakGuide(\`Em derbasî beşa \${label} bûn!\`, "", null, null);
                  },
                  className: \`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all \${
                    active ? 'bg-amber-500 text-white shadow scale-105' : 'text-amber-900 hover:bg-amber-200'
                  }\`
                }, label);
              })
            )
          )
        ),

        // Body Content
        h('main', { className: 'flex-1 max-w-5xl mx-auto w-full p-4 pb-28' },
          // Tab: Cartoon Series & Kurdish Alphabet Explorer
          tab === 'journey' && (() => {
            const curEp = CARTOON_EPISODES[journeySceneIdx] || CARTOON_EPISODES[0];
            return h('div', { className: 'flex flex-col gap-6' },
              // Mode Switcher Banner
              h('div', { className: 'bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 rounded-3xl p-5 text-white shadow-xl flex flex-wrap items-center justify-between gap-4' },
                h('div', null,
                  h('span', { className: 'text-xs text-amber-100 font-extrabold tracking-wider uppercase block mb-1' }, '🌟 Sînemaya Kartonî ya Gundê Me & Alfabeya Hawarê'),
                  h('h2', { className: 'text-2xl sm:text-3xl font-black' }, isAlphabetMode ? '🔤 Alfabeya Hawarê (31 Tîpên Zêrîn)' : '🎬 Rêze-Fîlmên Kartonî yên Gundê Me'),
                  h('p', { className: 'text-xs sm:text-sm text-amber-100 font-medium mt-1 max-w-xl' },
                    isAlphabetMode ? 'Li ser her tîpê bisekine an dest bide da ku dengê tîpê û peyva wê ya Kurdî bibihîzî!' : 'Jiyana rojane ya Kurdî di hemû werzan de bi fîlmê kartonî, xebata cotkaran û dengbêjan!'
                  )
                ),
                h('div', { className: 'flex items-center gap-2 bg-black/20 p-1.5 rounded-2xl backdrop-blur-md' },
                  h('button', {
                    onClick: () => {
                      setIsAlphabetMode(false);
                      speakGuide("Beşa fîlmên kartonî yên gundê me!", "", null, null);
                    },
                    className: \`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all \${
                      !isAlphabetMode ? 'bg-white text-amber-950 shadow-md scale-105' : 'text-white hover:bg-white/10'
                    }\`
                  }, '🎬 Fîlmên Kartonî'),
                  h('button', {
                    onClick: () => {
                      setIsAlphabetMode(true);
                      speakGuide("Alfabeya zimanê Kurdî! 31 tîpên Celadet Bedirxan!", "", null, null);
                    },
                    className: \`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all \${
                      isAlphabetMode ? 'bg-white text-amber-950 shadow-md scale-105' : 'text-white hover:bg-white/10'
                    }\`
                  }, '🔤 Alfabeya Kurdî')
                )
              ),

              // Mode 1: 31-Letter Hawar Alphabet Explorer
              isAlphabetMode ? h('div', { className: 'flex flex-col gap-6' },
                h('div', { className: 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3' },
                  KURDISH_ALPHABET.map((item) => {
                    const isSel = selectedLetter && selectedLetter.letter === item.letter;
                    return h('div', {
                      key: item.letter,
                      onClick: () => {
                        setSelectedLetter(item);
                        speakGuide(\`Tîpa \${item.letter}: \${item.name}! Peyv: \${item.exampleWord}!\`, item.phonetic, null, item.wordId);
                      },
                      onMouseEnter: () => {
                        setSelectedLetter(item);
                        speakGuide(\`Tîpa \${item.letter}: \${item.name}! Peyv: \${item.exampleWord}!\`, item.phonetic, null, item.wordId);
                      },
                      className: \`cursor-pointer p-3 rounded-2xl border-3 flex flex-col items-center justify-center transition-all transform hover:-translate-y-1 hover:shadow-lg active:scale-95 \${
                        isSel ? 'bg-amber-500 text-white border-amber-200 shadow-xl scale-105' : 'bg-white text-amber-950 border-amber-200 shadow-sm hover:border-amber-400'
                      }\`
                    },
                      h('span', { className: 'text-2xl sm:text-3xl font-black font-["Nunito"]' }, item.letter),
                      h('span', { className: \`text-xs font-bold \${isSel ? 'text-amber-100' : 'text-amber-700'}\` }, item.name),
                      h('div', { className: 'flex items-center gap-1 mt-1 text-xs' },
                        h('span', null, item.icon),
                        h('span', { className: 'font-bold' }, item.exampleWord)
                      )
                    );
                  })
                ),

                // Selected Letter Spotlight Card
                selectedLetter && h('div', { className: 'bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl flex flex-wrap items-center justify-between gap-4' },
                  h('div', { className: 'flex items-center gap-4' },
                    h('div', { className: 'w-20 h-20 rounded-3xl bg-amber-500 text-white flex items-center justify-center text-5xl font-black shadow-lg font-["Nunito"]' }, selectedLetter.letter),
                    h('div', null,
                      h('div', { className: 'flex items-center gap-2' },
                        h('h3', { className: 'text-2xl font-black text-amber-950' }, \`Tîpa \${selectedLetter.letter} — \${selectedLetter.name}\`),
                        h('span', { className: 'bg-amber-100 text-amber-900 text-xs font-mono font-bold px-2.5 py-1 rounded-full' }, \`[\${selectedLetter.phonetic}]\`)
                      ),
                      h('p', { className: 'text-base font-extrabold text-stone-800 mt-1' }, \`\${selectedLetter.icon} Peyv: \${selectedLetter.exampleWord}\`),
                      h('p', { className: 'text-xs text-stone-600 mt-0.5' }, selectedLetter.exampleMeaning)
                    )
                  ),
                  h('button', {
                    onClick: () => speakGuide(\`Tîpa \${selectedLetter.letter}: \${selectedLetter.name}! Peyv: \${selectedLetter.exampleWord}!\`, selectedLetter.phonetic, null, selectedLetter.wordId),
                    className: 'flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-2xl font-black text-sm shadow-lg hover:scale-105 active:scale-95 transition-transform'
                  }, '🔊 Dengê Tîpê & Peyvê')
                )
              ) :
              
              // Mode 2: 6 Cartoon Series Episodes
              h('div', { className: 'flex flex-col gap-6' },
                // Episode Selector Tabs
                h('div', { className: 'flex items-center gap-2 overflow-x-auto pb-2' },
                  CARTOON_EPISODES.map((ep, eIdx) => {
                    const isSel = eIdx === journeySceneIdx;
                    return h('button', {
                      key: ep.id,
                      onClick: () => {
                        setJourneySceneIdx(eIdx);
                        setJourneyHotspot(null);
                        setEpisodeQuizAnswer(null);
                        setEpisodeQuizPassed(false);
                        speakGuide(\`\${ep.title} — \${ep.subtitle}\`, "", null, null);
                      },
                      onMouseEnter: () => {
                        if (!isSel) speakGuide(ep.title, "", null, null);
                      },
                      className: \`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all \${
                        isSel ? 'bg-amber-500 text-white shadow-lg scale-105 border-2 border-amber-300' : 'bg-white text-stone-700 hover:bg-amber-50 border-2 border-stone-200'
                      }\`
                    },
                      h('span', { className: 'text-2xl' }, ep.backdropEmoji),
                      h('div', { className: 'text-left' },
                        h('div', { className: 'font-black leading-tight' }, ep.title.split(':')[1] || ep.title),
                        h('div', { className: 'text-[11px] opacity-80' }, ep.character + (ep.season ? \` • \${ep.season}\` : ''))
                      )
                    );
                  })
                ),

                // Cartoon Stage & Illustrated Scene Canvas
                h('div', { className: 'bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl flex flex-col gap-5 overflow-hidden' },
                  // Episode Header
                  h('div', { className: 'flex flex-wrap items-center justify-between gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-200' },
                    h('div', null,
                      h('div', { className: 'flex items-center gap-2' },
                        h('span', { className: 'text-3xl' }, curEp.backdropEmoji),
                        h('h3', { className: 'text-xl sm:text-2xl font-black text-amber-950' }, curEp.title)
                      ),
                      h('p', { className: 'text-xs sm:text-sm text-amber-800 font-bold mt-0.5' }, curEp.subtitle)
                    ),
                    h('div', { className: 'flex items-center gap-2' },
                      h('span', { className: 'bg-amber-200 text-amber-900 text-xs font-black px-3 py-1 rounded-full' }, curEp.character),
                      curEp.season && h('span', { className: 'bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-1 rounded-full' }, 'Werz: ' + curEp.season)
                    )
                  ),

                  // Synopsis Text
                  h('div', { className: 'bg-stone-50 p-4 rounded-2xl border border-stone-200 text-stone-800 text-sm leading-relaxed font-medium' },
                    curEp.storyText
                  ),

                  // Disney/Ghibli Kurdish Village Stage Canvas
                  h('div', {
                    className: 'relative min-h-[300px] rounded-3xl p-6 border-4 border-amber-400 overflow-hidden shadow-inner flex flex-col justify-between bg-gradient-to-b from-sky-200 via-amber-100 to-emerald-200'
                  },
                    // Visual background decorative elements
                    h('div', { className: 'absolute top-3 left-4 text-5xl opacity-40 select-none pointer-events-none' }, '⛰️ 🏔️'),
                    h('div', { className: 'absolute top-2 right-4 text-4xl select-none pointer-events-none' }, curEp.backdropEmoji),
                    h('div', { className: 'absolute bottom-2 left-6 text-6xl opacity-30 select-none pointer-events-none' }, '🏡'),
                    h('div', { className: 'absolute bottom-2 right-8 text-5xl opacity-30 select-none pointer-events-none' }, '🌳'),

                    // Dialogue player bar
                    h('div', { className: 'relative z-10 flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-amber-300 shadow' },
                      h('div', { className: 'flex items-center gap-2' },
                        h('span', { className: 'text-2xl' }, curEp.dialogueLines[dialogueIdx] ? curEp.dialogueLines[dialogueIdx].avatar : '🎬'),
                        h('div', null,
                          h('span', { className: 'text-xs font-bold text-amber-800 block' },
                            playingEpisode ? \`Dilîze (\${dialogueIdx + 1}/\${curEp.dialogueLines.length}): \${curEp.dialogueLines[dialogueIdx].speaker}\` : 'Guh Bide Çîroka Zindî:'
                          ),
                          h('p', { className: 'text-sm font-black text-amber-950' },
                            curEp.dialogueLines[dialogueIdx] ? curEp.dialogueLines[dialogueIdx].text : curEp.dialogueLines[0].text
                          )
                        )
                      ),
                      h('button', {
                        onClick: () => playEpisodeDialogue(curEp),
                        disabled: playingEpisode,
                        className: \`px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-md transition-all \${
                          playingEpisode ? 'bg-slate-400' : 'bg-gradient-to-r from-red-500 to-amber-500 hover:scale-105 active:scale-95'
                        }\`
                      }, playingEpisode ? 'Dilîze... 🔊' : '▶️ Fîlmê Dest Pê Bike')
                    ),

                    // Interactive Scene Hotspots with Instant Speech & Zero Animal Cries
                    h('div', { className: 'relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-4' },
                      curEp.hotspots.map(hspot => {
                        const isSel = journeyHotspot && journeyHotspot.id === hspot.id;
                        const isVis = visitedHotspots.includes(hspot.id);
                        return h('div', {
                          key: hspot.id,
                          onClick: () => {
                            setJourneyHotspot(hspot);
                            if (!visitedHotspots.includes(hspot.id)) {
                              setVisitedHotspots(v => [...v, hspot.id]);
                            }
                            sound.playSFX(hspot.sfx);
                            speakGuide(\`\${hspot.name}! \${hspot.narration}\`, hspot.phonetic, null, hspot.wordId);
                          },
                          onMouseEnter: () => {
                            sound.playSFX(hspot.sfx);
                            speakGuide(\`\${hspot.name}! \${hspot.narration}\`, hspot.phonetic, null, hspot.wordId);
                          },
                          className: \`cursor-pointer p-4 rounded-2xl border-3 transition-all transform hover:-translate-y-1 hover:shadow-xl active:scale-95 \${
                            isSel ? 'bg-amber-500 text-white border-amber-200 shadow-xl scale-[1.02]' : isVis ? 'bg-white/95 text-stone-800 border-emerald-300 shadow' : 'bg-white/90 text-stone-800 border-amber-200 shadow-sm hover:border-amber-400'
                          }\`
                        },
                          h('div', { className: 'flex items-start gap-3' },
                            h('div', { className: \`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner \${isSel ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-900'}\` }, hspot.icon),
                            h('div', { className: 'flex-1 min-w-0' },
                              h('div', { className: 'flex items-center justify-between gap-1' },
                                h('h4', { className: 'text-sm font-black truncate' }, hspot.name),
                                isVis && h('span', { className: 'text-xs' }, isSel ? '⭐' : '✅')
                              ),
                              h('div', { className: \`text-xs font-bold mt-0.5 inline-block px-2 py-0.5 rounded-md \${isSel ? 'bg-amber-600 text-amber-100' : 'bg-amber-100 text-amber-900'}\` }, hspot.verb),
                              h('div', { className: \`text-[11px] font-mono mt-1 \${isSel ? 'text-amber-100' : 'text-stone-500'}\` }, \`[\${hspot.phonetic}]\`)
                            )
                          ),
                          h('div', { className: 'mt-2 pt-2 border-t border-black/5 flex items-center justify-between text-xs' },
                            h('span', { className: 'text-[11px] truncate opacity-90' }, hspot.description),
                            h('span', { className: 'text-sm' }, '🔊')
                          )
                        );
                      })
                    ),

                    // Hotspot active spotlight
                    journeyHotspot && h('div', { className: 'relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 border-2 border-amber-300 shadow-lg flex flex-wrap items-center justify-between gap-3' },
                      h('div', { className: 'flex items-center gap-3' },
                        h('span', { className: 'text-4xl p-2 bg-amber-50 rounded-2xl border border-amber-200' }, journeyHotspot.icon),
                        h('div', null,
                          h('div', { className: 'flex items-center gap-2' },
                            h('h4', { className: 'text-base sm:text-lg font-black text-amber-950' }, journeyHotspot.name),
                            h('span', { className: 'bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full' }, 'Lêker: ' + journeyHotspot.verb)
                          ),
                          h('p', { className: 'text-xs text-stone-600 mt-0.5 font-medium' }, journeyHotspot.narration),
                          h('p', { className: 'text-xs font-mono text-amber-800 font-bold mt-1' }, \`Bilêvkirin: [\${journeyHotspot.phonetic}]\`)
                        )
                      ),
                      h('button', {
                        onClick: () => {
                          sound.playSFX(journeyHotspot.sfx);
                          speakGuide(journeyHotspot.narration, journeyHotspot.phonetic, null, journeyHotspot.wordId);
                        },
                        className: 'flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow active:scale-95 transition-all'
                      }, '🔊 Dengê Wî Bibihîze')
                    )
                  ),

                  // Episode Comprehension Quiz
                  h('div', { className: 'bg-amber-50 rounded-3xl p-5 border-3 border-amber-300 flex flex-col gap-3' },
                    h('div', { className: 'flex items-center justify-between' },
                      h('h4', { className: 'font-black text-amber-950 text-base' }, '❓ Pirs & Xelat ji bo vê Xelekê:'),
                      h('span', { className: 'bg-amber-200 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full' }, \`+\${curEp.quizQuestion.rewardCoins} 🪙\`)
                    ),
                    h('p', { className: 'text-sm font-bold text-stone-800' }, curEp.quizQuestion.question),
                    h('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-3' },
                      curEp.quizQuestion.options.map(opt => {
                        const isChosen = episodeQuizAnswer === opt.text;
                        let btnStyle = 'bg-white border-amber-200 text-stone-800 hover:bg-amber-100';
                        if (isChosen) {
                          btnStyle = opt.correct ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-500 text-white border-rose-600';
                        }
                        return h('button', {
                          key: opt.text,
                          disabled: episodeQuizAnswer !== null,
                          onClick: () => handleEpisodeQuiz(opt, curEp),
                          onMouseEnter: () => speakGuide(opt.text, opt.phonetic, null, null),
                          className: \`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-black text-xs sm:text-sm transition-all \${btnStyle}\`
                        },
                          h('span', { className: 'text-xl' }, opt.icon),
                          h('span', null, opt.text)
                        );
                      })
                    ),
                    episodeQuizAnswer !== null && h('div', { className: 'text-center mt-2' },
                      h('span', { className: \`text-xs font-black px-4 py-1.5 rounded-full \${episodeQuizPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}\` },
                        episodeQuizPassed ? \`Aferîn! Bersiva te rast e! (+\${curEp.quizQuestion.rewardCoins} 🪙)\` : 'Şaş e! Dîsa biceribîne!'
                      )
                    )
                  )
                )
              )
            );
          })(),

          // Tab 1: Wheel
          tab === 'wheel' && h('div', { className: 'flex flex-col items-center py-4' },
            h('h2', { className: 'text-3xl font-black text-amber-900 mb-1' }, '🎡 Çerxa Gundê Me'),
            h('p', { className: 'text-amber-800 text-sm font-bold mb-6' }, 'Bizivirîne û dirav, mertal û kartên zimanê qezenc bike!'),
            h('div', { className: 'relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center' },
              h('div', { className: 'absolute -top-3 z-30 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[30px] border-t-red-600 drop-shadow-md' }),
              h('div', { className: 'absolute inset-0 rounded-full border-8 border-amber-500 bg-amber-400 shadow-2xl p-2 flex items-center justify-center' },
                h('div', {
                  className: 'w-full h-full rounded-full overflow-hidden shadow-inner border-4 border-amber-600',
                  style: {
                    transform: \`rotate(\${rotation}deg)\`,
                    transition: spinning ? 'transform 3.6s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
                  }
                },
                  h('svg', { viewBox: '0 0 100 100', className: 'w-full h-full' },
                    REWARDS.map((r, i) => {
                      const sa = (i * 360) / REWARDS.length;
                      const ea = ((i + 1) * 360) / REWARDS.length;
                      const x1 = 50 + 50 * Math.cos((Math.PI * sa) / 180);
                      const y1 = 50 + 50 * Math.sin((Math.PI * sa) / 180);
                      const x2 = 50 + 50 * Math.cos((Math.PI * ea) / 180);
                      const y2 = 50 + 50 * Math.sin((Math.PI * ea) / 180);
                      const ma = sa + (360 / REWARDS.length) / 2;
                      const tx = 50 + 32 * Math.cos((Math.PI * ma) / 180);
                      const ty = 50 + 32 * Math.sin((Math.PI * ma) / 180);
                      return h('g', { key: i },
                        h('path', { d: \`M50,50 L\${x1},\${y1} A50,50 0 0,1 \${x2},\${y2} Z\`, fill: r.color, stroke: '#92400E', strokeWidth: '0.8' }),
                        h('text', {
                          x: tx, y: ty, fill: '#1E293B', fontSize: '4.5', fontWeight: 'bold', textAnchor: 'middle', dominantBaseline: 'central',
                          transform: \`rotate(\${ma + 90}, \${tx}, \${ty})\`
                        }, \`\${r.icon} \${r.label}\`)
                      );
                    })
                  )
                ),
                h('div', { className: 'absolute w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 border-4 border-white shadow-xl flex items-center justify-center text-3xl' }, '☀️')
              )
            ),
            h('div', { className: 'mt-6 flex flex-col items-center gap-2' },
              h('button', {
                onClick: spin,
                disabled: spinning || energy <= 0,
                className: \`px-10 py-4 rounded-3xl font-black text-2xl text-white shadow-xl transition-all \${
                  spinning || energy <= 0 ? 'bg-slate-400' : 'bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 hover:scale-105 active:scale-95'
                }\`
              }, spinning ? 'DIZIVIRE...' : 'BIZIVIRÎNE! ⚡'),
              h('span', { className: 'text-amber-900 font-extrabold text-sm' }, \`Hêz: \${energy} / 50\`)
            ),
            winBanner && h('div', { className: 'mt-4 bg-white p-4 rounded-2xl border-4 border-amber-300 shadow-xl text-center max-w-sm w-full' },
              h('div', { className: 'text-3xl' }, winBanner.reward.icon),
              h('h3', { className: 'text-lg font-black text-amber-900' }, \`Te \${winBanner.reward.label} qezenc kir!\`),
              winBanner.card && h('div', { className: 'mt-2 p-2 bg-sky-50 rounded-xl border border-sky-300 flex items-center justify-center gap-2' },
                h('span', { className: 'text-3xl' }, winBanner.card.emoji),
                h('div', { className: 'text-left' },
                  h('span', { className: 'text-xs text-sky-600 font-bold block' }, 'Karta Nû'),
                  h('span', { className: 'font-black text-sky-950' }, winBanner.card.name)
                )
              )
            )
          ),

          // Tab 2: Village
          tab === 'village' && h('div', { className: 'flex flex-col gap-6' },
            h('div', { className: 'bg-emerald-600 text-white p-6 rounded-3xl shadow-xl border-4 border-emerald-400 flex flex-wrap items-center justify-between gap-4' },
              h('div', null,
                h('h2', { className: 'text-3xl font-black' }, '🏡 Gundê Me — Ast ' + level),
                h('p', { className: 'text-emerald-100 text-sm font-semibold' }, 'Avahiyên gundê xwe bi diravan mezin bike da ku gund geş bibe!')
              )
            ),
            h('div', { className: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5' },
              bState.map(b => {
                const cost = b.baseCost * b.level;
                const isMax = b.level >= b.maxLevel;
                const can = coins >= cost;
                return h('div', {
                  key: b.id,
                  onClick: () => speakGuide(\`Ev \${b.name} e! \${b.desc}\`, b.name, null, b.wordId),
                  onMouseEnter: () => speakGuide(\`Ev \${b.name} e! \${b.desc}\`, b.name, null, b.wordId),
                  className: 'bg-white rounded-3xl p-5 border-4 border-amber-200 shadow-lg flex flex-col justify-between cursor-pointer hover:border-amber-400 transition-all'
                },
                  h('div', { className: 'flex items-start justify-between' },
                    h('div', { className: 'w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner' }, b.icon),
                    h('span', { className: 'bg-amber-100 text-amber-900 font-black text-xs px-2.5 py-1 rounded-full' }, \`Ast \${b.level}/\${b.maxLevel}\`)
                  ),
                  h('div', { className: 'my-3' },
                    h('h3', { className: 'text-xl font-black text-slate-800' }, b.name),
                    h('p', { className: 'text-slate-600 text-xs my-1' }, b.desc),
                    h('span', { className: 'text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-lg border border-emerald-200 inline-block' }, '✨ ' + b.perks)
                  ),
                  h('button', {
                    onClick: (e) => { e.stopPropagation(); upgradeBuilding(b.id); },
                    disabled: isMax,
                    className: \`w-full py-2.5 rounded-2xl font-black text-sm text-white shadow \${
                      isMax ? 'bg-slate-300' : can ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-300 text-slate-600'
                    }\`
                  }, isMax ? 'Asta Herî Bilind e' : \`Zêde Bike: \${cost.toLocaleString()} 🪙\`)
                );
              })
            )
          ),

          // Tab 3: Flashcards with Hover Speech & Clean Kurdish Pronunciation
          tab === 'cards' && h('div', { className: 'flex flex-col gap-5' },
            h('div', { className: 'bg-white p-5 rounded-3xl border-3 border-amber-300 shadow flex flex-wrap items-center justify-between gap-3' },
              h('div', null,
                h('h2', { className: 'text-2xl font-black text-amber-950' }, '📚 Karta Zimanê Kurdî'),
                h('p', { className: 'text-xs text-amber-800 font-bold' }, \`Ji bo bihîstina dengê Kurdî bisekine an pê lê bike (\${unlocked.length}/\${ALL_ITEMS.length} vekirî ne)\`)
              )
            ),
            h('div', { className: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4' },
              ALL_ITEMS.map(item => {
                const isU = unlocked.includes(item.id);
                return h('div', {
                  key: item.id,
                  onClick: () => {
                    if (isU) {
                      speakGuide(\`\${item.name}! [\${item.phonetic}]. \${item.desc}\`, item.phonetic, null, AUDIO_FILES.words[item.id] ? item.id : null);
                    }
                  },
                  onMouseEnter: () => {
                    if (isU) {
                      speakGuide(\`\${item.name}! [\${item.phonetic}]. \${item.desc}\`, item.phonetic, null, AUDIO_FILES.words[item.id] ? item.id : null);
                    }
                  },
                  className: \`p-4 rounded-3xl border-4 flex flex-col items-center cursor-pointer transition-transform hover:scale-105 shadow-md \${
                    isU ? 'bg-white border-amber-300' : 'bg-slate-100 border-slate-300 opacity-60'
                  }\`
                },
                  h('div', { className: 'w-full flex justify-between items-center text-xs' },
                    h('span', { className: 'bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px]' }, item.rarity),
                    h('span', null, isU ? '🔊' : '🔒')
                  ),
                  h('div', { className: 'w-20 h-20 my-2 bg-amber-50 rounded-2xl flex items-center justify-center text-5xl shadow-inner' }, isU ? item.emoji : '❓'),
                  h('h3', { className: 'font-black text-base text-slate-900' }, isU ? item.name : 'Nenas'),
                  isU && h('span', { className: 'text-xs text-amber-700 font-bold' }, \`[\${item.phonetic}]\`),
                  isU && h('p', { className: 'text-[11px] text-slate-500 text-center mt-1' }, item.desc),
                  isU && AUDIO_FILES.animals[item.id] && h('button', {
                    onClick: (e) => {
                      e.stopPropagation();
                      sound.playAnimal(item.id);
                    },
                    className: 'mt-2 text-[10px] bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full flex items-center gap-1'
                  }, '🐾 Dengê Ajalê')
                );
              })
            )
          ),

          // Tab 4: Quiz
          tab === 'quiz' && quizTarget && h('div', { className: 'max-w-md mx-auto bg-white p-6 rounded-3xl border-4 border-purple-300 shadow-2xl text-center' },
            h('div', { className: 'flex justify-between items-center mb-4 text-xs font-black' },
              h('span', { className: 'bg-purple-100 text-purple-900 px-3 py-1 rounded-full' }, 'Lîstika Pirsan'),
              h('span', { className: 'bg-amber-100 text-amber-900 px-3 py-1 rounded-full' }, \`Pûan: \${quizScore}\`)
            ),
            h('h3', { className: 'text-xl font-black text-slate-800 mb-2' }, 'Ev kîjan peyv e? Guh bide dengê!'),
            h('button', {
              onClick: () => {
                speakGuide(quizTarget.name, quizTarget.phonetic, null, AUDIO_FILES.words[quizTarget.id] ? quizTarget.id : null);
              },
              className: 'w-20 h-20 my-4 mx-auto rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-xl flex flex-col items-center justify-center hover:scale-110 active:scale-95 transition-transform'
            },
              h('span', { className: 'text-3xl' }, '🔊'),
              h('span', { className: 'text-[10px] font-black uppercase' }, 'Deng')
            ),
            h('div', { className: 'grid grid-cols-2 gap-3 mt-4' },
              quizOptions.map(opt => {
                const isSelected = selectedQuiz === opt.id;
                const isTarget = opt.id === quizTarget.id;
                let bg = 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-950';
                if (selectedQuiz !== null) {
                  if (isTarget) bg = 'bg-emerald-500 text-white border-emerald-600';
                  else if (isSelected) bg = 'bg-rose-500 text-white border-rose-600';
                  else bg = 'bg-slate-100 text-slate-400 opacity-60';
                }
                return h('button', {
                  key: opt.id,
                  disabled: selectedQuiz !== null,
                  onClick: () => {
                    setSelectedQuiz(opt.id);
                    if (opt.id === quizTarget.id) {
                      sound.playSuccess();
                      setQuizScore(s => s + 1);
                      setCoins(c => c + 150);
                      setEnergy(e => Math.min(50, e + 1));
                      if (!unlocked.includes(quizTarget.id)) setUnlocked(u => [...u, quizTarget.id]);
                      speakGuide("Aferîn! Pir baş! Bersiva te rast e!", "Aferîn", null, 'aferin');
                      if (window.confetti) window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                    } else {
                      sound.playError();
                      speakGuide(\`Şaş e! Ev bû: \${quizTarget.name}!\`, quizTarget.phonetic, null, AUDIO_FILES.words[quizTarget.id] ? quizTarget.id : null);
                    }
                  },
                  onMouseEnter: () => speakGuide(opt.name, opt.phonetic, null, AUDIO_FILES.words[opt.id] ? opt.id : null),
                  className: \`p-3 rounded-2xl border-3 flex flex-col items-center justify-center gap-1 transition-all \${bg}\`
                },
                  h('span', { className: 'text-3xl' }, opt.emoji),
                  h('span', { className: 'font-black text-base' }, opt.name),
                  h('span', { className: 'text-xs opacity-75' }, \`[\${opt.phonetic}]\`)
                );
              })
            ),
            selectedQuiz !== null && h('div', { className: 'mt-5 flex flex-col items-center gap-2' },
              h('span', { className: \`font-black text-sm px-4 py-1.5 rounded-full \${selectedQuiz === quizTarget.id ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}\` },
                selectedQuiz === quizTarget.id ? 'Aferîn! Pir baş! (+150 🪙, +1 ⚡)' : \`Şaş e! Ev bû: \${quizTarget.name} (\${quizTarget.emoji})\`
              ),
              h('button', {
                onClick: nextQuiz,
                className: 'mt-2 px-6 py-2 rounded-2xl bg-purple-600 text-white font-black text-sm shadow hover:bg-purple-700'
              }, 'Pirsa Din ➔')
            )
          )
        ),

        // Companion Speech Bubble & Floating Avatar
        h('div', { className: 'fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-none max-w-xs' },
          bubble.text && h('div', {
            className: 'mb-2 mr-2 bg-white/95 text-slate-900 px-4 py-2.5 rounded-3xl border-4 border-amber-400 shadow-2xl pointer-events-auto relative animate-bounce-soft'
          },
            h('p', { className: 'font-black text-sm font-["Nunito"] text-amber-950 leading-tight' }, bubble.text),
            bubble.phonetic && h('p', { className: 'text-[11px] font-bold text-amber-700 mt-0.5' }, \`[\${bubble.phonetic}]\`),
            h('div', { className: 'absolute -bottom-3 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-amber-400' })
          ),
          h('div', { className: 'flex items-center gap-2 pointer-events-auto' },
            h('button', {
              onClick: () => setShowCompanionPicker(true),
              className: 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 p-2 rounded-2xl shadow-md text-xs font-bold flex items-center gap-1 transition-transform hover:scale-105 active:scale-95'
            }, '🔄 Heval'),
            h('button', {
              onClick: () => {
                speakGuide(companion.catchphrase, companion.cry, companion.id, null);
              },
              className: \`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 border-4 border-white shadow-2xl flex items-center justify-center text-4xl sm:text-5xl transition-all hover:scale-110 active:scale-95 \${
                isSpeaking ? 'ring-4 ring-amber-400 scale-105' : ''
              }\`
            }, companion.emoji)
          )
        ),

        // Companion Picker Modal
        showCompanionPicker && h('div', { className: 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4' },
          h('div', { className: 'bg-white rounded-3xl p-6 max-w-md w-full border-4 border-amber-400 shadow-2xl relative max-h-[90vh] overflow-y-auto' },
            h('button', {
              onClick: () => setShowCompanionPicker(false),
              className: 'absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 w-8 h-8 rounded-full font-bold'
            }, '✕'),
            h('div', { className: 'text-center mb-5' },
              h('span', { className: 'text-4xl' }, '👑'),
              h('h3', { className: 'text-2xl font-black text-amber-950 mt-1' }, 'Hevalê Rêwîtiya Xwe Hilbijêre'),
              h('p', { className: 'text-xs text-amber-800 font-bold' }, 'Kîjan ajal dê bi te re bipeyive û rê nîşanî te bide?')
            ),
            h('div', { className: 'grid grid-cols-2 gap-3' },
              COMPANIONS.map(c => h('button', {
                key: c.id,
                onClick: () => {
                  setCompanion(c);
                  setShowCompanionPicker(false);
                  speakGuide(c.catchphrase, c.cry, c.id, null);
                },
                className: \`p-3 rounded-2xl border-3 flex flex-col items-center gap-1 transition-all \${
                  companion.id === c.id ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400' : 'bg-slate-50 border-slate-200 hover:bg-amber-50'
                }\`
              },
                h('span', { className: 'text-4xl' }, c.emoji),
                h('span', { className: 'font-black text-sm' }, c.name),
                h('span', { className: 'text-[11px] font-bold text-amber-700' }, \`[\${c.cry}]\`),
                h('span', { className: 'text-[10px] text-slate-500' }, c.title)
              ))
            )
          )
        ),

        // Raid Modal
        isRaidOpen && h('div', { className: 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4' },
          h('div', { className: 'bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 max-w-md w-full border-4 border-amber-400 shadow-2xl text-center' },
            h('div', { className: 'text-4xl mb-2' }, '⚔️'),
            h('h3', { className: 'text-2xl font-black text-amber-300 mb-1' }, 'Êrîşa Dostane li ser Gundê Cîran!'),
            h('p', { className: 'text-xs text-purple-200 mb-6 font-semibold' }, 'Ji bo dîtina xezîneya zêran li ser sindoqekê pêl bike:'),
            h('div', { className: 'grid grid-cols-3 gap-3 my-4' },
              [0, 1, 2].map(idx => {
                const isO = selectedChest === idx;
                const rewards = [1500, 2500, 1000];
                return h('button', {
                  key: idx,
                  onClick: () => handlePickChest(idx),
                  disabled: selectedChest !== null,
                  className: \`p-4 rounded-2xl border-3 flex flex-col items-center justify-center gap-2 transition-all transform active:scale-95 \${
                    isO ? 'bg-amber-400 border-yellow-200 scale-110 shadow-2xl text-amber-950 font-black' : 'bg-purple-800/80 hover:bg-purple-700 border-purple-400'
                  }\`
                },
                  h('span', { className: 'text-4xl' }, isO ? '💎' : '🎁'),
                  h('span', { className: 'text-xs font-black' }, isO ? \`+\${rewards[idx]} 🪙\` : 'Veke')
                );
              })
            ),
            selectedChest !== null && h('div', { className: 'mt-4 bg-amber-400/20 text-amber-300 p-2 rounded-xl text-sm font-bold border border-amber-400/40' }, 'Te xezîne dît! 🪙')
          )
        ),

        // Footer
        h('footer', { className: 'bg-amber-900 text-amber-200 py-3 text-center text-xs mt-8' },
          h('p', { className: 'font-bold' }, 'Gundé me © 2026 — Lîstika Zimanê Kurdî bi Tîpên Latînî ji bo Zarokan'),
          h('p', { className: 'opacity-75 text-[11px]' }, 'Hemû peyv û tîp bi alfabeya latînî ya Hawarê hatine nivîsandin.')
        )
      );
    }`;

// Replace from "// --- MAIN REACT COMPONENT ---" until "ReactDOM.render(h(App)"
const markerStart = '    // --- MAIN REACT COMPONENT ---';
const markerEnd = "ReactDOM.render(h(App), document.getElementById('root'));";

const startIdx = content.indexOf(markerStart);
const endIdx = content.indexOf(markerEnd);

if (startIdx === -1 || endIdx === -1) {
  console.error('FAIL: Markers not found in standalone.html');
  process.exit(1);
}

const newContent = content.substring(0, startIdx) + appCode + '\\n\\n' + content.substring(endIdx);
fs.writeFileSync(standalonePath, newContent, 'utf8');
console.log('SUCCESS: standalone.html successfully updated with Cartoon Series and Hawar Alphabet!');
