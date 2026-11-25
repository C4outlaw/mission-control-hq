import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeMetric, readMetrics, showreel } from '../lib/studio/showreel.mjs';
const now = Date.parse('2026-11-25T04:00:00Z');
const valid = { count: 123, observedAt: '2026-11-25T03:30:00Z', sourceUrl: 'https://www.tiktok.com/@thelostjamaican/video/1' };
test('missing metrics are unavailable, not zero', async () => { const m = await readMetrics(); assert.equal(Object.keys(m).length, showreel.length); assert.ok(Object.values(m).every(v=>v===null)); });
test('fresh verified snapshot retains provenance',()=>assert.equal(normalizeMetric(valid,now).count,123));
test('stale, invalid and future snapshots do not render',()=>{ for(const value of [null,{}, {...valid,count:-1},{...valid,count:NaN},{...valid,sourceUrl:'javascript:alert(1)'},{...valid,observedAt:'2026-11-20T00:00:00Z'},{...valid,observedAt:'2026-12-01T00:00:00Z'}]) assert.equal(normalizeMetric(value,now),null); });
test('provider failure never manufactures a counter',async()=>assert.ok(Object.values(await readMetrics(()=>{throw Error('offline');},now)).every(v=>v===null)));
