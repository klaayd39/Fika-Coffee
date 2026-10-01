import { Outlet } from 'react-router-dom'
import LocalBusinessJsonLd from '../seo/LocalBusinessJsonLd.jsx'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import RouteScroll from './RouteScroll.jsx'

/* Shared chrome for every route. The #main wrapper is the skip-link target. */
export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <RouteScroll />
      <LocalBusinessJsonLd />
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-0 min-w-0 w-full flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
