/* Mirrors the @theme block in src/index.css so tokens can be listed in UI.
   Tailwind utilities remain the source of truth for styling. */

export const designPrinciple =
  'Public pages: photography + typography + whitespace + content. Not cards, gradients, shadows, or motion as the main look.'

export const performancePrinciple =
  'No heavy effect libraries. Lazy images (AVIF/WebP, sizes), hero preload in index.html, React.lazy routes, minimal JS — use CSS/Tailwind for light transitions only.'

export const colorScales = [
  {
    name: 'espresso',
    role: 'Primary. Logo field, dark walls and beams.',
    source: 'espresso-800 sampled from the profile logo',
    steps: [
      { step: 50, hex: '#F7F3F1' },
      { step: 100, hex: '#EDE5E1' },
      { step: 200, hex: '#D9CCC5' },
      { step: 300, hex: '#BFAAA0' },
      { step: 400, hex: '#9D8377' },
      { step: 500, hex: '#7A6257' },
      { step: 600, hex: '#5E4A41' },
      { step: 700, hex: '#4A3833' },
      { step: 800, hex: '#3C2D2A', anchor: true },
      { step: 900, hex: '#2B2020' },
      { step: 950, hex: '#1B1413' },
    ],
  },
  {
    name: 'lilac',
    role: 'Secondary. The wordmark colour.',
    source: 'lilac-300 sampled from the "Fika" lettering',
    steps: [
      { step: 50, hex: '#FAF6FB' },
      { step: 100, hex: '#F3EAF5' },
      { step: 200, hex: '#E7D7EA' },
      { step: 300, hex: '#D4B9D8', anchor: true },
      { step: 400, hex: '#BE9BC4' },
      { step: 500, hex: '#A67DAE' },
      { step: 600, hex: '#8A6192' },
      { step: 700, hex: '#6E4C74' },
      { step: 800, hex: '#543A58' },
      { step: 900, hex: '#3C2A3F' },
    ],
  },
  {
    name: 'cerise',
    role: 'Accent. The hot pink sofa and Pink Friday posts.',
    source: 'cerise-600 sampled from the sofa',
    steps: [
      { step: 50, hex: '#FFF1F4' },
      { step: 100, hex: '#FFE1E8' },
      { step: 200, hex: '#FBC3D0' },
      { step: 300, hex: '#F498AE' },
      { step: 400, hex: '#E56A8A' },
      { step: 500, hex: '#D33F67' },
      { step: 600, hex: '#C2234F', anchor: true },
      { step: 700, hex: '#A01840' },
      { step: 800, hex: '#7B1433' },
      { step: 900, hex: '#5A1026' },
    ],
  },
  {
    name: 'blush',
    role: 'Supporting. Pink walls, window grilles, envelopes.',
    source: 'blush-500 from the wall, blush-300 from the envelope',
    steps: [
      { step: 50, hex: '#FDF6F5' },
      { step: 100, hex: '#F9E9E8' },
      { step: 200, hex: '#F2D4D5' },
      { step: 300, hex: '#EDB2BA', anchor: true },
      { step: 400, hex: '#DCA0A6' },
      { step: 500, hex: '#CC9AA0', anchor: true },
      { step: 600, hex: '#B07E85' },
      { step: 700, hex: '#8E6268' },
      { step: 800, hex: '#6B484D' },
      { step: 900, hex: '#4A3134' },
    ],
  },
  {
    name: 'matcha',
    role: 'Accent. The matcha counter.',
    source: 'matcha-600 sampled from sifted matcha',
    steps: [
      { step: 50, hex: '#F6F7EC' },
      { step: 100, hex: '#E9ECCF' },
      { step: 200, hex: '#D3D9A4' },
      { step: 300, hex: '#B6BE76' },
      { step: 400, hex: '#9AA354' },
      { step: 500, hex: '#898047' },
      { step: 600, hex: '#7E7736', anchor: true },
      { step: 700, hex: '#655F2C' },
      { step: 800, hex: '#4C4822' },
      { step: 900, hex: '#343118' },
    ],
  },
  {
    name: 'lamp',
    role: 'Accent. Warm lamp light, open/late signals.',
    source: 'lamp-500 sampled from the table lamp',
    steps: [
      { step: 50, hex: '#FEF9EC' },
      { step: 100, hex: '#FBEFCB' },
      { step: 200, hex: '#F6DD94' },
      { step: 300, hex: '#EDC45C' },
      { step: 400, hex: '#D8A63E' },
      { step: 500, hex: '#BD8B30', anchor: true },
      { step: 600, hex: '#9C7026' },
      { step: 700, hex: '#7A561F' },
      { step: 800, hex: '#5A3F18' },
      { step: 900, hex: '#3D2B11' },
    ],
  },
  {
    name: 'cream',
    role: 'Backgrounds. Printed card stock and painted plaster.',
    source: 'cream-200 sampled from the store hours card',
    steps: [
      { step: 50, hex: '#FDFAF8' },
      { step: 100, hex: '#F7F0ED' },
      { step: 200, hex: '#F0E5E4', anchor: true },
      { step: 300, hex: '#E3D4D2' },
      { step: 400, hex: '#D2BDBA' },
    ],
  },
]

export const semanticColors = [
  { group: 'Primary', tokens: ['primary', 'primary-hover', 'primary-soft', 'on-primary'] },
  { group: 'Secondary', tokens: ['secondary', 'secondary-hover', 'secondary-soft', 'on-secondary'] },
  { group: 'Accent', tokens: ['accent', 'accent-hover', 'accent-soft', 'accent-matcha', 'accent-lamp'] },
  { group: 'Background', tokens: ['canvas', 'surface', 'surface-sunken', 'surface-blush', 'surface-inverse'] },
  { group: 'Text', tokens: ['ink', 'ink-soft', 'ink-muted', 'ink-subtle', 'ink-inverse'] },
  { group: 'Border', tokens: ['line', 'line-strong', 'line-inverse', 'ring'] },
  { group: 'Status', tokens: ['success', 'success-soft', 'danger', 'danger-soft'] },
]

/* Measured against canvas #F7F0ED and surface #FDFAF8. */
export const contrastRules = [
  { pair: 'ink on canvas or surface', ratio: '14.0 : 1', verdict: 'AAA' },
  { pair: 'ink-soft on canvas', ratio: '9.8 : 1', verdict: 'AAA' },
  { pair: 'ink-muted on canvas', ratio: '5.0 : 1', verdict: 'AA, smallest text allowed' },
  { pair: 'ink-subtle on canvas', ratio: '3.1 : 1', verdict: 'Large text and disabled only' },
  { pair: 'on-primary on primary', ratio: '12.6 : 1', verdict: 'AAA' },
  { pair: 'on-secondary on secondary', ratio: '8.8 : 1', verdict: 'AAA' },
  { pair: 'on-accent on accent', ratio: '5.8 : 1', verdict: 'AA' },
  { pair: 'danger on surface', ratio: '6.3 : 1', verdict: 'AA' },
  { pair: 'accent-matcha as text', ratio: '4.4 : 1', verdict: 'Fills only. Use matcha-700/800 for text' },
  { pair: 'accent-lamp as text', ratio: '2.9 : 1', verdict: 'Fills and glow only. Use lamp-700/800 for text' },
  { pair: 'tone-inverse ink-soft on espresso-900', ratio: '11.0 : 1', verdict: 'AAA' },
]

export const typography = {
  families: [
    {
      token: 'font-display',
      stack: 'Fraunces',
      use: 'Headings. Warm editorial serif for page titles.',
    },
    {
      token: 'font-sans',
      stack: 'Inter',
      use: 'Body copy, labels, UI. Carries the lowercase caption voice.',
    },
    {
      token: 'font-script',
      stack: 'Parisienne',
      use: 'Promo accents only, like "on fridays". [NEEDS CONFIRMATION: the real script font]',
    },
  ],
  sizes: [
    { token: 'text-2xs', rem: '0.6875rem', use: 'Micro caps under the wordmark' },
    { token: 'text-xs', rem: '0.75rem', use: 'Eyebrows, badges' },
    { token: 'text-sm', rem: '0.875rem', use: 'Captions, helper text' },
    { token: 'text-base', rem: '1rem', use: 'Body' },
    { token: 'text-lg', rem: '1.125rem', use: 'Lead paragraph' },
    { token: 'text-xl', rem: '1.375rem', use: 'Card titles' },
    { token: 'text-2xl', rem: '1.75rem', use: 'Section subheads' },
    { token: 'text-3xl', rem: '2.25rem', use: 'Section heads' },
    { token: 'text-4xl', rem: '3rem', use: 'Page titles' },
    { token: 'text-5xl', rem: '3.75rem', use: 'Hero' },
    { token: 'text-6xl', rem: '4.5rem', use: 'Hero, wide screens' },
  ],
  weights: [
    { token: 'font-light', value: 300, use: 'Large display text only' },
    { token: 'font-normal', value: 400, use: 'Body' },
    { token: 'font-medium', value: 500, use: 'Emphasis, buttons' },
    { token: 'font-semibold', value: 600, use: 'Headings, signage' },
    { token: 'font-bold', value: 700, use: 'Wordmark' },
  ],
  tracking: [
    { token: 'tracking-sign', value: '0.28em', use: '"PAUSE HERE" signage' },
    { token: 'tracking-label', value: '0.12em', use: 'Tracked caps labels' },
  ],
}

export const radii = [
  { token: 'rounded-xs', value: '0.375rem' },
  { token: 'rounded-sm', value: '0.5rem' },
  { token: 'rounded-md', value: '0.875rem' },
  { token: 'rounded-lg', value: '1.25rem' },
  { token: 'rounded-xl', value: '1.75rem' },
  { token: 'rounded-2xl', value: '2.5rem' },
  { token: 'rounded-full', value: '9999px' },
  { token: 'rounded-arch', value: 'arch, from the interior mirror and windows' },
]

export const shadows = [
  { token: 'shadow-xs', use: 'Hairline lift on flat surfaces' },
  { token: 'shadow-sm', use: 'Resting cards, inputs' },
  { token: 'shadow-md', use: 'Raised cards, hover' },
  { token: 'shadow-lg', use: 'Overlays, menus' },
  { token: 'shadow-lamp', use: 'Warm glow for open/featured states' },
]

export const spacing = [
  { token: 'p-1 … p-16', value: '0.25rem step', use: 'Component padding' },
  { token: 'gap-gutter', value: '1.5rem', use: 'Grid and card gutters' },
  { token: 'section-py-tight', value: '4rem / 7rem', use: 'Compact intros — mobile / md+' },
  { token: 'section-py-roomy', value: '5rem / 8rem', use: 'Content bands — mobile / md+' },
  { token: 'section-py-grand', value: '6rem / 10rem', use: 'Product & image sections — mobile / md+' },
  { token: 'max-w-prose', value: '42rem', use: 'Reading width' },
  { token: 'max-w-content / content-shell', value: '72rem', use: 'Nav, headers, footer — max-w-7xl measure' },
  { token: 'max-w-wide / content-shell-wide', value: '90rem', use: 'Menu, gallery, featured product grids' },
  { token: 'bleed-full', value: '100vw', use: 'Full-bleed photography inside a wide shell' },
  { token: 'inset-content-*', value: 'fluid', use: 'Asymmetric editorial text aligned to content edge' },
]
