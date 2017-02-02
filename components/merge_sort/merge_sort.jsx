import React from 'react';

export default class MergeSort extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInputArray: "",
      topShowArray: [[]],
      botShowArray: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.moveBotToTop = this.moveBotToTop.bind(this);
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

    this.setState({
      topShowArray: [array],
      botShowArray: []
    });
    let count = 0;
    this.interval = setInterval( () => {
      if (this.state.topShowArray.every(subArray => subArray.length === 1)) {
        clearInterval(this.interval);
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
    // this.state.botShowArray.push(botShowArray)
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

  sleep(miliseconds) {
     let currentTime = new Date().getTime();

     while (currentTime + miliseconds >= new Date().getTime()) {
      console.log('hi');
     }
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input autoFocus type='text' onChange={this.update("userInputArray")}/>
          <button type="Submit" value="Submit">Submit</button>
        </form>

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
