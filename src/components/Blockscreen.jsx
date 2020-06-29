import React, { Component } from 'react';
import './../css/client.css';
import { Redirect } from 'react-router';
import Blockimg from '../images/blocked.svg';

class Blockscreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            date_depinalisation : '',
            redirect : false
        }
        this.Deconnect = this.Deconnect.bind(this);
    }

    componentDidMount(){
        var clientData = JSON.parse(localStorage.getItem('clientData'));

        var date_depinalisation = clientData.user.date_de_depinalization;
        this.setState({date_depinalisation})
    }

    Deconnect = (event)=>{
        event.preventDefault();
        localStorage.clear();
        this.setState({redirect:true})
    }


    render() {
        if(this.state.redirect){
            return <Redirect to={'/'} />
        }
        return (
            <div className='container'>
                <img src={Blockimg} alt="blocked" className="blockImg d-none d-lg-block"/>
                <div className="blockScreen">
                    <h1>Vous ètes Penlisé jusqu'a</h1>
                    <h1>{this.state.date_depinalisation}</h1>
                    <button className='btn btn-primary' onClick={this.Deconnect}>LOGOUT</button>
                </div>
            </div>
        )
    }
}

export default Blockscreen
