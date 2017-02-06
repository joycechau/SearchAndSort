import React from 'react';

export default class Solution extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showJavaScriptSolution: false,
      showRubySolution: false,
      showPythonSolution: false,
      showInfo: true,
      bsearch: {
        javascript: "https://res.cloudinary.com/joycechau/image/upload/v1485979449/bsearch_js.png",
        ruby: "https://res.cloudinary.com/joycechau/image/upload/v1485979562/bsearch_ruby.png",
        python: "https://res.cloudinary.com/joycechau/image/upload/v1485988171/bsearch_python.png",
        info: ""
      },
      quicksort: {
        javascript: "https://res.cloudinary.com/joycechau/image/upload/v1486143608/quicksort_javascript.png",
        ruby: "https://res.cloudinary.com/joycechau/image/upload/v1486143675/quicksort_ruby.png",
        python: "https://res.cloudinary.com/joycechau/image/upload/v1486143886/quicksort_python.png",
        info: ""
      },
      mergesort: {
        javascript: "https://res.cloudinary.com/joycechau/image/upload/v1486332550/mergesort_javascript.png",
        ruby: "https://res.cloudinary.com/joycechau/image/upload/v1486147603/mergesort_ruby.png",
        python: "https://res.cloudinary.com/joycechau/image/upload/v1486147626/mergesort_python.png",
        info: ""
      }
    };
    this.handleInfoButton = this.handleInfoButton.bind(this);
    this.handleJavaScriptButton = this.handleJavaScriptButton.bind(this);
    this.handleRubyButton = this.handleRubyButton.bind(this);
    this.handlePythonButton = this.handlePythonButton.bind(this);
  }

  handleInfoButton(e) {
    e.preventDefault();
    $(".javascript-button").removeClass("selected-solution-button");
    $(".ruby-button").removeClass("selected-solution-button");
    $(".python-button").removeClass("selected-solution-button");
    $(".info-button").addClass("selected-solution-button");
    this.setState({
      showJavaScriptSolution: false,
      showRubySolution: false,
      showPythonSolution: false,
      showInfo: true
    });
  }

  handleJavaScriptButton(e) {

    console.log(this.props);
    e.preventDefault();
    $(".javascript-button").addClass("selected-solution-button");
    $(".ruby-button").removeClass("selected-solution-button");
    $(".python-button").removeClass("selected-solution-button");
    $(".info-button").removeClass("selected-solution-button");
    this.setState({
      showJavaScriptSolution: true,
      showRubySolution: false,
      showPythonSolution: false,
      showInfo: false
    });
  }

  handleRubyButton(e) {
    e.preventDefault();
    $(".ruby-button").addClass("selected-solution-button");
    $(".javascript-button").removeClass("selected-solution-button");
    $(".python-button").removeClass("selected-solution-button");
    $(".info-button").removeClass("selected-solution-button");
    this.setState({
      showJavaScriptSolution: false,
      showRubySolution: true,
      showPythonSolution: false,
      showInfo: false
    });
  }

  handlePythonButton(e) {
    e.preventDefault();
    $(".python-button").addClass("selected-solution-button");
    $(".javascript-button").removeClass("selected-solution-button");
    $(".ruby-button").removeClass("selected-solution-button");
    $(".info-button").removeClass("selected-solution-button");
    this.setState({
      showJavaScriptSolution: false,
      showRubySolution: false,
      showPythonSolution: true,
      showInfo: false
    });
  }


  info() {
    if (this.state.showInfo) {
      let info = this.state[this.props.algorithm].info;
      return (
        <div className="solution-image-div">
          {info}
        </div>
      );
    }
  }

  javaScriptSolution() {
    if (this.state.showJavaScriptSolution) {
      let src = this.state[this.props.algorithm].javascript;
      return (
        <div className="solution-image-div">
          <img src={src} alt="javascript-solution"/>
        </div>
      );
    }
  }

  rubySolution() {
    if (this.state.showRubySolution) {
      let src = this.state[this.props.algorithm].ruby;
      return (
        <div className="solution-image-div">
          <img src={src} alt="ruby-solution"/>
        </div>
      );
    }
  }

  pythonSolution() {
    if (this.state.showPythonSolution) {
      let src = this.state[this.props.algorithm].python;
      return (
        <div className="solution-image-div">
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
            onClick={this.handleInfoButton}
            className="info-button selected-solution-button">
            Info
          </button>
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
          {this.rubySolution()}
          {this.pythonSolution()}
        </div>
      </div>
    );
  }
}
