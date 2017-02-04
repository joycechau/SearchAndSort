import React from 'react';

export default class Solution extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showJavaScriptSolution: true,
      showRubySolution: false,
      showPythonSolution: false,
      bsearch: {
        javascript: "https://res.cloudinary.com/joycechau/image/upload/v1485979449/bsearch_js.png",
        ruby: "https://res.cloudinary.com/joycechau/image/upload/v1485979562/bsearch_ruby.png",
        python: "https://res.cloudinary.com/joycechau/image/upload/v1485988171/bsearch_python.png"
      },
      quicksort: {
        javascript: "https://res.cloudinary.com/joycechau/image/upload/v1486143608/quicksort_javascript.png",
        ruby: "https://res.cloudinary.com/joycechau/image/upload/v1486143675/quicksort_ruby.png",
        python: "https://res.cloudinary.com/joycechau/image/upload/v1486143886/quicksort_python.png"
      },
      mergesort: {
        javascript: "https://res.cloudinary.com/joycechau/image/upload/v1486147571/mergesort_javascript.png",
        ruby: "https://res.cloudinary.com/joycechau/image/upload/v1486147603/mergesort_ruby.png",
        python: "https://res.cloudinary.com/joycechau/image/upload/v1486147626/mergesort_python.png"
      }
    };
    this.handleJavaScriptButton = this.handleJavaScriptButton.bind(this);
    this.handleRubyButton = this.handleRubyButton.bind(this);
    this.handlePythonButton = this.handlePythonButton.bind(this);
  }

  handleJavaScriptButton(e) {

    console.log(this.props);
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
      let src = this.state[this.props.algorithm].javascript;
      return (
        <div>
          <img src={src} alt="javascript-solution"/>
        </div>
      );
    }
  }

  rubySolution() {
    if (this.state.showRubySolution) {
      let src = this.state[this.props.algorithm].ruby;
      return (
        <div>
          <img src={src} alt="ruby-solution"/>
        </div>
      );
    }
  }

  pythonSolution() {
    if (this.state.showPythonSolution) {
      let src = this.state[this.props.algorithm].python;
      return (
        <div>
          <img src={src} alt="python-solution"/>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="solution">
        <div className="solution-button-div">
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
