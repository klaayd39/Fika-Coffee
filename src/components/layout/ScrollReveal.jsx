import { useLayoutEffect } from 'react'

const ROOT_MARGIN = '0px 0px -50px 0px'
const MAX_STAGGER = 6

function revealAll(nodes) {
  nodes.forEach((node) => node.classList.add('is-revealed'))
}

/**
 * Yardstick-style section reveal: fade and rise as blocks enter the viewport.
 * One observer for the page; new `[data-reveal]` nodes are picked up as routes render.
 */
export default function ScrollReveal() {
  useLayoutEffect(() => {
    const nodes = () => document.querySelectorAll('[data-reveal]:not(.is-revealed)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      revealAll(nodes())
      return undefined
    }

    const seen = new WeakSet()
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target)
          .sort((a, b) => {
            const ra = a.getBoundingClientRect()
            const rb = b.getBoundingClientRect()
            return ra.top - rb.top || ra.left - rb.left
          })

        entering.forEach((element, index) => {
          element.style.setProperty('--reveal-order', String(Math.min(index, MAX_STAGGER)))
          element.classList.add('is-revealed')
          observer.unobserve(element)
        })
      },
      { rootMargin: ROOT_MARGIN, threshold: 0.01 },
    )

    const watch = (element) => {
      if (seen.has(element) || element.classList.contains('is-revealed')) return
      seen.add(element)
      observer.observe(element)
    }

    const scan = (root) => {
      if (root.nodeType !== 1) return
      if (root.matches('[data-reveal]')) watch(root)
      root.querySelectorAll('[data-reveal]').forEach(watch)
    }

    document.querySelectorAll('[data-reveal]').forEach(watch)
    const main = document.getElementById('main') ?? document.body
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => scan(node))
      })
    })
    mutations.observe(main, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [])

  return null
}
