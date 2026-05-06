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

      // Filter out products with no name
      const filtered = response.data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ''
      )

      setResults(filtered)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, searchFood }
}

export default useFoodSearch
