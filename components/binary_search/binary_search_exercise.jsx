import React from 'react';

export default class BinarySearchExercise extends React.Component {
  constructor(props) {
    super(props);
    let target = Math.floor(Math.random() * 10) + 1;

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
  }

  generateNewExercise() {
    let target = Math.floor(Math.random() * 10) + 1;
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

  revealNumber(idx, state) {
    let {
      target,
      array,
      hiddenArray,
      showArray,
      currentArrayLength,
      currentBaseIdx,
      currentEndIdx,
      message
    } = state;

    if (idx === (Math.floor(currentArrayLength / 2) + currentBaseIdx)) {
      showArray[idx] = array[idx];

      if (target === array[idx]) {
        message = 3;
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
        <div>That's not the midpoint</div>
      );
    } else {
      return (
        <div>You found the target!</div>
      );
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.generateNewExercise}>New Exercise</button>
        <div>Find: {this.state.target}</div>
        <div>
          <span>
            {this.state.showArray.map((num, idx) => (
              <button key={idx} id={`${idx}`} onClick={() => this.revealNumber(idx, this.state)}> {num} </button>
            ))}
          </span>
        </div>
        <div>
          {this.message()}
        </div>
      </div>
    );
  }

}
