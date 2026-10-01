import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/index.js'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import { About, Contact, DesignSystem, Gallery, Menu } from './routes.js'

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent opacity-50"
      />
      <span className="sr-only">Loading page</span>
    </div>
  )
}

function Page({ children }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={
            <Page>
              <Menu />
            </Page>
          }
        />
        <Route
          path="/about"
          element={
            <Page>
              <About />
            </Page>
          }
        />
        <Route
          path="/gallery"
          element={
            <Page>
              <Gallery />
            </Page>
          }
        />
        <Route
          path="/contact"
          element={
            <Page>
              <Contact />
            </Page>
          }
        />
        {import.meta.env.DEV ? (
          <Route
            path="/design-system"
            element={
              <Page>
                <DesignSystem />
              </Page>
            }
          />
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
