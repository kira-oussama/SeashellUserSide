import React, { Component } from 'react'
import Axios from 'axios';
import NavBar from './NavBar';

class Consulte extends Component {

    constructor(props){
        super(props);

        this.state = {
            document : {},
            exemplaires : [],
            available:0,
            id:0,
            both:0,
            reserved:false
        }

        this.reserver = this.reserver.bind(this);
        this.annulerReservation = this.annulerReservation.bind(this);
}


    componentDidMount(){
        var token = JSON.parse(localStorage.getItem('clientData'))
        token = token.acessToken;

        var headers = {
            headers:{
                'Accept' : 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        }

        var id = window.location.href
        id = id.replace('http://localhost:3001/consulte/','')

        Axios.get(`http://localhost:8000/api/consulte/${id}`,headers)
        .then(response=>{
            this.setState({document:response.data,id})
        })
        .catch(err=>{
            console.log(err)
        })

        Axios.get(`http://localhost:8000/api/showExemplaire?id=${id}`,headers)
        .then(response=>{
            this.setState({exemplaires:response.data.exemplaires,
                            both:response.data.both,
                            available:response.data.available,
                            reserved : response.data.reserved
                        })
        })

    }

    reserver = event=>{
        event.preventDefault();
        var token = JSON.parse(localStorage.getItem('clientData'))
        token = token.acessToken;

        var headers = {
            headers:{
                'Accept' : 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        }

        var numcarte = JSON.parse(localStorage.getItem('clientData'));;
        numcarte = numcarte.user.numcarte;

        var post = {
            abonne_numcarte : numcarte,
            document_id : this.state.id
        }

        Axios.put('http://localhost:8000/api/reserver',post,headers)
        .then(response=>{
            document.getElementById('reserverBtn').style.display = 'none';
            document.getElementById('annulerReservation').style.display = 'block';
        })
        .catch(err=>console.log(err))

    }

    annulerReservation = event=>{
        event.preventDefault();
        var token = JSON.parse(localStorage.getItem('clientData'))
        token = token.acessToken;

        var headers = {
            headers:{
                'Accept' : 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        }

        var numcarte = JSON.parse(localStorage.getItem('clientData'));;
        numcarte = numcarte.user.numcarte;

        var post = {
            abonne_numcarte : numcarte,
            document_id : this.state.id
        }

        Axios.post('http://localhost:8000/api/annulerReservation',post,headers)
        .then(response=>{
            document.getElementById('annulerReservation').style.display = 'none';
            if(this.state.available<=0){
                this.setState({reserved:true});
            }
        })
        .catch(err=>console.log(err))

    }


    
    render() {
        var {document,available,exemplaires,both,reserved} = this.state;
        return (
            <div>
                <NavBar />    
                <div className="container">
                    <div className="informations">
                        <img src={document.photo} alt="document" className='ConsulteDocumentPhoto'/>
                        <h1 className='ConsulteTitre'>{document.titre}</h1>
                        <h4 className='ConsulteAuteur'>{document.auteur}</h4>
                        <h4 className='ConsulteAuteur'>Nombre Exemplaires : {both}</h4>
                    </div>

                    <div>
                        {
                            available > 0 || reserved ? '' : <button className='btn btn-danger ConsulteReserveBtn' id='reserverBtn' onClick={this.reserver}>Reserver</button>
                        }
                        {
                            reserved ? <button className='btn btn-danger ConsulteReserveBtn' id='annulerReservation' onClick={this.annulerReservation}>Annuler La Reservation</button> :'' 
                        }
                    </div>

                    <table className="table ConsulteTable">
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Etat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                exemplaires.map(exem=>{
                                    return(
                                        <tr key={exem.id}>
                                            <td><p className={exem.est_prete===1? 'notAvailable':'Available'}></p>{exem.reference_exemplaire}</td>
                                            <td>{exem.etat}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                </div> 

               

            </div>
        )
    }
}

export default Consulte
