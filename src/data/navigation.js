/* Primary navigation. `end` makes a route match exactly so Home isn't
   marked active on every path. */
export const navItems = [
  { label: 'Home', to: '/', end: true, exactHome: true },
  { label: 'About', to: '/', hash: 'about' },
  { label: 'Gallery', to: '/', hash: 'gallery' },
  { label: 'Contact', to: '/', hash: 'contact' },
]
