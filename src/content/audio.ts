// Advanced Procedural Animal Acoustic Synthesizer & Speech Engine
// Generates authentic animal calls (Roar, Neigh, Meow, Bark, Chirp, Howl, Crow, Bray)
// and handles crystal-clear Kurdish pronunciation with companion personality pitch

export class AnimalAcousticSynthesizer {
  private ctx: AudioContext | null = null;

  private getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // 1. Şêr (Lion Roar - Zêrîna Şêr)
  playLionRoar() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.4);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 1.1);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(280, ctx.currentTime);
    filter.Q.setValueAtTime(4.0, ctx.currentTime);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.25);
  }

  // 2. Hesp (Horse Neigh - Hehîna Hespê)
  playHorseNeigh() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const vibrato = ctx.createOscillator();
    const vibGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(1250, ctx.currentTime + 0.25);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.9);

    // Fast flutter vibrato for whinny
    vibrato.frequency.setValueAtTime(18, ctx.currentTime);
    vibGain.gain.setValueAtTime(90, ctx.currentTime);
    vibrato.connect(osc.frequency);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.95);

    osc.connect(gain);
    gain.connect(ctx.destination);

    vibrato.start(ctx.currentTime);
    osc.start(ctx.currentTime);
    vibrato.stop(ctx.currentTime + 1.0);
    osc.stop(ctx.currentTime + 1.0);
  }

  // 3. Pisîk (Cat Meow - Miyawa Pisîkê)
  playCatMeow() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    // Glide /m/ -> /i/ -> /a/ -> /u/
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.2);
    osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.7);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(2200, ctx.currentTime + 0.25);
    filter.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.7);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  }

  // 4. Kûçik (Dog Bark - Ew-ewa Kûçik)
  playDogBark() {
    const ctx = this.getCtx();
    if (!ctx) return;
    [0, 0.22].forEach(delay => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + delay + 0.14);

      gain.gain.setValueAtTime(0.01, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.17);
    });
  }

  // 5. Çûçik (Bird Chirp - Cîk-cîka Çûçikê)
  playBirdChirp() {
    const ctx = this.getCtx();
    if (!ctx) return;
    [0, 0.12, 0.24].forEach((delay, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 2600 + idx * 300;
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 900, ctx.currentTime + delay + 0.04);
      osc.frequency.exponentialRampToValueAtTime(baseFreq - 200, ctx.currentTime + delay + 0.09);

      gain.gain.setValueAtTime(0.01, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.1);
    });
  }

  // 6. Gur (Wolf Howl - Qîrîna Gur)
  playWolfHowl() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.4);
    osc.frequency.linearRampToValueAtTime(690, ctx.currentTime + 0.9);
    osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 1.4);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.55);
  }

  // 7. Dîk (Rooster Crow - Qoqorîqo)
  playRoosterCrow() {
    const ctx = this.getCtx();
    if (!ctx) return;
    const notes = [
      { f: 550, d: 0.15 },
      { f: 650, d: 0.15 },
      { f: 620, d: 0.15 },
      { f: 880, d: 0.55 }
    ];
    let curTime = 0;
    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, ctx.currentTime + curTime);

      gain.gain.setValueAtTime(0.01, ctx.currentTime + curTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + curTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + curTime + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + curTime);
      osc.stop(ctx.currentTime + curTime + n.d + 0.05);
      curTime += n.d + 0.03;
    });
  }

  // 8. Ker (Donkey Bray - Zirina Kerê)
  playDonkeyBray() {
    const ctx = this.getCtx();
    if (!ctx) return;
    [0, 0.35].forEach((delay, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const f1 = i === 0 ? 680 : 380;
      const f2 = i === 0 ? 420 : 640;
      osc.frequency.setValueAtTime(f1, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(f2, ctx.currentTime + delay + 0.3);

      gain.gain.setValueAtTime(0.01, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.33);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.35);
    });
  }

  // Dispatcher by animal ID
  playAnimalSound(animalId: string) {
    switch (animalId) {
      case 'ser': this.playLionRoar(); break;
      case 'hesp': this.playHorseNeigh(); break;
      case 'pisik': this.playCatMeow(); break;
      case 'kucik': this.playDogBark(); break;
      case 'cucik': this.playBirdChirp(); break;
      case 'gur': this.playWolfHowl(); break;
      case 'dik': this.playRoosterCrow(); break;
      case 'ker': this.playDonkeyBray(); break;
      default: this.playCatMeow(); break;
    }
  }

  // 9. Hammer strike (Çakûç) - Metallic resonant ring
  playHammer() {
    const ctx = this.getCtx(); if (!ctx) return;
    const osc = ctx.createOscillator(), osc2 = ctx.createOscillator(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
    osc.type = 'triangle'; osc.frequency.setValueAtTime(1150, ctx.currentTime);
    osc2.type = 'sine'; osc2.frequency.setValueAtTime(2800, ctx.currentTime);
    filter.type = 'bandpass'; filter.frequency.setValueAtTime(1200, ctx.currentTime); filter.Q.setValueAtTime(12);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(filter); osc2.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    osc.start(ctx.currentTime); osc2.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4); osc2.stop(ctx.currentTime + 0.4);
  }

  // 10. Rabbit hop / thump (Kêvrûşk)
  playRabbit() {
    const ctx = this.getCtx(); if (!ctx) return;
    [0, 0.16].forEach(d => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(110, ctx.currentTime + d);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + d + 0.09);
      gain.gain.setValueAtTime(0.01, ctx.currentTime + d);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + d + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + d); osc.stop(ctx.currentTime + d + 0.11);
    });
  }

  // 11. Axe wood chop (Bivir)
  playAxe() {
    const ctx = this.getCtx(); if (!ctx) return;
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'triangle'; osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.22);
  }

  // 12. Sickle wheat cutting swoosh (Das)
  playSickle() {
    const ctx = this.getCtx(); if (!ctx) return;
    const osc = ctx.createOscillator(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(1300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.28);
    filter.type = 'bandpass'; filter.frequency.setValueAtTime(900, ctx.currentTime); filter.Q.setValueAtTime(5);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.32);
  }

  // 13. Dough kneading / slapping (Hevîr)
  playDough() {
    const ctx = this.getCtx(); if (!ctx) return;
    [0, 0.14].forEach(d => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = 'triangle'; osc.frequency.setValueAtTime(140, ctx.currentTime + d);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + d + 0.08);
      gain.gain.setValueAtTime(0.01, ctx.currentTime + d);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + d + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + d); osc.stop(ctx.currentTime + d + 0.11);
    });
  }

  // 14. Wood fire & crackle (Tendûr & Agir)
  playFire() {
    const ctx = this.getCtx(); if (!ctx) return;
    [0, 0.08, 0.17, 0.26].forEach((d, i) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(900 + (i % 2) * 500, ctx.currentTime + d);
      gain.gain.setValueAtTime(0.01, ctx.currentTime + d);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + d + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.06);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + d); osc.stop(ctx.currentTime + d + 0.07);
    });
  }

  // 15. Water stream & spring splash (Kaniya Avê)
  playWaterStream() {
    const ctx = this.getCtx(); if (!ctx) return;
    [0, 0.07, 0.14, 0.21, 0.28].forEach((d, i) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(650 + (i * 70), ctx.currentTime + d);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + d + 0.05);
      gain.gain.setValueAtTime(0.01, ctx.currentTime + d);
      gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + d + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.07);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + d); osc.stop(ctx.currentTime + d + 0.08);
    });
  }

  // 16. Milking stream & bucket (Dotina Çêlekê)
  playMilkStream() {
    const ctx = this.getCtx(); if (!ctx) return;
    [0, 0.18].forEach(d => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = 'triangle'; osc.frequency.setValueAtTime(1600, ctx.currentTime + d);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + d + 0.12);
      gain.gain.setValueAtTime(0.01, ctx.currentTime + d);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + d + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.14);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + d); osc.stop(ctx.currentTime + d + 0.15);
    });
  }

  // 17. Fruit crunch (Sêv, Hinar)
  playFruitCrunch() {
    const ctx = this.getCtx(); if (!ctx) return;
    [0, 0.04, 0.08].forEach(d => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(1800, ctx.currentTime + d);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + d + 0.05);
      gain.gain.setValueAtTime(0.01, ctx.currentTime + d);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + d + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.06);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + d); osc.stop(ctx.currentTime + d + 0.07);
    });
  }

  // 18. Nut crack (Gûz, Berû)
  playNutCrack() {
    const ctx = this.getCtx(); if (!ctx) return;
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'square'; osc.frequency.setValueAtTime(750, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.1);
  }

  // 19. Fast running / footsteps on earth (Bazdan / Bez)
  playRunning() {
    const ctx = this.getCtx(); if (!ctx) return;
    [0, 0.12, 0.24, 0.36].forEach(d => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(95, ctx.currentTime + d);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + d + 0.06);
      gain.gain.setValueAtTime(0.01, ctx.currentTime + d);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + d + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.07);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + d); osc.stop(ctx.currentTime + d + 0.08);
    });
  }

  // Dispatcher for any contextual SFX
  playSFX(sfx: string) {
    switch (sfx) {
      case 'hammer': this.playHammer(); break;
      case 'rabbit': this.playRabbit(); break;
      case 'axe': this.playAxe(); break;
      case 'sickle': this.playSickle(); break;
      case 'dough': this.playDough(); break;
      case 'fire': this.playFire(); break;
      case 'water': this.playWaterStream(); break;
      case 'milk': this.playMilkStream(); break;
      case 'fruit': this.playFruitCrunch(); break;
      case 'nut': this.playNutCrack(); break;
      case 'running': this.playRunning(); break;
      case 'plow': this.playRunning(); break;
      case 'chickens': this.playBirdChirp(); break;
      default: break;
    }
  }
}

export const animalSynth = new AnimalAcousticSynthesizer();

export const AUDIO_FILES = {
  animals: {
    ser: 'audio/animals/ser.ogg',
    hesp: 'audio/animals/hesp.ogg',
    pisik: 'audio/animals/pisik.wav',
    kucik: 'audio/animals/kucik.ogg',
    cucik: 'audio/animals/cucik.mp3',
    gur: 'audio/animals/gur.ogg',
    dik: 'audio/animals/dik.ogg',
    ker: 'audio/animals/ker.wav'
  } as Record<string, string>,
  words: {
    ser: 'audio/words/ser.wav',
    gur: 'audio/words/gur.wav',
    hesp: 'audio/words/hesp.wav',
    pisik: 'audio/words/pisik.wav',
    kucik: 'audio/words/kucik.wav',
    cucik: 'audio/words/cucik.wav',
    dik: 'audio/words/dik.wav',
    ker: 'audio/words/ker.wav',
    berx: 'audio/words/berx.wav',
    pez: 'audio/words/pez.wav',
    celek: 'audio/words/celek.wav',
    rovi: 'audio/words/rovi.wav',
    teyr: 'audio/words/teyr.wav',
    masi: 'audio/words/masi.wav',
    bizin: 'audio/words/bizin.wav',
    kew: 'audio/words/kew.wav',
    mirisk: 'audio/words/mirisk.wav',
    piling: 'audio/words/piling.wav',
    fil: 'audio/words/fil.wav',
    kevok: 'audio/words/kevok.wav',
    bivir: 'audio/words/bivir.wav',
    das: 'audio/words/das.wav',
    cakuc: 'audio/words/cakuc.wav',
    sur: 'audio/words/sur.wav',
    xani: 'audio/words/xani.wav',
    dibistan: 'audio/words/dibistan.wav',
    baxce: 'audio/words/baxce.wav',
    pir: 'audio/words/pir.wav',
    kani: 'audio/words/kani.wav',
    bazar: 'audio/words/bazar.wav',
    dirav: 'audio/words/dirav.wav',
    hez: 'audio/words/hez.wav',
    roj: 'audio/words/roj.wav',
    aferin: 'audio/words/aferin.wav',
    nan: 'audio/words/nan.wav',
    av: 'audio/words/av.wav',
    sev: 'audio/words/sev.wav',
    hinar: 'audio/words/hinar.wav',
    dayik: 'audio/words/dayik.wav',
    bav: 'audio/words/bav.wav',
    genim: 'audio/words/genim.wav',
    agir: 'audio/words/agir.wav',
    sir: 'audio/words/sir.wav',
    cirok: 'audio/words/cirok.wav'
  } as Record<string, string>
};

class KurdishAudioService {
  private ctx: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private onSpeakingCallback: ((text: string, isSpeaking: boolean) => void) | null = null;

  public setSpeakingListener(cb: (text: string, isSpeaking: boolean) => void) {
    this.onSpeakingCallback = cb;
  }

  public stopAudio() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {}
      this.currentAudio = null;
    }
  }

  playSFX(sfx: string) {
    animalSynth.playSFX(sfx);
  }

  playAudio(src: string, onEnd?: () => void) {
    try {
      this.stopAudio();
      const a = new Audio(src);
      this.currentAudio = a;
      const finish = () => {
        if (this.currentAudio === a) this.currentAudio = null;
        if (onEnd) onEnd();
      };
      a.onended = finish;
      a.onerror = finish;
      const p = a.play();
      if (p && p.catch) p.catch(() => finish());
      return a;
    } catch {
      if (onEnd) onEnd();
    }
  }

  playAnimal(id: string, onEnd?: () => void) {
    const src = AUDIO_FILES.animals[id];
    if (src) return this.playAudio(src, onEnd);
    if (onEnd) onEnd();
  }

  playWord(id: string, onEnd?: () => void) {
    const src = AUDIO_FILES.words[id];
    if (src) return this.playAudio(src, onEnd);
    if (onEnd) onEnd();
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playTone(freq: number, type: OscillatorType, duration: number, delay = 0) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.2, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch {
      // AudioContext blocked until interaction
    }
  }

  playSpinTick() {
    this.playTone(600 + Math.random() * 200, 'triangle', 0.05);
  }

  playCoinSound() {
    this.playTone(987.77, 'sine', 0.1, 0);
    this.playTone(1318.51, 'sine', 0.25, 0.08);
  }

  playCelebrationSound() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.25, idx * 0.1);
    });
  }

  playSuccessChime() {
    this.playTone(659.25, 'triangle', 0.15, 0);
    this.playTone(880.00, 'triangle', 0.35, 0.12);
  }

  playErrorSound() {
    this.playTone(220, 'sawtooth', 0.2, 0);
    this.playTone(196, 'sawtooth', 0.3, 0.15);
  }

  speakCompanion(
    text: string,
    _companion?: { id: string; voicePitch?: number; voiceRate?: number },
    wordId?: string
  ) {
    this.speakKurdishWord(text, undefined, wordId);
  }

  speakKurdishWord(text: string, _phonetic?: string, wordId?: string) {
    if (this.onSpeakingCallback) {
      this.onSpeakingCallback(text, true);
    }

    if (wordId && AUDIO_FILES.words[wordId]) {
      this.playWord(wordId, () => {
        if (this.onSpeakingCallback) this.onSpeakingCallback(text, false);
      });
    } else {
      // Play a soft melodic speech chime for educational reading and end speaking state
      this.playTone(520, 'triangle', 0.12, 0);
      this.playTone(659.25, 'sine', 0.18, 0.08);
      setTimeout(() => {
        if (this.onSpeakingCallback) this.onSpeakingCallback(text, false);
      }, 1200);
    }
  }
}

export const audioService = new KurdishAudioService();
