import HomeAboutSection from '../components/home/HomeAboutSection.jsx'
import HomeGallerySection from '../components/home/HomeGallerySection.jsx'
import FeaturedFavorites from '../components/home/FeaturedFavorites.jsx'
import FinalCta from '../components/home/FinalCta.jsx'
import Hero from '../components/home/Hero.jsx'
import LocationSection from '../components/location/LocationSection.jsx'
import Seo from '../components/seo/Seo.jsx'
import { seoPages } from '../data/seo.js'

export default function Home() {
  return (
    <div className="home-page w-full max-w-none overflow-x-clip bg-canvas">
      <Seo {...seoPages.home} />
      <Hero />
      <div className="defer-render">
        <FeaturedFavorites />
      </div>
      <div className="defer-render">
        <HomeGallerySection />
      </div>
      <div className="defer-render">
        <HomeAboutSection />
      </div>
      <div className="defer-render">
        <LocationSection id="contact" className="band-edge bg-canvas" imageFirst />
      </div>
      <div className="defer-render">
        <FinalCta />
      </div>
    </div>
  )
}
