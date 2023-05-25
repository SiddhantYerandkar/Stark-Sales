import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../styles/SingleProduct.css'

const SingleProduct = () => {

  const [prod, setProd] = useState([])

  const { productId } = useParams()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/getProduct/${productId}`)
      .then((response) => {
        setProd(response.data.data)
      })
      .catch((err) => {
        console.log(err.response.data);
      })
  }, [productId])

  return (
    <>
      <div className='sgprod container'>
        <div className='row'>
          <div className='col'>
            <img src={prod.productImage} alt={prod.title} className='img-thumbnail' width={500} />
          </div>
          <div className='col'>
            <h2>{prod.title}</h2>
            <p>{prod.description}</p>
            <p className='price'>₹{prod.price}</p>
            <button className='btn btn-primary'>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleProduct
