export function BarList({ items, emptyLabel = 'No data yet.' }) {
  const max = Math.max(...items.map((item) => item.value), 0)

  if (!items.some((item) => item.value > 0)) {
    return <p className="muted">{emptyLabel}</p>
  }

  return (
    <ul className="bar-list">
      {items.map((item) => (
        <li key={item.label}>
          <div className="bar-list__label">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
          <div className="bar-list__track" aria-hidden="true">
            <span
              style={{ width: max === 0 ? '0%' : `${(item.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
