import React, { Component } from 'react';
import './../css/login.css';
import LoginForm from './LoginForm';
import landing from './../images/login_landing.jpg'
import seashell from './../images/seashelllogo.png'
class Login extends Component {
    render() {
        return (
            <div className='loginContainer'>
                <img src={seashell} alt="seashell_logo" className='seashelLoginLogo'/>
                <img src={landing} alt="lading" className='loginContainerImg d-none d-md-block'/>
                <LoginForm />
            </div>
        )
    }
}

export default Login
