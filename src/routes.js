import { lazy } from 'react'

/* Home stays in the main chunk; other pages split for smaller first load. */
const loaders = {
  '/menu': () => import('./pages/Menu.jsx'),
  '/about': () => import('./pages/About.jsx'),
  '/gallery': () => import('./pages/Gallery.jsx'),
  '/contact': () => import('./pages/Contact.jsx'),
  '/design-system': () => import('./pages/DesignSystem.jsx'),
}

export function preloadPage(path) {
  return loaders[path]?.()
}

export const Menu = lazy(loaders['/menu'])
export const About = lazy(loaders['/about'])
export const Gallery = lazy(loaders['/gallery'])
export const Contact = lazy(loaders['/contact'])
export const DesignSystem = lazy(loaders['/design-system'])
