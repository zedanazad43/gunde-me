# Gundé me — Lîstika Perwerdehiya Zimanê Kurdî ji bo Zarokan

Lîstikeke nûjen, rengîn û kartonî ya li ser şêwaza Coin Master ji bo fêrbûna zimanê Kurdî bi tîpên latînî ji bo zarokan.

---

## 🎮 Taybetmendiyên Lîstikê (Features)

1. **🎡 Çerxa Gundê Me (Spin Wheel)**:
   - Zivirandina çerxê ji bo qezenckirina diravan (Dirav), hêzê (Hêz), mertalan (Mertal) û qertên zimanê.
   - Dengên nûjen ên pirtik û dengbêjiyê bi Web Audio API.

2. **🏡 Avakirina Gund (Village Builder)**:
   - Xaniyê Gund, Aşê Avê, Dibistana Zimanê, Baxçeyê Fêkiyan û Pira Kevirî.
   - Her avahî asta wê mezin dibe û xelatên nû vedike.

3. **📚 Karta Zimanê ya Dengbêjî (Talking Kurdish Flashcards)**:
   - Ajalan (16 ajalên cûda bi rêberê bilêvkirinê yê fonetîk).
   - Amûr (8 amûrên gund û jiyanê).
   - Bişkoja dengê bo bilêvkirina rast a Kurdî bi Web Speech API.

4. **❓ Lîstika Pirsan (Interactive Audio Quiz)**:
   - Zarok guh didin dengê peyvê û ji nav 4 vebijarkan peyva rast hildibijêrin.
   - Xelatên zêdekirina dirav û vekirina kartên nû.

5. **🛡️ Hîmên Zimanî yên Hawarê (100% Latin Script & Zero Arabic)**:
   - Bikarhênana tam a alfabeya Hawarê (A-Z).
   - Qedexekirina tam a her tîpeke erebî bi ceribandinên otomatîk.

---

## 🚀 Çawa Dê Bixebitînî? (How to Run)

### Vebijarka 1: Destpêkirina Zindî (Standalone HTML - Herî Lez)
Pelê `standalone.html` yekser di geroka xwe (Chrome, Edge, Firefox, Safari) de veke:
```bash
# Windows
start standalone.html
```

### Vebijarka 2: Vite + React + TypeScript
```bash
# Sazkirina pakêtan
npm install

# Destpêkirina pêşkêşkerê pêşxistinê
npm run dev

# Avakirina versiyona hilberînê
npm run build
```

---

## 🧪 Ceribandinên Zimanî (Linguistic Tests)

Ji bo ceribandina hemû peyv, kart, avahî û nehiştina her tîpeke erebî di nava kodê de:
```bash
node --experimental-strip-types tests/language.test.ts
```
> Hemû 136 ceribandin bi ser dikevin (136/136 PASS).
