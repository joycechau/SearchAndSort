import React from 'react';

export default class MergeSortExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [1, 2, 3, 4, 5, 6, 7, 8],
      showTopArray: [2, 5, 1, 6, 8, 3, 4, 7],
      showBotArray: []
    };

    this.generateNewExercise = this.generateNewExercise.bind(this);
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  generateNewExercise() {
    let showTopArray = this.shuffle(this.state.showTopArray);
    this.setState({
      showTopArray: showTopArray
    });
  }

  moveBotToTop() {
    let array = this.state.showBotArray;
    this.setState({
      showTopArray: array
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.generateNewExercise}>New Exercise</button>
        <div>The array has already been split, now it's your turn to merge them!</div>
        <div>
          <span>
            {this.state.showTopArray.map((num, idx) => (
              <button key={idx} id={`${idx}`}> {num} </button>
            ))}
          </span>
        </div>
        <div>
          <span>
            {this.state.showBotArray.map((num, idx) => (
              <button key={idx} id={`${idx}`}> {num} </button>
            ))}
          </span>
        </div>
      </div>
    );
  }

}
