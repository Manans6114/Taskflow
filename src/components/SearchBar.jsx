import { FaSearch } from 'react-icons/fa'
import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <label className='search-bar'>
      <span className='search-icon'>
        <FaSearch />
      </span>
      <input
        className='search-input'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='Search tasks or users...'
        aria-label='Search tasks or users'
      />
    </label>
  )
}

export default SearchBar