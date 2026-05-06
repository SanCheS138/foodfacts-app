import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage.jsx'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch()

  return (
    <div className="page">
      <h2>Search Nutrition Info</h2>
      <SearchBar onSearch={searchFood} />

      {/* Error state */}
      {error && <ErrorMessage message={error} />}

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Empty state (before any search) */}
      {!loading && !error && results.length === 0 && (
        <p>Search for a food above to see its nutrition info.</p>
      )}

      {/* Results state */}
      {!loading && !error && results.length > 0 && (
        <FoodList products={results} />
      )}

      {/* No results state */}
      {!loading && !error && results.length === 0 && (
        <p>No results found. Try a different search.</p>
      )}
    </div>
  )
}

export default HomePage
