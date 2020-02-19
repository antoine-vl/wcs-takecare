import React, { Component } from 'react'

// ROUTER
import { Redirect, Switch, Route } from 'react-router-dom';

//AXIOS
import axios from 'axios';

// MATERIAL UI
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// COMPONENTS
import FormulaireMedicament from './FormulaireMedicament';
import InputsClient from '../ClientPart/InputsClient';
import FormulairePharmacien from './FormulairePharmacien';
import FormulaireRecap from './FormulaireRecap';
import FormulaireSupplementaire from './FormulaireSupplementaire';
import PopUpSendCommandeToCouriier from './PopUpSendCommandeToCouriier';
import PopUpPrescription from './PopUpPrescription';



/* ============================== */



class InputsOrders extends Component {
  constructor(props) {

    super(props);

    this.state = {
      openSnack: false,
      messageSnack: '',
      typeOfSnack: '',

      orderComplete: true,
      displayNewOrder: true,

      openPopUpSendCommandeToCouriier: false,
      openPopUpPrescription: false,
      is_other_adress: false,

      secondary_adress_validate: false,
      client_added: false,

      validated_steps: [0],
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
          id_client: null,
          lastname: '',
          firstname: '',
          mail: '',
          GSM: '',
          national_registration_number: '',
          primary_adress: {
            adress: '',
            street_number: '',
            zip_code: '',
            city: '',
          },
          secondary_adress: {
            adress: '',
            street_number: '',
            zip_code: '',
            city: '',
          }

        },

        pharmacistAdress: {
          id_pharmacist: 38,
          lastname: 'Dupuy',
          firstname: 'Georges',
          mail: 'GeorgesDupuy@armyspy.com',
          GSM: '025118381',
          pharmacy_name: 'Reine Pharma Bvba-Sprl',
          primary_adress: {
            adress: 'Rue de la Montagne',
            street_number: 25,
            zip_code: 1000,
            city: 'Bruxelles'
          }
        },

        orderInformation: {
          receipt: 'path or url of picture of receipt',
          delivery_comment: '',
          order_number: '',
          paid: false,
          prescription: true
        }
      }
    }

    this.steps = [{
        name: 'Informations du client',
        path: 'client',
        step: 0
      },
      {
        name: 'Liste des médicaments',
        path: 'medicaments',
        step: 1
      },
      {
        name: 'Informations de la pharmacie',
        path: 'pharmacien',
        step: 2
      },
      {
        name: 'Informations supplémentaires',
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



  // =*=*=*=*=*=*=*=*=*= Gestion of the InputsOrders =*=*=*=*=*=*=*=*=*= //

  saveNewOrder = () => {
    const now = new Date;
    const year = now.getFullYear().toString().substring(2);
    let month = now.getMonth()+1;
    month = month.toString();
    const day = now.getDate().toString();
    const hour = now.getHours().toString();
    const minute = now.getMinutes().toString();

    const order_number = `${year}${month}${day}${hour}${minute}${this.generateUniqueId()}`;

    const dataToPost = {
      id_client: this.state.commande.clientAdress.id_client,
      id_pharmacist: this.state.commande.pharmacistAdress.id_pharmacist,
      pharmaceuticals: this.state.commande.pharmaceuticals,
      orderInformation: {
        ...this.state.commande.orderInformation,
        order_number: order_number
      }
    }

    console.log('data new Order: ', dataToPost)
    
    axios
      .post(
        `http://localhost:5000/dashboard/orders`, 
        { ...dataToPost }
      )
      .then(res =>{
        
        this.setState({
          ...this.state,
          openSnack: true,
          messageSnack: `${res.data.message} // numéro: ${res.data.order_number}`,
          typeOfSnack: 'success',
        })
        
      })
      
      .catch(error => {
        console.error('Error_message: ', error.response.data)

        this.setState({
          ...this.state,
          openSnack: true,
          messageSnack: `${error.response.data.error_message}`,
          typeOfSnack: 'error',
        })
      })
  }

  getStepContent = (stepIndex, match) => {
    switch (stepIndex) {
      case 0:
        return <Redirect to = {
          `${match.url}/${this.steps[0].path}`
        }
        push /> ;

      case 1:
        return <Redirect to = {
          `${match.url}/${this.steps[1].path}`
        }
        push /> ;

      case 2:
        return <Redirect to = {
          `${match.url}/${this.steps[2].path}`
        }
        push /> ;

      case 3:
        return <Redirect to = {
          `${match.url}/${this.steps[3].path}`
        }
        push /> ;

      case 4:
        return <Redirect to = {
          `${match.url}/${this.steps[4].path}`
        }
        push /> ;

      default:
        return 'Unknown stepIndex';
    }
  }

  gestionDuSuivant = (event, stepindex) => {
    
    switch (stepindex){
      case 0:
        if(this.state.commande.clientAdress.id_client){
          if(this.state.is_other_adress){
            if(this.state.secondary_adress_validate){
              return this.handleNext()
            }
            else{
              console.log('Adresse de livraison incomplète!')
            }
          }
          else{
            return this.handleNext()
          }
        }
        else{
          console.log('Donnée du client incomplète!')
        }
      break;

      case 1:
        if(this.dontPrescription()){
          return this.openPopUpPrescription()
        }
        else{
          return this.handleNext()
        }

      default:
        return this.handleNext()
    }
  }

  generateUniqueId = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      ...this.state,
      openSnack: false
    })
  };

  continueWithoutPrescription = () => {
    this.handleNext();
    this.setState ({
      ...this.state,
      openPopUpPrescription : false,
      commande:{
        ...this.state.commande,
        orderInformation:{
          ...this.state.commande.orderInformation,
          prescription: false,
        }
      }
    })
  }

  handleNext = () => {
    const step_validate = this.state.validated_steps;
    const next_step = this.state.activePage.activeStep + 1

    step_validate.push(next_step);

    this.setState({
      ...this.state,
      validated_steps: step_validate,
      activePage: {
        activeStep: next_step
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
    let step_to_go = step;

    // if the step is not validated, we remain on the current step
    if(this.state.validated_steps.filter(item => item === step ? true : false ).length === 0){
      step_to_go = this.state.activePage.activeStep;
    }

    this.setState({
      activePage: {
        activeStep: step_to_go
      }
    })
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

  handleClickOpenPopUpCouriier = () => {
    this.setState ({
      openPopUpSendCommandeToCouriier : true,
    })
  };

  handleCloseOpenPopUpCouriier = () => {
    this.setState ({
      openPopUpSendCommandeToCouriier : false,
    })
  };



  // =*=*=*=*=*=*=*=*=*= Client's Methods =*=*=*=*=*=*=*=*=*= //

  submitClient = event => {
    event.preventDefault();
    console.log('submitClient')

    const dataToPost = this.state.commande.clientAdress;
    console.log('data new Client: ', dataToPost)
  
    axios
      .post(
        `http://localhost:5000/dashboard/clients`, 
        { ...dataToPost }
      )
      .then(res =>{

        console.log('Res POST: ', res)
        
        this.setState({
          ...this.state,
          openSnack: true,
          messageSnack: `${res.data.message}`,
          typeOfSnack: 'success',

          client_added: true,
          commande:{
            ...this.state.commande,

            clientAdress:{
              ...this.state.commande.clientAdress,

              id_client: res.data.sql_result.insertId
            }
          }
        })
        
      })
      
      .catch(error => {
        console.error('Sql_error: ', error.response.data.sql_error)
        this.setState({
          ...this.state,
          openSnack: true,
          messageSnack: `${error.response.data.error_message}`,
          typeOfSnack: 'error',
        })
      })
      
  }

  submitLivraisonAdressClient = event => {
    event.preventDefault();

    const dataToPost = this.state.commande.clientAdress.secondary_adress;

    axios
      .post(
        `http://localhost:5000/dashboard/clients/${this.state.commande.clientAdress.id_client}/secondary_adress`, 
        { ...dataToPost }
      )
      .then(res =>{
        console.log('Response: ', res.data.message)
        console.log('Sql_result: ', res.data.sql_result)

        this.setState({
          ...this.state,
          secondary_adress_validate: true
        })
      })
      
      .catch(error => {
        console.error('Error_message: ', error.response.data.error_message)
        console.error('Id_client: ', error.response.data.id_client)
        console.error('Sql_error: ', error.response.data.sql_error)
      })
  }

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

  updateSecondaryAdressFormClient = event => {
    event.preventDefault();
    this.setState({
      commande: {
        ...this.state.commande,
        clientAdress: {
          ...this.state.commande.clientAdress,
          secondary_adress: {
            ...this.state.commande.clientAdress.secondary_adress,
            [event.target.id]: event.target.value
          }
        }
      }
    })
  }

  checkboxChange = () => {
    this.setState({is_other_adress : !this.state.is_other_adress}) 
  }

  selectClient = (event, value) => {
    if(value){
      axios
      .get(`http://localhost:5000/dashboard/clients/${value.id}`)
      .then(res => {
        const client = res.data[0];

        if(client.secondary_adress_id){
          axios
          .get(`http://localhost:5000/dashboard/clients/${value.id}/secondary_adress`)
          .then(res => {
            const livraison_adress = res.data[0];

            this.setState({
              ...this.state,
              is_other_adress:true,
              secondary_adress_validate: true,

              commande: {
                ...this.state.commande,

                clientAdress: {
                  ...this.state.commande.clientAdress,
                  id_client: value.id,
                  lastname: client.lastname,
                  firstname: client.firstname,
                  mail: client.mail,
                  GSM: client.GSM,
                  national_registration_number: client.national_registration_number,

                  primary_adress: {
                    adress: client.adress,
                    street_number: client.street_number,
                    zip_code: client.zip_code,
                    city: client.city,
                  },

                  secondary_adress: {
                    adress: livraison_adress.adress,
                    street_number: livraison_adress.street_number,
                    zip_code: livraison_adress.zip_code,
                    city: livraison_adress.city,
                  }
                }
              }
            });
          });
        }
        else{
          this.setState({
            ...this.state,
            commande: {
              ...this.state.commande,
              
              clientAdress: {
                ...this.state.commande.clientAdress,
                id_client: value.id,
                lastname: client.lastname,
                firstname: client.firstname,
                mail: client.mail,
                GSM: client.GSM,
                national_registration_number: client.national_registration_number,

                primary_adress: {
                  adress: client.adress,
                  street_number: client.street_number,
                  zip_code: client.zip_code,
                  city: client.city,
                },

                secondary_adress: {
                  adress: '',
                  street_number: '',
                  zip_code: '',
                  city: '',
                }
              }
            }
          });
        }
      })
    }
  }



  // =*=*=*=*=*=*=*=*=*= Pharmaceutical's Methods =*=*=*=*=*=*=*=*=*= //

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
      // Generate random (potentialy unique, but ...) ID for Database
      let medicament = this.state.medicament;
      medicament.id = this.generateUniqueId() + medicament.id;

      const newMedicaments = [...this.state.commande.pharmaceuticals, medicament]

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

  dontPrescription = () => {
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



  // =*=*=*=*=*=*=*=*=*= Pharmacyst's Methods =*=*=*=*=*=*=*=*=*= //

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



  // =*=*=*=*=*=*=*=*=*= Others Information's Methods =*=*=*=*=*=*=*=*=*= //

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



  // =*=*=*=*=*=*=*=*=*= Render =*=*=*=*=*=*=*=*=*= //

  render() {
    //props router
    const {
      match
    } = this.props;

    //props step 1 - adresse client
    const propsClientInputs = {
      currentClient: this.state.commande.clientAdress,
      is_other_adress: this.state.is_other_adress,
      secondary_adress_validate: this.state.secondary_adress_validate,
      updateFormClient: event => this.updateFormClient(event),
      updateAdressFormClient: event => this.updateAdressFormClient(event),
      updateSecondaryAdressFormClient: event => this.updateSecondaryAdressFormClient(event),
      checkboxChange: () => this.checkboxChange(),
      selectClient: (event, value) => this.selectClient(event, value),
      submitClient: (event) => this.submitClient(event),
      submitLivraisonAdressClient: (event) => this.submitLivraisonAdressClient(event),
    }

    //props step 2 - medicaments
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

    
    //console.log('STATE commande : ', this.state.commande)
    
    //console.log('STATE id_client : ', this.state.commande.clientAdress.id_client)

    console.log('STATE prescription : ', this.state.commande.orderInformation.prescription)
    
    //this.saveNewOrder();

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
                  render={(props) => 
                    <InputsClient 
                      {...props} 
                      propsClientInputs={propsClientInputs} 
                    />}
                />

                <Route 
                  path={`${match.path}/${this.steps[1].path}`}
                  render={props => 
                    <FormulaireMedicament 
                      {...props} 
                      PFM={propsFormulaireMedicament} 
                    />}
                />

                <Route 
                  path={`${match.path}/${this.steps[2].path}`}
                  render={props => 
                    <FormulairePharmacien 
                      {...props} 
                      PFP={propsFormulairePharmacien} 
                    />}
                />

                <Route 
                  path={`${match.path}/${this.steps[3].path}`}
                  render={props => 
                    <FormulaireSupplementaire 
                      {...props} 
                      PFO={propsFormulaireAutre} 
                    />}
                />

                <Route 
                  path={`${match.path}/${this.steps[4].path}`}
                  render={props => 
                    <FormulaireRecap 
                      {...props} 
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
                    onClick={(event, step) => this.gestionDuSuivant(event, this.state.activePage.activeStep)}
                  >
                      Suivant
                  </Button> 
                  }

                  {this.state.activePage.activeStep === 4 
                  ?<Button 
                    variant="contained" 
                    color="primary" 
                    onClick={this.saveNewOrder}
                  >
                    Sauvegarder
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
                      onClick={this.handleClickOpenPopUpCouriier}
                    >
                      Envoyer la commande au livreur
                    </Button>

                    <PopUpSendCommandeToCouriier 
                      open={this.state.openPopUpSendCommandeToCouriier} 
                      handleClose={this.handleCloseOpenPopUpCouriier}
                    />
                  </>
                  :null
                  }
                  <div>
                    <PopUpPrescription 
                      open={this.state.openPopUpPrescription} 
                      handleNext={this.continueWithoutPrescription} 
                      handleClose={this.closePopUpPrescription}
                    />
                  </div>

              </div>
            </div>
          )
        }
        </div>

        <Snackbar open={this.state.openSnack} autoHideDuration={6000} onClose={this.handleCloseSnack}>
          <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnack} severity={this.state.typeOfSnack} >
            {this.state.messageSnack}
          </MuiAlert>
        </Snackbar>

      </div>
    );
  }
}

export default InputsOrders;