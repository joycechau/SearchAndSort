import React from 'react';

export default class QuickSort extends React.Component {
  constructor(){
    super()
    this.state = {
      array: "",
      start: true,
      isLoaded: false
    };
    this.handleArraySubmit = this.handleArraySubmit.bind(this);
    this.formIn = this.formIn.bind(this);
    this.solution = this.solution.bind(this);
  }

  update(input){
    return e => this.setState({
      [input]: e.currentTarget.value
    })
  }

  handleArraySubmit(e){
    e.preventDefault();
    this.props.getQuickSort(this.state.array).then(()=> {
      this.setState({isLoaded: true})
    })
  }

  formIn() {
    return (
      <div>
        <form onSubmit={this.handleArraySubmit}>
          <input autoFocus type='text' onChange={this.update('array')} />
          <button type="Submit" value="Submit">
            Post
          </button>
        </form>
      </div>
    )
  }

  solution(){
    return(
      this.props.quickSort.solution.map( (arr, i) => {
        return (
          <li key={i}> {arr} </li>
        )
      })
    )
  }

  render(){
    return(
      <div>
        {this.state.isLoaded ? this.solution() : null}
        {this.formIn()}
      </div>
    )
  }
}
