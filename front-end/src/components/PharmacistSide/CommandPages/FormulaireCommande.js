import React, { Component } from 'react'

// ROUTER
import { withRouter, Redirect, Switch, Route } from 'react-router-dom';

// MATERIAL UI
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// COMPONENTS
//import FormulaireClient from '../ClientPages/FormulaireClient';
import FormulaireMedicament from './FormulaireMedicament';
import FormulaireClient from './FormulaireClient.js';
import FormulairePharmacien from './FormulairePharmacien';
import FormulaireRecap from './FormulaireRecap';
import FormulaireSupplementaire from './FormulaireSupplementaire';



/* ============================== */



class FormulaireCommande extends Component {
  constructor(props) {

    super(props);

    this.state = { 

      activePage: {
        activeStep : 0,
      },

      medicament:{
        name: '',
        id: '',
        comment: '',
        quantity: '',
        price: '',
        prescription: false,
        isEdit: false,
        idEdit: 0
      },

      commande:{

        pharmaceuticals:[],

        clientAdress:{
          lastname: 'Gingras',
          firstname: 'Pascaline',
          mail:'PascalineGingras@teleworm.us',
          GSM:'0484950494',
          primary_adress: {
            adress:'Rue du Cornet',
            street_number:'335',
            zip_code:'6717',
            city:'Attert',
          },
          secondary_adress: {
            adress:'',
            street_number:'',
            zip_code:'',
            city:'',
          }

        },

        pharmacistAdress:{
          lastname: 'Dupuy',
          firstname: 'Georges',
          mail:'GeorgesDupuy@armyspy.com',
          GSM:'025118381',
          pharmacy_name:'Reine Pharma Bvba-Sprl',
          primary_adress:{
            adress:'Rue de la Montagne',
            street_number:'25',
            zip_code:'1000',
            city:'Bruxelles'
          }
        },

        orderInformation:{
          receipt:'',
          delivery_comment:''
        }
      }
    }

    this.steps = ['Liste des médiaments', 
                  'Informations du client', 
                  'Informations de la pharmacie', 
                  'Informations Supplémentaires', 
                  'Récapitulatif'];
  }


// Partie médicaments
  clearMedoc = () => {
    this.setState({
      medicament:{
        name: '',
        id: '',
        comment: '',
        quantity: '',
        price: '',
        prescription: false,
        isEdit: false,
        idEdit: 0
      }
    })
  }

  inputSubmitMed = (event) => {
    event.preventDefault();

    // UPDATE MEDOC
    if(this.state.medicament.isEdit){
      const newMedicaments = [...this.state.commande.pharmaceuticals]
      newMedicaments[this.state.medicament.idEdit] = this.state.medicament;
      this.setState({
        commande:{
          ...this.state.commande,
          pharmaceuticals: newMedicaments
        }
      })
    }

    // CREATE MEDOC
    else{
      const newMedicaments = [...this.state.commande.pharmaceuticals, this.state.medicament]
      this.setState({
        commande:{
          ...this.state.commande,
          pharmaceuticals: newMedicaments
        }
      }) 
    }

    this.clearMedoc();
  }

  deleteMedicament = (id) => {
    const newArrayDelete = this.state.commande.pharmaceuticals.filter ((medoc, index) => index !== id ? true : false);
    this.setState({
      commande:{
        ...this.state.commande,
        pharmaceuticals: newArrayDelete
      }
    }) 
  }

  updateFormMedicament = (event) => {
    event.preventDefault();
    this.setState({
      medicament:{
        ...this.state.medicament,
        [event.target.id]: event.target.value
      }
    })
  };

  handleChangeCheckboxMed = () => {
    this.state.medicament.prescription === false 
    ? this.setState({
      medicament:{
        ...this.state.medicament,
        prescription: true
      }
    })
    : this.setState({
      medicament:{
        ...this.state.medicament,
        prescription: false
      }
    })
  };

  editMedicament = (id) => {
    let newArrayEdit = this.state.commande.pharmaceuticals.filter ((medoc, index) => index !== id ? false : true);
    console.log('editMedicament: ', newArrayEdit)
    console.log('ID editMedicament: ', id)
    this.setState({
      medicament:{
        ...newArrayEdit[0],
        isEdit: true,
        idEdit: id
      }
    })
  }



// Partie adresse client
  updateFormClient = event => {
    event.preventDefault();
    this.setState({
      commande: {
        ...this.state.commande,
        clientAdress: {
          ...this.state.commande.clientAdress,
          [event.target.id]: event.target.value
          }
        }
      })
  }

  updateAdressFormClient = event => {
    event.preventDefault();
    this.setState({
      commande: {
        ...this.state.commande,
        clientAdress: {
          ...this.state.commande.clientAdress,
          primary_adress: {
            ...this.state.commande.clientAdress.primary_adress,
            [event.target.id]: event.target.value
          }
        }
      }
    })
  }



// Partie adresse pharmacien
  updateFormPharmacist = event => {
    event.preventDefault();
    this.setState({
      commande: {
        ...this.state.commande,
        pharmacistAdress: {
          ...this.state.commande.pharmacistAdress,
          [event.target.id]: event.target.value
        }
      }
    })
  }

  updateAdressFormPharmacist = event => {
    event.preventDefault();
    this.setState({
      commande: {
        ...this.state.commande,
        pharmacistAdress: {
          ...this.state.commande.pharmacistAdress,
          primary_adress :{
            ...this.state.commande.pharmacistAdress.primary_adress,
            [event.target.id]: event.target.value
          }
        }
      }
    })
  }


  
// Partie autres informations
  updateFormAutre = event => {
    event.preventDefault();
    this.setState({
      commande: {
        ...this.state.commande,
        orderInformation: {
          ...this.state.commande.orderInformation,
          [event.target.id]: event.target.value
        }
      }
    })
  }

  alertFalseButton = (event) => {
    event.preventDefault();
    alert('Il est impossible d\'uploader une image pour le moment')        
  }



// Gestion stepper
  getStepContent = (stepIndex, match) => {
    switch (stepIndex) {
      case 0:
        return <Redirect to={`${match.url}/medicaments`} push/>;
      case 1:
        return <Redirect to={`${match.url}/client`} push/>;
      case 2:
        return <Redirect to={`${match.url}/pharmacien`} push/>;
      case 3:
        return <Redirect to={`${match.url}/autre`} push/>;
      case 4:
        return <Redirect to={`${match.url}/recapitulatif`} push/>;
      default:
        return 'Unknown stepIndex';
    }
  }

  handleNext = () => {
    this.setState({activePage:{ activeStep: this.state.activePage.activeStep + 1}})
  }

  handleBack = () => {
    this.setState({activePage:{ activeStep: this.state.activePage.activeStep - 1 }})
  }

  handleReset = () => {
    this.setState({activePage:{  activeStep: 0}})
  }



// Render
  render() { 
    //props router
    const {match, location, history} = this.props;

    //props step 1 - medicaments
    const propsFormulaireMedicament = {
      inputSubmitMed: event => this.inputSubmitMed(event),
      deleteMedicament: id => this.deleteMedicament(id),
      updateFormMedicament: event => this.updateFormMedicament(event),
      handleChangeCheckboxMed: () => this.handleChangeCheckboxMed(),
      editMedicament: id => this.editMedicament(id),
      clearMedoc: () => this.clearMedoc(),
      listeMedicament: this.state.commande.pharmaceuticals,
      medicament: this.state.medicament
    }

    //props step 2 - adresse client
    const propsFormulaireClient = {
      currentClient: this.state.commande.clientAdress,
      updateFormClient: event => this.updateFormClient(event),
      updateAdressFormClient: event => this.updateAdressFormClient(event)
    }

    //props step 3 - adresse pharmacien
    const propsFormulairePharmacien = {
      currentPharmacist: this.state.commande.pharmacistAdress,
      updateFormPharmacist: event => this.updateFormPharmacist(event),
      updateAdressFormPharmacist: event => this.updateAdressFormPharmacist(event)
    }

    //props step 4 - autres informations
    const propsFormulaireAutre = {
      updateFormAutre: event => this.updateFormAutre(event),
      alertFalseButton: event => this.alertFalseButton(event),
      currentOtherInfos: this.state.commande.orderInformation
    }



    //console.log('STATE :', this.state.commande.orderInformation)
    //console.log('STATE 2:', this.state.commande.clientAdress.primary_adress)



    return (
      <div className="f">
        
        <Stepper
                    style={{ backgroundColor:'rgb(250,250,250)' }} activeStep={this.state.activePage.activeStep} alternativeLabel >
          {this.steps.map(label => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      <div>
      
      {this.state.activePage.activeStep === this.steps.length ? (
          <div>
              <Typography>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
          </div>
        ) : (
          <div>

            <Typography>{this.getStepContent(this.state.activePage.activeStep, match)}</Typography>
            <Switch>
              <Route 
                path={`${match.path}/medicaments`}
                render={(props) =>  <FormulaireMedicament {...props} PFM={propsFormulaireMedicament} />}
              />
              <Route 
                path={`${match.path}/client`}
                render={props => <FormulaireClient {...props} PFC={propsFormulaireClient}/>}
              />
              <Route 
                path={`${match.path}/pharmacien`}
                render={props => <FormulairePharmacien {...props} PFP={propsFormulairePharmacien} />}
              />
              <Route 
                path={`${match.path}/autre`}
                render={props => <FormulaireSupplementaire {...props} PFO={propsFormulaireAutre} />}
              />
              <Route 
                path={`${match.path}/recapitulatif`}
                render={props => <FormulaireRecap {...props} recap={this.state.commande} />}
              />
            </Switch>

            
            <div>
              <Button
                style={{margin:'30px'}}
                disabled={this.state.activePage.activeStep === 0}
                onClick={this.handleBack}
              >
                Précédent
              </Button>

              <Button variant="contained" color="primary" onClick={this.handleNext}>
                {this.state.activePage.activeStep === this.steps.length - 1 ? 'Terminer' : 'Suivant'}
              </Button>
            </div>
          </div>
        )
      }
        </div>
      </div>
    );
  }
}


export default FormulaireCommande;