import React from 'react';
import QuickSortSolve from './quick_sort_class'

export default class QuickSort extends React.Component {
  constructor(){
    super()
    this.state = {
      iterationCounter: 0,
      solved: false,
      update: false
    };
    this.addClassIntervalSpeed = 250
    this.showDeconsctructedArraySpeed = 250
    this.resetIterationIntervalSpeed = 250
    this.switchArrayToSubarraySpeed =250
    this.clearSubArraySpeed = 250
    this.pivot = this.pivot.bind(this);
    this.handleArrayShuffle = this.handleArrayShuffle.bind(this)
    this.addClassName = this.addClassName.bind(this)
    this.renderQuickSortChange = this.renderQuickSortChange.bind(this)
    this.handleClickStart = this.handleClickStart.bind(this);
    this.classClear = this.classClear.bind(this)
    this.startArray = [2, 0, 18, 11, 4, 19, 12, 14, 9, 8]
    // this.startArray = this.randomArray()
    var newQuickSort = new QuickSortSolve
    this.sorting = newQuickSort.quickSort(this.startArray)
    this.result = newQuickSort.result()
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

  update(input){
    return e => this.setState({
      [input]: e.currentTarget.value
    })
  }

  clearDeconstructedArray(){
    ["pivot", "smaller", "larger"].forEach((el) => {
      var i = document.getElementsByClassName(`${el}Show`)
      while (i.length){
        i[0].className=`${el}Hidden`
      }
    })
  }

  classClear(){
    ["smaller", "larger", "active", "hidden", "unfocused"].forEach( (el) =>{
      var nums = document.getElementsByClassName(el)
      let j =0
      while (j < nums.length && nums.length > 0) {
        var currArray = this.result[this.state.iterationCounter][0]
        console.log(currArray);
        var num = parseInt((nums[j].getAttribute("name")))
        if (currArray.includes(num)){
          nums[j].className="active"
        } else {
          nums[j].className="unfocused"
        }
        j += 1
      }
    })
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

  addClassName(){
      this.classClear()
      var x = document.getElementsByClassName(`active`)
      const count = x.length
      let counter = 0
      const pivotNum = this.result[this.state.iterationCounter][3][0]
      this.addClassInterval = setInterval( () => {
        if (!x.length){
          clearInterval(this.addClassInterval)
          this.showSmaller()
          return
        }
        var currNum = parseInt(x[0].getAttribute("name"))
        if (currNum === pivotNum){
          x[0].className = "pivot"
        } else if (currNum > pivotNum){
          x[0].className = "larger"
        } else if (currNum < pivotNum){
          x[0].className = "smaller"
        }
        counter += 1
        console.log(this.result);
      }, this.addClassIntervalSpeed)
  }

  showSmaller(){
    var counter = 0
    this.switchSmaller = setInterval(() => {
      switch(counter){
        case 1:
        var i = document.getElementsByClassName("smaller")
        while (i.length){
          i[0].className="hidden"
        }
        case 2:
        var i = document.getElementsByClassName("smallerHidden")
        while (i.length){
          i[0].className="smallerShow"
        }
        case 3:
        clearInterval(this.switchSmaller)
        this.showPivot()
        return
      }
      counter += 1
    }, this.switchArrayToSubarraySpeed)
  }

  showPivot(){
    var counter = 0
    this.switchPivot = setInterval( ()=> {
      switch(counter){
        case 1:
        var i = document.getElementsByClassName("pivot")
        while (i.length){
          i[0].className="hidden"
        }
        case 2:
        var i = document.getElementsByClassName("pivotHidden")
        while (i.length){
          i[0].className="pivotShow"
        }
        case 3:
        clearInterval(this.switchPivot);
        this.showLarger()
        return
      }
      counter += 1
    }, this.switchArrayToSubarraySpeed)
  }

  showLarger(){
    var counter = 0
    this.switchLarger = setInterval( () => {
      switch(counter){
        case 1:
        var i = document.getElementsByClassName("larger")
        while (i.length){
          i[0].className = "hidden"
        }
        case 2:
        var i = document.getElementsByClassName("largerHidden")
        while (i.length){
          i[0].className = "largerShow"
        }
        case 3:
        clearInterval(this.switchLarger)
        this.renderHiddenSortedAndClearSubArray()
        return
      }
      counter += 1
    }, this.switchArrayToSubarraySpeed)
  }

  renderHiddenSortedAndClearSubArray(){
    var counter = 0
    this.clearSubArray = setInterval( () => {
      var currentArray = this.result[this.state.iterationCounter][0]
      switch(counter){
        case 1:
          this.insertArrayByIndex()
          this.forceUpdate()
        case 2:
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
          var smallLarge = this.result[this.state.iterationCounter][2].concat(this.result[this.state.iterationCounter][3])
            if (activeArray.length < 3){
              var sorted = document.getElementsByClassName("active")
              while (nums[0]){
                  nums[0].className = "sorted"
              }
            }
            else if (smallLarge.length < 3){
              debugger
              var sorted = document.getElementsByClassName("hidden")
              for (let i = 0; i < sorted.length; i++){
                if ( smallLarge.includes(parseInt(sorted[i].getAttribute("name")))){
                  sorted[i].className= "sorted"
                }
              }
            }


          clearInterval(this.clearSubArray)
        case 4:
        console.log(this.result[this.state.iterationCounter + 1][0]);
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
    this.addClassName()
  }

  showDeconsctructedArray(){
    let counter = 0
    this.deconstructArrayInterval = setInterval( ()=> {
      if (counter === 6){
        clearInterval(this.deconstructArrayInterval)
        this.resetIteration()
        this.reRenderFullArray()
        return
      }
      if (counter === 1) {
        this.showPivot()
      }
      else if (counter === 2){
        this.showSmaller()
      } else if (counter === 3) {
        this.showLarger()
      }
      counter += 1
    }, this.showDeconsctructedArraySpeed)
  }

  resetIteration(){
    let counter = 0
    this.resetIterationInterval = setInterval( () =>{
      if (counter === 1){
        this.insertArrayByIndex()
        this.setState({iterationCounter: this.state.iterationCounter += 1})
        this.classClear()
        if (this.result[this.state.iterationCounter]){
          this.addClassName()
        } else {
          return
        }
      } else if (counter === 2){
        this.clearDeconstructedArray()
      } else if (counter === 3){
        clearInterval(this.resetIterationInterval)
      }
      counter += 1
    },this.resetIterationIntervalSpeed)
  }

  renderQuickSortChange(){
    this.addClassName()
  }

  reRenderFullArray(){
    ["pivot", "smaller", "larger"].forEach((el) => {
      var i = document.getElementsByClassName(el)
      while (i.length){
        i[0].className=`active`
      }
    })
  }

  pivot(){
    return (
      <span className="pivotHidden">
        {this.result[this.state.iterationCounter][3].toString()}
      </span>
    )
  }
  largerThanPivot(){
    return(
      this.result[this.state.iterationCounter][1].map( (el, i) => {
        return(
          <span key={i} className="largerHidden"> {el} </span>
        )
      })
    )
  }
  smallerThanPivot(){
    return(
      this.result[this.state.iterationCounter][2].map( (el, i) => {
        return(
          <span key={i} className="smallerHidden"> {el} </span>
        )
      })
    )
  }

  handleClickStart(){
    this.addClassName()
  }

  focusAll(){
    for (let i=0; i < 20; i++){
      ["unfocused", "hidden", "smaller", "larger"].forEach( (el) => {
        var nums = document.getElementsByClassName(el)
        while (nums.length){
          nums[0].className = "sorted"
        }
      })
    }
  }

  trueArray(){
    return(
      this.startArray.map( (el, i )=> {
        return(
          <span name={el} id ={i} key={i} className="active"> {el}</span>
        )
      })
    )
  }

  handleArrayShuffle(){
    let counter = 0
    this.shuffleArray = setInterval( () => {
      switch(counter) {
        case 1:
        console.log("ok");
          this.setState({iterationCounter: 0, solved: false})
          this.startArray = this.randomArray()
          var newQuickSort = new QuickSortSolve
          this.sorting = newQuickSort.quickSort(this.startArray)
          this.result = newQuickSort.result()
          console.log(this.result);
        case 2:
        console.log(this.result);
          this.resetArray();
        case 3:
          clearInterval(this.shuffleArray)
          this.forceUpdate()
      }
      counter += 1
    }, this.addClassIntervalSpeed)
  }

  resetArray(){
    ["unfocused", "hidden", "smaller", "larger", "sorted"].forEach( (el) => {
      var nums = document.getElementsByClassName(el)
      while (nums.length){
        nums[0].className = "active"
      }
    })
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClickStart}>
          start
        </button>
        quicksort
        <br/>
        {this.trueArray()}
        {this.state.solved ? this.focusAll() : null}
        <p>
          pivot {this.pivot()}
          smaller {this.smallerThanPivot()}
          larger {this.largerThanPivot()}
        </p>
        <button onClick={this.handleArrayShuffle}>
          new array
        </button>
      </div>
    )
  }
}
