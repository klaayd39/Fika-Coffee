import { buildLocalBusinessGraph } from '../../data/localBusiness.js'

/* Rendered in the document body. Google reads JSON-LD from either head or body. */
export default function LocalBusinessJsonLd() {
  const json = JSON.stringify(buildLocalBusinessGraph(window.location.origin))

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
