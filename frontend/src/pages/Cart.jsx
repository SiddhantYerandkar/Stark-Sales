import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/Cart.css'
import Payment from '../components/Payment'

const Cart = () => {

  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState([])
  const [trigger, setTrigger] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    console.log(userId);
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}/cart`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data);
        setCartItems(response.data.data.items)
        setTotal(response.data.data.totalPrice)
      })
      .catch((err) => { console.log(err.response) })
  }, [trigger])


  const handleQuantity = (productId) => {
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    const cartId = localStorage.getItem('cartId')
    console.log(localStorage);
    axios.put(`${process.env.REACT_APP_BASE_URL}/users/${userId}/cart`, {
      "cartId": cartId,
      "productId": productId,
      "removeProduct": "1"
    }, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data);
        setTrigger(!trigger)
      })
      .catch((err) => {
        console.log(err.response);
      })

  }

  const handleAddItem = (productId) => {
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    const cartId = localStorage.getItem('cartId')

    axios.post(`${process.env.REACT_APP_BASE_URL}/users/${userId}/cart`, {
      "productId": productId,
      "cartId": cartId
    }, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data)
        setTrigger(!trigger)
      })
      .catch((err) => { console.log(err.response) })
  }



  return (
    <>
      <div className='cart-container container'>
        <div className='row'>
          <div className="col-lg-12 text-center border rounded bg-light my-5">
            <h1>MY CART</h1>
          </div>
        </div>
        <div className='col'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {
                cartItems.map((items) => {
                  return (
                    <tr key={items.productId._id}>
                      <th><img src={items.productId.productImage} alt="..." className='mw-100' /></th>
                      <td>{items.productId.title}</td>
                      <td>{items.productId.price}</td>
                      <td>
                        <button className='plus-button btn btn-secondary btn-sm' onClick={() => handleAddItem(items.productId._id)}  >+</button>
                        <label>  {items.quantity} </label>
                        <button className='minus-button btn btn-secondary btn-sm' onClick={() => handleQuantity(items.productId._id)} >-</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <div className="card mb-5">
          <div className="card-body p-4">
            <div className="float-end">
              <p className="mb-0 me-5 d-flex align-items-center">
                <span className="small text-muted me-2">Order total:</span> <span
                  className="lead fw-normal">₹{total}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-light btn-lg me-2" onClick={() => { navigate('/') }} >Continue shopping</button>

          {
            (cartItems.length > 0) ? <Payment cartItems={cartItems} /> : ""
          }

        </div>
      </div>
    </>
  )
}

export default Cart
