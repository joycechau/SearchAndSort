import React from 'react';

export default class MergeSortExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [[1], [2], [3], [4], [5], [6], [7], [8]],
      showTopArray: [[2], [5], [1], [6], [8], [3], [4], [7]],
      showBotArray: [],
      currentBaseIndex: 0,
      iteration: 0,
      message: 1
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
    let array = [[1], [2], [3], [4], [5], [6], [7], [8]];
    let showTopArray = this.shuffle(array);
    this.setState({
      showTopArray: showTopArray,
      showBotArray: [],
      currentBaseIndex: 0,
      iteration: 0,
      message: 1
    });
  }

  moveBotToTop() {
    let array = this.state.showBotArray;
    let iteration = this.state.iteration + 1;
    this.setState({
      showTopArray: array,
      showBotArray: [],
      currentBaseIndex: 0,
      iteration: iteration
    });
    if (this.state.showTopArray.length === 1) {
      this.setState({
        message: 3
      });
    }
  }

  moveToBotArray(idx, idx2) {
    let {
          showBotArray,
          showTopArray,
          currentBaseIndex,
          iteration
        } = this.state;

    // make sure user clicks on the first element in one of two arrays currently being merged.
    if (idx >= currentBaseIndex && idx < currentBaseIndex + 2 && idx2 === 0) {
      let compareIdx;
      if (idx === currentBaseIndex) {
        compareIdx = idx + 1;
      } else {
        compareIdx = idx - 1;
      }
// make sure theres numbers left in the two arrays being compared.
      if (showTopArray[idx].length > 0 || showTopArray[compareIdx].length > 0) {
        if (showTopArray[idx].length === Math.pow(2, iteration) && showTopArray[compareIdx].length === Math.pow(2, iteration)) {
          var botSubArray = [];
        } else {
          var botSubArray = showBotArray[currentBaseIndex / 2];
        }

        // compare the two numbers
        if (showTopArray[compareIdx].length > 0 && (showTopArray[idx][0] > showTopArray[compareIdx][0])) {
          this.setState({
            message: 2
          });
        } else {
          if (showTopArray[compareIdx].length === 0) {
            botSubArray.push(showTopArray[idx].splice(0, 1)[0]);
          } else if (showTopArray[idx][0] < showTopArray[compareIdx][0]) {
            botSubArray.push(showTopArray[idx].splice(0, 1)[0]);
          }

          if (botSubArray.length === 1) {
            showBotArray.push(botSubArray);
          } else {
            showBotArray[currentBaseIndex / 2] = botSubArray;
          }

          if (showTopArray[idx].length === 0 && showTopArray[compareIdx].length === 0) {
            currentBaseIndex += 2;
          }

          this.setState({
            showBotArray: showBotArray,
            currentBaseIndex: currentBaseIndex,
            message: 1
          });
          setTimeout( () => {
            if (this.state.showTopArray.every( arr => arr.length === 0)) {
              this.moveBotToTop();
            }
          }, 1000);
        }

      }
    } else {
      this.setState({
        message: 2
      });
    }
  }

  message() {
    let { message } = this.state;
    if (message === 1) {
      return(
        <div className="mergesort-exercise-message">Select the appropriate number</div>
      );
    } else if (message === 2) {
      return(
        <div className="mergesort-exercise-message">Incorrect choice. Try again. </div>
      );
    } else if (message === 3) {
      return(
        <div className="mergesort-exercise-message">Congratulations!! You did it!!</div>
      );
    }
  }

  render() {
    return (
      <div className="mergesort-exercise-container">
        <div className="mergesort-exercise-try">Try it out yourself!</div>
        <button onClick={this.generateNewExercise} className="mergesort-exercise-new">New Exercise</button>
        <div className="mergesort-exercise-instructions">The array has already been split, now it's your turn to merge them!</div>
        <div className="mergesort-exercise-top-array">
          {this.state.showTopArray.map((array, idx) => (
            <div key={idx}>
              <span className="mergesort-exercise-bracket">[</span>
              <span key={idx}>
                {array.map((num, idx2) => (
                  <button key={idx2} id={`${idx}`} onClick={() => this.moveToBotArray(idx, idx2)} className="mergesort-exercise-number"> {num} </button>
                ))}
              </span>
              <span className="mergesort-exercise-bracket">]</span>
            </div>
          ))}
        </div>
        <div className="mergesort-exercise-bot-array">
          {this.state.showBotArray.map((array, idx) => (
            <div key={idx}>
              <span className="mergesort-exercise-bracket">[</span>
              <span>
                {array.map((num, idx2) => (
                  <span key={idx2} id={`${idx}`} className="mergesort-exercise-number"> {num} </span>
                ))}
              </span>
              <span className="mergesort-exercise-bracket">]</span>
            </div>
          ))}
        </div>
        <div className="mergesort-exercise-message-container">
          {this.message()}
        </div>
      </div>
    );
  }

}
