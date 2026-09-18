import { readFileSync } from 'fs';
// Load env
const env = readFileSync('.env.local', 'utf8');
for (const line of env.split('\n')) {
  const m = line.match(/^([^=\s]+)\s*=\s*(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
}
// Import the real production module
const { createCustomCatOrder } = await import('./lib/customcat-order.js');
// Mock a Stripe checkout session for 1x G500 Black Large with design 'we-never-lose'
const session = {
  id: 'TEST-E2E-' + Date.now(),
  metadata: {
    fulfil: 'G500:Black:Large:we-never-lose:1'
  },
  customer_details: {
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '3865550123',
    address: {
      line1: '123 Test St',
      line2: '',
      city: 'Daytona Beach',
      state: 'FL',
      postal_code: '32114',
      country: 'US'
    }
  }
};
try {
  const result = await createCustomCatOrder(session, { sandbox: true });
  console.log('E2E SANDBOX ORDER SUCCESS');
  console.log(JSON.stringify(result).slice(0, 500));
} catch (e) {
  console.log('E2E FAILED: ' + e.message);
}
