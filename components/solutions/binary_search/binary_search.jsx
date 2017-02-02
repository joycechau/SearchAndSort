import React from 'react';

export default class BinarySearchSolution extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showJavaScriptSolution: true,
      showRubySolution: false,
      showPythonSolution: false
    };
    this.handleJavaScriptButton = this.handleJavaScriptButton.bind(this);
    this.handleRubyButton = this.handleRubyButton.bind(this);
    this.handlePythonButton = this.handlePythonButton.bind(this);
  }

  handleJavaScriptButton(e) {
    e.preventDefault();
    $(".javascript-button").addClass("selected-solution-button");
    $(".ruby-button").removeClass("selected-solution-button");
    $(".python-button").removeClass("selected-solution-button");
    this.setState({
      showJavaScriptSolution: true,
      showRubySolution: false,
      showPythonSolution: false
    });
  }

  handleRubyButton(e) {
    e.preventDefault();
    $(".ruby-button").addClass("selected-solution-button");
    $(".javascript-button").removeClass("selected-solution-button");
    $(".python-button").removeClass("selected-solution-button");
    this.setState({
      showJavaScriptSolution: false,
      showRubySolution: true,
      showPythonSolution: false
    });
  }

  handlePythonButton(e) {
    e.preventDefault();
    $(".python-button").addClass("selected-solution-button");
    $(".javascript-button").removeClass("selected-solution-button");
    $(".ruby-button").removeClass("selected-solution-button");
    this.setState({
      showJavaScriptSolution: false,
      showRubySolution: false,
      showPythonSolution: true
    });
  }

  javaScriptSolution() {
    if (this.state.showJavaScriptSolution) {
      return (
        <div>
          <img src="https://res.cloudinary.com/joycechau/image/upload/c_scale,w_450/v1485979449/bsearch_js.png" alt="javascript-solution"/>
        </div>
      );
    }
  }

  rubySolution() {
    if (this.state.showRubySolution) {
      return (
        <div>
          <img src="https://res.cloudinary.com/joycechau/image/upload/c_scale,w_450/v1485979562/bsearch_ruby.png" alt="ruby-solution"/>
        </div>
      );
    }
  }

  pythonSolution() {
    if (this.state.showPythonSolution) {
      return (
        <div>
          <img src="https://res.cloudinary.com/joycechau/image/upload/c_scale,w_450/v1485988171/bsearch_python.png" alt="python-solution"/>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="solution">
        <div className="button-div">
          <button
            onClick={this.handleJavaScriptButton}
            className="javascript-button selected-solution-button">
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
          {this.rubySolution()}
          {this.pythonSolution()}
        </div>
      </div>
    );
  }
}
