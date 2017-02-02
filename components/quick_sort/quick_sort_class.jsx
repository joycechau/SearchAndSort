export default class QuickSortSolve {
  constructor(){
    this.solution = {}
    this.iteration = 0
    this.quickSort = this.quickSort.bind(this);
  }

  quickSort(array){
    if (array.length < 2){
      return array
    }
    var pivot = array[0]
    var array = array.slice(1)
    var larger = array.filter( x => x > pivot )
    var smaller = array.filter( x => x <= pivot )
    this.solution[this.iteration] = [
      [pivot].concat(smaller).concat(larger),
      larger,
      smaller,
      [pivot]
    ]
    this.iteration += 1
    return this.quickSort(smaller).concat([pivot]).concat(this.quickSort(larger))
  }

  result(){
    this.solution[this.iteration] = [[],[],[],[],[]]
    return this.solution
  }
}

// var x = new QuickSortSolve
// var array = [7,2,12,5,6,8,9,10]
// x.quickSort(array)
// x.result()
