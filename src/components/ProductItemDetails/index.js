import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsPlusSquare, BsDashSquare, BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'

import './index.css'

const responseStateList = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class ProductItemDetails extends Component {
  state = {
    responseState: responseStateList.initial,
    detailsData: [],
    quantity: 1,
  }

  componentDidMount() {
    this.getdetailsofproducts()
  }

  getdetailsofproducts = async () => {
    this.setState({responseState: responseStateList.progress})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    console.log(response.ok)
    if (response.ok) {
      const data = await response.json()
      const modifData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        title: data.title,
        totalReviews: data.total_reviews,
      }
      this.setState({
        responseState: responseStateList.success,
        detailsData: modifData,
      })
    } else {
      this.setState({responseState: responseStateList.failed})
    }
  }

  increaseQuantity = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
  }

  decreaseQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prev => ({quantity: prev.quantity - 1}))
    }
  }

  redirectToProducts = () => {
    const {history} = this.props
    history.replace('/products')
  }

  successPage = () => {
    const {detailsData, quantity} = this.state
    const {
      availability,
      brand,
      description,
      id,
      imageUrl,
      price,
      rating,
      similarProducts,
      title,
      totalReviews,
    } = detailsData
    console.log(similarProducts)
    return (
      <div className="bg-container">
        <div className="details-container">
          <div className="image-container">
            <img className="details-image" src={imageUrl} alt="product" />
          </div>
          <div className="deatail2-container">
            <h1 className="details-heading">{title}</h1>
            <p className="details-price">Rs {price}/-</p>
            <div className="container-2">
              <div className="rating-container1 bg-primary">
                <p className="details-rating">{rating}</p>
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p className="details-review">{totalReviews} Reviews</p>
            </div>
            <p className="details-description">{description}</p>
            <div className="d-flex">
              <p className="dark-color">Available:</p>
              <p className="light-color pt-1 ml-2">{availability}</p>
            </div>
            <div className="d-flex">
              <p className="dark-color">Brand:</p>
              <p className="light-color pt-1 ml-2">{brand}</p>
            </div>
            <hr />
            <div className="quanity-container">
              <button
                onClick={this.increaseQuantity}
                className="border-0 bg-transparent m-2"
                testid="plus"
              >
                <BsPlusSquare className="icon2" />
              </button>
              <p>{quantity}</p>
              <button
                onClick={this.decreaseQuantity}
                className="border-0 bg-transparent m-2"
                testid="minus"
              >
                <BsDashSquare className="icon2" />
              </button>
            </div>
            <button className="btn btn-primary mt-2">ADD TO CART</button>
          </div>
        </div>
        <h1 className="mt-5">Similar Product</h1>
        <ul className="ulList">
          {similarProducts.map(eachItem => (
            <SimilarProductItem details={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  progressPage = () => (
    <div className="text-center mt-5" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  failedPage = () => (
    <div className="text-center mt-5 p-5">
      <img
        className="w-75 mt-5"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h2 className="m-4">Product Not Found</h2>
      <button onClick={this.redirectToProducts} className="btn btn-primary m-4">
        Continue Shopping
      </button>
    </div>
  )

  renderResult = () => {
    const {responseState} = this.state

    switch (responseState) {
      case responseStateList.success:
        return this.successPage()
      case responseStateList.failed:
        return this.failedPage()
      case responseStateList.progress:
        return this.progressPage()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderResult()}
      </div>
    )
  }
}

export default ProductItemDetails
