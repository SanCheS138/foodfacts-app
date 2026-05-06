import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // only search if query is not empty
    if (query.trim()) {
      // call the onSearch function passed from parent
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
