import React from 'react';
import merge from 'lodash/merge';
import Solution from '../solutions/solution';
import MergeSortExercise from './merge_sort_exercise';

export default class MergeSort extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInputArray: "1, 2, 3, 4, 5, 6, 7, 8",
      topShowArray: [[]],
      botShowArray: [],
      iterationIndex: 0,
      iteration: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveBotToTop = this.moveBotToTop.bind(this);
    this.mergeSortSplit = this.mergeSortSplit.bind(this);
    this.mergeSortMerge = this.mergeSortMerge.bind(this);
  }

  componentDidMount() {
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
    }, 20);
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

    this.interval2 = setInterval( () => {
      let topArray = this.state.topShowArray.slice(0);
      if (topArray.length === 1) {
        clearInterval(this.interval2);
      } else {
        if (!that.state.topShowArray.every( arr => arr.length === 0)) {
          let futureBotShowArray = this.state.botShowArray;
          if (topArray[this.state.iterationIndex].length > 0 || topArray[this.state.iterationIndex + 1].length > 0) {
            // merge them
            if (topArray[this.state.iterationIndex].length === Math.pow(2, this.state.iteration) && topArray[this.state.iterationIndex + 1].length === Math.pow(2, this.state.iteration)) {
              var subArray = [];
            } else {
              var subArray = this.state.botShowArray[this.state.iterationIndex / 2];
            }

            if (topArray[this.state.iterationIndex].length === 0) {
              subArray.push(topArray[this.state.iterationIndex + 1].splice(0,1)[0]);
            } else if (topArray[this.state.iterationIndex + 1].length === 0) {
              subArray.push(topArray[this.state.iterationIndex].splice(0,1)[0]);
            } else if (topArray[this.state.iterationIndex][0] < topArray[this.state.iterationIndex + 1][0]) {
              subArray.push(topArray[this.state.iterationIndex].splice(0,1)[0]);
            } else {
              subArray.push(topArray[this.state.iterationIndex + 1].splice(0,1)[0]);
            }

            if (futureBotShowArray[that.state.iterationIndex / 2]) {
              futureBotShowArray[that.state.iterationIndex / 2] = subArray;
            } else {
              futureBotShowArray.push(subArray);
            }

            this.setState({
              botShowArray: futureBotShowArray,
            });

          } else {
            this.state.iterationIndex += 2;
          }
        } else {
          this.state.iterationIndex = 0;
          this.state.iteration += 1;
          this.moveBotToTop();
        }
      }
    }, 1000);
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

  render(){
    return(
      <div className="main-container">
        <div className="demo-and-exercise">
          <div className="mergesort-demo">
            <div>Click
              <button onClick={this.handleSubmit}> Start </button>to shuffle the array and start sorting!
            </div>
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
          <div className="mergesort-exercise"><MergeSortExercise /></div>
        </div>
        <div className="solution-container"><Solution algorithm="mergesort"/></div>
      </div>
    );
  }
}

// mergeSortMerge() {
//   let that = this;
//
//   let topArray = this.state.topShowArray.slice(0);
//
//   this.interval2 = setInterval( () => {
//     let that2 = that;
//     let futureBotShowArray = that.state.botShowArray;
//
//     if (this.state.topShowArray.length === 1) {
//       clearInterval(this.interval2);
//     } else {
      // if (!that.state.topShowArray.every( arr => arr.length === 0)) {
//         let currentArray = topArray.splice(0,2);
//         let sortedSubArray = [];
//
//         while ((currentArray[0].length > 0) || (currentArray[1].length > 0)) {
          // if (currentArray[0].length === 0) {
          //   sortedSubArray.push(currentArray[1].splice(0,1)[0]);
          // } else if (currentArray[1].length === 0) {
          //   sortedSubArray.push(currentArray[0].splice(0,1)[0]);
          // } else if (currentArray[0][0] < currentArray[1][0]) {
          //   sortedSubArray.push(currentArray[0].splice(0,1)[0]);
          // } else {
          //   sortedSubArray.push(currentArray[1].splice(0,1)[0]);
          // }
//         }
//         futureBotShowArray.push(sortedSubArray);
//
//         this.setState({
//           botShowArray: futureBotShowArray
//         });
//       } else {
//         this.moveBotToTop();
//         topArray = this.state.topShowArray.slice(0);
//       }
//     }
//
//   }, 2000);
//
// }
