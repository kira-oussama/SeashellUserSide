import React, { Component } from 'react'
import NavBar from './NavBar';
import Axios from 'axios';
import DocumentReserve from './DocumentReserve';

class Reserve extends Component {

    constructor(props){
        super(props);

        this.state = {
            documents : [],
        }
        this.deleteReservation = this.deleteReservation.bind(this);
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
        })
        .catch(err=>console.log(err));

    }

    deleteReservation = (event,id)=>{
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
            document_id : id
        }
        var documents = this.state.documents.filter(doc=>doc.id !== id);

        Axios.post('http://localhost:8000/api/annulerReservation',post,headers)
        .then(response=>{

            this.setState({documents})
        })
        .catch(err=>console.log(err))

    }

    render() {
        var {documents} = this.state;
        return (
            <div>
                <NavBar />
                <div className="container reserve">
                    <h3>Les documents réservés</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Auteur</th>
                                <th>Annuler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                documents.map(doc=>{
                                    return(
                                    <DocumentReserve
                                        key={doc.id}
                                        titre={doc.titre}
                                        auteur={doc.auteur}
                                        id={doc.id}
                                        deleteReservation={this.deleteReservation}
                                    />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {documents.length < 1 ? <h1>vous n'avez réservé aucun document</h1> : ""}
                </div>

                
            </div>
        )
    }
}

export default Reserve
