import React from 'react';

export default class BinarySearchExercise extends React.Component {
  constructor(props) {
    super(props);
    let target = Math.floor(Math.random()*10 + 1);

    this.state = {
      target: target,
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      hiddenArray: ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
      showArray: ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
      currentArrayLength: 10,
      currentBaseIdx: 0,
      currentEndIdx: 9,
      message: 1
    };

    this.generateNewExercise = this.generateNewExercise.bind(this);
    this.revealNumber = this.revealNumber.bind(this);
  }

  generateNewExercise() {
    let target = Math.floor(Math.random()*10 + 1);
    document.getElementById("bsearch-found-midpoint").removeAttribute("id");
    this.setState({
      target: target,
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      hiddenArray: ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
      showArray: ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
      currentArrayLength: 10,
      currentBaseIdx: 0,
      currentEndIdx: 9,
      message: 1
    });
  }

  revealNumber(e) {
    e.preventDefault();
    let idx = parseInt(e.target.id);
    let {
      target,
      array,
      hiddenArray,
      showArray,
      currentArrayLength,
      currentBaseIdx,
      currentEndIdx,
      message
    } = this.state;

    if (idx === (Math.floor(currentArrayLength / 2) + currentBaseIdx)) {
      showArray[idx] = array[idx];

      if (target === array[idx]) {
        message = 3;
        e.target.id = "bsearch-found-midpoint";
      } else if (target > array[idx]) {
        currentBaseIdx = idx + 1;
        currentArrayLength = currentEndIdx - (idx);
        message = 1;
      } else {
        currentEndIdx = idx - 1;
        currentArrayLength = idx - currentBaseIdx;
        message = 1;
      }
      this.setState({
        showArray: showArray,
        target: target,
        array: array,
        hiddenArray: hiddenArray,
        currentArrayLength: currentArrayLength,
        currentBaseIdx: currentBaseIdx,
        currentEndIdx: currentEndIdx,
        message: message
      });
    } else {
      message = 2;
      this.setState({
        message: message
      });
    }
  }

  message() {
    if (this.state.message === 1) {
      return (
        <div>Reveal the midpoint</div>
      );
    } else if (this.state.message === 2) {
      return (
        <div>Incorrect midpoint</div>
      );
    } else {
      return (
        <div>Target found!</div>
      );
    }
  }

  render() {
    return (
      <div className="bsearch-exercise-container">
        Try it out yourself!
        <button
          onClick={this.generateNewExercise}
          className="bsearch-new-exercise-button">
          New Exercise
        </button>
        <div className="bsearch-exercise-find-target">Find: {this.state.target}</div>
        <div className="bsearch-exercise-buttons">
          {this.state.showArray.map((num, idx) => (
            <button
              key={idx}
              id={`${idx}`}
              className="bsearch-exercise-button"
              onClick={this.revealNumber}>
              {num}
            </button>
          ))}
        </div>
        <div className="bsearch-message">
          {this.message()}
        </div>
      </div>
    );
  }

}
