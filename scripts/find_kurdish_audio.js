import fs from 'node:fs';

const WORDS = [
  'şêr', 'gur', 'hesp', 'rovî', 'kêvrûşk', 'çêlek', 'berx', 'pez', 'pisîk', 'kûçik',
  'teyr', 'masî', 'hirç', 'bizin', 'kew', 'mirîşk', 'legleg', 'çûçik', 'kûsî', 'mêşhingiv',
  'piling', 'fîl', 'kevok', 'dîk', 'ker',
  'bivir', 'bêl', 'das', 'çakûç', 'satil', 'meqes', 'kevan', 'zîncîr', 'şûr', 'tûr',
  'xanî', 'aş', 'dibistan', 'baxçe', 'pir', 'kanî', 'bazar',
  'dirav', 'hêz', 'mertal', 'roj', 'ast', 'aferîn'
];

async function searchWord(word) {
  const query = `LL-Q36163 (kmr) ${word}`;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'GundeMeAudioBuilder/1.0 (contact@gunde.me)' } });
    const data = await res.json();
    const results = data.query?.search || [];
    
    // Find best match
    const exact = results.find(r => {
      const titleLower = r.title.toLowerCase();
      return titleLower.endsWith(`-${word.toLowerCase()}.wav`) || titleLower.endsWith(`-${word.toLowerCase()}.ogg`);
    }) || results[0];

    if (exact) {
      // Get direct URL
      const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(exact.title)}&prop=imageinfo&iiprop=url&format=json`;
      const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': 'GundeMeAudioBuilder/1.0 (contact@gunde.me)' } });
      const infoData = await infoRes.json();
      const pages = infoData.query?.pages || {};
      const firstPage = Object.values(pages)[0];
      const audioUrl = firstPage?.imageinfo?.[0]?.url;
      return { word, title: exact.title, url: audioUrl };
    }
  } catch (e) {
    console.error(`Error searching ${word}:`, e.message);
  }
  return { word, found: false };
}

async function run() {
  console.log(`Searching audio for ${WORDS.length} Kurdish words...`);
  const found = {};
  for (const w of WORDS) {
    const r = await searchWord(w);
    if (r && r.url) {
      found[w] = r.url;
      console.log(`✓ Found: ${w} -> ${r.title}`);
    } else {
      console.log(`✗ Missing: ${w}`);
    }
  }
  fs.writeFileSync('kurdish_audio_urls.json', JSON.stringify(found, null, 2));
  console.log(`Saved ${Object.keys(found).length} found audio URLs to kurdish_audio_urls.json`);
}

run();
