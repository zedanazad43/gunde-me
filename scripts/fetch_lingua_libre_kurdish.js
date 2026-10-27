import fs from 'fs';
import path from 'path';

const wordsToFind = [
  'nan', 'av', 'sêv', 'hinar', 'tîrî', 'gûz', 'genim', 'agir', 'şîr',
  'bihar', 'havîn', 'payîz', 'zivistan', 'dayik', 'bav', 'dengbêj',
  'çîrok', 'sobe', 'çay', 'bastêq', 'mewîj', 'kenger', 'rîvas', 'zozan',
  'govend', 'tembûr', 'def', 'zurna', 'mertal'
];

async function getCommonsUrl(word) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=incategory:Lingua_Libre_pronunciation-kmr+${encodeURIComponent(word)}&srnamespace=6&format=json`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': 'GundeMeBot/2.0' } });
    const data = await res.json();
    const hits = data.query?.search || [];
    const exact = hits.find(h => h.title.toLowerCase().includes(`-${word.toLowerCase()}.wav`) || h.title.toLowerCase().includes(`-${word.toLowerCase()}.ogg`)) || hits[0];
    if (!exact) return null;

    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(exact.title)}&prop=imageinfo&iiprop=url&format=json`;
    const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': 'GundeMeBot/2.0' } });
    const infoData = await infoRes.json();
    const p = Object.values(infoData.query?.pages || {})[0];
    return { title: exact.title, url: p?.imageinfo?.[0]?.url };
  } catch (e) {
    return null;
  }
}

async function run() {
  console.log('Searching Wikimedia Commons for authentic Kurdish words...');
  const results = {};
  for (const w of wordsToFind) {
    const res = await getCommonsUrl(w);
    if (res && res.url) {
      console.log(`FOUND: ${w} -> ${res.title}`);
      results[w] = res.url;
    } else {
      console.log(`NOT_FOUND: ${w}`);
    }
    // polite throttle
    await new Promise(r => setTimeout(r, 600));
  }
  fs.writeFileSync('kurdish_new_words.json', JSON.stringify(results, null, 2));
  console.log(`Saved ${Object.keys(results).length} words to kurdish_new_words.json`);
}

run();
