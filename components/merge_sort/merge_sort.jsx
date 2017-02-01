import React from 'react';

export default class MergeSort extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      array: "",
      isLoaded: false
    }
    this.handleArraySubmit = this.handleArraySubmit.bind(this)
    this.solution = this.solution.bind(this)
  }

  handleArraySubmit(e){
    e.preventDefault()
    this.props.getMergeSort(this.state.array).then(()=>{
      this.setState({isLoaded: true})
    })
  }

  update(input){
    return e => this.setState({
      [input]: e.currentTarget.value
    })
  }

  solution(){
    return (
      this.props.mergeSort.deconstructed.map( (arr, i) => {
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
        <form onSubmit={this.handleArraySubmit}>
          <input autoFocus type='text' onChange={this.update("array")}/>
          <button type="Submit" value="Submit">
            Post
          </button>
        </form>
      </div>
    )
  }
}
