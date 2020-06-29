import React, { Component } from 'react'
import NavBar from './NavBar'
import update from './../images/update.svg'
import moreTime from './../images/moreTime.svg'
import Axios from 'axios'
import ExemplairePreter from './ExemplairePreter'
class Acheter extends Component {

    constructor(props){
        super(props);

        this.state = {
            grade : 'bronze',
            points : 0,
            exemplaires : []
        }

        this.ameliorerHandler = this.ameliorerHandler.bind(this);
    }

    componentDidMount(){
        var currentGrade = JSON.parse(localStorage.getItem('clientData'));
        var currentPoints = currentGrade.user.points;
        currentGrade = currentGrade.user.grade;

        if(currentGrade === 'bronze' && currentPoints < 1500){
            document.getElementById('updateBtn').setAttribute('disabled','');
        }
        if(currentGrade === 'silver' && currentPoints < 3000){
            document.getElementById('updateBtn').setAttribute('disabled','');
        }

        this.setState({grade:currentGrade});

        var token = JSON.parse(localStorage.getItem('clientData'))
        var numcarte = token.user.numcarte;
        token = token.acessToken;
        

        var headers = {
            headers:{
                'Accept' : 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.get(`http://localhost:8000/api/exemplaire/pret?numcarte=${numcarte}`,headers)
        .then(response=>{
            this.setState({exemplaires:response.data})
        })
        .catch(err=>console.log(err))

    }


    ameliorerHandler = event=>{
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
            numcarte : numcarte
        }

        var newClientData = JSON.parse(localStorage.getItem('clientData'));
        if(this.state.grade === 'bronze'){
            newClientData.user.grade = 'silver';
        }else 
        if(this.state.grade === 'silver'){
            newClientData.user.grade = 'gold';
        }

        newClientData.user.points -= 1500;

        Axios.put('http://localhost:8000/api/ameliorer',post,headers)
        .then(response=>{
            localStorage.setItem('clientData' , JSON.stringify(newClientData));
            if(this.state.grade === 'bronze'){
                newClientData.user.grade = 'silver';
            }else 
            if(this.state.grade === 'silver'){
                newClientData.user.grade = 'gold';
            }

            window.location.reload();
        })
        .catch(err=>console.log(err))

    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container">
                    <h1 className='boutique'>Boutique</h1>

                    <div className="row">
                        <div className="card col-sm-12 col-md-5 leftCard">
                          <img className="card-img-top" src={update} alt="update" />
                          <div className="card-body">
                            <h4 className="card-title">Améliorer Votre Grade</h4>
                            {
                                this.state.grade === 'bronze' ? <p className="card-text">1500 Points</p> : this.state.grade === 'silver' ? <p className="card-text">3000 Points</p> : <p>Vous ne pouvez pas ameliorer votre niveau plus que ça</p>
                            }
                            {
                                this.state.grade === 'gold' ? '' : <button className='btn btn-primary' id='updateBtn' onClick={this.ameliorerHandler}>Améliorer</button>
                            }
                          </div>
                        </div>

                        <div className="card col-sm-12 col-md-5">
                          <img className="card-img-top" src={moreTime} alt="update" />
                          <div className="card-body">
                            <h4 className="card-title">Une Semaine de Plus</h4>
                            <p className="card-text">200 Points</p>
                            {
                                this.state.exemplaires.map(exem=>{
                                    return(
                                    <ExemplairePreter 
                                        key={exem.reference_exemplaire}
                                        reference_exemplaire = {exem.reference_exemplaire}
                                    />)
                                })
                            }
                          </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Acheter
