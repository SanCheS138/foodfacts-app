import { useState } from 'react'
import axios from 'axios'

function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchFood = async (query) => {
    setLoading(true)
    setError(null)

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl`
      const response = await axios.get(url, {
        params: {
          search_terms: query,
          json: 1,
          page_size: 10
        }
      })

      const filtered = response.data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ''
      )

      setResults(filtered)
    } catch (err) {
      if (err.response) {
        // Server responded with a non‑2xx status
        setError(`Server error: ${err.response.status}. Please try again.`)
      } else if (err.request) {
        // Request made but no response received (likely offline)
        setError('Network error. Check your connection and try again.')
      } else {
        // Something else went wrong
        setError('Something went wrong. Please try again.')
      }
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, searchFood }
}

export default useFoodSearch
