# Studio portfolio metrics

The public `/studio/metrics` route is a read-only, refresh-capable contract. It currently returns `connected: false` and null counters because no authorized metrics provider has been connected. The page never substitutes zero, invents live counts, or claims cached samples are live.

To connect a future provider, pass an authorized server-side adapter to `readMetrics`. Each result must contain numeric `count`, ISO `observedAt`, canonical HTTPS `sourceUrl`, and optional `approximate`. Never expose provider credentials to the client. Keep per-post errors isolated. A returned snapshot is accepted for at most 24 hours and never from the future. The route caches for five minutes; the client refreshes every five minutes. The UI labels counts as snapshots with UTC time. Add real provider integration tests before enabling `connected: true`.

Sources are official TikTok videos selected by the owner-facing research team and verified for native playback on 2026-11-25. Native players are loaded only after a visitor clicks; original platform links are always available. The Instagram documentary uses explicit click-out links because reliable playback was not confirmed. No Facebook placeholder or fabricated view totals.

Every download CTA downloads the approved client flyer, NOT the portfolio video. Approved PDF SHA256: 0ae6dcbb598c8485aca214d3b854dda49f7cba9fc52af30e2ac73491e6945b24.

