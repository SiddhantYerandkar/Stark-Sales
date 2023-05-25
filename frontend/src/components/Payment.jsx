import React from 'react'
import axios from 'axios'


const Payment = ({ cartItems }) => {
    const user = localStorage.getItem('userId')
    const handleCheckout = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/create-checkout-session`, {
            cartItems,
            userId: user
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <button type="button" className="btn btn-warning btn-lg" onClick={() => handleCheckout()} >Checkout</button>
        </>
    )
}

export default Payment
