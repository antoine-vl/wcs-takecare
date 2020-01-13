import React, { Component } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';


class HorizontalLabelPositionBelowStepper extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activePage: {
        activeStep : 0,
      },
      commande:{
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
        lastName: '',
        firstName: '',
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

// const handleChangeCheckbox = () => {
//   this.state.commande.medicament.prescription === false ?
//   this.setState({commande:{ medicament:{prescription: true}}})
//   :
//   this.setState({commande:{ medicament:{prescription: false}}})
// };

const updateForm = (event) => {
  event.preventDefault();
  this.setState({commande: {medicament:{ [event.target.id]: event.target.value}}})
  console.log(event.target)
};

const updateFormContact = (event) => {
  event.preventDefault();
  this.setState({commande: { [event.target.id]: event.target.value}})
  console.log(event.target)
};

    function getStepContent(stepIndex, state) {
      switch (stepIndex) {
        case 0:
          return <div><form className="formulaireMedicamant" noValidate autoComplete="on">
                  <TextField value={state.commande.medicament.nameMedicament} onChange={updateForm} id="nameMedicament" label="Nom du médicament" variant="outlined" />
                  <TextField value={state.commande.medicament.idMedicament} onChange={updateForm} id="idMedicament" label="Id du médicament" variant="outlined" />
                  <TextField value={state.commande.medicament.commentaireClient} onChange={updateForm} id="commentaireClient" label="Commentaire" variant="outlined" />
                  <TextField value={state.commande.medicament.quantite} onChange={updateForm} id="quantite" label="Quantité" variant="outlined" />
                  <TextField value={state.commande.medicament.taille} onChange={updateForm} id="taille" label="Taille" variant="outlined" />
                  <TextField value={state.commande.medicament.poids} onChange={updateForm} id="poids" label="Poids" variant="outlined" />
                  <TextField value={state.commande.medicament.prix} onChange={updateForm} id="prix" label="Prix" variant="outlined" />
                  {/* <Checkbox onChange={handleChangeCheckbox} value="secondary" color="primary" /> */}
                  <button>Submit</button>
                </form>
                
                </div>;
        case 1:
          return <div><form className="formulaireClient" noValidate autoComplete="on">
                  <TextField value={state.commande.lastName} onChange={updateFormContact} id="lastName" label="Nom" variant="outlined" />
                  <TextField value={state.commande.firstName} onChange={updateFormContact} id="firstName" label="Prénom" variant="outlined" />
                  <TextField value={state.commande.email} onChange={updateFormContact} id="email" label="E-mail" variant="outlined" />
                  <TextField value={state.commande.gsm} onChange={updateFormContact} id="gsm" label="Numéro de téléphone" variant="outlined" />
                  <TextField value={state.commande.rue} onChange={updateFormContact} id="rue" label="Rue" variant="outlined" />
                  <TextField value={state.commande.numero} onChange={updateFormContact} id="numero" label="Numéro" variant="outlined" />
                  <TextField value={state.commande.codePostal} onChange={updateFormContact} id="codePostal" label="Code postal" variant="outlined" />
                  <TextField value={state.commande.ville} onChange={updateFormContact} id="ville" label="Ville" variant="outlined" />
                </form></div>;
        case 2:
          return <div><form className="formulairePharmacie" noValidate autoComplete="on">
                  <TextField value={state.commande.namePharmacie} onChange={updateFormContact} id="namePharmacie" label="Nom" variant="outlined" />
                  <TextField value={state.commande.gsmPharmacie} onChange={updateFormContact} id="gsmPharmacie" label="Rue" variant="outlined" />
                  <TextField value={state.commande.ruePharmacie} onChange={updateFormContact} id="ruePharmacie" label="Prénom" variant="outlined" />
                  <TextField value={state.commande.numeroPharmacie} onChange={updateFormContact} id="numeroPharmacie" label="E-mail" variant="outlined" />
                  <TextField value={state.commande.codePostalPharmacie} onChange={updateFormContact} id="codePostalPharmacie" label="Numéro de téléphone" variant="outlined" />
                </form></div>;
          return 'Unknown stepIndex';
      }
    }

  const steps = getSteps();

  function getSteps() {
    return ['Veillez entrer les information de médiaments', 'Entrer les informations du client', 'Entrer les informations de la pharmacie'];
  }

  const handleNext = () => {
    this.setState({activePage:{ activeStep: this.state.activePage.activeStep + 1}})
  };

  const handleBack = () => {
    this.setState({activePage:{ activeStep: this.state.activePage.activeStep - 1 }})
  };

  const handleReset = () => {
    this.setState({activePage:{  activeStep: 0}})
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
  <Typography className="d">{getStepContent(this.state.activePage.activeStep, this.state)}</Typography>
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