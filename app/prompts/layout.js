export const metadata = {
  title: 'Prompt Packs — The Lost Jamaican',
  description:
    'Every prompt, model setting, and quality gate behind our dancehall & reggae documentary shorts. Name your price and download the exact prompt pack for your next video.',
  alternates: {
    canonical: 'https://www.myriehq.com/prompts',
  },
  openGraph: {
    title: 'Prompt Packs — The Lost Jamaican',
    description:
      'The exact prompts, model settings, and quality gates behind our dancehall & reggae documentary shorts.',
    url: 'https://www.myriehq.com/prompts',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Lost Jamaican Prompt Packs' }],
  },
};

export default function PromptsLayout({ children }) {
  return children;
}
