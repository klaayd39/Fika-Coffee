import AboutShowcase from '../components/about/AboutShowcase.jsx'
import Seo from '../components/seo/Seo.jsx'
import { seoPages } from '../data/seo.js'

export default function AboutPage() {
  return (
    <div className="bg-canvas">
      <Seo {...seoPages.about} />
      <article>
        <AboutShowcase />
      </article>
    </div>
  )
}
