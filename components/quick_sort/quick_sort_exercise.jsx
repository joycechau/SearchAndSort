import React from 'react';
import QuickSortSolve from './quick_sort_class';


export default class QuickSortExercise extends React.Component{
  constructor(){
    super()
    // this.startArray = [9,1,3,14,17,12,10,2]
    this.state = {
      iterationCounter1: 0,
      rounds: 0,
      gameActive: false,
      gameState: "",
      correctButtonCount: 0,
      exerciseStarted: false
    }
    this.animationTimeout = 1000
    this.fullArrayButtons = this.fullArrayButtons.bind(this)
    this.pivotButton = this.pivotButton.bind(this)
    this.smallerThanPivotButtons = this.smallerThanPivotButtons.bind(this)
    this.largerThanPivotButtons = this.largerThanPivotButtons.bind(this)
    this.pivotButtonShow = this.pivotButtonShow.bind(this)
    this.pivotButtonHide = this.pivotButtonHide.bind(this)
    this.startGameClick = this.startGameClick.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.insertArrayByIndex = this.insertArrayByIndex.bind(this);
    this.ifHigherOrLowerIsEmpty = this.ifHigherOrLowerIsEmpty.bind(this);
    this.unfocusNotInCurrentSelection = this.unfocusNotInCurrentSelection.bind(this)
    this.hideAllSubarray = this.hideAllSubarray.bind(this)
    this.setSorted = this.setSorted.bind(this)
    this.reRenderAndActivateAllButtonsInFullArray = this.reRenderAndActivateAllButtonsInFullArray.bind(this)
    this.setPivot = this.setPivot.bind(this)
    this.startArray = this.randomArray()
    // this.startArray = [15,9,3,5,12,17,10,6,4]
    var newQuickSort = new QuickSortSolve
    this.sorting = newQuickSort.quickSort(this.startArray)
    this.result = newQuickSort.result()
  }

  componentDidUpdate(){
    // this.ifHigherOrLowerIsEmpty()
    console.log("checking life cycle");
    if (this.state.gameState === "newRound"){
      var counter = 0
      this.reRender = setInterval( ()=> {
        switch(counter){
          case 1:
            this.insertArrayByIndex()
          case 2:
            this.hideAllSubarray()
          case 3:
            console.log(this.state.iterationCounter1);
          case 4:
            this.reRenderAndActivateAllButtonsInFullArray()
          case 5:
            console.log("case6");
            this.setState({
              gameState: "selectLower",
              iterationCounter1: this.state.iterationCounter1 += 1
            })
            this.setSorted()
          case 6:
            this.unfocusNotInCurrentSelection()
            if (this.result[this.state.iterationCounter1][3].length < 1){
              debugger
              this.setState({gameState: "",
                exerciseStarted: false
              })
              this.props.demoState()
            } else {
              console.log("setPivot");
              this.setPivot()
            }
          clearInterval(this.reRender)
          return
        }
        counter += 1
      }, 1000)
      console.log(this.result);
      console.log("hit life cycle");
    }
  }

  setSorted(){
    this.setState({
      iterationCounter1: this.state.iterationCounter1 -= 1
    })
    var pivotNum = this.pivotArray()[0]
    var pivot = document.querySelectorAll(`[value="${pivotNum}"]`)
    pivot[0].className = "sortedExercise"
    var sorted = document.getElementsByClassName("activeExercise")

    var smaller = this.smallerThanPivotArray()
    var larger = this.largerThanPivotArray()

    if (smaller.length < 2 && larger.length < 2){
      debugger
      var currentArray = smaller.concat(larger)
      for (var j=0; j < 3; j++){
        for (var i = 0; i < sorted.length; i++){
          var currentNumber = parseInt(sorted[i].getAttribute("value"))
          if (currentArray.includes(currentNumber)){
            sorted[i].className = "sortedExercise"
          }
        }
      }
    } else if (smaller.length < 2 && smaller.length > 0){
      for (var i = 0; i < sorted.length; i++){
        var currentNumber = parseInt(sorted[i].getAttribute("value"))
        if (smaller.includes(currentNumber)){
          sorted[i].className = "sortedExercise"
        }
      }
    } else if (larger.length < 2 && larger.length > 0){
      for (var i = 0; i < sorted.length; i++){
        var currentNumber = parseInt(sorted[i].getAttribute("value"))
        if (larger.includes(currentNumber)){
          sorted[i].className = "sortedExercise"
        }
      }
    }
    this.setState({
      iterationCounter1: this.state.iterationCounter1 += 1
    })
    return
  }

  randomArray(){
    const newArr = []
    const arrLength = Math.floor(Math.random()*4 + 5)
    for (let i = 0; i < arrLength; i++){
      let newNum = Math.floor(Math.random()*20)
      if (!newArr.includes(newNum)){
        newArr.push(newNum)
      }
    }
    return newArr
  }

  findIndexes(){
    let newArr = []
    var sortedSet = this.result[this.state.iterationCounter1][2]
    .concat(this.result[this.state.iterationCounter1][3])
    .concat(this.result[this.state.iterationCounter1][1])
    for (let i = 0; i < sortedSet.length; i++){
      var idx = this.startArray.indexOf(sortedSet[i])
      newArr.push(idx)
    }
    return newArr.sort((a, b) => a-b)
  }
  insertArrayByIndex(){
    var indexSet = this.findIndexes()
    var sortedSet = this.result[this.state.iterationCounter1][2]
    .concat(this.result[this.state.iterationCounter1][3])
    .concat(this.result[this.state.iterationCounter1][1])
    for(let i = 0; i< indexSet.length; i++){
      this.startArray[indexSet[i]] = sortedSet[i]
    }
  }

  hideAllSubarray(){
    ["pivotShowExercise", "largerShowExercise", "smallerShowExercise"].forEach((subArrayClass) => {
      var i = document.getElementsByClassName(subArrayClass)
      while(i.length){
        i[0].className = subArrayClass.replace("Show", "Hidden")
      }
    })
  }

  incorrectToActiveClassChange(){
    var incorrects = document.getElementsByClassName("incorrect")
    while (incorrects.length) {
      incorrects[0].className = "activeExercise"
    }
    return
  }

  currentSelectionArray(){
    return this.result[this.state.iterationCounter1][0]
  }
  largerThanPivotArray(){
    return this.result[this.state.iterationCounter1][1]
  }
  smallerThanPivotArray(){
    return this.result[this.state.iterationCounter1][2]
  }
  pivotArray(){
    return this.result[this.state.iterationCounter1][3]
  }

  addClassNamesToArray(){
    this.reRenderAndActivateAllButtonsInFullArray()
    this.unfocusNotInCurrentSelection()
    var currentPivot = this.pivotArray()[0]
    var actives = document.getElementsByClassName("activeExercise")
  }

  fullArrayButtons(){
    return(
      this.startArray.map((num,i) => {
        return (
          <button key={i} value={num} onClick={this.handleClick} className="activeExercise">
            {num}
          </button>
        )
      })
    )
  }
  largerThanPivotButtons(){
    return(
      this.result[this.state.iterationCounter1][1].map( (el, i) => {
        return(
          <button key={i} value={el} className="largerHiddenExercise"> {el} </button>
        )
      })
    )
  }
  smallerThanPivotButtons(){
    return(
      this.result[this.state.iterationCounter1][2].map( (el, i) => {
        return(
          <button key={i} value={el} className="smallerHiddenExercise"> {el} </button>
        )
      })
    )
  }
  pivotButton(){
    console.log(this.state.iterationCounter1);
    return (
      <button value={this.result[this.state.iterationCounter1][3]} className="pivotHiddenExercise">
        {this.result[this.state.iterationCounter1][3].toString()}
      </button>
    )
  }



  smallerThanPivotButtonsShow(){
    var i = document.getElementsByClassName("smallerHiddenExercise")
    while (i.length){
      i[0].className="smallerShowExercise"
    }
  }
  smallerThanPivotButtonsHide(){
    var i = document.getElementsByClassName("smallerShowExercise")
    while (i.length){
      i[0].className="smallerHiddenExercise"
    }
  }

  largerThanPivotButtonsShow(){
    var i = document.getElementsByClassName("largerHiddenExercise")
    while (i.length){
      i[0].className="largerShowExercise"
    }
  }

  largerThanPivotButtonsHide(){
    var i = document.getElementsByClassName("largerShowExercise")
    while (i.length){
      i[0].className="largerHide"
    }
  }

  pivotButtonShow(){
    var i = document.getElementsByClassName("pivotHiddenExercise")
    while (i.length){
      i[0].className="pivotShowExercise"
    }
  }
  pivotButtonHide(){
    var i = document.getElementsByClassName("pivotShowExercise")
    while (i.length){
      i[0].className="pivotHideExercise"
    }
  }

  reRenderAndActivateAllButtonsInFullArray(){
    for (let i=0; i < 20; i++){
      ["pivot", "smaller", "larger", "hiddenExercise"].forEach((el) =>{
        var button =document.getElementsByClassName(el)
        while (button.length){
          button[0].className="activeExercise"
        }
      })
    }
  }

  hideActiveClass(){
    var num = document.getElementsByClassName("activeExercise")
    while (num.length){
      num[0].className="hiddenExercise"
    }
  }
  showPivotsubarray(){
    var pivot = document.getElementsByClassName("pivotHiddenExercise")
    while (pivot.length){
      pivot[0].className="pivotShowExercise"
    }
  }
  hidePivotSubarray(){
    var pivot = document.getElementsByClassName("pivotShowExercise")
    while (pivot.length){
      pivot[0].className="pivotHiddenExercise"
    }
  }
  showSmallerSubarray(){
    var smaller = document.getElementsByClassName("smallerHiddenExercise")
    while (smaller.length){
      smaller[0].className="smallerShowExercise"
    }
  }
  hideSmallerSubarray(){
    var smaller = document.getElementsByClassName("smallerShowExercise")
    while (smaller.length){
      smaller[0].className = "smallerHiddenExercise"
    }
  }
  showLargerSubarray(){
    var larger =  document.getElementsByClassName("largerHiddenExercise")
    while (larger.length){
      larger[0].className = "largerShowExercise"
    }
  }
  hideLargerSubarray(){
    var larger = document.getElementsByClassName("largerShowExercise")
    while (larger.length) {
      larger[0].className = "largerHiddenExercise"
    }
  }

  unfocusNotInCurrentSelection(){
      var notInCurrentSelection = this.startArray.filter( (el) => {
        return !this.currentSelectionArray().includes(el);
      });
      debugger
      for (var j=0; j < 10; j++){
        ["activeExercise", "unfocusedExercise"].forEach((className) => {
          var currentButtonSet = document.getElementsByClassName(className)
          for (var i = 0; i < currentButtonSet.length; i++ ) {
            if (notInCurrentSelection.includes(parseInt(currentButtonSet[i].value))){
              currentButtonSet[i].className = "unfocusedExercise"
            } else {
              currentButtonSet[i].className = "activeExercise"
            }
          }
        })
      }
    return

  }

  startGameClick(){
    console.log(this.result[this.state.iterationCounter1]);
    if (this.state.exerciseStarted){
      return
    }
    if (this.result[this.state.iterationCounter1 + 1][3].length > 0){
      this.props.demoState()
      this.setState({exerciseStarted: true})
      this.setPivot()
    }
  }

  setPivot(){
    var currArray = document.getElementsByClassName("activeExercise")
    currArray[0].className = "pivotExercise"
    var counter = 0
    this.startPivotShow = setInterval( ()=> {
      switch(counter){
        case 1:
          var pivot = document.getElementsByClassName("pivotExercise")
          pivot[0].className = "hiddenExercise"
          this.pivotButtonShow()
        case 2:
          if (this.smallerThanPivotArray().length > 0){
            this.setState({gameState: "selectLower"})
          } else {
            console.log("starting with selectHigher");
            this.setState({gameState: "selectHigher"})
          }
          clearInterval(this.startPivotShow)
          return
      }
      counter += 1
    }, this.animationTimeout)
  }


  handleClick(e){
    e.preventDefault()
    e.persist()
    var currentClass = e.currentTarget.className
    this.value = parseInt(e.currentTarget.value)
    if (!this.state.exerciseStarted
      || currentClass == "unfocusedExercise"
      || currentClass == "hiddenExercise" ){
      return
    }
    switch(this.state.gameState){
      case "selectLower":
        console.log("selecitng lower");
        if (this.smallerThanPivotArray().includes(this.value)) {
          console.log("selecting includes lower");
          e.currentTarget.className = "correct"
          setTimeout( () => {
            e.target.className = "hiddenExercise"
            var value = e.target.value
            this.correctSelectionHandler(value, "smaller")
          }, this.animationTimeout)
        } else {
          e.currentTarget.className = "incorrect"
        }
        return
      case "selectHigher":
        console.log("selecting higher");
        if (this.largerThanPivotArray().includes(this.value)
        || this.largerThanPivotArray().length < 1) {
          console.log("selecting includes higher");
          e.currentTarget.className = "correct"
          setTimeout( () => {
            e.target.className = "hiddenExercise"
            var value = e.target.value
            this.correctSelectionHandler(value, "larger")
          }, this.animationTimeout)
        }
        return
    }
  }

  ifHigherOrLowerIsEmpty(){
    if (this.smallerThanPivotArray().length < 1){
      this.setState({gameState: "selectHigher"})
    } else if (this.largerThanPivotArray().length < 1){
      this.setState({gameState: "newRound"})
    }
  }

  correctSelectionHandler(value, string){
    var button = document.querySelectorAll(`[value="${value}"]`);
    button[1].className = `${string}ShowExercise`
    console.log("hit correcthandler");
    this.setState({
      correctButtonCount: this.state.correctButtonCount += 1
    })
    switch(string){
      case "smaller":
        if (this.state.correctButtonCount >= this.smallerThanPivotArray().length) {
          if (this.largerThanPivotArray().length < 1){
            this.setState({gameState: "newRound", correctButtonCount: 0})
          } else {
            this.incorrectToActiveClassChange()
            this.setState({gameState: "selectHigher", correctButtonCount: 0})
          }
        }
        return
      case "larger":
      if (this.state.correctButtonCount >= this.largerThanPivotArray().length) {
        this.setState({gameState: "newRound", correctButtonCount: 0})
      }
      return
      default:
      return string
    }
  }

  render(){
    return (
      <div>
        <button onClick={this.startGameClick}>
          Start "Game"
        </button>

        <br/>
        {this.fullArrayButtons()}
        <br/>
        {this.pivotButton()}
        <br/>
        {this.smallerThanPivotButtons()}
        <br/>
        {this.largerThanPivotButtons()}
        {}
      </div>
    )
  }
}
