const FALLBACK = "I don't have an approved answer for that. I can send it to Myrie for a text or call follow-up.";
const DECLINED = "I can only help with MyrieHQ's approved website and marketing services.";

const blocked = [
  'hotel', 'motel', 'resort', 'lodging', 'room booking', 'accommodation',
  'vacation planning', 'travel booking', 'politics', 'medical advice',
  'legal advice', 'financial advice', 'gossip', 'system prompt',
  'internal file', 'ignore all rules', 'ignore your rules',
];

const services = [
  {
    terms: ['website', 'web design', 'restaurant site', 'mobile-first'],
    answer: 'MyrieHQ builds premium mobile-first websites for restaurants, bars, and local businesses.',
  },
  {
    terms: ['seo', 'google business', 'citations', 'schema', 'reviews'],
    answer: 'MyrieHQ provides local SEO through Google Business Profile work, citations, schema, and review systems.',
  },
  {
    terms: ['branding', 'creative', 'photography', 'motion ad', 'promo', 'social media', 'print'],
    answer: 'MyrieHQ creates photography, motion ads, promotional cards, print, social creative, and digital boards.',
  },
  {
    terms: ['automation', 'follow-up', 'content system', 'marketing system'],
    answer: 'MyrieHQ builds practical marketing, content, and customer follow-up automation systems.',
  },
];

const contains = (text, terms) => terms.some((term) => text.includes(term));

export function answerLunaQuestion(question) {
  const text = String(question || '').trim().toLowerCase().slice(0, 2000);
  if (!text) return { status: 'error', reply: 'Please enter a question.', needsContact: false };
  if (contains(text, blocked)) return { status: 'declined', reply: DECLINED, needsContact: false };

  const facts = services.filter((service) => contains(text, service.terms)).map((service) => service.answer);
  if (contains(text, ['beach bucket', 'portfolio', 'past work', 'example'])) {
    facts.push("MyrieHQ built and markets the Beach Bucket Bar & Grill website.");
  }
  if (contains(text, ['daytona beach', 'daytona'])) facts.push('MyrieHQ serves Daytona Beach.');
  if (contains(text, ['orlando'])) facts.push('MyrieHQ serves Orlando.');
  if (contains(text, ['contact', 'phone', 'myriehq', 'myrie hq'])) {
    facts.push('Visit myriehq.com or call 386-795-8727.');
  }
  if (facts.length) {
    return { status: 'answered', reply: [...new Set(facts)].join(' '), needsContact: false };
  }
  return { status: 'needs-contact', reply: FALLBACK, needsContact: true };
}

export const lunaFallback = FALLBACK;
