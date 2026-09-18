// Import CustomCat Download Catalog CSV into lib/customcat-map.json.
// Usage: node scripts/import-customcat-catalog.js <path-to-csv>
//
// The CSV comes from CustomCat dashboard: Create Product > Advanced Tools > Download Catalog.
// Expected columns (case-insensitive, auto-detected):
//   - Product/Style identifier (e.g. "G500", "G185", "G180") or Product ID
//   - Color, Size, Catalog SKU / SKU, Cost, Availability/Stock
//
// Only rows matching our 4 blanks (G500, G185, G180, 11oz mug) are imported.
// Variants are keyed as "Color|Size" -> { catalogSku, cost, inStock }.

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAP_PATH = resolve(__dirname, '../lib/customcat-map.json');

// Blank matchers: CSV product identifiers -> our blank keys.
// Updated 2026-09-18 to match actual CustomCat Download Catalog product names.
const BLANK_MATCH = [
  { key: 'G500', patterns: [/\bG500\b/i, /gildan 5\.3 oz\. t-shirt/i] },
  { key: 'G185', patterns: [/\bG185\b/i, /gildan pullover hoodie/i] },
  { key: 'G180', patterns: [/\bG180\b/i, /gildan crewneck pullover sweatshirt/i] },
  { key: 'MUG11', patterns: [/11oz white mug/i] },
];

function detectColumns(header) {
  const cols = header.map((h) => h.trim().toLowerCase());
  const find = (...names) => cols.findIndex((c) => names.some((n) => c.includes(n)));
  // NB: 'product name' must come before 'product id'; exact 'product color'
  // must beat 'product color id'. Order matters with substring matching.
  return {
    product: find('product name', 'style', 'productid', 'style #'),
    color: cols.findIndex((c) => c === 'product color' || c === 'color' || c === 'colour'),
    size: find('size'),
    sku: find('catalog sku', 'catalog_sku', 'sku'),
    cost: (() => { for (const n of ['your cost', 'lite cost', 'pro cost']) { const i = cols.findIndex((c) => c.includes(n)); if (i >= 0) return i; } return find('cost', 'price'); })(),
    stock: find('in stock', 'stock', 'availability', 'available', 'qty'),
  };
}

function parseCsv(text) {
  // Minimal CSV parser handling quoted fields.
  const rows = [];
  let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((f) => f.trim())) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function matchBlank(productText) {
  for (const b of BLANK_MATCH) {
    if (b.patterns.some((p) => p.test(productText))) return b.key;
  }
  return null;
}

const csvPath = process.argv[2];
if (!csvPath) {
  console.error('Usage: node scripts/import-customcat-catalog.js <path-to-csv>');
  process.exit(1);
}

const text = readFileSync(resolve(csvPath), 'utf8');
const rows = parseCsv(text);
if (!rows.length) { console.error('Empty CSV'); process.exit(1); }

const col = detectColumns(rows[0]);
console.log('Detected columns:', JSON.stringify(col));
if (col.sku < 0) { console.error('Could not find SKU column. Header:', rows[0].join(' | ')); process.exit(1); }

const map = JSON.parse(readFileSync(MAP_PATH, 'utf8'));
const counts = { G500: 0, G185: 0, G180: 0, MUG11: 0 };
const colors = { G500: new Set(), G185: new Set(), G180: new Set(), MUG11: new Set() };
const sizes = { G500: new Set(), G185: new Set(), G180: new Set(), MUG11: new Set() };

for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  const productText = [col.product >= 0 ? r[col.product] : ''].join(' ');
  const blankKey = matchBlank(productText);
  if (!blankKey) continue;

  const color = (col.color >= 0 ? r[col.color] : 'White').trim() || 'White';
  const size = (col.size >= 0 ? r[col.size] : 'One Size').trim() || 'One Size';
  const sku = (r[col.sku] || '').trim();
  if (!sku) continue;
  const costRaw = col.cost >= 0 ? String(r[col.cost] || '').replace(/[^0-9.]/g, '') : '';
  const cost = costRaw ? parseFloat(costRaw) || null : null;
  const stockRaw = col.stock >= 0 ? (r[col.stock] || '').trim().toLowerCase() : '';
  const inStock = stockRaw ? !/out|0$|no/.test(stockRaw) : null;

  const key = `${color}|${size}`;
  map.blanks[blankKey].variants[key] = { catalogSku: sku, cost, inStock };
  counts[blankKey]++;
  colors[blankKey].add(color);
  sizes[blankKey].add(size);
}

map._meta.last_updated = new Date().toISOString().slice(0, 10);
map._meta.note = 'Variant SKUs imported from Download Catalog CSV. Verify before live orders.';
writeFileSync(MAP_PATH, JSON.stringify(map, null, 2) + '\n');

console.log('Imported variant counts:', JSON.stringify(counts));
for (const k of Object.keys(colors)) {
  console.log(`${k} colors (${colors[k].size}):`, [...colors[k]].slice(0, 12).join(', '));
  console.log(`${k} sizes:`, [...sizes[k]].join(', '));
}
console.log('Wrote', MAP_PATH);

