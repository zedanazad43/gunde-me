import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\azadz\\.gemini\\antigravity\\scratch\\gunde-me';
const src = path.join(projectDir, 'standalone.html');
const dest = path.join(projectDir, 'android', 'app', 'src', 'main', 'assets', 'standalone.html');

fs.copyFileSync(src, dest);
console.log('SUCCESS: Synchronized standalone.html to android/app/src/main/assets/standalone.html');
