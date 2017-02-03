import React from 'react';

export default class BinarySearchExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      target: 7,
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      hiddenArray: ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
      showArray: ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"]
    };

    this.generateNewExercise = this.generateNewExercise.bind(this);
  }

  generateNewExercise() {
    let target = Math.floor(Math.random()*14);
    this.setState({
      target: target,
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      hiddenArray: ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"],
      showArray: ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?"]
    });
  }

  revealNumber(idx) {
    console.log(idx);
  }

  render() {
    return (
      <div>
        <button onClick={this.generateNewExercise}>New Exercise</button>
        <div>
          <span>
            {this.state.showArray.map((num, idx) => (
              <button key={idx} id={`${idx}`} onClick={() => this.revealNumber(idx)}> {num} </button>
            ))}
          </span>
        </div>
        <div>Find: {this.state.target}</div>
      </div>
    );
  }

}
