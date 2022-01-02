import './index.css'

const SimilarProductItem = props => {
  const {details} = props
  const modifDetails = {
    availability: details.availability,
    brand: details.brand,
    description: details.description,
    id: details.id,
    imageUrl: details.image_url,
    price: details.price,
    rating: details.rating,
    style: details.style,
    title: details.title,
    totalReviews: details.total_reviews,
  }

  return (
    <li className="mb-4 mr-4">
      <img
        className="similar-image"
        src={modifDetails.imageUrl}
        alt={`similar product ${modifDetails.title}`}
      />
      <h1 className="dark-color">{modifDetails.title}</h1>
      <p className="light-color">by {modifDetails.brand}</p>
      <div>
        <p className="dark-color">Rs {modifDetails.price}/-</p>
        <div className="rating-container1 bg-primary">
          <p className="details-rating">{modifDetails.rating}</p>
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
