export function formatEGP(value) {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return '0 EGP'
  return `${Math.round(amount).toLocaleString('en-US')} EGP`
}

export function formatPercent(value, digits = 1) {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return '0%'
  return `${amount.toFixed(digits)}%`
}

export function parseMoney(value) {
  if (value === '' || value == null) return NaN
  const amount = Number(String(value).replace(/,/g, '').trim())
  return amount
}
