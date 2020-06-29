import React, { Component } from 'react'
import NavBar from './NavBar'
import Axios from 'axios'
import loading from '../images/loading.gif'

class Settings extends Component {
    
    constructor(props){
        super(props);

        this.state={
            fullName : '',
            points : 0,
            grade : '',
            email:'',
            password: '',
            adresse : '',
            sexe : '',
            newpassword:'',
            errors : "",
            is_loading: "",
            pwd_changed: false
        }
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
        this.newpasswordChangeHandler = this.newpasswordChangeHandler.bind(this)
        this.updatePassowrd = this.updatePassowrd.bind(this)
    }

    passwordChangeHandler = event =>{
        this.setState({password:event.target.value})
    }

    newpasswordChangeHandler = event =>{
        this.setState({newpassword:event.target.value})
    }

    componentDidMount(){
        var info = JSON.parse(localStorage.getItem('clientData'));
        var user = info.user;
        this.setState({
            fullName : user.nom +' '+ user.prenom,
            points : user.points,
            grade : user.grade,
            email : user.email,
            adresse : user.adresse,
            sexe : user.sexe
        })
    }

    updatePassowrd = event =>{
        event.preventDefault();
        this.setState({is_loading:true, errors: ""})
        var token = JSON.parse(localStorage.getItem('clientData'))
        token = token.acessToken;

        var headers = {
            headers:{
                'Accept' : 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        }

        var post = {
            email:this.state.email,
            password:this.state.password,
            newpassword: this.state.newpassword
        }

        Axios.post('http://localhost:8000/api/updatePassword',post,headers)
        .then(response=>{
            console.log(response)
            if(response.data.errors){
                this.setState({errors:response.data.errors, is_loading: false, password: "", newpassword: ""})
            }else if(response.data.nom){
                this.setState({is_loading: false, pwd_changed: true, password: "", newpassword: ""})
                setTimeout(()=>{
                    this.setState({pwd_changed: false})
                }, 2000);
            }
            this.setState({is_loading: false, password: "", newpassword: ""})
        })
        .catch(err=>console.log(err))
    }

    render() {
        var {fullName, points, grade, email, adresse, sexe , password, newpassword} = this.state;
        return (
            <div>
                <NavBar />
                <div className="container">
                    <div className="Settings">
                        <h1 className='ParametresTitle'>Parametres</h1>
                        <h1 className='settingsName'>{fullName}</h1>
                        <h4>Sexe : {sexe}</h4>
                        <h4>Email : {email}</h4>
                        <h4>Adresse : {adresse}</h4>
                        <h4>Grade : {grade}</h4>
                        <h4>Points : {points}</h4>
                        <h4>Changer le mot de passe :</h4>
                    </div>
                    
                    <div className="form-group col-6">
                      <input type="password"
                        className="form-control" placeholder="Ancien Mot De Passe..." value={password} onChange={this.passwordChangeHandler}/>
                    </div>
                    <div className="form-group col-6">
                      <input type="password"
                        className="form-control" placeholder="Nouveau Mot De passe..." value={newpassword} onChange={this.newpasswordChangeHandler}/>
                    </div>

                    {this.state.errors.length > 1 ? <h3>{this.state.errors}</h3>:""}
                    {this.state.pwd_changed ? <h3>votre mot de passe est changé avec succès</h3>:""}

                    <div>
                        <button className='btn btn-primary' onClick={this.updatePassowrd}>Changer</button>&nbsp;
                        {this.state.is_loading ? <img src={loading} style={{height: "2rem"}} alt={"loading"} /> : "" }
                    </div>

                </div>
            </div>
        )
    }
}

export default Settings
