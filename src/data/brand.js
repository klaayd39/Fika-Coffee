/* Only details readable from the public Facebook page.
   Anything unverified is left as null and listed in needsConfirmation. */

export const brand = {
  name: 'Fika Coffee',
  category: 'Cafe',
  established: 2025,
  tagline: 'Pause here, take a fika.',
  sign: 'Pause Here',
  audienceName: 'fika friends',
  address: {
    street: 'San Isidro Extension',
    barangay: 'Barangay 9',
    city: 'Malaybalay City',
    province: 'Bukidnon',
    country: 'Philippines',
    postalCode: '8700',
  },
  hours: [
    { days: 'Tuesday – Friday', opens: '10:30am', closes: '12am' },
    { days: 'Saturday – Sunday', opens: '12nn', closes: '12am' },
  ],
  rituals: [
    {
      name: 'Pink Fridays',
      detail: 'Wear pink on Fridays for ₱10 off your fika drink.',
    },
  ],
  phone: null,
  email: null,
  facebook: 'https://www.facebook.com/people/Fika-Coffee/61575528421681/',
  instagram: null,
  website: null,
  /* Street address is published. A precise map pin is not. */
  mapPin: null,
}

export const needsConfirmation = [
  'Monday hours',
  'Phone, email, Instagram, website',
  'Exact map pin',
  'Full drinks menu and prices',
  'Food menu and whether baking is in-house',
  'Script typefaces',
  'Production domain for robots.txt and sitemap.xml',
  'Business origin story',
]
