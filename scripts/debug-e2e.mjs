import { readFileSync } from 'fs';
const env = readFileSync('.env.local', 'utf8');
for (const line of env.split('\n')) {
  const m = line.match(/^([^=\s]+)\s*=\s*(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
}
console.log('API key set:', !!process.env.CUSTOMCAT_API_KEY);
const map = JSON.parse(readFileSync('lib/customcat-map.JSON', 'utf8'));
const designs = Object.keys(map.designs || {});
console.log('Design keys sample:', designs.slice(0, 5).JSON.stringify());
try {
  const mod = await import('./lib/customcat-order.js');
  console.log('Module loaded:', typeof mod.createCustomCatOrder);
} catch (e) {
  console.log('Import failed:', e.message);
}
