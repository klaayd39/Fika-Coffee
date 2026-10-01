import { useEffect } from 'react'
import {
  Badge,
  Button,
  Card,
  CardEyebrow,
  CardFooter,
  CardText,
  CardTitle,
  Checkbox,
  Field,
  Input,
  Select,
  Textarea,
} from '../components/ui/index.js'
import Seo from '../components/seo/Seo.jsx'
import { brand } from '../data/brand.js'
import {
  colorScales,
  contrastRules,
  designPrinciple,
  performancePrinciple,
  radii,
  semanticColors,
  shadows,
  spacing,
  typography,
} from '../data/designTokens.js'

function Section({ title, note, children }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      {note && <p className="mt-2 max-w-prose text-sm text-ink-muted">{note}</p>}
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function DesignSystem() {
  useEffect(() => {
    const sheet = document.createElement('link')
    sheet.rel = 'stylesheet'
    sheet.href = 'https://fonts.googleapis.com/css2?family=Parisienne&display=swap'
    document.head.append(sheet)
    return () => sheet.remove()
  }, [])

  return (
    <main className="content-shell py-section">
      <Seo
        title={`Design system · ${brand.name}`}
        description={`Internal preview of the ${brand.name} design system.`}
        path="/design-system"
        index={false}
      />
      <header>
        <CardEyebrow>Design system</CardEyebrow>
        <h1 className="mt-3 font-display text-4xl text-ink">{brand.name}</h1>
        <p className="mt-4 max-w-prose text-lg text-ink-soft">
          Tokens sampled from the shop&rsquo;s own photos. Anchor swatches are marked with a dot.
        </p>
        <p className="mt-4 max-w-prose text-sm text-ink-muted">{designPrinciple}</p>
        <p className="mt-2 max-w-prose text-sm text-ink-muted">{performancePrinciple}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="espresso">Estd {brand.established}</Badge>
          <Badge variant="cerise">Pink Fridays</Badge>
          <Badge variant="matcha">Matcha counter</Badge>
          <Badge variant="lamp">Open until 12am</Badge>
        </div>
      </header>

      <Section title="Color scales" note="Each scale is named after what it comes from in the shop.">
        <div className="flex flex-col gap-8">
          {colorScales.map((scale) => (
            <div key={scale.name}>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-display text-lg text-ink">{scale.name}</h3>
                <p className="text-sm text-ink-muted">{scale.role}</p>
              </div>
              <p className="mt-1 text-xs text-ink-subtle">{scale.source}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {scale.steps.map((s) => (
                  <div key={s.step} className="w-20">
                    <div
                      className="h-14 rounded-sm border border-line"
                      style={{ backgroundColor: s.hex }}
                    />
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-ink-soft">
                      {s.step}
                      {s.anchor && <span className="size-1.5 rounded-full bg-accent" />}
                    </p>
                    <p className="text-2xs text-ink-subtle">{s.hex}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Semantic tokens" note="What the pages should actually reference.">
        <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {semanticColors.map((group) => (
            <Card key={group.group} padding="sm">
              <CardEyebrow>{group.group}</CardEyebrow>
              <ul className="mt-3 flex flex-col gap-2">
                {group.tokens.map((token) => (
                  <li key={token} className="flex items-center gap-3">
                    <span
                      className="size-6 shrink-0 rounded-xs border border-line"
                      style={{ backgroundColor: `var(--color-${token})` }}
                    />
                    <code className="text-xs text-ink-soft">{token}</code>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Contrast"
        note="Matcha and lamp are fill colours. Their darker steps carry text."
      >
        <ul className="flex flex-col gap-2">
          {contrastRules.map((rule) => (
            <li
              key={rule.pair}
              className="flex flex-wrap items-baseline gap-x-4 border-b border-line pb-2"
            >
              <code className="w-72 shrink-0 text-xs text-ink-soft">{rule.pair}</code>
              <span className="w-20 shrink-0 text-xs text-ink-muted">{rule.ratio}</span>
              <span className="text-sm text-ink-subtle">{rule.verdict}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Typography">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            {typography.families.map((f) => (
              <div key={f.token} className="border-b border-line pb-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <code className="text-xs text-ink-muted">{f.token}</code>
                  <span className="text-xs text-ink-subtle">{f.stack}</span>
                </div>
                <p
                  className={
                    f.token === 'font-display'
                      ? 'font-display mt-2 text-3xl text-ink'
                      : f.token === 'font-script'
                        ? 'font-script mt-2 text-3xl text-accent'
                        : 'mt-2 text-xl text-ink'
                  }
                >
                  Pause here, take a fika.
                </p>
                <p className="mt-1 max-w-prose text-sm text-ink-muted">{f.use}</p>
              </div>
            ))}
          </div>

          <div>
            <CardEyebrow>Sign and label treatments</CardEyebrow>
            <p className="text-sign mt-3 text-2xl text-ink">Pause Here</p>
            <p className="text-label mt-3 text-xs text-ink-muted">Store hours</p>
          </div>

          <div>
            <CardEyebrow>Scale</CardEyebrow>
            <div className="mt-3 flex flex-col gap-3">
              {typography.sizes.map((s) => (
                <div key={s.token} className="flex flex-wrap items-baseline gap-x-4 border-b border-line pb-2">
                  <code className="w-28 shrink-0 text-xs text-ink-muted">{s.token}</code>
                  <span className="w-20 shrink-0 text-xs text-ink-subtle">{s.rem}</span>
                  <span className="text-sm text-ink-subtle">{s.use}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-gutter sm:grid-cols-2">
            <div>
              <CardEyebrow>Weights</CardEyebrow>
              <ul className="mt-3 flex flex-col gap-2">
                {typography.weights.map((w) => (
                  <li key={w.token} className="flex items-baseline gap-3">
                    <code className="w-32 shrink-0 text-xs text-ink-muted">{w.token}</code>
                    <span className="text-sm text-ink-subtle">{w.value} · {w.use}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <CardEyebrow>Tracking</CardEyebrow>
              <ul className="mt-3 flex flex-col gap-2">
                {typography.tracking.map((t) => (
                  <li key={t.token} className="flex items-baseline gap-3">
                    <code className="w-36 shrink-0 text-xs text-ink-muted">{t.token}</code>
                    <span className="text-sm text-ink-subtle">{t.value} · {t.use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Radius, shadow, spacing" note="Soft corners and warm brown-tinted shadows instead of neutral grey.">
        <div className="grid gap-gutter lg:grid-cols-3">
          <div>
            <CardEyebrow>Radius</CardEyebrow>
            <div className="mt-3 flex flex-wrap gap-3">
              {radii.map((r) => (
                <div key={r.token} className="w-24">
                  <div
                    className={`h-16 border border-line-strong bg-surface-blush ${r.token}`}
                  />
                  <code className="mt-1.5 block text-2xs text-ink-subtle">{r.token}</code>
                </div>
              ))}
            </div>
          </div>

          <div>
            <CardEyebrow>Shadows</CardEyebrow>
            <div className="mt-3 flex flex-col gap-4">
              {shadows.map((s) => (
                <div
                  key={s.token}
                  className={`rounded-md border border-line bg-surface p-3 ${s.token}`}
                >
                  <code className="text-2xs text-ink-muted">{s.token}</code>
                  <p className="text-xs text-ink-subtle">{s.use}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <CardEyebrow>Spacing</CardEyebrow>
            <ul className="mt-3 flex flex-col gap-2">
              {spacing.map((s) => (
                <li key={s.token} className="border-b border-line pb-2">
                  <code className="text-xs text-ink-soft">{s.token}</code>
                  <p className="text-xs text-ink-subtle">{s.value} · {s.use}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button arrow>Visit us</Button>
            <Button variant="secondary" arrow>
              Our drinks
            </Button>
            <Button variant="outline" arrow>
              Directions
            </Button>
            <Button variant="ghost">Hours</Button>
            <Button variant="link">Read our story</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" arrow>
              Small
            </Button>
            <Button size="md" arrow>
              Medium
            </Button>
            <Button variant="accent" size="sm">
              Accent
            </Button>
          </div>
          <Card variant="inverse" radius="lg">
            <CardEyebrow>On dark surfaces</CardEyebrow>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button arrow>Visit us</Button>
              <Button variant="secondaryInverse" arrow>
                Our drinks
              </Button>
              <Button variant="outlineInverse" arrow>
                Directions
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-gutter md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardEyebrow>Surface</CardEyebrow>
            <CardTitle className="mt-2">Matcha oat latte</CardTitle>
            <CardText className="mt-2">
              Default resting card for menu items and info blocks.
            </CardText>
            <CardFooter>
              <Button size="sm" variant="outline">Details</Button>
            </CardFooter>
          </Card>

          <Card variant="raised">
            <CardEyebrow>Raised</CardEyebrow>
            <CardTitle className="mt-2">Featured</CardTitle>
            <CardText className="mt-2">Hover and highlighted states.</CardText>
          </Card>

          <Card variant="blush">
            <CardEyebrow>Blush</CardEyebrow>
            <CardTitle className="mt-2">Pink Fridays</CardTitle>
            <CardText className="mt-2">{brand.rituals[0].detail}</CardText>
          </Card>

          <Card variant="inverse">
            <CardEyebrow>Inverse</CardEyebrow>
            <CardTitle className="mt-2">Open until 12am</CardTitle>
            <CardText className="mt-2">
              Tone scope flips the ink and line tokens, so the same utilities work here.
            </CardText>
          </Card>

          <Card variant="polaroid">
            <div className="rounded-xs bg-surface-blush p-6 text-center">
              <p className="text-sign text-sm text-ink">Pause Here</p>
            </div>
          </Card>

          <Card variant="sunken" radius="arch" className="flex items-end justify-center pt-10">
            <p className="text-label text-xs text-ink-muted">rounded-arch</p>
          </Card>
        </div>
      </Section>

      <Section title="Form elements">
        <Card className="max-w-prose">
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <Field label="Name" required>
              {({ id }) => <Input id={id} placeholder="Your name" />}
            </Field>

            <Field label="Email" hint="We only use this to confirm your order.">
              {({ id, describedBy }) => (
                <Input id={id} type="email" placeholder="you@email.com" aria-describedby={describedBy} />
              )}
            </Field>

            <Field label="Drink" hint="Menu items are still to be confirmed.">
              {({ id, describedBy }) => (
                <Select id={id} aria-describedby={describedBy} defaultValue="">
                  <option value="" disabled>
                    Choose a drink
                  </option>
                  <option>Matcha oat latte</option>
                  <option>Iced coffee</option>
                </Select>
              )}
            </Field>

            <Field label="Pickup time" error="Please pick a time while we are open.">
              {({ id, describedBy, invalid }) => (
                <Input id={id} invalid={invalid} aria-describedby={describedBy} defaultValue="3:00am" />
              )}
            </Field>

            <Field label="Notes">
              {({ id }) => <Textarea id={id} placeholder="Less sweet, extra ice…" />}
            </Field>

            <Checkbox label="Text me when it's ready" />

            <div className="flex gap-3">
              <Button type="submit">Send</Button>
              <Button type="reset" variant="ghost">
                Clear
              </Button>
            </div>
          </form>
        </Card>
      </Section>
    </main>
  )
}
