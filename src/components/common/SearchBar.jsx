import { Icon } from './Icon'

export function SearchBar({ value, onChange, placeholder = 'Search leads' }) {
  return (
    <label className="search-bar">
      <span className="sr-only">Search</span>
      <Icon name="search" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}
