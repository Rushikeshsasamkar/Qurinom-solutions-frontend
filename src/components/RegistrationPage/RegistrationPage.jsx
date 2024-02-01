import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './RegistrationPage.css'


const RegistrationPage = () => {
    const backendApi ='https://qurinom-backend-cc6y.onrender.com'
    // const backendApi='https://qurinom-solutions-banckend.vercel.app/'
    const navigate = useNavigate();
    const [registration, setRegistration] = useState({
        username: '',
        password: ''
    });
    const handleRegistration = (e) => {
        const { name, value } = e.target;
        setRegistration((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post(`${backendApi}/register`, registration);
            console.log(response.data);
            navigate('/login')
            window.alert("User registered sucessfully")

        }
        catch (err) {
            console.error(err);

        }

        setRegistration({
            username: '',
            password: ''
        })
    }
    return (
        <div className='registration-container'>
            <h1>Registration form</h1>
            <form className='registration-form' onSubmit={handleSubmit}>
                <input type="text" name='username'
                    placeholder='username'
                    value={registration.username}
                    onChange={handleRegistration}
                    required
                />
                <input type="password" name='password'
                    placeholder='password'
                    value={registration.password}
                    onChange={handleRegistration}
                    required
                />
                <button type='submit'>Submit</button>
                <p>Already registered?
                    <Link to='/'>
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegistrationPage