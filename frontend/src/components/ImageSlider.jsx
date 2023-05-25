import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import '../styles/Carousel.css'

const ImageSlider = () => {
    return (
        <>
            <div>
                <Carousel infiniteLoop autoPlay>
                    <div className='image'>
                        <img src='./images/i9.jpg' alt='i9' />
                    </div>
                    <div className='image'>
                        <img src='./images/amd5700xt.jpg' alt='amd5700xt' />
                    </div>
                    <div className='image'>
                        <img src='./images/RTX3080.jpg' alt='RTX3080' />
                    </div>
                    <div className='image'>
                        <img src='./images/ryzen7.jpg' alt='ryzen7' />
                    </div>
                </Carousel>
            </div>
            <div>
                <h3>Best-Selling <span className="badge">Hot</span></h3>
            </div>
            
        </>
    )
}

export default ImageSlider
