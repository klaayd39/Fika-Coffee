import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/index.js'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import { About, Contact, DesignSystem, Gallery, Menu } from './routes.js'

function RouteFallback() {
  return <p className="sr-only">Loading page</p>
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
