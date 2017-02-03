import React from 'react';
import QuickSortSolve from './quick_sort_class';


export default class QuickSortExercise extends React.Component{
  constructor(){
    super()
    this.startArray = [9,1,3,14,17,12,10,2]
    this.state = {
      iterationCounter: 0,
      rounds: 0,
      gameActive: false,
      gameState: "",
      correctButtonCount: 0
    }
    this.animationTimeout = 1000
    this.startArray = this.randomArray()
    var newQuickSort = new QuickSortSolve
    this.sorting = newQuickSort.quickSort(this.startArray)
    this.result = newQuickSort.result()
    this.handleTrueArrayClick = this.handleTrueArrayClick.bind(this)
    this.gameStart = this.gameStart.bind(this)
  }

  randomArray(){
    const newArr = []
    const arrLength = Math.floor(Math.random()*10 + 10)
    for (let i = 0; i < arrLength; i++){
      let newNum = Math.floor(Math.random()*20)
      if (!newArr.includes(newNum)){
        newArr.push(newNum)
      }
    }
    return newArr
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

  pivot(){
    return (
      <button className="pivotHidden">
        {this.result[this.state.iterationCounter][3].toString()}
      </button>
    )
  }
  largerThanPivot(){
    return(
      this.result[this.state.iterationCounter][1].map( (el, i) => {
        return(
          <button key={i} value={el} className="largerHidden"> {el} </button>
        )
      })
    )
  }
  smallerThanPivot(){
    return(
      this.result[this.state.iterationCounter][2].map( (el, i) => {
        return(
          <button key={i} value={el} className="smallerHidden"> {el} </button>
        )
      })
    )
  }

  showPivot(){
    var pivot = document.getElementsByClassName("pivotHidden")
    while (pivot.length){
      pivot[0].className="pivotShow"
    }
  }
  hidePivot(){
    var pivot = document.getElementsByClassName("pivotShow")
    while (pivot.length){
      pivot[0].className="pivotHidden"
    }
  }

  smaller(){
    return this.result[this.state.iterationCounter][2]
  }

  showHidden(){
    var actives = document.getElementsByClassName("hidden")
    while (actives.length){
      actives[0] = "active"
    }
  }

  showSmaller(){
    var smaller = document.getElementsByClassName("smallerHidden")
    while (smaller.length){
      smaller[0].className="smallerShow"
    }
  }

  hideSmaller(){
    var smaller = document.getElementsByClassName("smallerShow")
    while (smaller.length){
      smaller[0].className = "smallerHidden"
    }
  }

  smallerCount(){
    return this.result[this.state.iterationCounter][2].length
  }

  larger(){
    return this.result[this.state.iterationCounter][1]
  }

  showLarger(){
    var larger =  document.getElementsByClassName("largerHidden")
    while (larger.length){
      larger[0].className = "largerShow"
    }
  }

  hideLarger(){
    var larger = document.getElementsByClassName("largerShow")
    while (larger.length) {
      larger[0].className = "largerHidden"
    }
  }

  largerCount(){
    return this.result[this.state.iterationCounter][1].length
  }

  currentSelection(){
    return this.result[this.state.iterationCounter][0]
  }

  pivotNum(){
    return this.result[this.state.iterationCounter][3]
  }

  handleTrueArrayClick(e){
    e.preventDefault();
    e.persist()
    var value = parseInt(e.currentTarget.name);
    if (e.currentTarget.className == "hidden"){
      return
    }
    if (this.state.gameActive){
      switch(this.state.gameState) {
        case "selectLower":
          if (this.smaller().includes(value)) {
            e.currentTarget.className = "correct"
            setTimeout( () => {
              e.target.className = "hidden"
              let value = e.target.name
              this.correctHandler(value, "smaller")
            }, this.animationTimeout)
          } else {
            e.currentTarget.className = "incorrect"
            console.log("incorrect");
            setTimeout( () => {
              this.incorrectHandler(value)
            }, this.animationTimeout)
          }
          return
        case "selectHigher":
          if (this.larger().includes(value)) {
            e.currentTarget.className = "correct"
            setTimeout( () => {
              e.target.className = "hidden"
              this.correctHandler(value, "larger")
            }, this.animationTimeout)
          } else {
            e.currentTarget.className = "incorrect"
            setTimeout( () => {
              this.incorrectHandler(value)
            }, this.animationTimeout)
          }
          return
        default:
          console.log("didn't hit any right/wrong logic");
      }
    }
  }

  correctHandler(value, string){
    var button = document.querySelectorAll(`[value="${value}"]`);
    button[0].className = `${string}Show`
    this.setState({correctButtonCount: this.state.correctButtonCount += 1})
    switch(string){
      case "smaller":
        if (this.state.correctButtonCount >= this.smallerCount()){
          this.setState({gameState: "selectHigher", correctButtonCount: 0})
          var incorrectInputs = document.getElementsByClassName("incorrect")
          while (incorrectInputs.length){
            incorrectInputs[0].className="active"
          }
        }
        return
      case "larger":
        if (this.state.correctButtonCount >= this.largerCount()){

          this.setState({gameState: "selectLower",
            correctButtonCount: 0,
            iterationCounter: this.state.iterationCounter += 1
          })
          console.log(this.state.gameState);
          this.hideLarger()
          this.hideSmaller()
          this.hidePivot()
          this.showHidden()
        }
        return
      default:
        return
    }
  }

  incorrectHandler(value){
    var button = document.querySelectorAll(`[name="${value}"]`);
    button[0].className="incorrect"
  }

  selectLowerButtonLogic(input){
    switch(input){
      case this.smaller().includes(input):
        console.log("correct");

    }
  }

  trueArray(){
    return(
      this.startArray.map( (el, i )=> {
        return(
          <button onClick={this.handleTrueArrayClick} name={el} id ={i} key={i} className="active">{el}</button>
        )
      })
    )
  }

  gameStart(){
    setTimeout( () => {
      this.setState({gameActive: true, gameState: "selectLower"})
      console.log("started");
      this.showPivot()
    }, 500)
  }

  render(){
    return(
      <div>
        {this.trueArray()}
        <button onClick={this.handleArrayShuffle}>
          new array
        </button>
        <button onClick={this.gameStart}>
          start
        </button>
        <p>
          pivot {this.pivot()}
          smaller {this.smallerThanPivot()}
          larger {this.largerThanPivot()}
        </p>
      </div>
    )
  }
}
