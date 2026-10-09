// Shared design tokens for the whole app.
export const colors = {
  bg: '#f2f5fa',
  card: '#141B26',
  cardAlt: '#1A2333',
  line: '#243044',
  text: '#F2F5FA',
  muted: '#9AA7BC',
  accent: '#8B5CF6',      // purple - packages
  accentSoft: '#2A2244',
  teal: '#22D3EE',        // cyan - experiences
  tealSoft: '#12303A',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };

export const radius = { sm: 10, md: 14, lg: 20, pill: 999 };

export const type = {
  h1: { fontSize: 30, fontWeight: '800' as const, lineHeight: 36 },
  h2: { fontSize: 24, fontWeight: '800' as const, lineHeight: 30 },
  h3: { fontSize: 17, fontWeight: '700' as const },
  body: { fontSize: 15, lineHeight: 22 },
  small: { fontSize: 13, lineHeight: 19 },
  eyebrow: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 2 },
};

export const money = (n: number) => `R${n.toLocaleString('en-ZA')}`;
