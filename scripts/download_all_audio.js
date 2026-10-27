import fs from 'node:fs';
import path from 'node:path';

const BASE_DIR = 'C:\\Users\\azadz\\.gemini\\antigravity\\scratch\\gunde-me';
const PUBLIC_AUDIO = path.join(BASE_DIR, 'public', 'audio');
const ANDROID_AUDIO = path.join(BASE_DIR, 'android', 'app', 'src', 'main', 'assets', 'audio');

fs.mkdirSync(path.join(PUBLIC_AUDIO, 'animals'), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_AUDIO, 'words'), { recursive: true });
fs.mkdirSync(path.join(ANDROID_AUDIO, 'animals'), { recursive: true });
fs.mkdirSync(path.join(ANDROID_AUDIO, 'words'), { recursive: true });

const SOUNDS = {
  // Real Animal Acoustic Calls
  "animals/ser.ogg": "https://upload.wikimedia.org/wikipedia/commons/7/77/Lion_raring-sound1TamilNadu178.ogg",
  "animals/hesp.ogg": "https://upload.wikimedia.org/wikipedia/commons/d/db/Wiehern.ogg",
  "animals/pisik.wav": "https://upload.wikimedia.org/wikipedia/commons/8/81/Meow_of_a_Siamese_cat_-_freemaster2.wav",
  "animals/kucik.ogg": "https://upload.wikimedia.org/wikipedia/commons/5/58/Barking_of_a_dog_2.ogg",
  "animals/cucik.mp3": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Bird_chirp_2_%28Gravity_Sound%29.mp3",
  "animals/gur.ogg": "https://upload.wikimedia.org/wikipedia/commons/8/87/Wolf_howls.ogg",
  "animals/dik.ogg": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Rooster_crowing.ogg",
  "animals/ker.wav": "https://upload.wikimedia.org/wikipedia/commons/2/25/157763_felix-blume_a-donkey-is-braying-in-his-enclosure-in-south-of-france.wav",

  // Real Native Kurdish Speaker Pronunciation (Lingua Libre Kurmanji)
  "words/ser.wav": "https://upload.wikimedia.org/wikipedia/commons/1/17/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-%C5%9F%C3%AAr.wav",
  "words/gur.wav": "https://upload.wikimedia.org/wikipedia/commons/4/41/LL-Q36163_%28kmr%29-Key_M%C3%AErza-gur.wav",
  "words/hesp.wav": "https://upload.wikimedia.org/wikipedia/commons/3/38/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-hesp.wav",
  "words/pisik.wav": "https://upload.wikimedia.org/wikipedia/commons/9/95/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-pis%C3%AEk.wav",
  "words/kucik.wav": "https://upload.wikimedia.org/wikipedia/commons/e/e7/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-k%C3%BB%C3%A7ik.wav",
  "words/cucik.wav": "https://upload.wikimedia.org/wikipedia/commons/8/86/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-%C3%A7%C3%BB%C3%A7ik.wav",
  "words/dik.wav": "https://upload.wikimedia.org/wikipedia/commons/3/36/LL-Q36368_%28kur%29-Dildadil-d%C3%AEk.wav",
  "words/ker.wav": "https://upload.wikimedia.org/wikipedia/commons/c/c5/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-ker_%28Navd%C3%AAr_3%29.wav",
  "words/berx.wav": "https://upload.wikimedia.org/wikipedia/commons/4/4e/LL-Q36368_%28kur%29-Dildadil-berx.wav",
  "words/pez.wav": "https://upload.wikimedia.org/wikipedia/commons/f/f6/LL-Q36163_%28kmr%29-Key_M%C3%AErza-paz.wav",
  "words/celek.wav": "https://upload.wikimedia.org/wikipedia/commons/d/dd/LL-Q36368_%28kur%29-Dildadil-%C3%A7%C3%AAlek.wav",
  "words/rovi.wav": "https://upload.wikimedia.org/wikipedia/commons/2/24/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-rov%C3%AE.wav",
  "words/teyr.wav": "https://upload.wikimedia.org/wikipedia/commons/e/e9/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-teyr.wav",
  "words/masi.wav": "https://upload.wikimedia.org/wikipedia/commons/1/1c/LL-Q36163_%28kmr%29-Key_M%C3%AErza-mas%C3%AE.wav",
  "words/bizin.wav": "https://upload.wikimedia.org/wikipedia/commons/3/36/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-bizin.wav",
  "words/kew.wav": "https://upload.wikimedia.org/wikipedia/commons/d/d8/LL-Q36163_%28kmr%29-Key_M%C3%AErza-kew.wav",
  "words/mirisk.wav": "https://upload.wikimedia.org/wikipedia/commons/f/ff/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-mir%C3%AE%C5%9Fk.wav",
  "words/piling.wav": "https://upload.wikimedia.org/wikipedia/commons/0/0f/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-piling.wav",
  "words/fil.wav": "https://upload.wikimedia.org/wikipedia/commons/d/d0/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-f%C3%AEl.wav",
  "words/kevok.wav": "https://upload.wikimedia.org/wikipedia/commons/0/09/LL-Q36163_%28kmr%29-Key_M%C3%AErza-kevok.wav",
  "words/bivir.wav": "https://upload.wikimedia.org/wikipedia/commons/4/47/LL-Q36163_%28kmr%29-Key_M%C3%AErza-bivir.wav",
  "words/das.wav": "https://upload.wikimedia.org/wikipedia/commons/4/49/LL-Q36163_%28kmr%29-Key_M%C3%AErza-das.wav",
  "words/cakuc.wav": "https://upload.wikimedia.org/wikipedia/commons/f/fd/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-%C3%A7ak%C3%BB%C3%A7.wav",
  "words/sur.wav": "https://upload.wikimedia.org/wikipedia/commons/8/8c/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-%C5%9F%C3%BBr.wav",
  "words/xani.wav": "https://upload.wikimedia.org/wikipedia/commons/2/22/LL-Q36163_%28kmr%29-Key_M%C3%AErza-xan%C3%AE.wav",
  "words/dibistan.wav": "https://upload.wikimedia.org/wikipedia/commons/f/f8/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-dibistan.wav",
  "words/baxce.wav": "https://upload.wikimedia.org/wikipedia/commons/c/c7/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-bax%C3%A7e.wav",
  "words/pir.wav": "https://upload.wikimedia.org/wikipedia/commons/c/c3/LL-Q36163_%28kmr%29-Key_M%C3%AErza-pir.wav",
  "words/kani.wav": "https://upload.wikimedia.org/wikipedia/commons/9/95/LL-Q36163_%28kmr%29-Keyomerd-kan%C3%AE.wav",
  "words/bazar.wav": "https://upload.wikimedia.org/wikipedia/commons/e/e2/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-bazar_kirin.wav",
  "words/dirav.wav": "https://upload.wikimedia.org/wikipedia/commons/9/91/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-dirav.wav",
  "words/hez.wav": "https://upload.wikimedia.org/wikipedia/commons/1/15/LL-Q36163_%28kmr%29-Key_M%C3%AErza-h%C3%AAz.wav",
  "words/roj.wav": "https://upload.wikimedia.org/wikipedia/commons/f/f7/LL-Q36163_%28kmr%29-Ebulf%C3%AEda-roj.wav",
  "words/aferin.wav": "https://upload.wikimedia.org/wikipedia/commons/8/84/LL-Q36163_%28kmr%29-Key_M%C3%AErza-%27afer%C3%AEn.wav"
};

async function downloadFile(relPath, url, retry = 0) {
  const destPublic = path.join(PUBLIC_AUDIO, relPath);
  const destAndroid = path.join(ANDROID_AUDIO, relPath);

  if (fs.existsSync(destPublic) && fs.statSync(destPublic).size > 1000) {
    console.log(`[SKIP] Already downloaded: ${relPath}`);
    if (!fs.existsSync(destAndroid)) {
      fs.copyFileSync(destPublic, destAndroid);
    }
    return;
  }

  console.log(`[DOWNLOADING] ${relPath}...`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'GundeMeApp/1.0 (https://gunde.me; info@gunde.me) NodeFetch'
      }
    });

    if (res.status === 429 && retry < 3) {
      console.log(`Rate limited on ${relPath}, waiting 4s (retry ${retry + 1})...`);
      await new Promise(r => setTimeout(r, 4000));
      return downloadFile(relPath, url, retry + 1);
    }

    if (!res.ok) {
      console.error(`Failed ${relPath}: HTTP ${res.status}`);
      return;
    }

    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPublic, buf);
    fs.writeFileSync(destAndroid, buf);
    console.log(`✓ Saved ${relPath} (${buf.length} bytes)`);
  } catch (err) {
    console.error(`Error downloading ${relPath}:`, err.message);
  }
}

async function run() {
  console.log(`Starting download of ${Object.keys(SOUNDS).length} audio assets...`);
  for (const [relPath, url] of Object.entries(SOUNDS)) {
    await downloadFile(relPath, url);
    await new Promise(r => setTimeout(r, 1200)); // Respectful 1.2s delay
  }

  // Also save a manifest for the game to use
  const manifest = {};
  for (const [relPath, url] of Object.entries(SOUNDS)) {
    const key = relPath.replace(/\.(ogg|wav|mp3)$/, '').replace('/', '_');
    manifest[key] = {
      local: `audio/${relPath}`,
      remote: url
    };
  }
  fs.writeFileSync(path.join(BASE_DIR, 'src', 'content', 'audio_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Manifest generated at src/content/audio_manifest.json');
}

run();
