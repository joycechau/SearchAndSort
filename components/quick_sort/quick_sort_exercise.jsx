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
      correctButtonCount: 0
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
          if (this.result[this.state.iterationCounter1][3].length < 1){
            debugger
            this.setState({gameState: ""})
            return
          }
          this.hideAllSubarray()
          case 2:
          this.insertArrayByIndex()
          case 3:
          this.setState({
            gameState: "selectLower",
            iterationCounter1: this.state.iterationCounter1 += 1
          })
          console.log(this.state.iterationCounter1);
          case 4:
          this.reRenderAndActivateAllButtonsInFullArray()
          case 5:
          this.setSorted()
          case 6:
            this.unfocusNotInCurrentSelection()
            if (this.result[this.state.iterationCounter1][3].length < 1){
              debugger
              this.setState({gameState: ""})
              clearInterval(this.reRender)
              return
            } else {
              this.startGameClick()
            }
          clearInterval(this.reRender)
          return
        }
        counter += 1
      }, 1000)
      // this.setSorted()
      // this.forceUpdate()
      // this.unfocusNotInCurrentSelection()
      console.log(this.result);
      console.log("hit life cycle");
    }
  }

  setSorted(){
    var nums = document.getElementsByClassName("activeExercise")
    var pivotNum = this.result[this.state.iterationCounter1 - 1][3][0].toString()
    var activeArray = this.result[this.state.iterationCounter1 - 1][0]
    var pivot = this.result[this.state.iterationCounter1 - 1][3]
    var smaller = this.result[this.state.iterationCounter1 - 1][2]
    var larger = this.result[this.state.iterationCounter1 - 1][1]
    var smallPivot = this.result[this.state.iterationCounter1 - 1][2].concat(this.result[this.state.iterationCounter1 - 1][3])
    var pivotLarge = this.result[this.state.iterationCounter1 - 1][3].concat(this.result[this.state.iterationCounter1 - 1][1])
    var pivot = document.querySelectorAll(`[value="${pivotNum}"]`)
    pivot[0].className = "sortedExercise"
      if (activeArray.length < 3){
        var sorted = document.getElementsByClassName("activeExercise")
        while (nums[0]){
            nums[0].className = "sortedExercise"
        }
      }
      else if (smaller.length < 2 && larger.length < 2){
        var sorted = document.getElementsByClassName("activeExercise")
        for (let i = 0; i < sorted.length; i++){
          if (sorted[i]){
            if ( smallPivot.includes(parseInt(sorted[i].getAttribute("value")))){
              sorted[i].className= "sortedExercise"
            }
            if (pivotLarge.includes(parseInt(sorted[i].getAttribute("value")))){
              sorted[i].className="sortedExercise"
            }
          }

        }
      }
      // else if (larger.length < 2){
      //   var sorted = document.getElementsByClassName("activeExercise")
      //   for (let i = 0; i < sorted.length; i++){
      //     if (sorted[i]){
      //       if ( smallPivot.includes(parseInt(sorted[i].getAttribute("value")))){
      //         sorted[i].className= "sortedExercise"
      //       }
      //     }
      //   }
      // }
      else if (smallPivot.length < 3){
        var sorted = document.getElementsByClassName("activeExercise")
        for (let i = 0; i < sorted.length; i++){
          if (sorted[i]){
            if ( smallPivot.includes(parseInt(sorted[i].getAttribute("value")))){
              sorted[i].className= "sortedExercise"
            }
          }
        }
      }

      else if (pivotLarge.length < 3){
        // for (let j=0; j < 3; j++){
          var sorted = document.getElementsByClassName("activeExercise")
          for (let i = 0; i < sorted.length; i++){

            // if (sorted[i].getAttribute("value")){
              if ( pivotLarge.includes(parseInt(sorted[i].getAttribute("value")))){
                sorted[i].className= "sortedExercise"
              }
            // }
          }
        // }
      }
      return
  }

  randomArray(){
    const newArr = []
    const arrLength = Math.floor(Math.random()*8 + 1)
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

  activateInCurrentSelection(){
    var inCurrentSelection = this.startArray.filter( (el) => {
      return this.startArray.includes(this.currentSelectionArray);
    });
    inCurrentSelection.forEach( (num) => {
      var buttonsNotIn = document.querySelectorAll(`[value="${num}"]`);
      while (buttonsNotIn.length){
        buttonsNotIn[0]="unfocusedExercise"
      }
    })
  }


  startGameClick(){
    console.log(this.result[this.state.iterationCounter1]);
    if (this.state.iterationCounter1 > 1){
      if (this.result[this.state.iterationCounter1 - 2][3].length < 1){
        return
      }
    }
    var currArray = document.getElementsByClassName("activeExercise")
    currArray[0].className = "pivotExercise"
    // debugger
    var counter = 0
    var currArray = document.getElementsByClassName("pivotExercise")
    for (let i=0; i < currArray.length; i++){
      console.log(currArray[i].value);
      console.log(this.pivotArray()[0].toString());
      if (currArray[i].value == this.pivotArray()[0].toString()){
        this.startPivotShow = setInterval( ()=> {
          switch(counter){
            case 0:
            case 2:
            var pivotHide = document.getElementsByClassName("pivotExercise")
            pivotHide[0].className = "hiddenExercise"
            this.pivotButtonShow()
            clearInterval(this.startPivotShow)
            return
          }
          counter += 1
        }, this.animationTimeout)
      }
    }
    if (this.smallerThanPivotArray().length > 0){
      this.setState({gameState: "selectLower"})
    } else {
      console.log("starting with selectHigher");
      this.setState({gameState: "selectHigher"})
    }
  }


  handleClick(e){
    if (this.result[this.state.iterationCounter1 + 1][3].length > 0 && this.state.demoStarted){
      return
    }
    console.log("picking numbers");
    console.log(this.result[this.state.iterationCounter1][0]);
    e.preventDefault()
    e.persist()
    this.value = parseInt(e.currentTarget.value)
    console.log(e.currentTarget.value);
    if (e.currentTarget.className == "hiddenExercise"){
      return
    }
    console.log(this.state.gameState);
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
        if (this.largerThanPivotArray().includes(this.value) || this.largerThanPivotArray().length < 1) {
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
        console.log(this.smallerThanPivotArray().length);
        console.log(this.state.correctButtonCount);
        if (this.state.correctButtonCount >= this.smallerThanPivotArray().length) {
          console.log(this.largerThanPivotArray());
          if (this.largerThanPivotArray().length < 1){

            this.setState({gameState: "newRound", correctButtonCount: 0})
          } else {
            this.incorrectToActiveClassChange()
            console.log("changed to higher");
            this.setState({gameState: "selectHigher", correctButtonCount: 0})
          }
        } else {

        }
        return
      case "larger":
        console.log("hit larger correctSelectionHandler");
        console.log(this.state.correctButtonCount);
        console.log(this.largerThanPivotArray());
      if (this.state.correctButtonCount >= this.largerThanPivotArray().length) {
        console.log("changed to higher");
        this.setState({gameState: "newRound", correctButtonCount: 0})
        console.log(this.state.gameState);
      } else {

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
