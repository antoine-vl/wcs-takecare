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
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// COMPONENTS
import FormulaireMedicament from './FormulaireMedicament';
import FormulaireClient from '../ClientPart/FormulaireClient';
import FormulairePharmacien from './FormulairePharmacien';
import FormulaireRecap from './FormulaireRecap';
import FormulaireSupplementaire from './FormulaireSupplementaire';
import PopUpSendCommandeToCouriier from './PopUpSendCommandeToCouriier';
import PopUpPrescription from './PopUpPrescription';



/* ============================== */



class FormulaireCommande extends Component {
  constructor(props) {

    super(props);

    this.state = {
      orderComplete: true,
      displayNewOrder: true,
      openPopUpSendCommandeToCouriier: false,
      openPopUpPrescription: false,
      is_other_adress: false,

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
          national_registration_number: '03058751934',
          primary_adress: {
            adress: 'Rue du Cornet',
            street_number: '335',
            zip_code: '6717',
            city: 'Attert',
          },
          secondary_adress: {
            adress: 'aaaaa',
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
          delivery_comment: '',
          order_number: '',
          paid: false,
          prescription: false
        }
      }
    }

    this.testMedicaments = [
      {
        name:'medoc1',
        price:'10',
        quantity:'2'
      },
      {
        name:'medoc2',
        price:'5',
        quantity:'3'
      },
      {
        name:'medoc3',
        price:'9',
        quantity:'1'
      },
      {
        name:'medoc4',
        price:'18',
        quantity:'20'
      },
    ]

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

  handleChangeIsPaid = () => {
    this.setState(prevState => ({
      commande: {
                  ...prevState.commande, 
                  orderInformation: {
                                      ...prevState.commande.orderInformation, 
                                      paid: !prevState.commande.orderInformation.paid
                                    }
                }
    }))
  };

  dontPrescription = () => {
    console.log(this.state.commande.pharmaceuticals)
    let isDontRx = true
    this.state.commande.pharmaceuticals.map((medicament, index) =>
      medicament.categorie === 'RX' 
      ? isDontRx = false
      : null
   )
   return isDontRx
  }

  openPopUpPrescription = () => {
    this.setState ({
      openPopUpPrescription : true,
    })
  };

  closePopUpPrescription = () => {
    this.setState ({
      openPopUpPrescription : false,
    })
  };

  handleClickOpen = () => {
    this.setState ({
      openPopUpSendCommandeToCouriier : true,
    })
  };

  handleClose = () => {
    this.setState ({
      openPopUpSendCommandeToCouriier : false,
    })
  };

  checkboxChange = () => {
    this.setState({is_other_adress : !this.state.is_other_adress}) 
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
                render={(props) => <FormulaireClient {...props} 
                PFC={propsFormulaireClient} 
                checkboxChange={this.checkboxChange} 
                is_other_adress={this.state.is_other_adress}/>}
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
                render={props => <FormulaireRecap {...props} 
                  recap={this.state.commande} 
                  displayNewOrder={this.state.displayNewOrder} 
                  isPaid={this.handleChangeIsPaid} 
                />}
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

              
                {this.state.activePage.activeStep === 4 
                ? null 
                :<Button 
                  variant="contained" 
                  color="primary" 
                  onClick=
                          {this.state.activePage.activeStep === 1 && this.dontPrescription() 
                          ? this.openPopUpPrescription
                          : this.handleNext }
                  >Suivant
                </Button> 
                }

                {this.state.activePage.activeStep === 4 
                ?<Button 
                  variant="contained" 
                  color="primary" 
                  >Sauvegarder
                </Button> 
                :null
                }

                {this.state.activePage.activeStep === 4 && this.state.commande.orderInformation.paid === true
                ?
                <>
                  <Button 
                    style={{margin:'30px'}}
                    variant="contained" 
                    color="primary" 
                    onClick={this.handleClickOpen}>
                    Envoyer la commande au livreur
                  </Button>
                  <div>
                    <PopUpSendCommandeToCouriier open={this.state.openPopUpSendCommandeToCouriier} handleClose={this.handleClose}/>
                  </div>
                </>
                :null
                }
                <div>
                    <PopUpPrescription open={this.state.openPopUpPrescription} handleClose={this.closePopUpPrescription}/>
                  </div>

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