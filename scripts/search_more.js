import fs from 'fs';

async function searchGeneral() {
  const words = ['dayik', 'bav', 'genim', 'agir', 'şîr', 'dengbêj', 'çîrok', 'gûz', 'tîrî', 'bihar', 'havîn', 'payîz', 'zivistan', 'sobe', 'çay'];
  for (const w of words) {
    const q = `LL-Q36163 ${w}`;
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&format=json`;
    const r = await (await fetch(url, { headers: { 'User-Agent': 'GundeMe/2.0' } })).json();
    const hits = r.query?.search || [];
    if (hits.length) {
      console.log(`HIT: ${w} -> ${hits[0].title}`);
    } else {
      // try kur
      const q2 = `LL-Q36368 ${w}`;
      const url2 = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q2)}&srnamespace=6&format=json`;
      const r2 = await (await fetch(url2, { headers: { 'User-Agent': 'GundeMe/2.0' } })).json();
      const hits2 = r2.query?.search || [];
      if (hits2.length) {
        console.log(`HIT: ${w} -> ${hits2[0].title}`);
      } else {
        console.log(`MISS: ${w}`);
      }
    }
  }
}

searchGeneral();
