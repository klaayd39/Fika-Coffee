/* Primary navigation. `end` makes a route match exactly so Home isn't
   marked active on every path. */
export const navItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Our Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]
