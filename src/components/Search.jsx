import React, { Component } from 'react'
import NavBar from './NavBar'
import Axios from 'axios'
import Document from './Document';
import loading from './../images/loading.gif'

class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            auteur : '',
            titre : '',
            documents : [],
            is_loading : false
        }

        this.titreChangeHandler = this.titreChangeHandler.bind(this);
        this.auteurChangeHandler = this.auteurChangeHandler.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
    }

    auteurChangeHandler = event =>{
        this.setState({auteur:event.target.value});
    }

    titreChangeHandler = event =>{
        this.setState({titre:event.target.value})
    }

    SubmitHandler = event=>{
        event.preventDefault();
        this.setState({is_loading:true});

        var token = JSON.parse(localStorage.getItem('clientData'))
        token = token.acessToken;
        // console.log(token)

        var headers = {
            headers:{
                'Accept' : 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.get(`http://localhost:8000/api/search?titre=${this.state.titre}&auteur=${this.state.auteur}`,headers)
        .then(response=>{
            this.setState({documents:response.data.data,is_loading:false})
        })
        .catch(err=>{
            console.log(err)
            this.setState({is_loading:false})
        })


    }

    render() {
        var {titre, auteur, is_loading} = this.state;
        return (
            <div>
                <NavBar />
                <div className="container">

                    <div className="SearchFormContainer">
                        <h3>Rechercher un document</h3>
                        <div className="row">
                            <div className="form-group col-sm-12 col-md-5">
                                <input type="text" className="form-control" placeholder="Titre..." value={titre} onChange={this.titreChangeHandler}/>
                            </div>
                            
                            <div className="form-group col-sm-12 col-md-5">
                                <input type="text" className="form-control" placeholder="Auteur..." value={auteur} onChange={this.auteurChangeHandler} />
                            </div>

                            <div className='col-sm-12 col-md-2'>
                                <button className='btn btn-primary ' onClick={this.SubmitHandler}><i className="fa fa-search" aria-hidden="true"></i></button>
                                &nbsp;&nbsp;
                                <img src={is_loading ? loading : ''} alt={is_loading ? 'loading...' : ''} className='loadingSearch'/>
                            </div>
                        </div>
                    </div>


                    <div className='row'>
                        {
                            this.state.documents.map(doc=>{
                                return(<Document 
                                    key={doc.id}
                                    titre={doc.titre}
                                    auteur={doc.auteur}
                                    photo={doc.photo}
                                    id={doc.id}
                                />)
                            })
                        }
                    </div>

                </div>
            </div>
        )
    }
}

export default Search
