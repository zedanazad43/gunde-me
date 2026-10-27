import fs from 'node:fs';
import path from 'node:path';

const BASE_DIR = 'C:\\Users\\azadz\\.gemini\\antigravity\\scratch\\gunde-me';
const PUBLIC_AUDIO = path.join(BASE_DIR, 'public', 'audio');
const ANDROID_AUDIO = path.join(BASE_DIR, 'android', 'app', 'src', 'main', 'assets', 'audio');

async function download(title, destRel) {
  const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
  const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': 'GundeMeApp/1.0' } });
  const info = await infoRes.json();
  const page = Object.values(info.query?.pages || {})[0];
  const url = page?.imageinfo?.[0]?.url;

  if (!url) {
    console.error(`URL not found for ${title}`);
    return;
  }

  console.log(`Downloading ${title} -> ${destRel}...`);
  const res = await fetch(url, { headers: { 'User-Agent': 'GundeMeApp/1.0' } });
  if (!res.ok) {
    console.error(`Download failed: ${res.status}`);
    return;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(PUBLIC_AUDIO, destRel), buf);
  fs.writeFileSync(path.join(ANDROID_AUDIO, destRel), buf);
  console.log(`✓ Saved ${destRel} (${buf.length} bytes)`);
}

async function run() {
  await download('File:Lion raring-sound1TamilNadu178.ogg', 'animals/ser.ogg');
  await download('File:LL-Q36368 (kur)-Dildadil-dîk.wav', 'words/dik.wav');
  await download('File:LL-Q36368 (kur)-Dildadil-berx.wav', 'words/berx.wav');
  await download('File:LL-Q36163 (kmr)-Key Mîrza-paz.wav', 'words/pez.wav');
  console.log('Finished remaining audio downloads!');
}

run();
