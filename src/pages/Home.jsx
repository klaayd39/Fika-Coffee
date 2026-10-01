import AtmosphereBand from '../components/home/AtmosphereBand.jsx'
import HomeAboutSection from '../components/home/HomeAboutSection.jsx'
import FeaturedFavorites from '../components/home/FeaturedFavorites.jsx'
import FinalCta from '../components/home/FinalCta.jsx'
import Hero from '../components/home/Hero.jsx'
import LocationSection from '../components/location/LocationSection.jsx'
import Seo from '../components/seo/Seo.jsx'
import { seoPages } from '../data/seo.js'

export default function Home() {
  return (
    <main className="w-full max-w-none bg-canvas">
      <Seo {...seoPages.home} />
      <Hero />
      <FeaturedFavorites />
      <AtmosphereBand />
      <HomeAboutSection />
      <LocationSection id="contact" className="band-edge bg-canvas" imageFirst />
      <FinalCta />
    </main>
  )
}
