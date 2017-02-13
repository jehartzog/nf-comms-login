import React from 'react';

function isEmailValid(email) {
  if (email === 'test') {
    return true;
  }
  return false;
}

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

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    setTimeout(() => {
      let correct = false;
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
      return <p>Input Successful</p>;
    } else {
      return <p>Input Failed</p>;
    }
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        &lt;User&gt;
        <input type="text" value={this.state.value} onChange={this.handleChange} disabled={this.state.status.submitted}/>
        </label>
      </form>
    );
  }

  render() {
    return (
        <div>
          <p>Enter preferred comms receipt:</p>
          {this.state.start ? this.renderForm() : null }
          {this.state.status.complete ? this.renderComplete() : null}
        </div>
    );
  }
}