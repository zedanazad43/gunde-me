import fs from 'fs';
import vm from 'vm';

const html = fs.readFileSync('standalone.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
if (match) {
  const code = match[1];
  try {
    new vm.Script(code);
    console.log('Script is valid!');
  } catch (err) {
    console.error('Syntax error details:', err);
    if (err.stack) {
      console.error(err.stack);
    }
  }
}
