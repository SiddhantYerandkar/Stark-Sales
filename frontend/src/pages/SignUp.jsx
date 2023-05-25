import React, { useState } from 'react'
import '../styles/SignUp.css'
import axios from 'axios'

const SignUp = () => {

    const [userData, setuserData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        phone: ''
    })

    const handleData = (e) => {
        setuserData({ ...userData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_BASE_URL}/register`, userData)
            .then((response) => {
                console.log(response.data.data.message);
                
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    return (
        <>
            <div className='signUp-container container'>
                <form className='form-signup'>
                    <h2>Register</h2>
                    <p>Create your account to continue</p>
                    <div className='form-group'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <input type='text' className='form-control' name='fname' value={userData.fname} onChange={handleData} placeholder='First Name' />
                            </div>
                            <div className='col-md-6'>
                                <input type='text' className='form-control' name='lname' value={userData.lname} onChange={handleData} placeholder='Last Name' />
                            </div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type='email' className='form-control' name='email' value={userData.email} onChange={handleData} placeholder='Email' />
                    </div>
                    <div className='form-group'>
                        <input type='password' className='form-control' name='password' value={userData.password} onChange={handleData} placeholder='Password' />
                    </div>
                    <div className='form-group'>
                        <input type='tel' pattern='[0-9]{10}' className='form-control' name='phone' value={userData.phone} onChange={handleData} placeholder='Phone' />
                    </div>
                    <div className='form-group'>
                        <label>
                            <input type='checkbox' name='' />
                            I accept the Terms of Use & Privacy Policy
                        </label>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary" onClick={handleSubmit} type="button">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp
