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
          this.hideAllSubarray()
          case 2:
          this.insertArrayByIndex()
          case 3:
          this.setState({
            gameState: "selectLower",
            iterationCounter: this.state.iterationCounter += 1
          })
          console.log(this.state.iterationCounter);
          case 4:
          this.reRenderAndActivateAllButtonsInFullArray()
          case 5:
          this.setSorted()
          case 6:
          this.unfocusNotInCurrentSelection()
          clearInterval(this.reRender)
          return
        }
        counter += 1
      }, 1000)
      // this.setSorted()
      // this.forceUpdate()
      // this.unfocusNotInCurrentSelection()
      // debugger
      console.log(this.result);
      console.log("hit life cycle");
    }
  }

  setSorted(){
    var nums = document.getElementsByClassName("active")
    var pivotNum = this.result[this.state.iterationCounter - 1][3][0].toString()
    var activeArray = this.result[this.state.iterationCounter - 1][0]
    var pivot = this.result[this.state.iterationCounter - 1][3]
    var smaller = this.result[this.state.iterationCounter - 1][2]
    var larger = this.result[this.state.iterationCounter - 1][3]
    var smallPivot = this.result[this.state.iterationCounter - 1][2].concat(this.result[this.state.iterationCounter - 1][3])
    var pivotLarge = this.result[this.state.iterationCounter - 1][3].concat(this.result[this.state.iterationCounter - 1][1])
    var pivot = document.querySelectorAll(`[value="${pivotNum}"]`)
    debugger;
    pivot[0].className = "sorted"
      if (activeArray.length < 3){
        var sorted = document.getElementsByClassName("active")
        while (nums[0]){
            nums[0].className = "sorted"
        }
      }
      else if (pivot.length === 1 && smaller.length === 1 && larger.length === 1){
        var sorted = document.getElementsByClassName("active")
        for (let i = 0; i < sorted.length; i++){
          if (sorted[i]){
            if ( smallPivot.includes(parseInt(sorted[i].getAttribute("value")))){
              sorted[i].className= "sorted"
            }
          }
        }
      }
      else if (smallPivot.length < 3){
        var sorted = document.getElementsByClassName("active")
        for (let i = 0; i < sorted.length; i++){
          if (sorted[i]){
            if ( smallPivot.includes(parseInt(sorted[i].getAttribute("value")))){
              sorted[i].className= "sorted"
            }
          }
        }
      }

      else if (pivotLarge.length < 3){
        // for (let j=0; j < 3; j++){
          var sorted = document.getElementsByClassName("active")
          for (let i = 0; i < sorted.length; i++){

            // if (sorted[i].getAttribute("value")){
              if ( pivotLarge.includes(parseInt(sorted[i].getAttribute("value")))){
                sorted[i].className= "sorted"
              }
            // }
          }
        // }
      }
  }

  randomArray(){
    const newArr = []
    const arrLength = Math.floor(Math.random()*3 + 8)
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
    var sortedSet = this.result[this.state.iterationCounter][2]
    .concat(this.result[this.state.iterationCounter][3])
    .concat(this.result[this.state.iterationCounter][1])
    for (let i = 0; i < sortedSet.length; i++){
      var idx = this.startArray.indexOf(sortedSet[i])
      newArr.push(idx)
    }
    return newArr.sort((a, b) => a-b)
  }
  insertArrayByIndex(){
    var indexSet = this.findIndexes()
    var sortedSet = this.result[this.state.iterationCounter][2]
    .concat(this.result[this.state.iterationCounter][3])
    .concat(this.result[this.state.iterationCounter][1])
    for(let i = 0; i< indexSet.length; i++){
      this.startArray[indexSet[i]] = sortedSet[i]
    }
  }

  hideAllSubarray(){
    ["pivotShow", "largerShow", "smallerShow"].forEach((subArrayClass) => {
      var i = document.getElementsByClassName(subArrayClass)
      while(i.length){
        i[0].className = subArrayClass.replace("Show", "Hidden")
      }
    })
  }

  currentSelectionArray(){
    return this.result[this.state.iterationCounter][0]
  }
  largerThanPivotArray(){
    return this.result[this.state.iterationCounter][1]
  }
  smallerThanPivotArray(){
    return this.result[this.state.iterationCounter][2]
  }
  pivotArray(){
    return this.result[this.state.iterationCounter][3]
  }

  addClassNamesToArray(){
    this.reRenderAndActivateAllButtonsInFullArray()
    this.unfocusNotInCurrentSelection()
    var currentPivot = this.pivotArray()[0]
    var actives = document.getElementsByClassName("active")
  }

  fullArrayButtons(){
    return(
      this.startArray.map((num,i) => {
        return (
          <button key={i} value={num} onClick={this.handleClick} className="active">
            {num}
          </button>
        )
      })
    )
  }
  largerThanPivotButtons(){
    return(
      this.result[this.state.iterationCounter][1].map( (el, i) => {
        return(
          <button key={i} value={el} className="largerHidden"> {el} </button>
        )
      })
    )
  }
  smallerThanPivotButtons(){
    return(
      this.result[this.state.iterationCounter][2].map( (el, i) => {
        return(
          <button key={i} value={el} className="smallerHidden"> {el} </button>
        )
      })
    )
  }
  pivotButton(){
    console.log(this.state.iterationCounter);
    return (
      <button value={this.result[this.state.iterationCounter][3]} className="pivotHidden">
        {this.result[this.state.iterationCounter][3].toString()}
      </button>
    )
  }



  smallerThanPivotButtonsShow(){
    var i = document.getElementsByClassName("smallerHidden")
    while (i.length){
      i[0].className="smallerShow"
    }
  }
  smallerThanPivotButtonsHide(){
    var i = document.getElementsByClassName("smallerShow")
    while (i.length){
      i[0].className="smallerHidden"
    }
  },jk

  largerThanPivotButtonsShow(){
    var i = document.getElementsByClassName("largerHidden")
    while (i.length){
      i[0].className="largerShow"
    }
  }

  largerThanPivotButtonsHide(){
    var i = document.getElementsByClassName("largerShow")
    while (i.length){
      i[0].className="largerHide"
    }
  }

  pivotButtonShow(){
    var i = document.getElementsByClassName("pivotHidden")
    while (i.length){
      i[0].className="pivotShow"
    }
  }
  pivotButtonHide(){
    var i = document.getElementsByClassName("pivotShow")
    while (i.length){
      i[0].className="pivotHide"
    }
  }

  reRenderAndActivateAllButtonsInFullArray(){
    for (let i=0; i < 20; i++){
      ["pivot", "smaller", "larger", "hidden"].forEach((el) =>{
        var button =document.getElementsByClassName(el)
        while (button.length){
          button[0].className="active"
        }
      })
    }
  }

  hideActiveClass(){
    var num = document.getElementsByClassName("active")
    while (num.length){
      num[0].className="hidden"
    }
  }
  showPivotsubarray(){
    var pivot = document.getElementsByClassName("pivotHidden")
    while (pivot.length){
      pivot[0].className="pivotShow"
    }
  }
  hidePivotSubarray(){
    var pivot = document.getElementsByClassName("pivotShow")
    while (pivot.length){
      pivot[0].className="pivotHidden"
    }
  }
  showSmallerSubarray(){
    var smaller = document.getElementsByClassName("smallerHidden")
    while (smaller.length){
      smaller[0].className="smallerShow"
    }
  }
  hideSmallerSubarray(){
    var smaller = document.getElementsByClassName("smallerShow")
    while (smaller.length){
      smaller[0].className = "smallerHidden"
    }
  }
  showLargerSubarray(){
    var larger =  document.getElementsByClassName("largerHidden")
    while (larger.length){
      larger[0].className = "largerShow"
    }
  }
  hideLargerSubarray(){
    var larger = document.getElementsByClassName("largerShow")
    while (larger.length) {
      larger[0].className = "largerHidden"
    }
  }

  unfocusNotInCurrentSelection(){
    var notInCurrentSelection = this.startArray.filter( (el) => {
      return !this.currentSelectionArray().includes(el);
    });
    var currentButtonSet = document.getElementsByClassName("active")
    for (var i=0; i < currentButtonSet.length; i++){
      if (notInCurrentSelection.includes(parseInt(currentButtonSet.value))){
        currentButtonSet[i].className = "sorted"
      }
    }
    // notInCurrentSelection.forEach( (num) => {
    //   var buttonsNotIn = document.querySelectorAll(`[value="${num}"]`);
    //   for (var i = 0; i < buttonsNotIn.length; i++){
    //     if (buttonsNotIn[i].className != "sorted"){
    //       buttonsNotIn[i].className ="unfocused"
    //     }
    //   }
    // })
  }

  activateInCurrentSelection(){
    var inCurrentSelection = this.startArray.filter( (el) => {
      return this.startArray.includes(this.currentSelectionArray);
    });
    inCurrentSelection.forEach( (num) => {
      var buttonsNotIn = document.querySelectorAll(`[value="${num}"]`);
      while (buttonsNotIn.length){
        buttonsNotIn[0]="unfocused"
      }
    })
  }

  startGameClick(){
    console.log(this.result);
    this.pivotButtonShow()
    var currArray = document.getElementsByClassName("active")
    for (let i=0; i < currArray.length; i++){
      if (currArray[i].value == this.pivotArray()[0].toString()){
        currArray[i].className = "hidden"
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
    console.log("picking numbers");
    console.log(this.result[this.state.iterationCounter][0]);
    e.preventDefault()
    e.persist()
    this.value = parseInt(e.currentTarget.value)
    console.log(e.currentTarget.value);
    if (e.currentTarget.className == "hidden"){
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
            e.target.className = "hidden"
            var value = e.target.value
            this.correctSelectionHandler(value, "smaller")
          }, this.animationTimeout)
        }
        return
      case "selectHigher":
        console.log("selecting higher");
        if (this.largerThanPivotArray().includes(this.value) || this.largerThanPivotArray().length < 1) {
          console.log("selecting includes higher");
          setTimeout( () => {
            e.target.className = "hidden"
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
    button[1].className = `${string}Show`
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
