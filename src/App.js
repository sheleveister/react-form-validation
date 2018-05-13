import React, { Component } from 'react';
import CustomInput from "./CustomInput/CustomInput";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderForm: {
        firstName: {
          value: '',
          elementType: 'input',
          type: 'text',
          label: 'Firs Name',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        lastName: {
          value: '',
          elementType: 'input',
          type: 'text',
          label: 'Last Name',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          value: '',
          elementType: 'input',
          type: 'email',
          label: 'Email',
          validation: {
            required: true,
            isEmail:  true
          },
          valid: false,
          touched: false
        }
      },
      formIsValid: false
    }
  }

  handleChanges = (event, formElementIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
      [formElementIdentifier]: {
        ...this.state.orderForm[formElementIdentifier],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.orderForm[formElementIdentifier].validation),
        touched: true
      }
    };

    let formIsValid = true;
    formIsValid = updatedOrderForm[formElementIdentifier].valid && formIsValid;

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    console.log(updatedOrderForm, formIsValid);
  };

  checkValidity = (value, validationRules) => {
    let isValid = false;

    if (!validationRules) {
      return true;
    }

    if (validationRules.required) {
      isValid = value.trim() !== '';
    }
    if (validationRules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value);
    }
    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.formIsValid) {
      console.log('Send data');
    }
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    return (
      <div className="app-content">
        <form className="app" onClick={(event) => this.handleSubmit(event)}>
          {formElementsArray.map((formElement) => {
            return <CustomInput
              key={formElement.id}
              name={formElement.config.name}
              type={formElement.config.type}
              label={formElement.config.label}
              elementType={formElement.config.elementType}
              change={(event) => this.handleChanges(event, formElement.id)}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation.required}
              value={formElement.config.value}
            />
          })}
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
