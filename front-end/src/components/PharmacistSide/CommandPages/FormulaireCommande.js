import React, { Component } from 'react'

// ROUTER
import { Redirect, Switch, Route } from 'react-router-dom';

// MATERIAL UI
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// COMPONENTS
//import FormulaireClient from '../ClientPages/FormulaireClient';
import FormulaireMedicament from './FormulaireMedicament';
import FormulaireClient from '../ClientPages/FormulaireClient';
import FormulairePharmacien from './FormulairePharmacien';
import FormulaireRecap from './FormulaireRecap';
import FormulaireSupplementaire from './FormulaireSupplementaire';



/* ============================== */



class FormulaireCommande extends Component {
  constructor(props) {

    super(props);

    this.state = {
      orderComplete: true,

      activePage: {
        activeStep: 0,
      },

      medicament: {
        name: '',
        id: '',
        comment: '',
        quantity: '',
        price: '',
        categorie: '',
        prescription: false,
        isEdit: false,
        idEdit: 0
      },

      commande: {

        pharmaceuticals: [],

        clientAdress: {
          lastname: 'Gingras',
          firstname: 'Pascaline',
          mail: 'PascalineGingras@teleworm.us',
          GSM: '0484950494',
          primary_adress: {
            adress: 'Rue du Cornet',
            street_number: '335',
            zip_code: '6717',
            city: 'Attert',
          },
          secondary_adress: {
            adress: '',
            street_number: '',
            zip_code: '',
            city: '',
          }

        },

        pharmacistAdress: {
          lastname: 'Dupuy',
          firstname: 'Georges',
          mail: 'GeorgesDupuy@armyspy.com',
          GSM: '025118381',
          pharmacy_name: 'Reine Pharma Bvba-Sprl',
          primary_adress: {
            adress: 'Rue de la Montagne',
            street_number: '25',
            zip_code: '1000',
            city: 'Bruxelles'
          }
        },

        orderInformation: {
          receipt: '',
          delivery_comment: ''
        }
      }
    }

    this.steps = [{
        name: 'Informations du client',
        path: 'client',
        step: 0
      },
      {
        name: 'Liste des médiaments',
        path: 'medicaments',
        step: 1
      },
      {
        name: 'Informations de la pharmacie',
        path: 'pharmacien',
        step: 2
      },
      {
        name: 'Informations Supplémentaires',
        path: 'autre',
        step: 3
      },
      {
        name: 'Récapitulatif',
        path: 'recapitulatif',
        step: 4
      }
    ];
  }

  /*componentWillUnmount(){
    if(this.state.orderComplete){
      alert('Ola manant tu na point fini de remplir la commande!!!')
      this.setState({orderComplete: true})
    }
  }*/

  // Partie médicaments
  clearMedoc = () => {
    this.setState({
      medicament: {
        name: '',
        id: '',
        comment: '',
        quantity: '',
        price: '',
        categorie: '',
        prescription: false,
        isEdit: false,
        idEdit: 0
      }
    })
  }

  inputSubmitMed = (event) => {
    event.preventDefault();

    // UPDATE MEDOC
    if (this.state.medicament.isEdit) {
      const newMedicaments = [...this.state.commande.pharmaceuticals]
      newMedicaments[this.state.medicament.idEdit] = this.state.medicament;
      this.setState({
        commande: {
          ...this.state.commande,
          pharmaceuticals: newMedicaments
        }
      })
    }

    // CREATE MEDOC
    else {
      const newMedicaments = [...this.state.commande.pharmaceuticals, this.state.medicament]
      this.setState({
        commande: {
          ...this.state.commande,
          pharmaceuticals: newMedicaments
        }
      })
    }

    this.clearMedoc();
  }

  deleteMedicament = (id) => {
    const newArrayDelete = this.state.commande.pharmaceuticals.filter((medoc, index) => index !== id ? true : false);
    this.setState({
      commande: {
        ...this.state.commande,
        pharmaceuticals: newArrayDelete
      }
    })
  }

  updateFormMedicament = (event) => {
    event.preventDefault();
    this.setState({
      medicament: {
        ...this.state.medicament,
        [event.target.name]: event.target.value
      }
    })
  };

  handleChangeCheckboxMed = () => {
    this.state.medicament.prescription === false ?
      this.setState({
        medicament: {
          ...this.state.medicament,
          prescription: true
        }
      }) :
      this.setState({
        medicament: {
          ...this.state.medicament,
          prescription: false
        }
      })
  };

  editMedicament = (id) => {
    let newArrayEdit = this.state.commande.pharmaceuticals.filter((medoc, index) => index !== id ? false : true);
    this.setState({
      medicament: {
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
          primary_adress: {
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
        return <Redirect to = {
          `${match.url}/${this.steps[0].path}`
        }
        push / > ;
      case 1:
        return <Redirect to = {
          `${match.url}/${this.steps[1].path}`
        }
        push / > ;
      case 2:
        return <Redirect to = {
          `${match.url}/${this.steps[2].path}`
        }
        push / > ;
      case 3:
        return <Redirect to = {
          `${match.url}/${this.steps[3].path}`
        }
        push / > ;
      case 4:
        return <Redirect to = {
          `${match.url}/${this.steps[4].path}`
        }
        push / > ;
      default:
        return 'Unknown stepIndex';
    }
  }

  handleNext = () => {
    this.setState({
      activePage: {
        activeStep: this.state.activePage.activeStep + 1
      }
    })
  }

  handleBack = () => {
    this.setState({
      activePage: {
        activeStep: this.state.activePage.activeStep - 1
      }
    })
  }

  handleReset = () => {
    this.setState({
      activePage: {
        activeStep: 0
      }
    })
  }

  handleGoTo = (event, step) => {
    this.setState({
      activePage: {
        activeStep: step
      }
    })
  }



  // Render
  render() {
      //props router
      const {
        match
      } = this.props;

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

    return (
      <div className="f">
        
        <Stepper
          style={{ backgroundColor:'rgb(250,250,250)' }} activeStep={this.state.activePage.activeStep} alternativeLabel >
          {this.steps.map(label => (
            <Step key={label.name}>
              <StepLabel>
                <StepButton onClick={(e) => this.handleGoTo(e, label.step)} >
                    {label.name}
                </StepButton>
              </StepLabel>
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
                path={`${match.path}/${this.steps[0].path}`}
                render={(props) => <FormulaireClient {...props} PFC={propsFormulaireClient}/>}
              />
              <Route 
                path={`${match.path}/${this.steps[1].path}`}
                render={props => <FormulaireMedicament {...props} PFM={propsFormulaireMedicament} />}
              />
              <Route 
                path={`${match.path}/${this.steps[2].path}`}
                render={props => <FormulairePharmacien {...props} PFP={propsFormulairePharmacien} />}
              />
              <Route 
                path={`${match.path}/${this.steps[3].path}`}
                render={props => <FormulaireSupplementaire {...props} PFO={propsFormulaireAutre} />}
              />
              <Route 
                path={`${match.path}/${this.steps[4].path}`}
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