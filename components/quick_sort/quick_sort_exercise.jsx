import React from 'react';
import QuickSortSolve from './quick_sort_class';


export default class QuickSortExercise extends React.Component{
  constructor(){
    super()
    this.startArray = [9,1,3,14,17,12,10,2]
    this.state = {
      buttonClass: "open",
      gamePhase: "selectingPivot",
      setPivot: null,
      smallerThanPivot: [],
      largerThanPivot: [],
      pivot: [],
      solvedNumbers: []
    }
  }


  handleClick(e){
    e.preventDefault()
    switch(this.state.gamePhase){
      case "solved":
        return
      case "selectingPivot":
        this.setState({
          setPivot: parseInt(e.currentTarget.value),
          gamePhase: "selectDirection",
          buttonClass: "selectDirection"
        })
      case "selectDirection":
        this.selectDirectionChecker()
    }
  }

  selectDirectionChecker(e){
    e.preventDefault()
    if (e.currentTarget.name === "left"){

    } else {

    }
  }

  direction(){
    return(
      <div>
        <button className="leftArrow" name="left" onClick={this.handleDirectionClick}>
          left arrow
        </button>

        <button className="rightArrow" name="right" onClick={this.handleDirectionClick}>
          right
        </button>
      </div>
    )

  }

  fullArray(){
    return(
      this.startArray.map((num,i) => {
        return (
          <button key={i} value={num} onClick={this.handleClick} className={this.state.buttonClass}>
            {num}
          </button>
        )
      })
    )
  }

  update(input){
    return e => this.setState({
      [input]: e.currentTarget.value
    });
  }

  handleSubmit(){
    return
  }

  smallerSelect(){
    return(
      <span>
        {this.state.smallerThanPivot}
      </span>
    )
  }

  largerSelect(){
    return(
      <span>
        {this.state.largerThanPivot}
      </span>
    )
  }

  pivotSelect(){
    return(
      <span>
        {this.state.pivot}
      </span>
    )
  }



  inputArraySet(){
    return (
      <div>
        <span>
          {this.smallerSelect}
        </span>
        <span>
          {this.pivotSelect}
        </span>
        <span>
          {this.largerSelect}
        </span>
      </div>
    )
  }

  render(){
    return(
      <div>
        {this.state.gamePhase === "selectDirection" ? this.direction() : null}
        {this.fullArray()}
        {this.inputArraySet()}
      </div>
    )
  }
}
