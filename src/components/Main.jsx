import React, { Component } from 'react'
import NavBar from './NavBar'
import welcome from './../images/welcome.svg'
import { Link } from 'react-router-dom'
import Axios from 'axios'

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            is_available : false,
            documents: [],
            exemplaires : []
        }
    }

    componentDidMount(){
        var numcarte = JSON.parse(localStorage.getItem('clientData'));
        numcarte = numcarte.user.numcarte;
        
        var token = JSON.parse(localStorage.getItem('clientData'))
        token = token.acessToken;

        var headers = {
            headers:{
                'Accept' : 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.get(`http://localhost:8000/api/afficherReservation?abonne_numcarte=${numcarte}`,headers)
        .then(response=>{
            this.setState({documents:response.data})
            if(this.state.documents.length > 0){
                Axios.get(`http://localhost:8000/api/showExemplaire?id=${this.state.documents[0].id}`,headers)
                .then(response=>{
                    this.setState({exemplaires:response.data.exemplaires})
                    if(this.availableDocuments() > 0 ){
                        this.setState({is_available:true});
                    }
                })
            }
        })
        .catch(err=>console.log(err));

    }

    availableDocuments = ()=>{
        var available = 0;
        this.state.exemplaires.forEach(exem=>{
            if(exem.est_prete === 0){
                available += 1;
            }
        })
        return available;
    }

    cacherClickHandler = event =>{
        event.preventDefault();
        document.querySelector('.availableBox').style.display = 'none';
        document.querySelector('.disable').style.display = 'none';
    }

    render() {
        var {is_available} = this.state;
        return (
            <div>
                <NavBar />
                {is_available?<div className='disable'></div> : ''}
                {is_available ? 
                    <div className='availableBox'>
                        <h1>le document que vous avez réservé est disponible maintenant</h1>
                        <button className='btn btn-danger' onClick={this.cacherClickHandler}>cacher</button>
                    </div>
                :''}
                <img src={welcome} alt="landing" className='WelcomeImg d-none d-lg-block'/>
                <div className='IntoContainer'>
                    <h1 className='SeashellSlogan'>BIENVENU AU SEASHELL</h1>
                    <Link to={'chercher'} className='btn btn-primary ShowBooksMain'>Voire les livres</Link>
                </div>
            </div>
        )
    }
}

export default Main
