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
    this.animationTimeout = 250
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
    this.setPivot = this.setPivot.bind(this);
    this.startArray = this.randomArray();
    this.handleArrayShuffle = this.handleArrayShuffle.bind(this);
    this.instructions = this.instructions.bind(this);
    // this.startArray = [15,9,3,5,12,17,10,6,4]
    // this.resetArray = this.resetArray.bind(this);
    var newQuickSort = new QuickSortSolve
    this.sorting = newQuickSort.quickSort(this.startArray)
    this.result1 = newQuickSort.result()
  }

  componentDidUpdate(){
    // this.ifHigherOrLowerIsEmpty()
    if (this.state.gameState === "newRound"){
      var counter = 0
      this.reRender = setInterval( ()=> {
        switch(counter){
          case 1:
            this.insertArrayByIndex()
          case 2:
            this.hideAllSubarray()
            this.reRenderAndActivateAllButtonsInFullArray()
          case 3:
            this.setState({
              gameState: "selectLower",
              iterationCounter1: this.state.iterationCounter1 += 1
            })
            this.setSorted()
          case 4:
            this.unfocusNotInCurrentSelection()
            if (!this.result1[this.state.iterationCounter1][3].length){
              this.setState({gameState: "congrats",
                exerciseStarted: false
              })
              this.props.demoState()
            } else {
              this.setPivot()
            }
          clearInterval(this.reRender)
          return
        }
        counter += 1
      }, this.animationTimeout)
    }
  }

  setSorted(){
    if (!this.state.exerciseStarted) {
      return
    }
    this.setState({
      iterationCounter1: this.state.iterationCounter1 -= 1
    })
    var pivotNum = this.pivotArray()[0]
    var pivot = document.querySelectorAll(`[value="${pivotNum}"]`)
    if (pivot[0].className.includes("Exercise")){
      pivot[0].className = "sortedExercise"
    } else {
      pivot[1].className = "sortedExercise"
    }
    var sorted = document.getElementsByClassName("activeExercise")

    var smaller = this.smallerThanPivotArray()
    var larger = this.largerThanPivotArray()

    if (smaller.length < 2 && larger.length < 2){
      var currentArray = smaller.concat(larger)
      for (var j=0; j < 3; j++){
        for (var i = 0; i < sorted.length; i++){
          var currentNumber = parseInt(sorted[i].getAttribute("value"))
          if (currentArray.includes(currentNumber) && sorted[i].className.includes("Exercise")){
            sorted[i].className = "sortedExercise"
          }
        }
      }
    } else if (smaller.length < 2 && smaller.length > 0){
      for (var i = 0; i < sorted.length; i++){
        var currentNumber = parseInt(sorted[i].getAttribute("value"))
        if (smaller.includes(currentNumber) && sorted[i].className.includes("Exercise")){
          sorted[i].className = "sortedExercise"
        }
      }
    } else if (larger.length < 2 && larger.length > 0){
      for (var i = 0; i < sorted.length; i++){
        var currentNumber = parseInt(sorted[i].getAttribute("value"))
        if (larger.includes(currentNumber) && sorted[i].className.includes("Exercise")){
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
    const arrLength = Math.floor(Math.random()*3 + 6)
    for (let i = 0; i < arrLength; i++){
      let newNum = Math.floor(Math.random()*20)
      if (!newArr.includes(newNum)){
        newArr.push(newNum)
      } else {
        i--
      }
    }
    return newArr
  }

  findIndexes(){
    if (!this.state.exerciseStarted) {
      return
    }
    let newArr = []
    var sortedSet = this.result1[this.state.iterationCounter1][2]
    .concat(this.result1[this.state.iterationCounter1][3])
    .concat(this.result1[this.state.iterationCounter1][1])
    for (let i = 0; i < sortedSet.length; i++){
      var idx = this.startArray.indexOf(sortedSet[i])
      newArr.push(idx)
    }
    return newArr.sort((a, b) => a-b)
  }
  insertArrayByIndex(){
    if (!this.state.exerciseStarted) {
      return
    }
    var indexSet = this.findIndexes()
    var sortedSet = this.result1[this.state.iterationCounter1][2]
    .concat(this.result1[this.state.iterationCounter1][3])
    .concat(this.result1[this.state.iterationCounter1][1])
    for(let i = 0; i< indexSet.length; i++){
      this.startArray[indexSet[i]] = sortedSet[i]
    }
  }

  hideAllSubarray(){
    if (!this.state.exerciseStarted) {
      return
    }
    ["pivotShowExercise", "largerShowExercise", "smallerShowExercise"].forEach((subArrayClass) => {
      var i = document.getElementsByClassName(subArrayClass)
      while(i.length){
        i[0].className = subArrayClass.replace("Show", "Hidden")
      }
    })
  }

  incorrectToActiveClassChange(){
    if (!this.state.exerciseStarted) {
      return
    }
    var incorrects = document.getElementsByClassName("incorrect")
    while (incorrects.length) {
      incorrects[0].className = "activeExercise"
    }
    return
  }

  currentSelectionArray(){
    return this.result1[this.state.iterationCounter1][0]
  }
  largerThanPivotArray(){
    return this.result1[this.state.iterationCounter1][1]
  }
  smallerThanPivotArray(){
    return this.result1[this.state.iterationCounter1][2]
  }
  pivotArray(){
    return this.result1[this.state.iterationCounter1][3]
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
          <span>
            <button key={i} value={num} onClick={this.handleClick} className="quicksortIdleExercise">
              {num}
            </button>
          </span>
        )
      })
    )
  }
  largerThanPivotButtons(){
    return(
      this.result1[this.state.iterationCounter1][1].map( (el, i) => {
        return(
          <span>
            <button key={i} value={el} className="largerHiddenExercise"> {el} </button>
          </span>
        )
      })
    )
  }
  smallerThanPivotButtons(){
    return(
      this.result1[this.state.iterationCounter1][2].map( (el, i) => {
        return(
          <span>
            <button key={i} value={el} className="smallerHiddenExercise"> {el} </button>
          </span>
        )
      })
    )
  }
  pivotButton(){
    return (
      <span>
        <button value={this.result1[this.state.iterationCounter1][3]} className="pivotHiddenExercise">
          {this.result1[this.state.iterationCounter1][3].toString()}
        </button>
      </span>
    )
  }



  smallerThanPivotButtonsShow(){
    if (!this.state.exerciseStarted) {
      return
    }
    var i = document.getElementsByClassName("smallerHiddenExercise")
    while (i.length){
      i[0].className="smallerShowExercise"
    }
  }
  smallerThanPivotButtonsHide(){
    if (!this.state.exerciseStarted) {
      return
    }
    var i = document.getElementsByClassName("smallerShowExercise")
    while (i.length){
      i[0].className="smallerHiddenExercise"
    }
  }

  largerThanPivotButtonsShow(){
    if (!this.state.exerciseStarted) {
      return
    }
    var i = document.getElementsByClassName("largerHiddenExercise")
    while (i.length){
      i[0].className="largerShowExercise"
    }
  }

  largerThanPivotButtonsHide(){
    if (!this.state.exerciseStarted) {
      return
    }
    var i = document.getElementsByClassName("largerShowExercise")
    while (i.length){
      i[0].className="largerHide"
    }
  }

  pivotButtonShow(){
    if (!this.state.exerciseStarted) {
      return
    }
    var i = document.getElementsByClassName("pivotHiddenExercise")
    while (i.length){
      i[0].className="pivotShowExercise"
    }
  }
  pivotButtonHide(){
    if (!this.state.exerciseStarted) {
      return
    }
    var i = document.getElementsByClassName("pivotShowExercise")
    while (i.length){
      i[0].className="pivotHideExercise"
    }
  }

  reRenderAndActivateAllButtonsInFullArray(){
    if (!this.state.exerciseStarted) {
      return
    }
    for (let i=0; i < 20; i++){
      ["pivot", "smaller", "larger", "hiddenExercise"].forEach((el) =>{
        var button =document.getElementsByClassName(el)
        while (button.length){
          if (button[0].className.includes("Exercise")){
            button[0].className="activeExercise"
          } else {
            button[0].className = button[0].className
          }
        }
      })
    }
  }

  hideActiveClass(){
    if (!this.state.exerciseStarted) {
      return
    }
    var num = document.getElementsByClassName("activeExercise")
    while (num.length){
      num[0].className="hiddenExercise"
    }
  }
  showPivotsubarray(){
    if (!this.state.exerciseStarted) {
      return
    }
    var pivot = document.getElementsByClassName("pivotHiddenExercise")
    while (pivot.length){
      pivot[0].className="pivotShowExercise"
    }
  }
  hidePivotSubarray(){
    if (!this.state.exerciseStarted) {
      return
    }
    var pivot = document.getElementsByClassName("pivotShowExercise")
    while (pivot.length){
      pivot[0].className="pivotHiddenExercise"
    }
  }
  showSmallerSubarray(){
    if (!this.state.exerciseStarted) {
      return
    }
    var smaller = document.getElementsByClassName("smallerHiddenExercise")
    while (smaller.length){
      smaller[0].className="smallerShowExercise"
    }
  }
  hideSmallerSubarray(){
    if (!this.state.exerciseStarted) {
      return
    }
    var smaller = document.getElementsByClassName("smallerShowExercise")
    while (smaller.length){
      smaller[0].className = "smallerHiddenExercise"
    }
  }
  showLargerSubarray(){
    if (!this.state.exerciseStarted) {
      return
    }
    var larger =  document.getElementsByClassName("largerHiddenExercise")
    while (larger.length){
      larger[0].className = "largerShowExercise"
    }
  }
  hideLargerSubarray(){
    if (!this.state.exerciseStarted) {
      return
    }
    var larger = document.getElementsByClassName("largerShowExercise")
    while (larger.length) {
      larger[0].className = "largerHiddenExercise"
    }
  }

  unfocusNotInCurrentSelection(){
    if (!this.state.exerciseStarted) {
      return
    }
      var notInCurrentSelection = this.startArray.filter( (el) => {
        return !this.currentSelectionArray().includes(el);
      });
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

  handleArrayShuffle(){
    var counter = 0;
    // if (this.result1[this.state.iterationCounter + 1][2].length > 0 && this.state.demoStarted){
    //   return
    // }
    this.hideAllSubarray();
    this.shuffleArray = setInterval( () => {
      switch(counter) {
        case 1:
          this.setState({iterationCounter1: 0, solved: false, gameState: ""})
          this.startArray = this.randomArray()
          var newQuickSort = new QuickSortSolve
          this.sorting = newQuickSort.quickSort(this.startArray)
          this.result1 = newQuickSort.result()
        case 2:
          for (var i=0; i < 2; i++ ){
            [
              "activeExercise",
              "smallerShowExercise",
              "pivotShowExercise",
              "largerShowExercise",
              "pivotExercise",
              "hiddenExercise",
              "sortedExercise",
              "correct",
              "incorrect"
            ].forEach( (className) => {
              var init = document.getElementsByClassName(className)
              while (init.length){
                init[0].className = "quicksortIdleExercise"
              }
            })
          }
        case 3:
          clearInterval(this.shuffleArray)
          this.forceUpdate()
      }
      counter += 1
    }, 1)
    this.setState({exerciseStarted: false})
  }

  startGameClick(){
    if (this.state.exerciseStarted || document.getElementsByClassName("sortedExercise").length === this.startArray.length){
      return
    }
    var init = document.getElementsByClassName("quicksortIdleExercise")
    while (init.length){
      init[0].className = "activeExercise"
    }
    var counter = 0
    this.gameClick = setInterval( () => {
      switch(counter){
        case 1:
        this.props.demoState()
        this.setState({exerciseStarted: true, gameState: "selectLower"})
        this.setPivot()
        clearInterval(this.gameClick)
      }
      counter += 1
    }, 100)
  }

  setPivot(){
    if (!this.state.exerciseStarted) {
      return
    }
    var currArray = document.getElementsByClassName("activeExercise")
    if (currArray.length > 0){
      currArray[0].className = "pivotExercise"
    }
    var counter = 0
    this.startPivotShow = setInterval( ()=> {
      switch(counter){
        case 1:
          var pivot = document.getElementsByClassName("pivotExercise")
          while (pivot.length){
            pivot[0].className = "hiddenExercise"
          }
          this.pivotButtonShow()
        case 2:
          if (this.smallerThanPivotArray().length > 0){
            this.setState({gameState: "selectLower"})
          } else {
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
        if (e.currentTarget.className == "incorrect" || e.currentTarget.className == "correct" || e.currentTarget.className == "sortedExercise"){
          return
        }
        if (this.smallerThanPivotArray().includes(this.value)) {
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
        if (e.currentTarget.className == "incorrect" || e.currentTarget.className == "correct" || e.currentTarget.className == "sortedExercise"){
          return
        }
        if (this.largerThanPivotArray().includes(this.value)
        || this.largerThanPivotArray().length < 1) {
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

  instructions(){
    var message
    switch(this.state.gameState){
      case "selectLower":
        message = "Select numbers lower than the pivot"
        break
      case "selectHigher":
        message = "Select numbers higher than the pivot"
        break
      case "congrats":
        message = "You did it!"
        break
      default:
        message = " "
    }
    return (
      <div>
        {`${message}`}
      </div>
    )
  }

  ifHigherOrLowerIsEmpty(){
    if (this.smallerThanPivotArray().length < 1){
      this.setState({gameState: "selectHigher"})
    } else if (this.largerThanPivotArray().length < 1){
      this.setState({gameState: "newRound"})
    }
  }

  correctSelectionHandler(value, string){
    if (!this.state.exerciseStarted) {
      return
    }
    var button = document.querySelectorAll(`[value="${value}"]`);
    if (button[1].className.includes("Exercise")){
      button[1].className = `${string}ShowExercise`
    } else {
      button[2].className = `${string}ShowExercise`
    }
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
      <div className="quicksort-exercise-container">
        <div className="quicksort-try">
          Try it out yourself!
        </div>
        <div className="quicksort-button-container">
          <button onClick={this.startGameClick} className="quicksort-start-exercise">
            Start Exercise
          </button>
          <button onClick={this.handleArrayShuffle} className="quicksort-start-exercise">
            Reset
          </button>
        </div>
        <div className="quicksort-demo-array">
          { this.fullArrayButtons()}
        </div>

        <div className="quicksort-exercise-subarray">
          {this.smallerThanPivotButtons()}
          {this.pivotButton()}
          {this.largerThanPivotButtons()}
        </div>
        <div className="instructions">
          {this.instructions()}
        </div>
      </div>
    )
  }
}
