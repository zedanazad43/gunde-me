import fs from 'node:fs';

const ANIMALS = [
  { id: 'ser', queries: ['lion roar', 'panthera leo roar'] },
  { id: 'hesp', queries: ['horse whinny', 'horse neigh', 'neighing'] },
  { id: 'pisik', queries: ['cat meow', 'felis catus meowing', 'kitten meow'] },
  { id: 'kucik', queries: ['dog barking', 'dog bark', 'canis lupus familiaris'] },
  { id: 'cucik', queries: ['bird singing', 'bird chirp', 'birdsong'] },
  { id: 'gur', queries: ['wolf howl', 'howling wolf', 'canis lupus howl'] },
  { id: 'dik', queries: ['rooster crow', 'cock-a-doodle-doo', 'rooster crowing'] },
  { id: 'ker', queries: ['donkey bray', 'donkey braying', 'asinus'] }
];

async function findSound(animal) {
  for (const q of animal.queries) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&format=json`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'GundeMeApp/1.0 (contact@gunde.me)' } });
      const data = await res.json();
      const results = (data.query?.search || []).filter(r => {
        const t = r.title.toLowerCase();
        return t.endsWith('.ogg') || t.endsWith('.wav') || t.endsWith('.mp3');
      });

      if (results.length > 0) {
        const top = results[0];
        const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(top.title)}&prop=imageinfo&iiprop=url&format=json`;
        const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': 'GundeMeApp/1.0 (contact@gunde.me)' } });
        const infoData = await infoRes.json();
        const pages = infoData.query?.pages || {};
        const firstPage = Object.values(pages)[0];
        const audioUrl = firstPage?.imageinfo?.[0]?.url;
        if (audioUrl) {
          return { id: animal.id, title: top.title, url: audioUrl };
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  return null;
}

async function run() {
  console.log('Searching animal audio...');
  const sounds = {};
  for (const a of ANIMALS) {
    const found = await findSound(a);
    if (found) {
      sounds[a.id] = found;
      console.log(`✓ ${a.id}: ${found.title} -> ${found.url}`);
    } else {
      console.log(`✗ ${a.id}: not found`);
    }
  }
  fs.writeFileSync('C:\\Users\\azadz\\.gemini\\antigravity\\scratch\\gunde-me\\animal_sounds.json', JSON.stringify(sounds, null, 2));
  console.log('Done!');
}

run();
