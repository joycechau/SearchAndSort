import React from 'react';

export default class BinarySearchSolution extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      showJavaScriptSolution: false,
      showRubySolution: false,
      showPythonSolution: false
    };
    this.handleJavaScriptButton = this.handleJavaScriptButton.bind(this);
    this.handleRubyButton = this.handleRubyButton.bind(this);
    this.handlePythonButton = this.handlePythonButton.bind(this);
  }

  handleJavaScriptButton(e) {
    e.preventDefault();
    this.setState({
      showJavaScriptSolution: true,
      showRubySolution: false,
      showPythonSolution: false
    });
  }

  javaScriptSolution() {
    if (this.state.showJavaScriptSolution) {
      return (
        <div>
          <img src="https://res.cloudinary.com/joycechau/image/upload/c_scale,w_450/v1485977357/bsearch_js.png" alt="javascript-solution"/>
        </div>
      );
    }
  }

  handleRubyButton(e) {
    e.preventDefault(e);
    alert("Ruby");
  }

  handlePythonButton(e) {
    e.preventDefault(e);
    alert("Python");
  }

  render() {
    return (
      <div className="solution">
        <div className="button-div">
          <button
            onClick={this.handleJavaScriptButton}
            className="javascript-button">
            JavaScript
          </button>
          <button
            onClick={this.handleRubyButton}
            className="ruby-button">
            Ruby
          </button>
          <button
            onClick={this.handlePythonButton}
            className="python-button">
            Python
          </button>
        </div>
        <div className="solution-div">
          {this.javaScriptSolution()}
        </div>
      </div>
    );
  }
}
