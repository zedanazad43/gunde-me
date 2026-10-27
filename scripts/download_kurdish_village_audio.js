import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const FILES = [
  { id: 'nan', file: 'LL-Q36163_(kmr)-Ebulfîda-nan.wav' },
  { id: 'av', file: 'LL-Q36163_(kmr)-Ebulfîda-av.wav' },
  { id: 'sev', file: 'LL-Q36163_(kmr)-Ebulfîda-sêv.wav' },
  { id: 'hinar', file: 'LL-Q36163_(kmr)-Ebulfîda-hinar.wav' },
  { id: 'dayik', file: 'LL-Q36163_(kmr)-Key_Mîrza-dayik.wav' },
  { id: 'bav', file: 'LL-Q36163_(kmr)-Key_Mîrza-bav.wav' },
  { id: 'genim', file: 'LL-Q36163_(kmr)-Ebulfîda-genim.wav' },
  { id: 'agir', file: 'LL-Q36163_(kmr)-Keyomerd-agir.wav' },
  { id: 'sir', file: 'LL-Q36163_(kmr)-Ebulfîda-şîr.wav' },
  { id: 'cirok', file: 'LL-Q36368_(kur)-Dildadil-çîrok.wav' },
  { id: 'guz', file: 'LL-Q36163_(kmr)-Ebulfîda-gûz.wav' }
];

function getWikimediaUrl(fileName) {
  // Replace spaces with underscores
  const clean = fileName.replace(/ /g, '_');
  const hash = crypto.createHash('md5').update(clean, 'utf8').digest('hex');
  const a = hash.substring(0, 1);
  const ab = hash.substring(0, 2);
  return `https://upload.wikimedia.org/wikipedia/commons/${a}/${ab}/${encodeURIComponent(clean)}`;
}

const targets = [
  path.join(process.cwd(), 'audio', 'words'),
  path.join(process.cwd(), 'public', 'audio', 'words'),
  path.join(process.cwd(), 'android', 'app', 'src', 'main', 'assets', 'audio', 'words')
];

targets.forEach(t => fs.mkdirSync(t, { recursive: true }));

async function downloadOne(item) {
  const url = getWikimediaUrl(item.file);
  console.log(`Downloading ${item.id} from ${url}...`);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'GundeMe/2.0 (education game)' } });
    if (!res.ok) {
      console.error(`HTTP error ${res.status} for ${item.id}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    for (const t of targets) {
      fs.writeFileSync(path.join(t, `${item.id}.wav`), buf);
    }
    console.log(`✓ Saved ${item.id}.wav (${buf.length} bytes) to all 3 audio directories!`);
    return true;
  } catch (err) {
    console.error(`Error downloading ${item.id}:`, err.message);
    return false;
  }
}

async function run() {
  for (const item of FILES) {
    await downloadOne(item);
    await new Promise(r => setTimeout(r, 1200));
  }
  console.log('Finished downloading all Kurdish village audio files!');
}

run();
