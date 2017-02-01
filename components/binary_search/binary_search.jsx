import React from 'react';
import BinarySearchSolution from '../solutions/binary_search/binary_search';

export default class BinarySearch extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      userInputArray: "",
      target: "",
      answer: []
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
    let input = this.state.userInputArray.split(',');
    let array = [];
    input.map(num => {
      array.push(parseInt(num));
    });
    array.sort( (a,b) => {
      return a - b;
    });
    let target = parseInt(this.state.target);

    this.setState({
      answer: array
    });

      this.bsearch(array, target);
  }

  bsearch(array, target) {
    this.interval = setInterval( () => {
      let midIdx = Math.floor(array.length / 2);
      let midNum = array[midIdx];

      if (midNum === target) {
        clearInterval(this.interval);
        this.setState({
          answer: [target]
        });
      } else if (target < midNum) {
        array = array.slice(0, midIdx);
        this.setState({
          answer: array
        });
      } else if (target > midNum) {
        array = array.slice(midIdx + 1);
        this.setState({
          answer: array
        });
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  // componentDidMount() {
  //   this.interval = setInterval(this.changeState.bind(this), 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render(){
    return (
      <div>
        <div>Binary Search</div>
        <form onSubmit={this.handleSubmit}>
          <label>array
            <input type="text" onChange={this.update('userInputArray')} />
          </label>
          <label>target
            <input type="text" onChange={this.update('target')} />
          </label>

          <button type="submit" value="submit">Submit</button>
        </form>
        <div className='array'>
          <span>[</span>
          <span>
            {this.state.answer.map((num, id) => (
              <span key={id}> {num} </span>
            ))}
          </span>
          <span>]</span>
        </div>
        <div>target: {this.state.target}</div>
        <div className="solution-container"><BinarySearchSolution /></div>
      </div>
    );
  }
}
