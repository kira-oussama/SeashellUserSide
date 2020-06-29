import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Document extends Component {
    render() {
        var {titre, auteur , photo ,id } = this.props;
        return ( 
            <div className="card text-left col-sm-12 col-md-4 searchCard">
              <img className="card-img-top" src={photo} alt="document"/>
              <div className="card-body">
                <h4 className="card-title">{titre}</h4>
                <p className="card-text">{auteur}</p>
                <Link to={`consulte/${id}`} className="btn btn-primary">consulter > </Link>
              </div>
            </div>
        )
    }
}

export default Document
