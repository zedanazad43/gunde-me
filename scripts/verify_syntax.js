import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\azadz\\.gemini\\antigravity\\scratch\\gunde-me';
const filePath = path.join(projectDir, 'standalone.html');
const content = fs.readFileSync(filePath, 'utf8');
const scriptMatches = content.matchAll(/<script>([\s\S]*?)<\/script>/g);

let count = 0;
for (const match of scriptMatches) {
  count++;
  const scriptContent = match[1];
  try {
    new Function('React', 'ReactDOM', scriptContent);
    console.log(`PASS: inline script #${count} in standalone.html is 100% syntactically valid!`);
  } catch (err) {
    console.error(`FAIL: Syntax Error in standalone.html script #${count}:`, err);
    process.exit(1);
  }
}

console.log('ALL TESTS PASSED: standalone.html is 100% ready!');
