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
        info: ["A binary search divides a range of values into halves, and continues to narrow down the field of search until the unknown value is found. It is the classic example of a \"divide and conquer\" algorithm. As an analogy, consider the children's game \"guess a number.\" The scorer has a secret number, and will only tell the player if their guessed number is higher than, lower than, or equal to the secret number. The player then uses this information to guess a new number. As the player, an optimal strategy for the general case is to start by choosing the range's midpoint as the guess, and then asking whether the guess was higher, lower, or equal to the secret number. If the guess was too high, one would select the point exactly between the range midpoint and the beginning of the range. If the original guess was too low, one would ask about the point exactly between the range midpoint and the end of the range. This process repeats until one has reached the secret number. "]
      },
      quicksort: {
        javascript: "https://res.cloudinary.com/joycechau/image/upload/v1486143608/quicksort_javascript.png",
        ruby: "https://res.cloudinary.com/joycechau/image/upload/v1486143675/quicksort_ruby.png",
        python: "https://res.cloudinary.com/joycechau/image/upload/v1486143886/quicksort_python.png",
        info: [["Sort an array (or list) elements using the quicksort algorithm.The elements must have a strict weak order and the index of the array can be of any discrete type. Quicksort, also known as partition-exchange sort, uses these steps. Choose any element of the array to be the pivot. Divide all other elements (except the pivot) into two partitions."],
        ["All elements less than the pivot must be in the first partition."],
        ["All elements greater than the pivot must be in the second partition. Use recursion to sort both partitions."],
         ["Join the first sorted partition, the pivot, and the second sorted partition."],
         ["The best pivot creates partitions of equal length (or lengths differing by 1).The worst pivot creates an empty partition (for example, if the pivot is the first or last element of a sorted array).The run-time of Quicksort ranges from O(n log n) with the best pivots, to O(n2) with the worst pivots, where n is the number of elements in the array."]
      ]
      },
      mergesort: {
        javascript: "https://res.cloudinary.com/joycechau/image/upload/v1486332550/mergesort_javascript.png",
        ruby: "https://res.cloudinary.com/joycechau/image/upload/v1486147603/mergesort_ruby.png",
        python: "https://res.cloudinary.com/joycechau/image/upload/v1486147626/mergesort_python.png",
        info: ["The merge sort is a recursive sort of order n*log(n). It is notable for having a worst case and average complexity of O(n*log(n)), and a best case complexity of O(n) (for pre-sorted input). The basic idea is to split the collection into smaller groups by halving it until the groups only have one element or no elements (which are both entirely sorted groups). Then merge the groups back together so that their elements are in order. This is how the algorithm gets its divide and conquer description."]
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
        info.map( (line) => {
          return (
            <div className="solution-info">
                <p>
                  {`${line}`}
                </p>
            </div>
          )
        })
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
          <div className="solution-info">
            {this.info()}
          </div>
        </div>
      </div>
    );
  }
}
