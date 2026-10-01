import { brand } from './brand.js'

export const contactPlaceholders = {
  address: '[ADDRESS NEEDED]',
  phone: '[PHONE NEEDED]',
  hours: '[OPENING HOURS NEEDED]',
  website: '[WEBSITE NEEDED]',
  facebook: '[FACEBOOK NEEDED]',
  instagram: '[INSTAGRAM NEEDED]',
}

/** Visitor-facing copy when a field has not been published. */
export const contactCopy = {
  phone: 'No phone number published yet.',
  hours: 'Hours not published yet.',
  instagram: 'No Instagram link published yet.',
  website: 'No website published yet.',
  facebook: 'No Facebook page published yet.',
}

/* Visible copy stays as published. dateTime values are the machine-readable
   form of those same hours: 12nn is noon, 12am is midnight. */
const dateTime = {
  '10:30am': '10:30',
  '12nn': '12:00',
  '12am': '00:00',
}

/* Monday was not on the published hours card. The other days were. */
export const openingHours = [
  { days: 'Monday', opens: null, closes: null, opensAt: null, closesAt: null },
  ...brand.hours.map((row) => ({
    ...row,
    opensAt: dateTime[row.opens] ?? null,
    closesAt: dateTime[row.closes] ?? null,
  })),
]

const address = brand.address

export const addressLines = address?.street
  ? [
      address.street,
      address.barangay,
      [address.city, address.province, address.postalCode].filter(Boolean).join(', '),
      address.country,
    ].filter(Boolean)
  : null

const mapsQuery = [
  brand.name,
  address?.street,
  address?.barangay,
  address?.city,
  address?.province,
  address?.country,
]
  .filter(Boolean)
  .join(', ')

/* Search link from the published address. Not a confirmed place pin. */
export const mapsUrl = addressLines
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
  : null
