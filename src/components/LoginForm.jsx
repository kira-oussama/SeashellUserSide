import React, { Component } from 'react'
import './../css/login.css';
import male from './../images/male.jpg';
import loading from './../images/loginload.gif';
import Axios from 'axios';
import { Redirect } from 'react-router';

class LoginForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            email : '',
            password : '',
            errors : [],
            is_loading:false,
            redirect : false
        }

        this.emailChangerHandler = this.emailChangerHandler.bind(this);
        this.passwordChangerHandler = this.passwordChangerHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

    }

    componentDidMount(){
        var acessToken = localStorage.getItem('clientData');
        if(acessToken){
            this.setState({redirect:true})
        }
    }

    emailChangerHandler = event=>{
        this.setState({email:event.target.value})
    }

    passwordChangerHandler = event=>{
        this.setState({password:event.target.value})
    }

    submitHandler = event=>{
        event.preventDefault();
        
        this.setState({is_loading:true})
        document.querySelector('.loginButton').setAttribute('disabled','')

        const that = this;
        Axios.post('http://localhost:8000/api/login',{
            email: this.state.email,
            password: this.state.password
        })
        .then(function(response){
            if(response.data.acessToken){
                localStorage.setItem('clientData' , JSON.stringify(response.data));
                that.setState({is_loading:false,redirect:true})
            }else{
                that.setState({is_loading:false,errors:response.data.errors})
                document.querySelector('.loginButton').removeAttribute('disabled')
            }
        })
        .catch(function(errors){
            console.log(errors)
            this.setState({is_loading:false})
        })


    }

    render() {
        var {errors , email , password , is_loading , redirect} = this.state;
        if(redirect){
            return (<Redirect to={'bibliotheque'} />);
        }
        return (
            <div className='LoginFormContainer'>
                
                <img src={male} alt='' className='LoginRoundPic'/>

                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Adresse Email..." value={email} onChange={this.emailChangerHandler} />
                </div>
                
                <div className="form-group">
                  <input type="password" className="form-control" placeholder="Mot De Passe..." min='8' value={password} onChange={this.passwordChangerHandler} />
                </div>

                {
              
                    <p className='err'>{errors}</p>
                }

                <button className='btn btn-primary loginButton' onClick={this.submitHandler}>
                    Login &nbsp;&nbsp;
                    <img src={is_loading? loading : ''} alt={is_loading ? 'loading...':''} height='20' className='loginBtn'/>
                </button>
            
            </div>
        )
    }
}

export default LoginForm
