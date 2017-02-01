import React from 'react';

export default class BinarySearchSolution extends React.Component{

  constructor(props) {
    super(props);
    this.handleJavaScriptButton = this.handleJavaScriptButton.bind(this);
    this.handleRubyButton = this.handleRubyButton.bind(this);
    this.handlePythonButton = this.handlePythonButton.bind(this);
  }

  handleJavaScriptButton(e) {
    e.preventDefault(e);
    alert("JS!");
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
        <button
          onClick={this.handleJavaScriptButton}
          className="solution-button">
          JavaScript
        </button>
        <button
          onClick={this.handleRubyButton}
          className="solution-button">
          Ruby
        </button>
        <button
          onClick={this.handlePythonButton}
          className="solution-button">
          Python
        </button>
      </div>
    );
  }
}
