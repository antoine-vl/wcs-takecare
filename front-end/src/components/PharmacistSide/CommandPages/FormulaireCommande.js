// import React, { Component } from 'react';
// import axios from 'axios';
// import PermanentDrawerLeft from '../PermanentDrawerLeft';


// export class FormulaireCommande extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             name: '',
//             surname: '',
//             email: '',
//             gsm: '',
//             rue : '',
//             numero: '',
//             codePostal: '',
//             ville: '',
//             nameMedicament: '',
//             idMedicament: '',
//             commentaireClient: '',
//             quantite: '',
//             taille : '',
//             poids: '',
//             prix: '',
//             namePharmacie: '',
//             ruePharmacie: '',
//             numeroPharmacie: '',
//             codePostalPharmacie: '',
//             villePharmacie: '',
//             gsmPharmacie: '',
//             }
    
//     }


//     updateForm = (event) => {
//         this.setState(
//             {[event.target.name] : event.target.value}
//         ) 
//     }

//     handleSubmit = (event) => {
//         event.preventDefault()
//         axios.post('/commandes/user',this.state)
//           .then(function (response) {
//             console.log(`The response is : ${response}`);
//           })
//           .catch(function (error) {
//             console.log(`this is a error : ${error}`);
//           });
//           console.log(this.state)
//     }


//     render(){
//         // const {commandes} = this.state
//         return(
//             <>
//             < PermanentDrawerLeft />
//             <div className="headerForm">
//                 <form onSubmit={this.handleSubmit}>
//                     <fieldset className="formInfoClient">
//                         <legend>Information client</legend>
//                         <div><label>Nom
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="name"
//                         value={this.state.name}
//                         ></input></label></div>

//                         <div><label>Prénom
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="surname"
//                         value={this.state.surname}
//                         ></input></label></div>

//                         <div><label>Mail
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="email"
//                         value={this.state.email}
//                         ></input></label></div>

//                         <div><label>GSM
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="gsm"
//                         value={this.state.gsm}
//                         ></input></label></div>

//                         <div><label>Rue
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="rue"
//                         value={this.state.rue}
//                         ></input></label></div>

//                         <div><label>Numéros
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="numero"
//                         value={this.state.numero}
//                         ></input></label></div>

//                         <div><label>Code postal
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="codePostal"
//                         value={this.state.codePostal}
//                         ></input></label></div>

//                         <div><label>Ville
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="ville"
//                         value={this.state.ville}
//                         ></input></label></div>
//                     </fieldset>
//                     <fieldset className="formMedicament">
//                         <legend>Médicament</legend>
//                         <div><label>Nom du mécidament
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="nameMedicament"
//                         value={this.state.nameMedicament}
//                         ></input></label></div>

//                         <div><label>Id du médicament
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="idMedicament"
//                         value={this.state.idMedicament}
//                         ></input></label></div>

//                         <div><label>Commentaire au client
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="commentaireClient"
//                         value={this.state.commentaireClient}
//                         ></input></label></div>

//                         <div><label>Quantité
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="quantite"
//                         value={this.state.quantite}
//                         ></input></label></div>

//                         <div><label>Taille
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="taille"
//                         value={this.state.taille}
//                         ></input></label></div>

//                         <div><label>Poids
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="poids"
//                         value={this.state.poids}
//                         ></input></label></div>

//                         <div><label>Prix
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="prix"
//                         value={this.state.prix}
//                         ></input></label></div>
//                     </fieldset>
//                     <fieldset className="formInfoPharmacien">
//                         <legend>Information pharmacie</legend>
//                         <div><label>Nom de la pharmacie
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="namePharmacie"
//                         value={this.state.namePharmacie}
//                         ></input></label></div>

//                         <div><label>Rue de la pharmacie
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="ruePharmacie"
//                         value={this.state.ruePharmacie}
//                         ></input></label></div>

//                         <div><label>Numéro de la pharmacie
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="numeroPharmacie"
//                         value={this.state.numberPharmacie}
//                         ></input></label></div>

//                         <div><label>Code postal de la pharmacie
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="codePostalPharmacie"
//                         value={this.state.codePostalPharmacie}
//                         ></input></label></div>

//                         <div><label>Ville de la pharmacie
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="villePharmacie"
//                         value={this.state.villePharmacie}
//                         ></input></label></div>

//                         <div><label>GSM de la pharmacie
//                         <input
//                         type=""
//                         onChange={this.updateForm}
//                         name="gsmPharmacie"
//                         value={this.gsmPharmacie}
//                         ></input></label></div>

//                     </fieldset>
                    
//                         <button>Submit</button>
//                 </form>
//             </div>
//             </>

//         )}
// }

// export default FormulaireCommande;


import React, { Component } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from '../Dashboard';


function getSteps() {
  return ['Select master blaster campaign settings', 'Create an ad group',];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <div><form className="formClient" noValidate autoComplete="on">
                <TextField id="nameMedicament" label="Nom" variant="outlined" />
                <TextField id="idMedicament" label="Nom" variant="outlined" />
                <TextField id="commentaireClient" label="Nom" variant="outlined" />
                <TextField id="quantite" label="Nom" variant="outlined" />
                <TextField id="taille" label="Nom" variant="outlined" />
                <TextField id="poids" label="Nom" variant="outlined" />
                <TextField id="prix" label="Nom" variant="outlined" />
                <TextField id="prescription" label="Nom" variant="outlined" />

                
            </form></div>;
    case 1:
      return <TextField id="lastName-basic" label="Prénom" variant="outlined" />;
      return 'Unknown stepIndex';
  }
}
class HorizontalLabelPositionBelowStepper extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activePage: {
        activeStep : 0,
      },
      commandes:{
        medicament: {
          nameMedicament: '',
          idMedicament: '',
          commentaireClient: '',
          quantite: '',
          taille : '',
          poids: '',
          prix: '',
          prescription: false,
        },
        name: '',
        surname: '',
        email: '',
        gsm: '',
        rue : '',
        numero: '',
        codePostal: '',
        ville: '',
        namePharmacie: '',
        ruePharmacie: '',
        numeroPharmacie: '',
        codePostalPharmacie: '',
        villePharmacie: '',
        gsmPharmacie: '',
      }
    }
  }

  render() { 

  const steps = getSteps();

  const handleNext = () => {
    this.setState({activePage:{ activeStep: this.state.activePage.activeStep + 1}})
  };

  const handleBack = () => {
    this.setState({activePage:{ activeStep: this.state.activePage.activeStep - 1 }})
  };

  const handleReset = () => {
    this.setState({activePage:{  activeStep: this.state.activePage.activeStep - 2}})
  };

  
  return (

    <div className="f">
                    <Stepper activeStep={this.state.activePage.activeStep} alternativeLabel>
                    {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                    </Stepper>
                <div>
                    {this.state.activePage.activeStep === steps.length ? (
                    <div>
                        <Typography className="r">All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                    ) : (
                    <div>
                        <Typography className="d">{getStepContent(this.state.activePage.activeStep)}</Typography>
                        <div>
                        <Button
                            disabled={this.state.activePage.activeStep === 0}
                            onClick={handleBack}
                            className="v"
                        >
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            {this.state.activePage.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        </div>
                    </div>
                    )}
       </div>
    </div>
  );
  }
}


export default HorizontalLabelPositionBelowStepper;