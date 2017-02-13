import React from 'react';

import Input from './Input';
import Email from './Email';

const timeDelay = 3000;

export default class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      inputs: [],
      emails: [],
      complete: false,
      blank: false,
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ start: true });
      setTimeout(() => this.setState({ inputs: [ this.newInput() ] } ), timeDelay);
    }, timeDelay);
  }

  handleInput(correct) {
    if (correct) {
      setTimeout(() => this.setState({ emails: [ this.newEmail() ] } ), timeDelay);
    } else {
      setTimeout(() => this.setState(prevState => {
        return { inputs: prevState.inputs.concat( this.newInput() ) };
      }), timeDelay);
    }
  }

  handleEmail(correct) {
    if(correct) {
      this.setState({ complete: true });
      setTimeout(() => this.setState({ blank: true }), timeDelay);
    } else {
      setTimeout(() => this.setState(prevState => {
        return { emails: prevState.emails.concat( this.newEmail() ) };
      }), timeDelay);
    }
  }

  newInput() {
    return <Input key={new Date()} handleInput={this.handleInput} timeDelay={timeDelay} />;
  }

  newEmail() {
    return <Email key={new Date()} handleEmail={this.handleEmail} timeDelay={timeDelay} />;
  }

  renderInputs() {
    return <div>{this.state.inputs}</div>;
  }

  renderEmails() {
    return <div>{this.state.emails}</div>;
  }

  render() {
    if (this.state.blank) {
      return null;
    }
    return (
      <div >
        {this.state.start ? <p>Loading...</p> : null}
        {this.renderInputs()}
        {this.renderEmails()}
        {this.state.complete ? <p>Session Concluded</p> : null}
      </div>
    );
  }
}