import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'

function HomePage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`
      const response = await fetch(url)
      const data = await response.json()

      // Filter out products with no name
      const filteredProducts = data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ''
      )

      setResults(filteredProducts)
    } catch (error) {
      console.error('Something went wrong:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h2>Search Nutrition Info</h2>
      <SearchBar onSearch={handleSearch} />

      {/* State 1: Before any search */}
      {!loading && results.length === 0 && (
        <p>Search for a food above to see its nutrition info.</p>
      )}

      {/* State 2: During a search */}
      {loading && <p>Loading...</p>}

      {/* State 3: After a search with results */}
      {!loading && results.length > 0 && (
        <FoodList products={results} />
      )}

      {/* State 4: After a search with no results */}
      {!loading && results.length === 0 && (
        <p>No results found. Try a different search.</p>
      )}
    </div>
  )
}

export default HomePage
