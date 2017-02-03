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
    const arrLength = Math.floor(Math.random()*5 + 3)
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

  hideAllActive(){
    var pivot = document.getElementsByClassName("active")
    while (pivot.length){
      pivot[0].className="hidden"
    }
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


    renderHiddenSortedAndClearSubArray(){
      var counter = 0
      this.clearSubArray = setInterval( () => {
        var currentArray = this.result[this.state.iterationCounter][0]
        console.log("render hidden");
        switch(counter){
          case 1:
            console.log("hit case 1 render");
            this.insertArrayByIndex()
            this.forceUpdate()
          case 2:
          console.log("hit case 2 render");
            ["pivotShow", "largerShow", "smallerShow"].forEach((subArrayClass) => {
              var i = document.getElementsByClassName(subArrayClass)
              while(i.length){
                i[0].className = subArrayClass.replace("Show", "Hidden")
              }
            })
          case 3:
            var nums = document.getElementsByClassName("hidden")
            var pivotNum = this.result[this.state.iterationCounter][3][0].toString()
            var activeArray = this.result[this.state.iterationCounter][0]
            var pivot = this.result[this.state.iterationCounter][3]
            var smaller = this.result[this.state.iterationCounter][2]
            var larger = this.result[this.state.iterationCounter][3]
            var smallPivot = this.result[this.state.iterationCounter][2].concat(this.result[this.state.iterationCounter][3])
            var pivotLarge = this.result[this.state.iterationCounter][3].concat(this.result[this.state.iterationCounter][1])
            debugger
              if (activeArray.length < 3){
                var sorted = document.getElementsByClassName("active")
                while (nums[0]){
                    nums[0].className = "sorted"
                }
              }

              else if (smallPivot.length < 3){
                var sorted = document.getElementsByClassName("hidden")
                for (let i = 0; i < sorted.length; i++){
                  if (sorted[i]){
                    if ( smallPivot.includes(parseInt(sorted[i].getAttribute("name")))){
                      sorted[i].className= "sorted"
                    }
                  }
                }
              }

              else if (pivotLarge.length < 3){
                // for (let j=0; j < 3; j++){
                  var sorted = document.getElementsByClassName("hidden")
                  for (let i = 0; i <= sorted.length; i++){

                    // if (sorted[i].getAttribute("name")){
                      if ( pivotLarge.includes(parseInt(sorted[i].getAttribute("name")))){
                        sorted[i].className= "sorted"
                      }
                    // }
                  }
                // }
              }
            clearInterval(this.clearSubArray)
          case 4:
          debugger
          if (this.result[this.state.iterationCounter + 1][0].length < 1){
            this.setState({solved: true})
          } else {
            this.setState({iterationCounter: this.state.iterationCounter += 1})
            this.setNewActiveElements()
          }
        }
        counter += 1
      }, this.clearSubArraySpeed)
    }

    setNewActiveElements(){
      debugger
      var currentArray = this.result[this.state.iterationCounter][0];
      var pivotNum = this.result[this.state.iterationCounter - 1][3][0];
      for (let x=0; x < 20; x++){
        ["hidden","active", "unfocused"].forEach( (el) => {
          var j = document.getElementsByClassName(el);
          for (let i=0; i < j.length; i++){
            var num = parseInt((j[i].getAttribute("name")));
            var test = currentArray.includes(num);
            if (num === pivotNum){
              j[i].className="sorted"
            }
            else if (!test){
              j[i].className="unfocused";
            } else if (test) {
              j[i].className="active";
            }
          }
        })
      }
      console.log("add something here!?");
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

  correctHandler(value, string){
    var button = document.querySelectorAll(`[value="${value}"]`);
    button[0].className = `${string}Show`
    this.setState({correctButtonCount: this.state.correctButtonCount += 1})
    console.log(this.state.correctButtonCount);
    console.log(this.smallerCount());
    switch(string){
      case "smaller":
        if (this.state.correctButtonCount >= this.smallerCount()){
          console.log("finished smaller");
          this.setState({gameState: "selectHigher", correctButtonCount: 0})
          var counter = 0

          this.showLargerHideMain = setInterval( () =>{
            switch(counter){
              case 0:
                console.log("hit case1");
                var incorrectInputs = document.getElementsByClassName("incorrect")
                while (incorrectInputs.length){
                  incorrectInputs[0].className="active"
                }
              case 1:
                debugger
                this.showLarger()
                this.hideAllActive()
              case 2:
                this.setState({iterationCounter: this.state.iterationCounter += 1})
                this.renderHiddenSortedAndClearSubArray()
                clearInterval(this.showLargerHideMain)

                return
            }
          }, this.animationTimeout)
          counter += 1
          return
        }
        return
      case "larger":
        console.log("hit larger");
        if (this.state.correctButtonCount >= this.largerCount()){

          this.setState({gameState: "selectLower",
            correctButtonCount: 0,
            iterationCounter: this.state.iterationCounter += 1
          })
          console.log(this.state.gameState);
          // this.hideLarger()
          // this.hideSmaller()
          // this.hidePivot()
          // this.showHidden()
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
