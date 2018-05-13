import React, { Component } from 'react';

import './CustomInput.css';

export default class CustomInput extends Component {
  render() {
    const classes = ['app-input'];
    let validationError = null;

    if (this.props.invalid && this.props.touched && this.props.shouldValidate) {
      classes.push('app-input--invalid');
    }

    if (this.props.invalid && this.props.touched) {
      validationError = <p className="validation-error">Please enter a valid value</p>;
    }

    return (
      <div>
        <label>{this.props.label}</label>
        <input
          type="text"
          className={classes.join(' ')}
          value={this.props.value}
          onChange={this.props.change}
        />
        {validationError}
      </div>
    );
  }
}
