import React, { Component } from 'react'
import Axios from 'axios';

class ExemplairePreter extends Component {

    constructor(props){
        super(props);

        this.acheterHandler = this.acheterHandler.bind(this);
    }


    componentDidMount(){
        var clientData = JSON.parse(localStorage.getItem('clientData'));
        var currentPoints = clientData.user.points;
        if(currentPoints < 200){
            document.getElementById('acheterBtn').setAttribute('disabled','');
        }

    }

    acheterHandler = event=>{
        event.preventDefault();
        var token = JSON.parse(localStorage.getItem('clientData'))
        var numcarte = token.user.numcarte;
        token = token.acessToken;
        

        var headers = {
            headers:{
                'Accept' : 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        }
        
        var post = {
            numcarte : numcarte,
            reference_exemplaire : this.props.reference_exemplaire
        }

        var newClientData = JSON.parse(localStorage.getItem('clientData'));
        Axios.post('http://localhost:8000/api/moreTime',post,headers)
        .then(response=>{
            newClientData.user.points -= 200;
            localStorage.setItem('clientData' , JSON.stringify(newClientData));
            window.location.reload();
        })
        .catch(err=>console.log(err))
    }

    render() {
        var {reference_exemplaire} = this.props
        return (          
            <p>{reference_exemplaire} &nbsp;&nbsp;
                <button className='btn btn-primary' id='acheterBtn' onClick={this.acheterHandler}>Acheter</button>
            </p>
        )
    }
}

export default ExemplairePreter
