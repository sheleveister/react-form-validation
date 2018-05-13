import React, { Component } from 'react';
import CustomInput from "./CustomInput/CustomInput";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderForm: {
        value: '',
        label: 'Name',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      formIsValid: false
    }
  }

  handleChanges = (event) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
      value: event.target.value,
      valid: this.checkValidity(event.target.value, this.state.orderForm.validation),
      touched: true
    };

    let formIsValid = true;
    formIsValid = updatedOrderForm.valid && formIsValid;

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
    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.formIsValid) {
      console.log('Send data');
    }

    console.log(event);
    if (event && !this.state.formIsValid) {
      console.log('no valid form');
      console.log(this.state);
    }

  };

  render() {
    let formElementsArray = [
      { ...this.state.orderForm }
    ];

    return (
      <div className="app-content">
        <form className="app" onClick={(event) => this.handleSubmit(event)}>
          {formElementsArray.map((formElement, i) => {
            return <CustomInput
              key={i}
              change={(event) => this.handleChanges(event, formElement.id)}
              invalid={!formElement.valid}
              touched={formElement.touched}
              shouldValidate={formElement.validation.required}
              value={formElement.value}
            />
          })}
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
