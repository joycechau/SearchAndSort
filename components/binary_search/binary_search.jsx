import React from 'react';
import Solution from '../solutions/solution';
import BinarySearchExercise from './binary_search_exercise';

export default class BinarySearch extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      target: "",
      showArray: [],
      index: 0,
      toggle: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.bsearch = this.bsearch.bind(this);
  }

  update(input){
    return e => this.setState({
      [input]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let target = parseFloat(this.state.target);

    this.setState({
      showArray: array,
      index: 0,
      toggle: false
    });

    this.interval = setInterval( () => {
      this.bsearch(this.state.showArray, target);
    }, 2000);
  }

  bsearch(array, target) {
    let midIdx = Math.floor(array.length / 2);
    let midNum = array[midIdx];
    if (array.length !== 0) {
      let el = document.getElementById(midIdx);
      el.className = 'midpoint';
    }

    setTimeout( () => {
      if (array.length !== 0) {
        let el = document.getElementById(midIdx);
        el.className = '';
      }
      if (midNum === target) {
        this.setState({
          showArray: [target],
          index: this.state.index += midIdx
        });
        clearInterval(this.interval);
        setTimeout( () => {
          this.setState({
            toggle: true
          });
        }, 1000);
      } else if (target < midNum) {
        array = array.slice(0, midIdx);
        this.setState({
          showArray: array
        });
      } else if (target > midNum) {
        array = array.slice(midIdx + 1);
        this.setState({
          showArray: array,
          index: this.state.index += (midIdx + 1)
        });
      } else {
        clearInterval(this.interval);
        setTimeout( () => {
          this.setState({
            toggle: true,
            index: "not found"
          });
        }, 1000);
      }
    }, 1000);
  }

  showFinal() {
    if (this.state.toggle) {
      return(
        <div>
          <div>Target Index: {this.state.index}</div>
        </div>
      );
    }
  }

  render(){
    return (
      <div className="main-container">
        <div className="demo-and-exercise">
          <div className="bsearch-demo">
            <span className='bsearch-static-array'>
              Numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            </span>
            <form onSubmit={this.handleSubmit}>
              <label>Target:
                <input type="text" onChange={this.update('target')} />
              </label>

              <button type="submit" value="submit">Run</button>
            </form>
            <div>
              <span>[</span>
              <span>
                {this.state.showArray.map((num, id) => (
                  <span key={id} id={`${id}`}> {num} </span>
                ))}
              </span>
              <span>]</span>
            </div>
            <div>{this.showFinal()}</div>
          </div>
          <div className="bsearch-exercise">
            <BinarySearchExercise />
          </div>
        </div>
        <div className="solution-container"><Solution algorithm="bsearch"/></div>
      </div>
    );
  }
}
