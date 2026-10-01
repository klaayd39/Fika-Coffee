/* Open/closed status from the published hours in data/contact.js.
   Time is always read in Asia/Manila, not the visitor's device time zone.
   Returns null whenever the data cannot support a certain answer, so the
   badge hides instead of showing something wrong. */

const TIME_ZONE = 'Asia/Manila'
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MINUTES_PER_DAY = 1440

function manilaNow(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type) => parts.find((part) => part.type === type)?.value

  return {
    day: DAYS.indexOf(get('weekday')),
    minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')),
  }
}

function dayIndex(name) {
  const key = name.trim().toLowerCase()
  if (key.length < 3) return -1
  return DAYS.findIndex((day) => day.toLowerCase().startsWith(key))
}

/* Accepts "Tuesday", "Tue", or a range such as "Tuesday – Sunday". */
function parseDays(text) {
  if (typeof text !== 'string') return null
  const parts = text.split(/\s*(?:–|—|-|\bto\b)\s*/i)

  if (parts.length === 1) {
    const index = dayIndex(parts[0])
    return index < 0 ? null : [index]
  }

  if (parts.length === 2) {
    const start = dayIndex(parts[0])
    const end = dayIndex(parts[1])
    if (start < 0 || end < 0) return null
    const days = []
    for (let d = start; ; d = (d + 1) % 7) {
      days.push(d)
      if (d === end) break
    }
    return days
  }

  return null
}

function toMinutes(hhmm) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm ?? ''))
  return match ? Number(match[1]) * 60 + Number(match[2]) : null
}

/* Returns an array indexed by weekday (0 = Sunday). A null entry means the
   day has no published hours, which is unknown, not "closed". Returns null
   if any published row cannot be parsed. */
function buildWeek(rows) {
  const week = Array.from({ length: 7 }, () => null)

  for (const row of rows) {
    if (!row.opens && !row.closes) continue

    const days = parseDays(row.days)
    const open = toMinutes(row.opensAt)
    const closeRaw = toMinutes(row.closesAt)
    if (!days || open == null || closeRaw == null) return null

    /* A close at or before the open time means it runs past midnight.
       12am (00:00) therefore becomes the end of the same day. */
    const close = closeRaw <= open ? closeRaw + MINUTES_PER_DAY : closeRaw

    for (const d of days) {
      week[d] = { open, close, opensLabel: row.opens, closesLabel: row.closes }
    }
  }

  return week
}

export function getOpenStatus(rows, date = new Date()) {
  const week = buildWeek(rows)
  if (!week) return null

  const { day, minutes } = manilaNow(date)
  if (day < 0) return null

  const today = week[day]
  const yesterday = week[(day + 6) % 7]

  /* Still inside yesterday's hours that ran past midnight. */
  if (
    yesterday &&
    yesterday.close > MINUTES_PER_DAY &&
    minutes < yesterday.close - MINUTES_PER_DAY
  ) {
    return { isOpen: true, label: 'Open now', detail: `until ${yesterday.closesLabel}` }
  }

  if (!today) return null

  if (minutes >= today.open && minutes < today.close) {
    return { isOpen: true, label: 'Open now', detail: `until ${today.closesLabel}` }
  }

  for (let offset = 0; offset <= 7; offset += 1) {
    const slot = week[(day + offset) % 7]
    if (!slot) break
    if (offset === 0 && minutes >= today.open) continue

    const when =
      offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : DAYS[(day + offset) % 7]
    return { isOpen: false, label: 'Closed now', detail: `opens ${when} at ${slot.opensLabel}` }
  }

  return { isOpen: false, label: 'Closed now', detail: null }
}
