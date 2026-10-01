import { Outlet } from 'react-router-dom'
import LocalBusinessJsonLd from '../seo/LocalBusinessJsonLd.jsx'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import ScrollToHash from './ScrollToHash.jsx'

/* Shared chrome for every route. The #main wrapper is the skip-link target. */
export default function Layout() {
  return (
    <>
      <ScrollToHash />
      <LocalBusinessJsonLd />
      <Navbar />
      <div id="main" tabIndex={-1} className="min-w-0 overflow-x-clip focus:outline-none">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
