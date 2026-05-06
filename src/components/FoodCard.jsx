function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <div className="food-card">
      {/* Product image with fallback */}
      {image_small_url ? (
        <img src={image_small_url} alt={product_name || "Food product"} />
      ) : (
        <div className="image-fallback">No Image Available</div>
      )}

      {/* Product name */}
      {product_name ? <h2>{product_name}</h2> : <h2>Unknown Product</h2>}

      {/* Brand */}
      {brands ? <p><strong>Brand:</strong> {brands}</p> : <p><strong>Brand:</strong> Unknown</p>}

      {/* Nutriments */}
      <div className="nutriments">
        <p>Calories: {nutriments?.['energy-kcal_100g'] ?? "N/A"} kcal</p>
        <p>Protein: {nutriments?.proteins_100g ?? "N/A"} g</p>
        <p>Carbs: {nutriments?.carbohydrates_100g ?? "N/A"} g</p>
        <p>Fat: {nutriments?.fat_100g ?? "N/A"} g</p>
      </div>
    </div>
  )
}

export default FoodCard
