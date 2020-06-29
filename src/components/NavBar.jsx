import React, { Component } from 'react'
import logo from './../images/seashelllogo.png'
import './../css/client.css'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


class NavBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            fullName : '',
            points : 0,
            grade : '',
            redirect : false,
            blocked : 0,
            showBlockScreen : false
        }
    }

    componentDidMount(){
        var info = JSON.parse(localStorage.getItem('clientData'));
        if(!info.acessToken){
            this.setState({redirect:true})
        }else{

            this.setState({
                fullName : info.user.nom + ' ' + info.user.prenom,
                points : info.user.points,
                grade : info.user.grade,
                blocked : info.user.est_penalize
            })

        }

        if(this.state.blocked === 1){
            this.setState({showBlockScreen:true})
        }

    }

    Deconnect = (event)=>{
        event.preventDefault();
        localStorage.clear();
        this.setState({redirect:true})
    }

    render() {
        var {fullName,points,grade,redirect} = this.state;
        if(redirect){
            return <Redirect to={"/"} />
        }
        if(this.state.blocked){
            return <Redirect to={"/blocked"} />
        }
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                    <Link className="navbar-brand" to={"/"}>
                        <img src={logo} alt='SeaShell' className='seaShellNav' />
                    </Link>

                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav ml-auto mt-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link" to={"/bibliotheque"}>Accueil</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={"/chercher"}>Documents</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={"/acheter"}>Boutique</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={"/liste-des-documents"}>Réserve</Link>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link navPoints" href="/">{points} P</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link navGrade" href="/">{grade}</a>
                            </li>

                            <li className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle toggleBtnNav" href="/" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{fullName}</button>
                                <div className="dropdown-menu" aria-labelledby="dropdownId">
                                    <Link to={'/parametre'} className="dropdown-item" >Parametre</Link>
                                    <button className="dropdown-item" onClick={this.Deconnect}>Déconnection</button>
                                </div>
                            </li>

                        </ul>
                    </div>

                </nav>
            </div>
        )
    }
}

export default NavBar
