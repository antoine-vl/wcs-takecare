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
import FormulaireClient from './FormulaireClient.js'
import FormulairePharmacien from './FormulairePharmacien';
import FormulaireRecap from './FormulaireRecap';



/* ============================== */


class FormulaireCommande extends Component {
  constructor(props) {

    super(props);

    this.state = { 
      activePage: {
        activeStep : 0,
      },

      commande:{
        pharmaceuticals:[
          {
            name: '',
            id: '',
            comment: '',
            quantity: '',
            prescription: false
          }
        ],
        clientAdress:{
          lastname: '',
          firstname: '',
          mail:'',
          GSM:'',
          primary_adress:{
            adress:'',
            street_number:'',
            zip_code:'',
            city:''
          },
          secondary_adress:{
            adress:'',
            street_number:'',
            zip_code:'',
            city:''
          }
        },
        pharmacistAdress:{
          lastname: '',
          firstname: '',
          mail:'',
          GSM:'',
          pharmacy_name:'',
          primary_adress:{
            adress:'',
            street_number:'',
            zip_code:'',
            city:''
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
    /*console.log('locaton in next: ',this.props.location)
    console.log('history in next: ',this.props.history)
    this.props.history.push({pathname: `${this.props.match.url}/client`, state:{stepNumber:1}});*/
  }

  handleBack = () => {
    this.setState({activePage:{ activeStep: this.state.activePage.activeStep - 1 }})
  }

  handleReset = () => {
    this.setState({activePage:{  activeStep: 0}})
  }

  render() { 
    const {match, location, history} = this.props;

    return (
      <div className="f">
        
        <Stepper activeStep={this.state.activePage.activeStep} alternativeLabel >
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
                render={props =>  <FormulaireMedicament {...props} />}
              />
              <Route 
                path={`${match.path}/client`}
                render={props => <FormulaireClient {...props} />}
              />
              <Route 
                path={`${match.path}/pharmacien`}
                render={props => <FormulairePharmacien {...props} />}
              />
              <Route 
                path={`${match.path}/autre`}
                render={props => <FormulaireClient {...props} />}
              />
              <Route 
                path={`${match.path}/recapitulatif`}
                render={props => <FormulaireRecap {...props} />}
              />
            </Switch>

            <div>
              <Button
                disabled={this.state.activePage.activeStep === 0}
                onClick={this.handleBack}
                className="v"
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