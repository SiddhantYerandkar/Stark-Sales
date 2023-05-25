import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Card = (props) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/products/${props.id}`)
    }

    function addToCart() {

        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('authToken')
        const cartId = localStorage.getItem('cartId')
        console.log(!cartId);
        if (!cartId) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}/cart`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    localStorage.setItem('cartId', response.data.data._id)
                })
                .catch((err) => { console.log(err.response) })

        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/${userId}/cart`, {
            "productId": props.id,
            "cartId": cartId
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
            .then((response) => { console.log(response.data) })
            .catch((err) => { console.log(err.response) })



    }


    return (
        <>
            <div className="card h-100"  >
                <img src={props.productImage} onClick={handleClick} className="card-img-top" alt={props.title} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <div className='float-start'>
                        <h5 className="card-text text-light-emphasis">₹{props.price}</h5>
                    </div>
                    <div className='float-end'>
                        <button onClick={addToCart} className="btn btn-dark">Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
