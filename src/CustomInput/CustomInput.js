import React, { Component } from 'react';

import './CustomInput.css';

export default class CustomInput extends Component {
  getInputType = () => {
    const classes = ['app-input'];

    if (this.props.invalid && this.props.touched && this.props.shouldValidate) {
      classes.push('app-input--invalid');
    }

    switch (this.props.elementType) {
      case ( 'input' ):
        return <input
          type={this.props.type}
          className={classes.join(' ')}
          value={this.props.value}
          onChange={this.props.change}
        />;
        break;
      case ( 'textarea' ):
        return <textarea
          type={this.props.type}
          className={classes.join(' ')}
          value={this.props.value}
          onChange={this.props.change}
        />;
        break;
      default:
        return <input
          type={this.props.type}
          className={classes.join(' ')}
          value={this.props.value}
          onChange={this.props.change}
        />;
    }
  };

  render() {
    let validationError = null;

    if (this.props.invalid && this.props.touched) {
      validationError = <p className="validation-error">Please enter a valid value</p>;
    }

    return (
      <div className="app-input-group">
        <label>{this.props.label}</label>
        {this.getInputType()}
        {validationError}
      </div>
    );
  }
}
