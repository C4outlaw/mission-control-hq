import { readFileSync } from 'fs';
const map = JSON.parse(readFileSync('lib/customcat-map.JSON', 'utf8'));
const designs = Object.keys(map.designs || {});
console.log('Total designs:', designs.length);
console.log('First 3:', JSON.stringify(designs.slice(0, 3)));
