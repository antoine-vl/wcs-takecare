import React, { Component } from 'react';
import axios from 'axios';


export class FormulaireCommande extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            surName: '',
            email: '',
            gsm: '',
            rue : '',
            numero: '',
            codePostal: '',
            ville: '',
            nameMedicament: '',
            idMedicament: '',
            commentaireClient: '',
            quantite: '',
            taille : '',
            poids: '',
            prix: '',
            namePharmacie: '',
            ruePharmacie: '',
            numeroPharmacie: '',
            codePostalPharmacie: '',
            villePharmacie: '',
            gsmPharmacie: '',
            }
    
    }


    updateForm = (event) => {
        this.setState(
            {[event.target.name] : event.target.value}
        ) 
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/commandes/user',this.state)
          .then(function (response) {
            console.log(`The response is : ${response}`);
          })
          .catch(function (error) {
            console.log(`this is a error : ${error}`);
          });
          console.log(this.state)
    }


    render(){
        // const {commandes} = this.state
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Nom</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="name"
                    value={this.state.name}
                    ></input>

                    <label>Prénom</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="surName"
                    value={this.state.surName}
                    ></input>

                    <label>Mail</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="email"
                    value={this.state.email}
                    ></input>

                    <label>GSM</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="gsm"
                    value={this.state.gsm}
                    ></input>

                    <label>Rue</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="rue"
                    value={this.state.rue}
                    ></input>

                    <label>Numéros</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="numero"
                    value={this.state.numero}
                    ></input>

                    <label>Code postal</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="codePostal"
                    value={this.state.codePostal}
                    ></input>

                    <label>Ville</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="ville"
                    value={this.state.ville}
                    ></input>

                    <label>Nom du mécidament</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="nameMedicament"
                    value={this.state.nameMedicament}
                    ></input>

                    <label>Id du médicament</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="idMedicament"
                    value={this.state.idMedicament}
                    ></input>

                    <label>Commentaire au client</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="commentaireClient"
                    value={this.state.commentaireClient}
                    ></input>

                    <label>Quantité</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="quantite"
                    value={this.state.quantite}
                    ></input>

                    <label>Taille</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="taille"
                    value={this.state.taille}
                    ></input>

                    <label>Poids</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="poids"
                    value={this.state.poids}
                    ></input>

                    <label>Prix</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="prix"
                    value={this.state.prix}
                    ></input>

                    <label>Nom de la pharmacie</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="namePharmacie"
                    value={this.state.namePharmacie}
                    ></input>

                    <label>Rue de la pharmacie</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="ruePharmacie"
                    value={this.state.ruePharmacie}
                    ></input>

                    <label>Numéro de la pharmacie</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="numeroPharmacie"
                    value={this.state.numberPharmacie}
                    ></input>

                    <label>Code postal de la pharmacie</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="codePostalPharmacie"
                    value={this.state.codePostalPharmacie}
                    ></input>

                    <label>Ville de la pharmacie</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="villePharmacie"
                    value={this.state.villePharmacie}
                    ></input>

                    <label>GSM de la pharmacie</label>
                    <input
                    type=""
                    onChange={this.updateForm}
                    name="gsmPharmacie"
                    value={this.gsmPharmacie}
                    ></input>

                    <button>Submit</button>

                </form>
            </div>


        )}
}

export default FormulaireCommande;