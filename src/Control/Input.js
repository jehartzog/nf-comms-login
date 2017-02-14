import React from 'react';
import Typist from 'react-typist';

export default class Input extends React.Component {
 static propTypes = {
  handleInput: React.PropTypes.func.isRequired,
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
      if (this.state.value === 'red walrus') {
        correct = true;
      }
      this.props.handleInput(correct);
      this.setState({ status: { submitted: true, complete: true, correct: correct } });
    }, this.props.timeDelay);
    this.setState({ status: { submitted: true, complete: false } });
    event.preventDefault();
  }

  renderComplete() {
    if (this.state.status.correct) {
      return <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}><p>Loading...</p></Typist>;
    } else {
      return <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}><p>Input Failed</p></Typist>;
    }
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
            <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>&lt;User&gt;</Typist>
            <input type="text" value={this.state.value} onChange={this.handleChange} disabled={this.state.status.submitted}/>
        </label>
      </form>
    );
  }

  render() {
    return (
        <div>
          <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}><p>Input Required:</p></Typist>
          {this.state.start ? this.renderForm() : null }
          {this.state.status.complete ? this.renderComplete() : null}
        </div>
    );
  }
}