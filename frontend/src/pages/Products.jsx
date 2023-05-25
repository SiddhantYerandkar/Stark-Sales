import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Card'
const Products = () => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/getProducts`)
            .then((response) => {
                setProduct(response.data.data)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }, [])

    return (
        <>  <h1 className='product-heading text-dark-emphasis fs-2 fw-bolder'>Products we offer:</h1>
            <div className='container'>
                <div className='row'>
                    {
                        product.map((data) => {
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
            </div>
        </>
    )
}

export default Products
