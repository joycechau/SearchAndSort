import React from 'react';

export default class MergeSortExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [1, 2, 3, 4, 5, 6, 7, 8],
      showTopArray: [[2,5], [1], [6], [8], [3], [4], [7]],
      showBotArray: [],
      iteration: 1,
      startIdx: 0,
      endIdx: 2
    };

    this.generateNewExercise = this.generateNewExercise.bind(this);
    this.moveBotToTop = this.moveBotToTop.bind(this);
    this.moveToBotArray = this.moveToBotArray.bind(this);
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
      showTopArray: showTopArray,
      showBotArray: []
    });
  }

  moveBotToTop() {
    let array = this.state.showBotArray;
    this.setState({
      showTopArray: array
    });
  }

  moveToBotArray(idx, idx2) {
    let {
          showBotArray,
          showTopArray,
          iteration,
          startIdx,
          endIdx
        } = this.state;
debugger
    let botArray = showBotArray;
    let num = showTopArray[idx];

    if (idx >= startIdx && idx < endIdx) {
      if (botArray.includes(num)) {
        console.log('this num is already in the bot array');
      } else {
        console.log('put num down');
        botArray.push(num);

        iteration += 1;
        startIdx = endIdx;
        endIdx = Math.pow(2, iteration);

        this.setState({
          showBotArray: botArray,
          iteration: iteration,
          startIdx: startIdx,
          endIdx: endIdx
        });
      }
    } else {
      console.log('not yet');
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.generateNewExercise}>New Exercise</button>
        <div>The array has already been split, now it's your turn to merge them!</div>
        <div>
          {this.state.showTopArray.map((array, idx) => (
            <span key={idx}>
              {array.map((num, idx2) => (
                <button key={idx2} id={`${idx}`} onClick={() => this.moveToBotArray(idx, idx2)}> {num} </button>
              ))}
            </span>
          ))}
        </div>
        <div>
          <span>
            {this.state.showBotArray.map((array, idx) => (
              <button key={idx} id={`${idx}`}> {array} </button>
            ))}
          </span>
        </div>
      </div>
    );
  }

}
