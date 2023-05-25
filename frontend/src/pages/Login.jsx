import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt from 'jwt-decode'
import '../styles/Login.css'
const Login = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const navigate = useNavigate()
  function handleLogin(e) {
    e.preventDefault()

    axios.post(`${process.env.REACT_APP_BASE_URL}/login`, credentials)
      .then((response) => {

        const token = response.data.data.token
        const user = jwt(token)
        localStorage.setItem('authToken', token)
        localStorage.setItem('userId', user.userId)

        alert(response.data.message)
        navigate('/')
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message)
      })
  }

  return (
    <>
      <div className='login-container container'>
        <form className='form-signup'>
          <div className='text-center'>
            <img src='./images/avatar.png' alt='avatar' className='img-fluid mx-auto' width={80} height={80} />
          </div>
          <p>Please enter your email and password!</p>
          <div className='form-group'>
            <input type='email' className='form-control' name='email' value={credentials.email} onChange={handleInput} placeholder='Email address' />
          </div>
          <div className='form-group'>
            <input type='password' className='form-control' name='password' value={credentials.password} onChange={handleInput} placeholder='Password' />
          </div>
          <div className='form-group'>
            <label>
              <input type='checkbox' name='' />
              Remember me.
            </label>
          </div>
          <div className="d-grid">
            <button className="btn btn-success" onClick={handleLogin} type="button">Login</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
