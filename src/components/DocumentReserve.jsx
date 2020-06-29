import React, { Component } from 'react'

class DocumentReserve extends Component {

    constructor(props){
        super(props);

        this.deleteReservation = this.deleteReservation.bind(this);
    }

    deleteReservation = (event,id)=>{
        event.preventDefault();
        this.props.deleteReservation(event,id);
    }

    render() {
        var {titre,auteur,id}=this.props
        return (
            
            <tr>
                <td>{titre}</td>
                <td>{auteur}</td>
                <td>
                    <button className='btn btn-danger' onClick={(event)=>this.deleteReservation(event,id)}>Annuler Reservation</button>
                </td>
            </tr>
            
        )
    }
}

export default DocumentReserve
