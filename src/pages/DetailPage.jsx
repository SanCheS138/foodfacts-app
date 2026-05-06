import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )
        if (!cancelled) {
          if (response.data && response.data.product) {
            setProduct(response.data.product)
          } else {
            setError('Product not found.')
          }
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load product details.')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  if (loading) return <p>Loading product details...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>Product not found.</p>

  const { product_name, brands, image_url, nutriments } = product
  const isSaved = saved.some(p => p.code === barcode)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product })
    }
  }

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-header">
        {image_url && <img src={image_url} alt={product_name} />}
        <h2>{product_name}</h2>
        <p>{brands}</p>
      </div>

      <div className="nutrition-table">
        <h3>Nutrition per 100g</h3>
        <ul>
          <li>Energy: {nutriments['energy-kcal_100g']} kcal</li>
          <li>Fat: {nutriments['fat_100g']} g</li>
          <li>Saturated Fat: {nutriments['saturated-fat_100g']} g</li>
          <li>Carbohydrates: {nutriments['carbohydrates_100g']} g</li>
          <li>Sugars: {nutriments['sugars_100g']} g</li>
          <li>Protein: {nutriments['proteins_100g']} g</li>
          <li>Salt: {nutriments['salt_100g']} g</li>
        </ul>
      </div>

      <button onClick={handleSaveToggle}>
        {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
      </button>
    </div>
  )
}

export default DetailPage
