import React from 'react';
import merge from 'lodash/merge';

export default class MergeSort extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInputArray: "1, 2, 3, 4, 5, 6, 7, 8",
      topShowArray: [[]],
      botShowArray: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveBotToTop = this.moveBotToTop.bind(this);
    this.mergeSortSplit = this.mergeSortSplit.bind(this);
    this.mergeSortMerge = this.mergeSortMerge.bind(this);
  }

  handleSubmit(e) {
    if (this.interval) {
      clearInterval(this.interval);
      this.setState({
        userInputArray: "1, 2, 3, 4, 5, 6, 7, 8",
        topShowArray: [[]],
        botShowArray: []
      });
    }
    e.preventDefault();
    let input = this.state.userInputArray.split(',');
    let array = [];
    input.map(num => {
      array.push(parseInt(num));
    });
    this.shuffle(array);

    this.setState({
      topShowArray: [array],
      botShowArray: []
    });

    let count = 0;
    this.interval = setInterval( () => {
      if (this.state.topShowArray.every(subArray => subArray.length === 1)) {
        clearInterval(this.interval);
        count = 0;
        this.mergeSortMerge();
      } else {
        if (count % 2 === 0) {
          this.state.topShowArray.map( subArray => {
            this.mergeSortSplit(subArray);
          });
          count += 1;
        } else {
          this.moveBotToTop();
          count += 1;
        }
      }
    }, 2000);
  }

  mergeSortSplit(array) {
    let midIdx = Math.floor(array.length / 2);
    let leftArray = array.slice(0, midIdx);
    let rightArray = array.slice(midIdx);
    let botShowArray = [];
    botShowArray.push(leftArray);
    botShowArray.push(rightArray);

    botShowArray.map( subArray => {
      if (subArray.length !== 0) {
        this.state.botShowArray.push(subArray);
      }
    });
    this.setState({
      botShowArray: this.state.botShowArray
    });
  }

  moveBotToTop() {
    this.setState({
      topShowArray: this.state.botShowArray,
      botShowArray: []
    });
  }

  mergeSortMerge() {
    let that = this;

    let topArray = this.state.topShowArray.slice(0);

    this.interval2 = setInterval( () => {
      let that2 = that;
      let futureBotShowArray = that.state.botShowArray;

      if (this.state.topShowArray.length === 1) {
        clearInterval(this.interval2);
      } else {
        if (!that.state.topShowArray.every( arr => arr.length === 0)) {
          let currentArray = topArray.splice(0,2);
          let sortedSubArray = [];

          while ((currentArray[0].length > 0) || (currentArray[1].length > 0)) {
            if (currentArray[0].length === 0) {
              sortedSubArray.push(currentArray[1].splice(0,1)[0]);
            } else if (currentArray[1].length === 0) {
              sortedSubArray.push(currentArray[0].splice(0,1)[0]);
            } else if (currentArray[0][0] < currentArray[1][0]) {
              sortedSubArray.push(currentArray[0].splice(0,1)[0]);
            } else {
              sortedSubArray.push(currentArray[1].splice(0,1)[0]);
            }
          }
          futureBotShowArray.push(sortedSubArray);

          this.setState({
            botShowArray: futureBotShowArray
          });
        } else {
          this.moveBotToTop();
          topArray = this.state.topShowArray.slice(0);
        }
      }

    }, 2000);

  }


  // if (this.state.topShowArray.length === 1) {
  //   clearInterval(this.interval2);

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

  render(){
    return(
      <div>
        <button onClick={this.handleSubmit}>Start</button>

        <div>
          {this.state.topShowArray.map( (subArray, idx1) => (
            <span key={idx1}>
              <span>[</span>
              <span>
                {subArray.map( (num, idx2) => (
                  <span key={idx2}> {num} </span>
                ))}
              </span>
              <span>]</span>
            </span>
          ))}
        </div>

        <div>
          {this.state.botShowArray.map( (subArray, idx1) => (
            <span key={idx1}>
              <span>[</span>
              <span>
                {subArray.map( (num, idx2) => (
                  <span key={idx2}> {num} </span>
                ))}
              </span>
              <span>]</span>
            </span>
          ))}
        </div>
      </div>
    );
  }
}
