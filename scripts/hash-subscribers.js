// Turn a Facebook subscriber export into the SUBSCRIBER_HASHES env value.
//
//   Monetize > Subscriptions > Subscriber list > Download all subscriber info
//   node scripts/hash-subscribers.js ~/Downloads/subscribers.csv
//
// Prints a comma-separated list of SHA-256 hashes to paste into the
// SUBSCRIBER_HASHES environment variable (Vercel > Settings > Environment
// Variables). Raw email addresses never enter the repo or the environment.
const fs = require('fs');
const crypto = require('crypto');

const file = process.argv[2];
if (!file) {
  console.error('usage: node scripts/hash-subscribers.js <subscribers.csv|txt>');
  process.exit(1);
}

const text = fs.readFileSync(file, 'utf8');
// Pull addresses out of whatever shape the export arrives in.
const emails = [...new Set((text.match(/[^\s,;"'<>]+@[^\s,;"'<>]+\.[a-z]{2,}/gi) || []).map((e) => e.toLowerCase()))];

if (!emails.length) {
  console.error('No email addresses found in ' + file);
  process.exit(1);
}

const hashes = emails.map((e) => crypto.createHash('sha256').update('subscriber:' + e).digest('hex'));

console.error(`${emails.length} subscriber(s) hashed. Set SUBSCRIBER_HASHES to:\n`);
console.log(hashes.join(','));
