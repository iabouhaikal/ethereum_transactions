/**
 * Created by Ibrahim Abouhaikal on 4/27/19.
 */

import React from 'react'

export default class FormField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isValid: true,
      error: ''
    }
    this.ref = props.data.ref
    this.inputRef = React.createRef()
  }

  isValidField = () => {
    const value = this.inputRef.current.value.trim()
    const isValid = value ? true : false

    if (!isValid) {
      this.setState({error: 'This is a required field.'})
    }

    this.setState({isValid})
    return isValid
  }

  getValue = () => {
    return this.inputRef.current.value.trim()
  }

  setValue = (value) => {
    this.inputRef.current.value = value
  }

  setError = (error) => {
    this.setState({isValid: false})
    this.setState({error})
  }

  render() {
    const className = this.props.data.className;
    return (
      <div className="form-group">
        {this.props.data.label &&
        <label className="field-label">
          {this.props.data.label}:
        </label>
        }
        <input type={this.props.data.type}
               name={this.props.name}
               placeholder={this.props.data.placeholder}
               ref={this.inputRef}
               className={`form-control form-input ${className}`}
        />
        { !this.state.isValid &&
        <div className="form-error">{this.state.error}</div>
        }
      </div>
    )
  }
}
