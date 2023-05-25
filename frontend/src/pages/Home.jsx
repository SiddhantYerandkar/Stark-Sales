import React, { useEffect, useState } from 'react'
import ImageSlider from '../components/ImageSlider'
import axios from "axios";
import Card from '../components/Card';
const Home = () => {

    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/getProducts`)
            .then((response) => {
                setBestSeller(response.data.data)
            })
            .catch((err) => {
                console.log(err.response);
            })
        const token = localStorage.getItem('authToken')
        const userId = localStorage.getItem('userId')
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}/cart`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                localStorage.setItem('cartId', response.data.data._id)
            })
            .catch((err) => { console.log(err.response) })
            
    }, [])

    return (
        <>
            <div>
                <ImageSlider />
            </div>
            <div className='row'>
                {
                    bestSeller.slice(0, 6).map((data) => {
                        return (
                            <div className='col-lg-4 col-md-12 mb-4' key={data._id} >
                                <Card productImage={data.productImage}
                                    title={data.title}
                                    price={data.price}
                                    desc={data.description}
                                    id={data._id}
                                ></Card>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home
