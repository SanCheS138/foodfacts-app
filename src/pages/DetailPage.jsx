import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function DetailPage() {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        const response = await axios.get(url)

        if (response.data && response.data.product) {
          setProduct(response.data.product)
        } else {
          setError('Product not found.')
        }
      } catch (err) {
        setError('Failed to fetch product details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [barcode])

  if (loading) return <p>Loading product details...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>Product not found.</p>

  const { product_name, brands, image_url, nutriments } = product

  const handleSave = () => {
    // For now, just log or store in localStorage
    const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]')
    localStorage.setItem('savedProducts', JSON.stringify([...saved, product]))
    alert('Product saved!')
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

      <button onClick={handleSave}>Save to My List</button>
    </div>
  )
}

export default DetailPage
