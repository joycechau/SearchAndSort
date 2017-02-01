import React from 'react';

export default class BinarySearch extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      userInputArray: "",
      target: "",
      answer: [],
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
      userInputArray: array,
      answer: array,
      index: 0,
      toggle: false
    });

    this.interval = setInterval( () => {
      this.bsearch(this.state.answer, target);
    }, 2000);
  }

  bsearch(array, target) {
    let midIdx = Math.floor(array.length / 2);
    let midNum = array[midIdx];
    if (array.length !== 0) {
      let el = document.getElementById(midIdx);
      el.className = 'blue';
    }

    setTimeout( () => {
      if (array.length !== 0) {
        let el = document.getElementById(midIdx);
        el.className = '';
      }
      if (midNum === target) {
        this.setState({
          answer: [target],
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
          answer: array
        });
      } else if (target > midNum) {
        array = array.slice(midIdx + 1);
        this.setState({
          answer: array,
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
          <span className='array'>original array:
            <span>[</span>
            <span>
              {this.state.userInputArray.map((num, id) => (
                <span key={id} id={`${id}`}> {num} </span>
              ))}
            </span>
            <span>]</span>
          </span>
          <div>index: {this.state.index}</div>
        </div>
      );
    }
  }

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

        <div>
          <span>[</span>
          <span>
            {this.state.answer.map((num, id) => (
              <span key={id} id={`${id}`}> {num} </span>
            ))}
          </span>
          <span>]</span>
        </div>

        <div>target: {this.state.target}</div>
        <div>{this.showFinal()}</div>

      </div>
    );
  }
}
