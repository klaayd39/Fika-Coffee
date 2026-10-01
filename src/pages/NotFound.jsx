import { Link, useLocation } from 'react-router-dom'
import Seo from '../components/seo/Seo.jsx'
import { BodyText, Button, DisplayTitle, Eyebrow } from '../components/ui/index.js'
import { brand } from '../data/brand.js'

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <main className="bg-canvas">
      <Seo
        title={`Page not found · ${brand.name}`}
        description={`That page isn’t on the ${brand.name} site.`}
        path={pathname}
        index={false}
      />
      <div className="content-shell section-py-roomy">
        <Eyebrow>404</Eyebrow>
        <DisplayTitle as="h1" size="page" className="mt-4">
          Page not found
        </DisplayTitle>
        <BodyText className="mt-3 max-w-prose">
          That page isn&rsquo;t here. Pause, then head back.
        </BodyText>
        <div className="mt-6">
          <Button as={Link} to="/" variant="secondary" arrow>
            Back home
          </Button>
        </div>
      </div>
    </main>
  )
}
