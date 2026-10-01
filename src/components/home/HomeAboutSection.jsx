import AboutKnollBoard from '../about/AboutKnollBoard.jsx'
import AboutShowcase from '../about/AboutShowcase.jsx'
import About from './About.jsx'

export default function HomeAboutSection() {
  return (
    <>
      <AboutShowcase embedded />
      <AboutKnollBoard />
      <About />
    </>
  )
}
