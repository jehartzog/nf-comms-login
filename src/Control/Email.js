import React from 'react';
import Typist from 'react-typist';

// function isEmailValid(email) {
//   if (email === 'test') {
//     return true;
//   }
//   return false;
// }

export default class Email extends React.Component {
 static propTypes = {
  handleEmail: React.PropTypes.func.isRequired,
  timeDelay: React.PropTypes.number.isRequired,
 }

 constructor(props) {
    super(props);
    this.state = {start: false, value: '', status: { submitted: false, complete: false }};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ start: true }), this.props.timeDelay);
  }

  componentDidUpdate() {
    this.refs.input.focus();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    setTimeout(() => {
      let correct = false;
      // eslint-disable-next-line
      if (isEmailValid(this.state.value)) {
        correct = true;
      }
      this.props.handleEmail(correct);
      this.setState({ status: { submitted: true, complete: true, correct: correct } });
    }, this.props.timeDelay);
    this.setState({ status: { submitted: true, complete: false } });
    event.preventDefault();
  }

  renderComplete() {
    if (this.state.status.correct) {
      return <p><Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>Input Successful</Typist></p>;
    } else {
      return <p><Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>Input Failed</Typist></p>;
    }
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>&lt;User&gt;</Typist>
        <input ref="input" type="text" value={this.state.value} onChange={this.handleChange} disabled={this.state.status.submitted}/>
        </label>
      </form>
    );
  }

  render() {
    return (
        <div>
          <p><Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>Enter preferred comms receipt:</Typist></p>
          {this.state.start ? this.renderForm() : null }
          {this.state.status.complete ? this.renderComplete() : null}
        </div>
    );
  }
}